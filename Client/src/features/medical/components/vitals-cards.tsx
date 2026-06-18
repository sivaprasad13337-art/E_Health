import { Card, CardContent } from "@/components/ui/card";
import { Activity, Droplet, Heart, Weight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const VitalsCards = () => {
  return (
    <section className="my-2 flex justify-between">
      <Card className="w-[20%]">
        <CardContent>
          <p className="text-sm text-gray-500 font-semibold">
            <Heart className="inline-block w-[1rem] h-[1rem] text-red-500 -mt-0.5" />{" "}
            Heart Rate
          </p>

          <p className="my-2 text-sm text-gray-500 font-semibold">
            <span className="text-lg font-bold text-gray-700">74</span> bpm
          </p>
          <Progress
            value={66}
            className="w-[100%] bg-gray-200"
            indicatorClass="bg-red-500"
          />
        </CardContent>
      </Card>

      {/* BP */}
      <Card className="w-[20%]">
        <CardContent>
          <p className="text-sm text-gray-500 font-semibold">
            <Activity className="inline-block w-[1rem] h-[1rem] text-sky-500 -mt-0.5" />{" "}
            Blood Pressure
          </p>

          <p className="my-2 text-sm text-gray-500 font-semibold">
            <span className="text-lg font-bold text-gray-700">118/76</span> mmHg
          </p>
          <Progress
            value={66}
            className="w-[100%] bg-gray-200"
            indicatorClass="bg-sky-500"
          />
        </CardContent>
      </Card>

      {/* Blood Sugar */}
      <Card className="w-[20%] h-[]">
        <CardContent>
          <p className="text-sm text-gray-500 font-semibold">
            <Droplet className="inline-block w-[1rem] h-[1rem] text-yellow-500 -mt-0.5" />{" "}
            Blood Glucose
          </p>

          <p className="my-2 text-sm text-gray-500 font-semibold">
            <span className="text-lg font-bold text-gray-700">105</span> mg/dl
          </p>
          <Progress
            value={66}
            className="w-[100%] bg-gray-200"
            indicatorClass="bg-yellow-500"
          />
        </CardContent>
      </Card>

      {/* BMI */}
      <Card className="w-[20%] h-[]">
        <CardContent>
          <p className="text-sm text-gray-500 font-semibold">
            <Weight className="inline-block w-[1rem] h-[1rem] text-primary -mt-0.5" />{" "}
            BMI
          </p>

          <p className="my-2 text-sm text-gray-500 font-semibold">
            <span className="text-lg font-bold text-gray-700">22.4</span> Kg/m
            <sup>2</sup>
          </p>
          <Progress
            value={66}
            className="w-[100%] bg-gray-200"
            indicatorClass="bg-primary"
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default VitalsCards;
