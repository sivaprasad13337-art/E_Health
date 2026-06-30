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
import { LabDetails_Schema } from "@/zod/medical-reports";

import { Textarea } from "@/components/ui/textarea";
import type { LabReportFromProps } from "@/features/medical/interface";

const LabDetailsForm = ({ formData, setFormData }: LabReportFromProps) => {
  const defaultValues = formData.lab_details;

  const form = useForm<z.infer<typeof LabDetails_Schema>>({
    resolver: zodResolver(LabDetails_Schema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof LabDetails_Schema>) => {
    console.log("====================================");
    console.log("set User Form", data);
    console.log("====================================");

    setFormData((prev) => ({ ...prev, lab_details: data }));
  };

  return (
    <section className="w-full rounded-none p-2">
      <div className="p-0">
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex gap-2">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Lab Name</FieldLabel>

                    <Input
                      {...field}
                      id="form-rhf-demo-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Eg: KK Labs"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* location */}
              <Controller
                name="location"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Location</FieldLabel>

                    <Input
                      {...field}
                      id="form-rhf-demo-location"
                      aria-invalid={fieldState.invalid}
                      placeholder="Eg: Chennai"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            {/* collected */}
            <div className="flex gap-2">
              <Controller
                name="collected"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Collected Time</FieldLabel>

                    <Input
                      {...field}
                      id="form-rhf-demo-collected"
                      aria-invalid={fieldState.invalid}
                      placeholder="Eg: 15-03-2026 07:26 AM"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* reported */}
              <Controller
                name="reported"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Reported Time</FieldLabel>

                    <Input
                      {...field}
                      id="form-rhf-demo-reported"
                      aria-invalid={fieldState.invalid}
                      placeholder="Eg: 15-03-2026 10:30 AM"
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
            Save
          </Button>
        </Field>
      </div>
    </section>
  );
};

export default LabDetailsForm;
