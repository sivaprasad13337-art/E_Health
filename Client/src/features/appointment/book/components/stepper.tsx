import { Check } from "lucide-react";
import type { StepperProps } from "../../interface/interface";

const Stepper = ({ steps, completed, active }: StepperProps) => {
  return (
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
  );
};

export default Stepper;
