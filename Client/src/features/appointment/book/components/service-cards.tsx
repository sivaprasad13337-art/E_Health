"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import type {
  AppointmentPayload,
  ServiceType,
} from "../../interface/interface";
import { useEffect, useState } from "react";
// import { useEffect, useState } from "react";

// interface ServiceProps {
//   id: number;
//   name: string;
//   price: string;
//   img: string;
// }

// interface Formdata {
//   servive: [];
// }

// interface FormType {
//   formData: Formdata;
//   setFormData: (arg: object[]) => void;
// }

const ServiceCard = ({
  service,
  onClick,
  formData,
  //   form,
}: {
  service: ServiceType;
  onClick: () => void;
  formData: AppointmentPayload;
  //   form: FormType;
}) => {
  //   const [data, setData] = useState<ServiceProps[]>([]);

  //   useEffect(() => {
  //     // form.setFormData((prev) => [...prev, form.formData.servive: data]);
  //     console.log("====================================");
  //     console.log(data);
  //     console.log("====================================");
  //   }, [data]);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(
      formData.services.find((item) => (item.id == service.id ? true : false)),
    );
  }, [formData.services]);

  console.log("====================================");
  console.log(checked);
  console.log("====================================");

  const getCloudinaryUrl = (path: string) => {
    return `https://res.cloudinary.com/dhpugjush/${path}`;
  };
  return (
    <FieldGroup
      className="w-[48%] my- h-[7rem] bg-pink-30"
      //   onClick={() => {
      //     console.log("FIELDGROUP CLICK");
      //     onClick();
      //   }}
    >
      <FieldLabel className="h-full">
        <Field
          orientation="horizontal"
          className="rounded-md h-full"
          style={{
            background: `
      linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.2)),
      url("${getCloudinaryUrl(service.poster)}")
    `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <FieldContent className="">
            <div className="flex gap-2 items-center">
              <Checkbox
                id="toggle-checkbox-2"
                name="toggle-checkbox-2"
                className="mt-1"
                checked={checked}
                onClick={(e) => e.stopPropagation()}
                onCheckedChange={() => {
                  onClick();
                }}
              />
              <FieldTitle className="text-xl text-white font-bold">
                {service.name} ({service.short_name})
              </FieldTitle>
            </div>
            {/* <FieldTitle className="text-xl text-white font-bold ml-4">
              {service.short_name}
            </FieldTitle> */}
            <FieldDescription className="text-xl font-bold text-teal-300 ml-2 !mt-4">
              {"\u20B9"} {service.price}
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </FieldGroup>
  );
};

export default ServiceCard;
