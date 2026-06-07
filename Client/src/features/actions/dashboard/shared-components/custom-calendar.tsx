import { CalendarBookedDates } from "@/components/booked-dates";

const CustomCalender = () => {
  return (
    <section className="w-[27%] my-auto bg-white p-4 rounded-4xl">
      <p className="font-semibold mb-2">Upcomming Appointments</p>
      <CalendarBookedDates />
    </section>
  );
};

export default CustomCalender;
