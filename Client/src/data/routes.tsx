import {
  actions,
  appointment,
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

export const routes = [
  { parent: actions, path: dashboard, element: <Dashboard /> },
  { parent: actions, path: profile, element: <Profile /> },
  { parent: appointment, path: bookAppointment, element: <Book /> },
  { parent: appointment, path: appointmentHistoy, element: <History /> },
  {
    parent: appointment,
    path: appointmentStatus,
    element: <AppointmentStatus />,
  },
  { parent: medicalRecords, path: medicalReport, element: <Reports /> },
  { parent: medicalRecords, path: diagnosis, element: <Diagnosis /> },
  { parent: medicalRecords, path: medicalHistory, element: <MedicalHistory /> },
  { parent: payments, path: transaction, element: <Transactions /> },
  { parent: payments, path: refunds, element: <Refunds /> },
  { parent: payments, path: paymentAnalytics, element: <Analytics /> },
];
