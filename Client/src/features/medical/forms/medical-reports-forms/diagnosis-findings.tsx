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
import { DiagnosisAndFindingsSchema } from "@/zod/medical-reports";

import { Textarea } from "@/components/ui/textarea";
import type { MedicalReportFromProps } from "../../interface";

const DiagnosisAndFindingsForm = ({
  formData,
  setFormData,
}: MedicalReportFromProps) => {
  const defaultValues = formData.diagnosis_and_findings;

  const form = useForm<z.infer<typeof DiagnosisAndFindingsSchema>>({
    resolver: zodResolver(DiagnosisAndFindingsSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof DiagnosisAndFindingsSchema>) => {
    console.log("====================================");
    console.log("set User Form", data);
    console.log("====================================");

    setFormData((prev) => ({ ...prev, diagnosis_and_findings: data }));
  };

  return (
    <section className="w-full rounded-none p-2">
      <div className="p-0">
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex gap-2">
              <Controller
                name="primary_diagnosis"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Primary Diagnosis</FieldLabel>

                    <Input
                      {...field}
                      id="form-rhf-demo-primary_diagnosis"
                      aria-invalid={fieldState.invalid}
                      placeholder="Eg: Essential Hypertension (Stage 1) — I10"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* secondary_findings */}
              <Controller
                name="secondary_findings"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Secondary Findings</FieldLabel>

                    <Input
                      {...field}
                      id="form-rhf-demo-secondary_findings"
                      aria-invalid={fieldState.invalid}
                      placeholder="Eg: Mild tachycardia — under observation"
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
                    placeholder="Note..."
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
            Save
          </Button>
        </Field>
      </div>
    </section>
  );
};

export default DiagnosisAndFindingsForm;
