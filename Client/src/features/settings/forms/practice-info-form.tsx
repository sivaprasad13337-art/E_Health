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
import { UnderlyingConditionsShecma } from "@/zod/medical-records";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useHospitalStore } from "@/zustand/hospital";
import {
  createMedicalCondition,
  getMedicalConditions,
  updateMedicalCondition,
} from "@/api/records";
import { PenBoxIcon, Trash2 } from "lucide-react";
import type { MedicalCondition } from "@/features/medical/interface";

const EducationAndExp = [
  { name: "MBBS", where: "AIIMS Delhi", when: "2006", type: "Edu" },
  {
    name: "MD — Internal Medicine",
    where: "CMC Vellore",
    when: "2010",
    type: "Edu",
  },
  {
    name: "DM — Cardiology",
    where: "PGIMER Chandigarh",
    when: "2013",
    type: "Edu",
  },
  {
    name: "Senior Cardiologist",
    where: "Apollo Hospital, Chennai ",
    when: "2013 - Present",
    type: "Exp",
  },
];

const PracticeInfoForm = () => {
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [id, setId] = useState(0);
  const { patient } = useHospitalStore();
  const [conditions, setConditions] = useState<MedicalCondition[]>([]);

  const getConditionsByPatient = async () => {
    if (!patient?.id) return;

    const data = await getMedicalConditions(patient.id);

    if (data) {
      setConditions(data);
    }
  };

  useEffect(() => {
    getConditionsByPatient();
  }, [patient?.id]);

  const defaultValues = {
    condition: "",
    since: "",
    management: "",
    medication: "",
  };
  const form = useForm<z.infer<typeof UnderlyingConditionsShecma>>({
    resolver: zodResolver(UnderlyingConditionsShecma),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof UnderlyingConditionsShecma>) => {
    //     {
    //   id: number;
    //   patient: number;
    //   condition: string;
    //   since: string;
    //   management: string;
    //   medication: string;
    // }
    const payload = {
      patient: patient!.id,
      condition: data.condition,
      since: data.since,
      management: data.management,
      medication: data.medication,
    };

    if (mode === "create") {
      await createMedicalCondition(payload);
    } else {
      await updateMedicalCondition(id, payload);
    }

    getConditionsByPatient();
    form.reset();
    setMode("create");
    setId(0);
  };

  const handleEdit = (condition: Condition & { id: number }) => {
    setMode("edit");
    setId(condition.id);
    //     {
    //   id: number;
    //   patient: number;
    //   condition: string;
    //   since: string;
    //   management: string;
    //   medication: string;
    // };
    form.reset({
      condition: condition.condition,
      since: new Date(condition.since),
      management: condition.management,
      medication: condition.medication,
    });
  };

  return (
    <section className="w-full rounded-none p-2">
      <ScrollArea className="h-52">
        {conditions.length ? (
          conditions.map((condition) => (
            <div className="bg-gray-100 my-4 p-4 rounded-sm flex justify-between">
              <div className="">
                <div className="flex justify-between">
                  <h2 className="font-bold text-gray-800">
                    {condition.condition}
                  </h2>
                  <p className="text-gray-500">{condition.since}</p>
                </div>

                <p className="mt-2 text-gray-500 font-semibold">
                  {condition.management} · {condition.medication}
                </p>
              </div>

              <div>
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  onClick={() => handleEdit(condition)}
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
            <p className="text-gray-600 font-semibold">
              No Underlaying Conditions Added
            </p>
          </div>
        )}
      </ScrollArea>
      <div className="p-0">
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex gap-2">
              <Controller
                name="condition"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Condition</FieldLabel>

                    <Input
                      {...field}
                      id="form-rhf-demo-condition"
                      aria-invalid={fieldState.invalid}
                      placeholder="eg: Type-2 diabetic"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* since */}
              <Controller
                name="since"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Since</FieldLabel>

                    <Input
                      {...field}
                      id="form-rhf-demo-since"
                      aria-invalid={fieldState.invalid}
                      placeholder="eg: 2011"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex gap-2">
              {/* management */}
              <Controller
                name="management"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-management">
                      Management
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-management"
                      aria-invalid={fieldState.invalid}
                      placeholder="eg: On medication"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* medication */}
              <Controller
                name="medication"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-medication">
                      Medication
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-medication"
                      aria-invalid={fieldState.invalid}
                      placeholder="eg: Gibtulio 25mg"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
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
            Submit
          </Button>
        </Field>
      </div>
    </section>
  );
};

export default PracticeInfoForm;
