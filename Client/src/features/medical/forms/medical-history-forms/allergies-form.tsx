import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AllergySchema } from "@/zod/medical-records";
import CustomSelectBar from "../../components/custom-select";
import { SeverityOptions } from "@/constants";
import { useHospitalStore } from "@/zustand/hospital";
import { useEffect, useState } from "react";
import { createAllergy, getAllergies, updateAllergy } from "@/api/records";
import { PenBoxIcon, Trash2, TriangleAlert } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Allergy } from "../../interface";

const AllergiesForm = () => {
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [id, setId] = useState(0);
  const { patient } = useHospitalStore();
  const [allergies, setAllergies] = useState<Allergy[]>([]);

  const getAllergiesByPatient = async () => {
    if (!patient?.id) return;

    const data = await getAllergies(patient.id);

    if (data) {
      setAllergies(data);
    }
  };

  useEffect(() => {
    getAllergiesByPatient();
  }, [patient?.id]);

  const defaultValues = {
    allergy: "",
    severity: "",
    note: "",
  };

  const form = useForm<z.infer<typeof AllergySchema>>({
    resolver: zodResolver(AllergySchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof AllergySchema>) => {
    const payload = {
      patient: patient!.id,
      allergy: data.allergy,
      severity: data.severity,
      note: data.note,
    };

    if (mode === "create") {
      await createAllergy(payload);
    } else {
      await updateAllergy(id, payload);
    }

    getAllergiesByPatient();
    form.reset();
    setMode("create");
    setId(0);
  };

  const handleEdit = (allergy: Allergy & { id: number }) => {
    setMode("edit");
    setId(allergy.id);

    form.reset({
      allergy: allergy.allergy,
      severity: allergy.severity,
      note: allergy.note,
    });
  };

  const severityColor = {
    High: {
      dot: "bg-red-600",
      text: "text-red-600",
    },
    Moderate: {
      dot: "bg-yellow-500",
      text: "text-yellow-500",
    },
    Low: {
      dot: "bg-sky-600",
      text: "text-sky-600",
    },
  };

  return (
    <section className="w-full rounded-none p-2">
      <ScrollArea className="h-28">
        {allergies.length ? (
          allergies.map((allergy) => (
            <div className="bg-gray-100 my-4 p-4 rounded-sm flex justify-between items-center">
              <div
                className="p-4 rounded-sm flex gap-2 items-center"
                key={allergy.id}
              >
                <div
                  className={`w-4 h-4 rounded-full ${severityColor[allergy.severity].dot}`}
                ></div>

                <div className="w-full">
                  <div className="flex gap-4">
                    <h2 className="font-bold text-gray-800">
                      {allergy.allergy}
                    </h2>
                    <p
                      className={`${severityColor[allergy.severity].text} font-semibold`}
                    >
                      {allergy.severity === "High" ? (
                        <TriangleAlert className="w-4 h-4 inline-block -mt-1" />
                      ) : (
                        ""
                      )}{" "}
                      {allergy.severity}
                    </p>
                  </div>

                  <p className="text-gray-500 font-semibold">{allergy.note}</p>
                </div>
              </div>

              {/*  */}
              <div>
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  onClick={() => handleEdit(allergy)}
                >
                  <PenBoxIcon />
                </Button>
                <Button
                  className="text-destructive ml-2 cursor-pointer"
                  variant="outline"
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center bg-gray-100 h-[90%] m-4 rounded-sm">
            <p className="text-gray-600 font-semibold">No Allergies</p>
          </div>
        )}
      </ScrollArea>
      <div className="p-0">
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex gap-2">
              <Controller
                name="allergy"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Allergy</FieldLabel>

                    <Input
                      {...field}
                      id="form-rhf-demo-allergy"
                      aria-invalid={fieldState.invalid}
                      placeholder="eg: Shellfish"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* severity */}
              <Controller
                name="severity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Severity</FieldLabel>

                    <CustomSelectBar
                      field={field}
                      data={SeverityOptions}
                      label="Severity"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* note */}
            <Controller
              name="note"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-note">Note</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-note"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg: Mild rash - antihistamine needed"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </div>
      <div className="p-4">
        <Field orientation="horizontal" className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            className="py-5 px-6 rounded-sm"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="form-rhf-demo"
            className="py-5 px-10 rounded-sm"
          >
            {mode === "create" ? "Add Allergy" : "Update Allergy"}
          </Button>
        </Field>
      </div>
    </section>
  );
};

export default AllergiesForm;
