import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import type { CompsProps } from "../../interface/interface";

const PersonalDetails = ({ error, setError, setFormData }: CompsProps) => {
  const [reason, setReason] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([""]);
  const [symptomToggle, setSymptomToggle] = useState(false);
  const [symptomError, setSymptomError] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, symptoms: symptoms, reason: reason }));
  }, [symptoms, reason]);

  const handleResetSymptoms = () => {
    setSymptomError(false);
    setSymptoms([""]);
  };

  const handleAddSymptoms = () => {
    if (symptoms?.length >= 6) {
      setSymptomError(true);
      return;
    }

    setSymptomError(false);
    setSymptoms((prev) => [...prev, ""]);
  };

  const handleRemoveSymptom = (idx: number) => {
    if (symptoms.length === 1) {
      setSymptoms([""]);
      return;
    }
    setSymptoms((prev) => prev.filter((_, i) => i !== idx));
    setSymptomError(false);
  };
  return (
    <ScrollArea className="w-full h-[21rem] mt-4 bg-whit">
      <div>
        <p className="font-semibold m-2">Reason for Visit</p>
        <Textarea
          placeholder="Write here..."
          className="w-[95%] ml-2"
          value={reason}
          onChange={(e) => {
            setError((prev) => ({ ...prev, reason: false }));
            setReason(e.currentTarget.value);
          }}
        />
        {error.reason ? (
          <small className="mt-0 ml-2 text-destructive">
            Kindly write the reason for visit to move to next step!
          </small>
        ) : (
          ""
        )}
      </div>

      <section className="mt-2 p-2">
        <div className="flex items-center-safe justify-between pr-2">
          <p className="font-semibold">Do You Have any Symptoms?</p>
          <Switch
            id="newsletter"
            onClick={() => setSymptomToggle((prev) => !prev)}
            onCheckedChange={(checked) => {
              setSymptomToggle(checked);

              if (!checked) {
                setSymptoms([""]);
                setSymptomError(false);
              }
            }}
          />
        </div>

        <section className={symptomToggle ? "relative" : "hidden"}>
          <div className="flex flex-wrap h-[9rem] gap-2 mt-2">
            {symptoms?.map((symptom, idx) => (
              <div className="relative w-[48%]" key={idx}>
                <Input
                  id="name"
                  value={symptom}
                  onChange={(e) => {
                    const value = e.currentTarget.value;

                    setSymptoms((prev) => {
                      const updated = [...prev];
                      updated[idx] = value;
                      return updated;
                    });

                    setSymptomError(false);
                  }}
                  autoComplete="off"
                  placeholder={`Symptom ${idx + 1}`}
                  className="bg-sky-00 w-full"
                />

                {symptoms.length > 1 ? (
                  <Button
                    className="absolute top-0 right-0 px-1 !py-0 bg-transparent hover:bg-gray-200 text-gray-500"
                    onClick={() => handleRemoveSymptom(idx)}
                  >
                    <XIcon className="w-[1.1rem] h-[1.1rem]" />
                  </Button>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>

          <div className="mt-2 pr-2 flex justify-between">
            <p
              className={
                symptomError ? "text-[.9rem] text-red-600" : "text-[.94rem]"
              }
            >
              {symptomError
                ? "Only upto 6 Symptoms is the limit.."
                : "You can add upto 6 Symptoms..."}
            </p>

            <div>
              <Button
                className="py-2 px-4 rounded-sm bg-transparent border-[1px] border-primary text-gray-600 hover:bg-gray-200 mr-2"
                onClick={() => handleResetSymptoms()}
              >
                Reset
              </Button>
              <Button
                className="py-2 px-4 rounded-sm"
                onClick={() => handleAddSymptoms()}
              >
                Add
              </Button>
            </div>
          </div>
        </section>
      </section>
    </ScrollArea>
  );
};

export default PersonalDetails;
