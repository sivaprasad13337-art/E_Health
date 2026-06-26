import { CalendarBookedDates } from "@/components/booked-dates";

const CustomCalender = () => {
  const bookedDates = Array.from(
    { length: 5 },
    (_, i) => new Date(new Date().getFullYear(), 5, 12 + i),
  );
  return (
    <section className="w-[27%] my-auto bg-white p-4 rounded-4xl">
      <p className="font-semibold mb-2">Upcomming Appointments</p>
      <CalendarBookedDates bookedDates={bookedDates} />
    </section>
  );
};

export default CustomCalender;
