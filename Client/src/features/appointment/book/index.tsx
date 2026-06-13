// import { Check } from "lucide-react";
import { useEffect, useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
import DoctorCard from "./components/doctor-card";
import Stepper from "./components/stepper";
import { bookingSteps } from "@/data/booking-steps";
import { Button } from "@/components/ui/button";
import type {
  AppointmentErrorState,
  AppointmentPayload,
  Step,
} from "../interface/interface";
import { useAuthStore } from "@/zustand/auth";
import { createAppointment } from "@/api/appointment";
import { createOrder } from "@/api/payment-services";

const Book = () => {
  const steps: Step[] = bookingSteps;
  const { user } = useAuthStore();

  const [active, setActive] = useState(1);
  const [completed, setCompleted] = useState<string[]>([]);
  const currentStep = steps.find((step) => step.id === active);
  const CurrentComponent = currentStep?.component;
  const [appointmentId, setAppointmentId] = useState(0);

  const [formData, setFormData] = useState<AppointmentPayload>({
    reason: "",
    services: [],
    appointmentType: "Clinic",
    time: "10:00",
    date: new Date(),
    symptoms: [],
    doctor: 1,
    patient: 1,
  });

  const [orderData, setOrderData] = useState();
  const [loading, setLoading] = useState(false);

  // interface ErrorT {
  //   service: boolean;
  //   time: boolean;
  //   date: boolean;
  //   reason: boolean;
  //   patient: boolean;
  // }
  // interface ErrorType {
  //   error: ErrorT;
  //   setError: (arg: Error) => void;
  // }

  const [error, setError] = useState<AppointmentErrorState>({
    service: false,
    time: false,
    date: false,
    reason: false,
    patient: false,
  });

  const validateStep = () => {
    let proceed = true;

    if (active === 1) {
      if (formData.doctor) {
        console.log("====================================");
        console.log("haghg");
        console.log("====================================");
        setError((prev) => ({ ...prev, service: false }));
      } else {
        setError((prev) => ({ ...prev, service: true }));
        proceed = false;
      }

      return proceed;
    } else if (active === 3) {
      if (formData.time) {
        setError((prev) => ({ ...prev, time: false }));
      } else {
        setError((prev) => ({ ...prev, time: true }));
        proceed = false;
      }

      if (formData.date) {
        setError((prev) => ({ ...prev, date: false }));
      } else {
        setError((prev) => ({ ...prev, date: true }));
        proceed = false;
      }

      return proceed;
    }

    return proceed;
  };

  const navigateBack = () => {
    // if (true) setCompleted((prev) => prev.slice(0, -1));
    setCompleted((prev) => prev.slice(0, -1));
    if (active > 1) {
      setActive(active - 1);
    }
  };

  const navigateNext = () => {
    if (validateStep()) {
      const current = steps.find((step) => step.id === active);

      if (current) {
        setCompleted((prev) => [...prev, current.title]);
      }

      if (active < steps.length) {
        setActive(active + 1);
      }
    }
  };

  const handlebookAppointment = async () => {
    if (active === 4) {
      if (formData.reason) {
        setError((prev) => ({ ...prev, reason: false }));
      } else {
        return setError((prev) => ({ ...prev, reason: true }));
      }
    }
    setLoading(true);
    const data = await createAppointment(formData);
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    setAppointmentId(data.id);

    if (data.id) {
      const res = await createOrder(data.id);
      setLoading(false);

      setOrderData(res);

      navigateNext();
    }
  };

  useEffect(() => {
    console.log("====================================");
    console.log(`FormData:`, formData);
    console.log("====================================");
  }, [formData]);
  return (
    <section className="h-[88vh] px-4">
      <div className="w-full h-full  rounded-3xl overflow-hidden shadow-2xl flex">
        {/* <section className="bg-amber-50 w-[25%] h-full p-10">
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
        </section> */}
        <Stepper steps={steps} active={active} completed={completed} />

        <section className="bg-teal-30 w-[75%] h-full p-10 relative">
          {active === 6 ? (
            ""
          ) : (
            <DoctorCard
              formData={formData}
              setFormData={setFormData}
              error={error}
              setError={setError}
            />
          )}
          <div className="">
            <div>
              {CurrentComponent ? (
                active === 5 ? (
                  <CurrentComponent
                    formData={formData}
                    setFormData={setFormData}
                    error={error}
                    setError={setError}
                    orderData={orderData}
                    setActive={setActive}
                    // appointmentId={appointmentId}
                  />
                ) : (
                  <CurrentComponent
                    formData={formData}
                    setFormData={setFormData}
                    error={error}
                    setError={setError}
                    // appointmentId={appointmentId}
                  />
                )
              ) : null}
            </div>
          </div>

          <div
            className={
              active > 4
                ? "hidden"
                : "h-[15%] w-[100%] bg-white absolute bottom-0 left-0 flex justify-end items-center px-10 gap-3"
            }
          >
            {active > 1 && active < 5 ? (
              <Button
                className="w-[8rem] h-[4rem] text-[1.1rem] text-gray-900 bg-transparent border-[1px] border-gray-500 font-normal cursor-pointer"
                onClick={() => navigateBack()}
                disabled={loading}
              >
                {" "}
                Back{" "}
              </Button>
            ) : (
              ""
            )}
            {active >= 1 && active < 5 ? (
              active === 4 ? (
                <Button
                  className="w-[10rem] h-[4rem] text-[1.1rem] cursor-pointer"
                  onClick={() => handlebookAppointment()}
                  disabled={loading}
                >
                  {" "}
                  Book{" "}
                </Button>
              ) : (
                <Button
                  className="w-[10rem] h-[4rem] text-[1.1rem] cursor-pointer"
                  onClick={() => navigateNext()}
                >
                  {" "}
                  Next{" "}
                </Button>
              )
            ) : (
              ""
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Book;
