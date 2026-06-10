import { Check, Component } from "lucide-react";
import { useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
import Service from "./components/Service";
import PersonalDetails from "./components/personal-details";
// import BookAppointmentLayout from "./layout";
import AddOns from "./components/add-ons";
import Appointments from "./components/appointments";
import Payment from "./components/payment";
import Confirmation from "./components/confirmation";
import { Button } from "@/components/ui/button";
import {
  appointment_personal_details,
  appointment_service,
} from "@/data/paths";

const Book = () => {
  const steps = [
    {
      title: "Service",
      path: appointment_service,
      id: 1,
      component: Service,
    },
    {
      title: "Personal Details",
      path: appointment_personal_details,
      id: 2,
      component: PersonalDetails,
    },
    {
      title: "Add-Ons",
      path: appointment_personal_details,
      id: 3,
      component: AddOns,
    },
    {
      title: "Appointment",
      path: appointment_personal_details,
      id: 4,
      component: Appointments,
    },
    {
      title: "Payment",
      path: appointment_personal_details,
      id: 5,
      component: Payment,
    },
    {
      title: "Confirmation",
      path: appointment_personal_details,
      id: 6,
      component: Confirmation,
    },
  ];

  const [active, setActive] = useState(1);
  const [completed, setCompleted] = useState<string[]>([]);
  const currentStep = steps.find((step) => step.id === active);
  const CurrentComponent = currentStep?.component;

  const navigateBack = () => {
    if (true) setCompleted((prev) => prev.slice(0, -1));
    if (active > 1) {
      setActive(active - 1);
    }
  };

  const navigateNext = () => {
    const current = steps.find((step) => step.id === active);

    if (current) {
      setCompleted((prev) => [...prev, current.title]);
    }

    if (active < steps.length) {
      setActive(active + 1);
    }
  };
  return (
    <section className="h-[88vh] px-4">
      <div className="w-full h-full  rounded-3xl overflow-hidden shadow-2xl flex">
        <section className="bg-amber-50 w-[25%] h-full p-10">
          {steps.map((step) => (
            <div className="flex gap-5" key={step.title}>
              <div>
                <div
                  className={
                    completed.includes(step.title) && active !== step.id
                      ? "w-[2.5rem] h-[2.5rem] border-[1px] border-primary rounded-full flex justify-center items-center"
                      : active === step.id
                        ? "w-[2.5rem] h-[2.5rem] border-[1px] border-primary rounded-full flex justify-center items-center bg-primary"
                        : "w-[2.5rem] h-[2.5rem] border-[1px] border-gray-400 rounded-full flex justify-center items-center"
                  }
                >
                  {completed.includes(step.title) && active !== step.id ? (
                    <Check className="w-[1.3rem] text-primary" />
                  ) : active === step.id ? (
                    <p className="text-white font-semibold">{step.id}</p>
                  ) : (
                    <p className="text-gray-400 font-semibold">{step.id}</p>
                  )}
                </div>
                {step.title === "Confirmation" ? (
                  ""
                ) : (
                  <div
                    className={
                      completed.includes(step.title)
                        ? "w-[2px] h-[3rem] bg-primary ml-4.5"
                        : "w-[2px] h-[3rem] bg-gray-400 ml-4.5"
                    }
                  ></div>
                )}
              </div>

              <p
                className={
                  completed.includes(step.title)
                    ? "mt-2 text-gray-900"
                    : active === step.id
                      ? "mt-2 text-gray-700 font-semibold"
                      : "mt-2 text-gray-400"
                }
              >
                {step.title}
              </p>
            </div>
          ))}
        </section>

        <section className="bg-teal-30 w-[75%] h-full p-10 relative">
          <div className="">
            <div>{CurrentComponent ? <CurrentComponent /> : null}</div>
          </div>

          <div className="h-[15%] w-[100%] bg-white absolute bottom-0 left-0 flex justify-end items-center px-10 gap-3">
            {active === 1 ? (
              ""
            ) : (
              <Button
                className="w-[8rem] h-[4rem] text-[1.1rem] text-gray-900 bg-transparent border-[1px] border-gray-500 font-normal cursor-pointer"
                onClick={() => navigateBack()}
              >
                {" "}
                Back{" "}
              </Button>
            )}
            {active === 6 ? (
              <Button className="w-[10rem] h-[4rem] text-[1.1rem] cursor-pointer">
                {" "}
                Confirm{" "}
              </Button>
            ) : (
              <Button
                className="w-[10rem] h-[4rem] text-[1.1rem] cursor-pointer"
                onClick={() => navigateNext()}
              >
                {" "}
                Next{" "}
              </Button>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Book;
