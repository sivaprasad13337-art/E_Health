"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  // TerminalSquareIcon,
  // BotIcon,
  // BookOpenIcon,
  Settings2Icon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  CalendarDays,
  ClipboardPlus,
  // FileText,
  // LayoutDashboardIcon,
  // LayoutDashboard,
  Layout,
  CreditCard,
  Stethoscope,
} from "lucide-react";
import {
  appointmentHistoy,
  appointmentStatus,
  bookAppointment,
  browse_doctors,
  dashboard,
  diagnosis,
  medicalHistory,
  medicalReport,
  my_doctors,
  paymentAnalytics,
  profile,
  refunds,
  transaction,
} from "@/data/paths";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
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
          url: appointmentStatus,
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
        // {
        //   title: "History",
        //   url: medicalHistory,
        // },
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
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: <BookOpenIcon />,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
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
      url: "#",
      icon: <Settings2Icon />,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: <FrameIcon />,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: <PieChartIcon />,
    },
    {
      name: "Travel",
      url: "#",
      icon: <MapIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
