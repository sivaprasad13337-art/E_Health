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
import { SurgeryHistorySchema } from "@/zod/medical-records";
import { Textarea } from "@/components/ui/textarea";
import CustomDatePicker from "../../components/custom-date-picker";
import { PenBoxIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createSurgery, getSurgeries, updateSurgery } from "@/api/records";
import { useHospitalStore } from "@/zustand/hospital";
import { formateDateAndTime } from "@/lib/utils";
import type { Surgery } from "../../interface";

const SurgeryHistoryForm = () => {
  const [type, setType] = useState("Submit");
  const [id, setId] = useState(0);
  const { patient } = useHospitalStore();

  const getSurgeriesById = async () => {
    const data = await getSurgeries(patient?.id);

    if (data) setSurgeries(data);
  };

  const [surgeries, setSurgeries] = useState<Surgery[]>([]);
  useEffect(() => {
    getSurgeriesById();
  }, []);

  const form = useForm<z.infer<typeof SurgeryHistorySchema>>({
    resolver: zodResolver(SurgeryHistorySchema),
    defaultValues: {
      surgery: "",
      reason: "",
      date: new Date(),
      hospital: "",
      notes: "",
      summary: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SurgeryHistorySchema>) => {
    if (type === "Submit") {
      const response = await createSurgery({
        patient: patient?.id,
        surgery: data.surgery,
        reason: data.reason,
        date: data.date,
        hospital: data.hospital,
        notes: data.notes,
        summary: data.summary,
      });
    } else if (type === "Edit") {
      // console.log(data, id);

      await updateSurgery(id, {
        patient: patient?.id,
        surgery: data.surgery,
        reason: data.reason,
        date: data.date,
        hospital: data.hospital,
        notes: data.notes,
        summary: data.summary,
      });
    }

    getSurgeriesById();
    form.reset();
    setType("Submit");
    setId(0);
  };

  const handleEdit = (data) => {
    setType("Edit");
    form.reset({
      ...data,
      date: new Date(data.date),
    });
    setId(data.id);
  };

  return (
    <section className="w-full rounded-none p-2 h-[37rem]">
      {surgeries.length ? (
        surgeries.map((surgery) => (
          <div className="bg-gray-100 my-4 p-4 rounded-sm flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-gray-200 w-10 h-10 rounded-md"></div>
              <div>
                <h2 className="font-bold text-gray-800">{surgery.reason}</h2>
                <p className="text-gray-500 font-semibold">
                  {surgery.hospital} · {surgery.surgery}
                </p>
              </div>
            </div>

            <p className="mt-2 text-gray-500 font-semibold cursor-pointer">
              {formateDateAndTime(surgery.date)[0]}
              {/* {formateDateAndTime(surgery.date)[1]} */}
            </p>

            <div>
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => handleEdit(surgery)}
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
        <div>No Surgeries Found</div>
      )}
      <div className="p-0">
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex gap-2">
              <Controller
                name="surgery"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Surgery</FieldLabel>

                    <Input
                      {...field}
                      id="form-rhf-demo-surgery"
                      aria-invalid={fieldState.invalid}
                      placeholder="eg: Lasik"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* reason */}
              <Controller
                name="reason"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Reason</FieldLabel>

                    <Input
                      {...field}
                      id="form-rhf-demo-reason"
                      aria-invalid={fieldState.invalid}
                      placeholder="eg: Farsightedness"
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
              {/* date */}
              <Controller
                name="date"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-date">Date</FieldLabel>
                    <CustomDatePicker field={field} label="Date" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* hospital */}
              <Controller
                name="hospital"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-hospital">
                      Hospital
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-hospital"
                      aria-invalid={fieldState.invalid}
                      placeholder="eg: Apollo"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* notes */}
            <Controller
              name="notes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-notes">Notes</FieldLabel>
                  <Textarea
                    {...field}
                    id="form-rhf-demo-notes"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* summary */}
            <Controller
              name="summary"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-summary">
                    Summary
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="form-rhf-demo-summary"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
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
            {type}
          </Button>
        </Field>
      </div>
    </section>
  );
};

export default SurgeryHistoryForm;
