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
import { BasicHealthInfoSchema } from "@/zod/medical-records";
import CustomSelectBar from "../../components/custom-select";
import { BloodGroups, Genders } from "@/data";

import CustomDatePicker from "../../components/custom-date-picker";

const BasicHealthInfoForm = () => {
  const defaultValues = {
    DOB: "",
    blood_group: "",
    gender: "",
    height: "",
    weight: "",
  };
  const form = useForm<z.infer<typeof BasicHealthInfoSchema>>({
    resolver: zodResolver(BasicHealthInfoSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof BasicHealthInfoSchema>) => {
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
                name="DOB"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Date Of Birth</FieldLabel>

                    <CustomDatePicker field={field} label={"DOB"} />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex gap-2">
              {/* blood_group */}
              <Controller
                name="blood_group"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Blood Group</FieldLabel>

                    <CustomSelectBar
                      data={BloodGroups}
                      field={field}
                      label="Blood Group"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* gender */}
              <Controller
                name="gender"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-gender">
                      Gender
                    </FieldLabel>
                    <CustomSelectBar
                      field={field}
                      data={Genders}
                      label="Gender"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex gap-2">
              {/* height */}
              <Controller
                name="height"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-height">
                      Height
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Height in cm"
                      autoComplete="off"
                    />
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
                    <FieldLabel htmlFor="form-rhf-demo-weight">
                      Weight
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-weight"
                      aria-invalid={fieldState.invalid}
                      placeholder="Weight in kg"
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

export default BasicHealthInfoForm;
