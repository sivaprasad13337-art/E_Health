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
import { VitalSchema } from "@/zod/medical-reports";
import type { MedicalReportFromProps } from "../../interface";

const VitalsForm = ({ formData, setFormData }: MedicalReportFromProps) => {
  const defaultValues = formData.vitals;

  const form = useForm<z.infer<typeof VitalSchema>>({
    resolver: zodResolver(VitalSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof VitalSchema>) => {
    console.log("====================================");
    console.log("set User Form", data);
    console.log("====================================");
    setFormData((prev) => ({ ...prev, vitals: data }));
  };

  return (
    <section className="w-full rounded-none p-2">
      <div className="p-0">
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="flex gap-6">
              <Controller
                name="blood_pressure"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Blood Pressure</FieldLabel>
                    <div className="flex gap-1 items-center">
                      <Input
                        {...field}
                        id="form-rhf-demo-blood_pressure"
                        aria-invalid={fieldState.invalid}
                        placeholder="Eg: 120/80"
                        autoComplete="off"
                        className="rounded-sm w-22"
                      />{" "}
                      <span className="text-sm font-semibold text-gray-600">
                        mmHg
                      </span>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* heart_rate */}
              <Controller
                name="heart_rate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Heart Rate</FieldLabel>

                    <div className="flex gap-1 items-center">
                      <Input
                        {...field}
                        id="form-rhf-demo-heart_rate"
                        aria-invalid={fieldState.invalid}
                        placeholder="Eg: 68"
                        autoComplete="off"
                        className="rounded-sm w-22"
                      />{" "}
                      <span className="text-sm font-semibold text-gray-600">
                        BPM
                      </span>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* temperature */}
              <Controller
                name="temperature"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Temperature</FieldLabel>

                    <div className="flex gap-1 items-center">
                      <Input
                        {...field}
                        id="form-rhf-demo-temperature"
                        aria-invalid={fieldState.invalid}
                        placeholder="Eg: 95"
                        autoComplete="off"
                        className="rounded-sm w-22"
                      />{" "}
                      <span className="text-sm font-semibold text-gray-600">
                        °F
                      </span>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* spo2 */}
              <Controller
                name="spo2"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>SpO₂</FieldLabel>

                    <div className="flex gap-1 items-center">
                      <Input
                        {...field}
                        id="form-rhf-demo-spo2"
                        aria-invalid={fieldState.invalid}
                        placeholder="Eg: 98"
                        autoComplete="off"
                        className="rounded-sm w-22"
                      />{" "}
                      <span className="text-sm font-semibold text-gray-600">
                        %
                      </span>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* weight */}
              <Controller
                name="weight"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Weight</FieldLabel>

                    <div className="flex gap-1 items-center">
                      <Input
                        {...field}
                        id="form-rhf-demo-weight"
                        aria-invalid={fieldState.invalid}
                        placeholder="Eg: 70"
                        autoComplete="off"
                        className="rounded-sm w-22"
                      />{" "}
                      <span className="text-sm font-semibold text-gray-600">
                        kg
                      </span>
                    </div>

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

export default VitalsForm;
