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

const UnderlyingConditionsForm = () => {
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

export default UnderlyingConditionsForm;
