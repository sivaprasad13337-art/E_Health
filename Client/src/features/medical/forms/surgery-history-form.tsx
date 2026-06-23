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
import CustomDatePicker from "../components/custom-date-picker";
import { Textarea } from "@/components/ui/textarea";

const SurgeryHistoryForm = () => {
  const defaultValues = {
    surgery: "",
    reason: "",
    date: "",
    hospital: "",
    notes: "",
    summary: "",
  };
  const form = useForm<z.infer<typeof SurgeryHistorySchema>>({
    resolver: zodResolver(SurgeryHistorySchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof SurgeryHistorySchema>) => {
    console.log("====================================");
    console.log("set User Form", data);
    console.log("====================================");

    // await setUser(data, userData.id);
  };

  return (
    <section className="w-full rounded-none p-2">
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
            Submit
          </Button>
        </Field>
      </div>
    </section>
  );
};

export default SurgeryHistoryForm;
