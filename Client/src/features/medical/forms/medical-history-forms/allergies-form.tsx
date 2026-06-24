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
import { SeverityOptions } from "@/data";

const AllergiesForm = () => {
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
    console.log("====================================");
    console.log("set User Form", data);
    console.log("====================================");
  };

  return (
    <section className="w-full rounded-none p-2">
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
            Submit
          </Button>
        </Field>
      </div>
    </section>
  );
};

export default AllergiesForm;
