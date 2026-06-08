import {
  actions,
  appointment,
  appointment_add_ons,
  appointment_appointment,
  appointment_confirmation,
  appointment_payment,
  appointment_personal_details,
  appointment_service,
  appointmentHistoy,
  appointmentStatus,
  bookAppointment,
  dashboard,
  diagnosis,
  medicalHistory,
  medicalRecords,
  medicalReport,
  paymentAnalytics,
  payments,
  profile,
  refunds,
  transaction,
} from "./paths";
import Dashboard from "@/features/actions/dashboard";
import Book from "@/features/appointment/book";
import History from "@/features/appointment/history";
import MedicalHistory from "@/features/medical/history";
import AppointmentStatus from "@/features/appointment/status";
import Diagnosis from "@/features/medical/diagnosis";
import Reports from "@/features/medical/reports";
import Profile from "@/features/user/profile";
import Transactions from "@/features/payments/transactions";
import Refunds from "@/features/payments/refunds";
import Analytics from "@/features/payments/analytics";
import {
  BanknoteArrowDown,
  ChartArea,
  ChartNoAxesColumnIncreasingIcon,
  ClipboardClock,
  ClipboardPlus,
  CreditCard,
  Dna,
  HistoryIcon,
  LayoutDashboard,
  Library,
  UserRound,
} from "lucide-react";
import Service from "@/features/appointment/book/components/Service";
import PersonalDetails from "@/features/appointment/book/components/personal-details";
import AddOns from "@/features/appointment/book/components/add-ons";
import Appointments from "@/features/appointment/book/components/appointments";
import Payment from "@/features/appointment/book/components/payment";
import Confirmation from "@/features/appointment/book/components/confirmation";

export const routes = [
  {
    parent: actions,
    path: dashboard,
    element: <Dashboard />,
    icon: LayoutDashboard,
    title: "Dashboard",
  },
  {
    parent: actions,
    path: profile,
    element: <Profile />,
    icon: UserRound,
    title: "Profile",
  },
  {
    parent: appointment,
    path: bookAppointment,
    element: <Book />,
    icon: ClipboardClock,
    title: "Book-Appointment",
    subRoutes: [
      {
        path: appointment_service,
        element: <Service />,
        icon: ClipboardClock,
        title: "Service",
      },
      {
        path: appointment_personal_details,
        element: <PersonalDetails />,
        icon: ClipboardClock,
        title: "Personal Details",
      },
      {
        path: appointment_add_ons,
        element: <AddOns />,
        icon: ClipboardClock,
        title: "Addons",
      },
      {
        path: appointment_appointment,
        element: <Appointments />,
        icon: ClipboardClock,
        title: "Appointment",
      },
      {
        path: appointment_payment,
        element: <Payment />,
        icon: ClipboardClock,
        title: "Payment",
      },
      {
        path: appointment_confirmation,
        element: <Confirmation />,
        icon: ClipboardClock,
        title: "Confirmation",
      },
    ],
  },
  {
    parent: appointment,
    path: appointmentHistoy,
    element: <History />,
    icon: HistoryIcon,
    title: "Appointment-History",
  },
  {
    parent: appointment,
    path: appointmentStatus,
    element: <AppointmentStatus />,
    icon: ChartNoAxesColumnIncreasingIcon,
    title: "Appointment-Status",
  },
  {
    parent: medicalRecords,
    path: medicalReport,
    element: <Reports />,
    icon: ClipboardPlus,
    title: "Medical-Reports",
  },
  {
    parent: medicalRecords,
    path: diagnosis,
    element: <Diagnosis />,
    icon: Dna,
    title: "Diagnosis",
  },
  {
    parent: medicalRecords,
    path: medicalHistory,
    element: <MedicalHistory />,
    icon: Library,
    title: "Medical-Records",
  },
  {
    parent: payments,
    path: transaction,
    element: <Transactions />,
    icon: CreditCard,
    title: "Transactions",
  },
  {
    parent: payments,
    path: refunds,
    element: <Refunds />,
    icon: BanknoteArrowDown,
    title: "Refunds",
  },
  {
    parent: payments,
    path: paymentAnalytics,
    element: <Analytics />,
    icon: ChartArea,
    title: "Payment-Analytics",
  },
];
