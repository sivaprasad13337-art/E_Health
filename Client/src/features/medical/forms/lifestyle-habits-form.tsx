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
import { LifestyleHabitsSchema } from "@/zod/medical-records";
import CustomSelectBar from "../components/custom-select";
import {
  ActivityOptions,
  BloodGroups,
  Genders,
  SleepQualityOptions,
  SmokingAndAlcoholOptions,
} from "@/data";

import CustomDatePicker from "../components/custom-date-picker";

const LifestyleHabitsForm = () => {
  const defaultValues = {
    smoking: "",
    alcohol: "",
    activity: "",
    diet: "",
    sleep: "",
    taking_medication: "",
  };
  const form = useForm<z.infer<typeof LifestyleHabitsSchema>>({
    resolver: zodResolver(LifestyleHabitsSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof LifestyleHabitsSchema>) => {
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
                name="smoking"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Smoking</FieldLabel>

                    <CustomSelectBar
                      field={field}
                      data={SmokingAndAlcoholOptions}
                      label="Select"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* alcohol */}
              <Controller
                name="alcohol"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Alcohol</FieldLabel>

                    <CustomSelectBar
                      field={field}
                      data={SmokingAndAlcoholOptions}
                      label="Select"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* activity */}
              <Controller
                name="activity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-activity">
                      Activity
                    </FieldLabel>
                    <CustomSelectBar
                      field={field}
                      data={ActivityOptions}
                      label="Select"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex gap-2">
              {/* diet */}
              <Controller
                name="diet"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-diet">Diet</FieldLabel>
                    <CustomSelectBar
                      field={field}
                      data={["Vegetarian", "Non-Vegetarian"]}
                      label="Select"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* sleep */}
              <Controller
                name="sleep"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-sleep">Sleep</FieldLabel>
                    <CustomSelectBar
                      field={field}
                      data={SleepQualityOptions}
                      label="Select"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* taking_medication */}
              <Controller
                name="taking_medication"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-taking_medication">
                      Taking any Medicine
                    </FieldLabel>
                    <CustomSelectBar
                      field={field}
                      data={["Yes", "No"]}
                      label="Select"
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

export default LifestyleHabitsForm;
