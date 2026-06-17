// import { useState } from "react";
import type { CompsProps } from "../../interface/interface";
import { AppointmentTypes } from "@/data/appointment";

const AppointmentType = ({ formData, setFormData }: CompsProps) => {
  // const [selected, setSelected] = useState("");
  return (
    <section className="mt-10 pt-4">
      <p className="text-lg font-bold">Select Appointment Type</p>

      <div className="w-full flex flex-wrap gap-5 my-6">
        {AppointmentTypes.map((item) => (
          <div
            className={
              formData.appointmentType === item.title
                ? "w-[25%] h-[6rem] rounded-2xl flex justify-center items-center bg-sky-100 border-[1px] border-sky-500 shadow-sm cursor-pointer"
                : "w-[25%] h-[6rem] rounded-2xl flex justify-center items-center bg-slate-50 border-[1px] border-gray-300 shadow-sm cursor-pointer hover:bg-sky-100"
            }
            key={item.title}
            onClick={() =>
              setFormData((prev) => ({ ...prev, appointmentType: item.title }))
            }
          >
            <div>
              <item.icon className="mx-auto w-[1.1rem] h-[1.1rem]" />
              <p className="font-">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppointmentType;
