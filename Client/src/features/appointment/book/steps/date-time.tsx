import { Button } from "@/components/ui/button";
import type { CompsProps } from "../../interface/interface";
import { BookingCalendar } from "../components/booking-calendar";

const timings = [
  // { section: "Morning", availability: { from: 10, to: 12 }, booked: [15, 30] },
  {
    section: "Morhing",
    availability: [
      "10:00",
      "10:15",
      "10:30",
      "10:45",
      "11:00",
      "11:15",
      "11:30",
      "11:45",
      "12:00",
    ],
    booked: ["10:15", "11:15", "11:30", "12:00"],
  },

  {
    section: "Evening",
    availability: [
      "05:00",
      "05:15",
      "05:30",
      "05:45",
      "06:00",
      "06:15",
      "06:30",
      "06:45",
      "07:00",
    ],
    booked: ["05:00", "05:15", "06:30", "12:00"],
  },
];

const DateAndTime = ({ formData, setFormData }: CompsProps) => {
  const bookedDates = Array.from(
    { length: 5 },
    (_, i) => new Date(new Date().getFullYear(), 5, 12 + i),
  );

  console.log("====================================");
  console.log(bookedDates);
  console.log("====================================");
  return (
    <section className="mt-5 h-[21rem] flex gap-4">
      <div className="w-[40%] h-full">
        <BookingCalendar bookedDates={bookedDates} setData={setFormData} />
      </div>

      <section className="w-[60%] h-full rounded-2xl p-4 bg-white shadow-sm">
        {timings.map((item) => (
          <div className="mt-2">
            <p className="font-semibold">{item.section}</p>

            {item.availability.map((time) => (
              <Button
                className={
                  formData.time == time
                    ? "my-2 mr-2 py-2 rounded-sm"
                    : "my-2 mr-2 py-2 rounded-sm bg-teal-50 border-[1px] border-primary text-gray-600 hover:text-white"
                }
                disabled={item.booked.includes(time)}
                onClick={() => setFormData((prev) => ({ ...prev, time: time }))}
              >
                {time}
              </Button>
            ))}
          </div>
        ))}
      </section>
    </section>
  );
};

export default DateAndTime;
