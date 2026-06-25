"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  // GalleryVerticalEndIcon,
  // AudioLinesIcon,
  // TerminalIcon,
  // TerminalSquareIcon,
  // BotIcon,
  // BookOpenIcon,
  Settings2Icon,
  // FrameIcon,
  // PieChartIcon,
  // MapIcon,
  CalendarDays,
  ClipboardPlus,
  // FileText,
  // LayoutDashboardIcon,
  // LayoutDashboard,
  Layout,
  CreditCard,
  Stethoscope,
  Users,
} from "lucide-react";
import {
  appointment,
  appointment_detail,
  appointmentHistoy,
  appointmentStatus,
  bookAppointment,
  browse_doctors,
  dashboard,
  diagnosis,
  doctors_requests,
  medicalHistory,
  medicalReport,
  my_doctors,
  patients,
  paymentAnalytics,
  payments,
  profile,
  refunds,
  // settings,
  transaction,
} from "@/data/paths";
import { useAuthStore } from "@/zustand/auth";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();

  const patient = {
    user: {
      name: user?.username,
      email: user?.email,
      avatar: user?.profile_img,
    },

    navMain: [
      {
        title: "Actions",
        url: "#",
        icon: <Layout />,
        isActive: true,
        items: [
          {
            title: "DashBoard",
            url: dashboard,
          },
          {
            title: "Profile",
            url: profile,
          },
        ],
      },
      {
        title: "Appointment",
        url: "#",
        icon: <CalendarDays />,
        isActive: false,
        items: [
          {
            title: "Book",
            url: bookAppointment,
          },
          {
            title: "Status",
            url: appointment_detail, //appointmentStatus
          },
          {
            title: "History",
            url: appointmentHistoy,
          },
        ],
      },
      {
        title: "Doctors",
        url: "#",
        icon: <Stethoscope />,
        isActive: false,
        items: [
          {
            title: "My Doctors",
            url: my_doctors,
          },
          {
            title: "Search",
            url: browse_doctors,
          },
        ],
      },
      {
        title: "Medical Records",
        url: "#",
        icon: <ClipboardPlus />,
        isActive: false,
        items: [
          {
            title: "Diagnosis",
            url: diagnosis,
          },
          {
            title: "Reports",
            url: medicalReport,
          },
          {
            title: "History",
            url: medicalHistory,
          },
        ],
      },
      {
        title: "Payments",
        url: "#",
        icon: <CreditCard />,
        items: [
          {
            title: "Transactions",
            url: transaction,
          },
          {
            title: "Refunds",
            url: refunds,
          },
          {
            title: "Analytics",
            url: paymentAnalytics,
          },
        ],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: <Settings2Icon />,
        own: true,
      },
    ],
  };

  const doctor = {
    user: {
      name: user?.username,
      email: user?.email,
      avatar: user?.profile_img,
    },

    navMain: [
      {
        title: "Actions",
        url: "#",
        icon: <Layout />,
        isActive: true,
        items: [
          {
            title: "DashBoard",
            url: dashboard,
          },
          {
            title: "Profile",
            url: profile,
          },
        ],
      },
      {
        title: "Appointments",
        url: appointment,
        icon: <CalendarDays />,
        isActive: false,
        own: true,
      },
      {
        title: "Patients",
        url: patients,
        icon: <Users />,
        isActive: false,
        own: true,
      },

      {
        title: "Payments",
        url: payments,
        icon: <CreditCard />,
        own: true,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: <Settings2Icon />,
        own: true,
      },
    ],
  };
  const admin = {
    user: {
      name: user?.username,
      email: user?.email,
      avatar: user?.profile_img,
    },

    navMain: [
      {
        title: "Actions",
        url: "#",
        icon: <Layout />,
        isActive: true,
        items: [
          {
            title: "DashBoard",
            url: dashboard,
          },
          {
            title: "Profile",
            url: profile,
          },
        ],
      },
      {
        title: "Appointments",
        url: appointment,
        icon: <CalendarDays />,
        isActive: false,
        own: true,
      },
      {
        title: "Patients",
        url: patients,
        icon: <Users />,
        isActive: false,
        own: true,
      },
      {
        title: "Doctor",
        url: "#",
        icon: <Stethoscope />,
        isActive: false,
        items: [
          {
            title: "Doctors",
            url: browse_doctors,
          },
          {
            title: "Requests",
            url: doctors_requests,
          },
        ],
      },
      {
        title: "Payments",
        url: payments,
        icon: <CreditCard />,
        own: true,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: <Settings2Icon />,
        own: true,
      },
    ],
  };

  const data =
    user?.role === "PATIENT"
      ? patient
      : user?.role === "DOCTOR"
        ? doctor
        : user?.role === "ADMIN"
          ? admin
          : null;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
