import {
  actions,
  appointment,
  // appointment_add_ons,
  // appointment_appointment,
  // appointment_confirmation,
  // appointment_payment,
  // appointment_personal_details,
  // appointment_service,
  appointmentHistoy,
  appointmentStatus,
  availability_settings,
  bookAppointment,
  browse_doctors,
  dashboard,
  detailedMedicalReport,
  diagnosis,
  doctorProfile,
  doctors,
  doctors_requests,
  medicalHistory,
  medicalHistory_form,
  medicalRecords,
  medicalReport,
  my_doctors,
  notifications_settings,
  password_settings,
  patients,
  paymentAnalytics,
  payments,
  practice_info_settings,
  privacy_settings,
  profile,
  refunds,
  set_profile_info,
  settings,
  transaction,
} from "./paths";
import Dashboard from "@/features/actions/dashboard";
import Book from "@/features/appointment/book";
import History from "@/features/appointment/history";
import MedicalHistory from "@/features/medical/pages/history";
import AppointmentStatus from "@/features/appointment/status";
import Diagnosis from "@/features/medical/pages/diagnosis";
import Reports from "@/features/medical/pages/reports";
import MedicalDetailedReport from "@/features/medical/pages/detailed-report";
import Profile from "@/features/actions/profile";
import Transactions from "@/features/payments/transactions";
import Refunds from "@/features/payments/refunds";
import Analytics from "@/features/payments/analytics";
import {
  BanknoteArrowDown,
  Bell,
  ChartArea,
  ChartNoAxesColumnIncreasingIcon,
  ClipboardClock,
  ClipboardPlus,
  Clock,
  CreditCard,
  Dna,
  GitPullRequest,
  HistoryIcon,
  LayoutDashboard,
  Library,
  LockKeyhole,
  SearchIcon,
  Shield,
  Stethoscope,
  User,
  UserRound,
  Users,
} from "lucide-react";
// import Service from "@/features/appointment/book/steps/Service";
// import PersonalDetails from "@/features/appointment/book/steps/personal-details";
// import AddOns from "@/features/appointment/book/steps/appointment-type";
// import Appointments from "@/features/appointment/book/steps/date-time";
// import Payment from "@/features/appointment/book/steps/payment";
// import Confirmation from "@/features/appointment/book/steps/confirmation";
import MyDoctors from "@/features/doctor/my-doctors";
import BrowseDoctors from "@/features/doctor/browse";
import DoctorProfile from "@/features/doctor/prolile";
import Settings from "@/features/settings";
import SetProfile from "@/features/actions/profile/pages/set-profile";
import Password from "@/features/settings/pages/password";
import Notifactions from "@/features/settings/pages/notifactions";
import Privacy from "@/features/settings/pages/privacy";
import PracticeInfo from "@/features/settings/pages/practice-info";
import Availability from "@/features/settings/pages/availability";
import PaymentsDashboard from "@/features/payments/payments-dashboard";
import Patients from "@/features/patient/patients";
import Appointments from "@/features/appointment/pages/appointments";
import DoctorRequests from "@/features/requests/doctor";
import MedicalHistoryForm from "@/features/medical/pages/medical-history-form";

