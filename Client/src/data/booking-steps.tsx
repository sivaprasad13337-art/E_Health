import {
  appointment_personal_details,
  appointment_service,
} from "@/data/paths";
import AppointmentType from "@/features/appointment/book/steps/appointment-type";
import Confirmation from "@/features/appointment/book/steps/confirmation";
import DateAndTime from "@/features/appointment/book/steps/date-time";
import Payment from "@/features/appointment/book/steps/payment";
import PersonalDetails from "@/features/appointment/book/steps/personal-details";
import Service from "@/features/appointment/book/steps/Service";

export const bookingSteps = [
  {
    title: "Service",
    path: appointment_service,
    id: 1,
    component: Service,
  },
  {
    title: "Appointment Type",
    path: appointment_personal_details,
    id: 2,
    component: AppointmentType,
  },
  {
    title: "Date&Time",
    path: appointment_personal_details,
    id: 3,
    component: DateAndTime,
  },
  {
    title: "Basic Details",
    path: appointment_personal_details,
    id: 4,
    component: PersonalDetails,
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
