import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  useFieldArray,
  useForm,
  type Resolver,
} from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PrescriptionSchema } from "@/zod/medical-reports";
import CustomSelectBar from "../../components/custom-select";
import { Minus, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { MedicalReportFromProps } from "../../interface";

const PrescriptionForm = ({
  formData,
  setFormData,
}: MedicalReportFromProps) => {
  const form = useForm<z.infer<typeof PrescriptionSchema>>({
    resolver: zodResolver(PrescriptionSchema) as Resolver<
      z.infer<typeof PrescriptionSchema>
    >,
    defaultValues: {
      medicines: formData.prescription.medicines,
      // [
      //     {
      //       medicine: "",
      //       dosage: 0,
      //       duration: 0,
      //       time: "",
      //       frequency: "Once a day",
      //     },
      //   ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "medicines",
  });

  const onSubmit = async (data: z.infer<typeof PrescriptionSchema>) => {
    console.log("====================================");
    console.log("set User Form", data);
    console.log("====================================");
    setFormData((prev) => ({ ...prev, prescription: data }));
  };

  return (
    <section className="w-full rounded-none p-2">
      <ScrollArea className="p-0 h-32">
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          {fields.map((fieldItem, index) => (
            <FieldGroup
              key={fieldItem.id}
              className="my-4 bg-gray-50 p-4 rounded-md"
            >
              <div className="flex gap-6">
                <Controller
                  name={`medicines.${index}.medicine`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-medicine">
                        Medicine
                      </FieldLabel>

                      <Input
                        {...field}
                        id="form-rhf-demo-medicine"
                        aria-invalid={fieldState.invalid}
                        placeholder="Eg: Aspirin"
                        autoComplete="off"
                        className="border-gray-400"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* dosage */}
                <Controller
                  name={`medicines.${index}.dosage`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="w-44">
                      <FieldLabel htmlFor="form-rhf-demo-dosage">
                        Dosage
                      </FieldLabel>

                      <div className="flex gap-1 items-center">
                        <Input
                          {...field}
                          id="form-rhf-demo-dosage"
                          aria-invalid={fieldState.invalid}
                          placeholder="Eg: 75"
                          autoComplete="off"
                          className="rounded-sm w-22 border-gray-400"
                        />{" "}
                        <span className="text-sm font-semibold text-gray-600">
                          mg
                        </span>
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* duration */}
                <Controller
                  name={`medicines.${index}.duration`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="w-44">
                      <FieldLabel htmlFor="form-rhf-demo-duration">
                        Duration
                      </FieldLabel>

                      <div className="flex gap-1 items-center">
                        <Input
                          {...field}
                          id="form-rhf-demo-duration"
                          aria-invalid={fieldState.invalid}
                          placeholder="Eg: 30"
                          autoComplete="off"
                          className="rounded-sm w-22 border-gray-400"
                        />{" "}
                        <span className="text-sm font-semibold text-gray-600">
                          days
                        </span>
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* time */}
                <Controller
                  name={`medicines.${index}.time`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-time">
                        When to have
                      </FieldLabel>

                      <Input
                        {...field}
                        id="form-rhf-demo-time"
                        aria-invalid={fieldState.invalid}
                        placeholder="Eg: After Lunch"
                        autoComplete="off"
                        className="border-gray-400"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <div className="flex items-end gap-2">
                  {/* frequency */}
                  <Controller
                    name={`medicines.${index}.frequency`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="w-44">
                        <FieldLabel htmlFor="form-rhf-demo-frequency">
                          Frequency
                        </FieldLabel>

                        <CustomSelectBar
                          field={field}
                          data={[
                            "Once a day",
                            "Twice a day",
                            "Thrice a day",
                            "Once a week",
                            "Twice a week",
                            "Thrice a week",
                          ]}
                          label="Select"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Button
                    className="rounded-md cursor-pointer"
                    type="button"
                    onClick={() =>
                      append({
                        medicine: "",
                        dosage: 0,
                        duration: 0,
                        time: "",
                        frequency: "Once a day",
                      })
                    }
                  >
                    <Plus />
                  </Button>

                  <Button
                    className="rounded-md cursor-pointer"
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    <Minus />
                  </Button>
                </div>
              </div>
            </FieldGroup>
          ))}
        </form>
      </ScrollArea>
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

export default PrescriptionForm;