export const routes = [
  {
    parent: actions,
    path: dashboard,
    element: Dashboard,
    icon: LayoutDashboard,
    title: "Dashboard",
  },
  {
    parent: actions,
    path: profile,
    element: Profile,
    icon: UserRound,
    title: "Profile",
  },
  {
    parent: appointment,
    path: bookAppointment,
    element: Book,
    icon: ClipboardClock,
    title: "Book-Appointment",
    // subRoutes: [
    //   {
    //     path: appointment_service,
    //     element: Service,
    //     icon: ClipboardClock,
    //     title: "Service",
    //   },
    //   {
    //     path: appointment_personal_details,
    //     element: PersonalDetails,
    //     icon: ClipboardClock,
    //     title: "Personal Details",
    //   },
    //   {
    //     path: appointment_add_ons,
    //     element: AddOns,
    //     icon: ClipboardClock,
    //     title: "Addons",
    //   },
    //   {
    //     path: appointment_appointment,
    //     element: Appointments,
    //     icon: ClipboardClock,
    //     title: "Appointment",
    //   },
    //   {
    //     path: appointment_payment,
    //     element: Payment,
    //     icon: ClipboardClock,
    //     title: "Payment",
    //   },
    //   {
    //     path: appointment_confirmation,
    //     element: Confirmation,
    //     icon: ClipboardClock,
    //     title: "Confirmation",
    //   },
    // ],
  },
  {
    parent: appointment,
    path: appointment,
    element: Appointments,
    icon: ClipboardClock,
    title: "Appointments",
  },
  {
    parent: appointment,
    path: appointmentHistoy,
    element: History,
    icon: HistoryIcon,
    title: "Appointment-History",
  },
  {
    parent: appointment,
    path: appointmentStatus,
    element: AppointmentStatus,
    icon: ChartNoAxesColumnIncreasingIcon,
    title: "Appointment-Status",
  },
  {
    parent: patients,
    path: patients,
    element: Patients,
    icon: Users,
    title: "Patients",
  },
  {
    parent: doctors,
    path: doctorProfile,
    element: DoctorProfile,
    icon: Stethoscope,
    title: "Doctor",
  },
  {
    parent: doctors,
    path: my_doctors,
    element: MyDoctors,
    icon: Stethoscope,
    title: "My Doctors",
  },
  {
    parent: doctors,
    path: browse_doctors,
    element: BrowseDoctors,
    icon: SearchIcon,
    title: "Browse Doctors",
  },
  {
    parent: doctors,
    path: doctors_requests,
    element: DoctorRequests,
    icon: GitPullRequest,
    title: "Doctor Requests",
  },
  {
    parent: medicalRecords,
    path: medicalReport,
    element: Reports,
    icon: ClipboardPlus,
    title: "Medical-Reports",
  },
  {
    parent: medicalRecords,
    path: detailedMedicalReport,
    element: MedicalDetailedReport,
    icon: ClipboardPlus,
    title: "Medical-Report",
  },
  {
    parent: medicalRecords,
    path: diagnosis,
    element: Diagnosis,
    icon: Dna,
    title: "Diagnosis",
  },
  {
    parent: medicalRecords,
    path: medicalHistory,
    element: MedicalHistory,
    icon: Library,
    title: "Medical-Records",
  },
  {
    parent: medicalRecords,
    path: medicalHistory_form,
    element: MedicalHistoryForm,
    icon: Library,
    title: "Medical-Records-Form",
  },
  {
    parent: payments,
    path: payments,
    element: PaymentsDashboard,
    icon: CreditCard,
    title: "Payments Dashboard",
  },
  {
    parent: payments,
    path: transaction,
    element: Transactions,
    icon: CreditCard,
    title: "Transactions",
  },
  {
    parent: payments,
    path: refunds,
    element: Refunds,
    icon: BanknoteArrowDown,
    title: "Refunds",
  },
  {
    parent: payments,
    path: paymentAnalytics,
    element: Analytics,
    icon: ChartArea,
    title: "Payment-Analytics",
  },
  {
    parent: settings,
    path: settings,
    element: Settings,
    icon: ChartArea,
    title: "Settings",
  },
];

export const settingsRoutes = [
  {
    path: set_profile_info,
    element: SetProfile,
    icon: User,
    title: "Edit Profile",
  },
  {
    path: password_settings,
    element: Password,
    icon: LockKeyhole,
    title: "Password",
  },
  {
    path: notifications_settings,
    element: Notifactions,
    icon: Bell,
    title: "Notifactions",
  },
  {
    path: privacy_settings,
    element: Privacy,
    icon: Shield,
    title: "Privacy",
  },
  {
    path: practice_info_settings,
    element: PracticeInfo,
    icon: Stethoscope,
    title: "Practice Info",
    role: "DOCTOR",
  },
  {
    path: availability_settings,
    element: Availability,
    icon: Clock,
    title: "Availability",
    role: "DOCTOR",
  },
];
