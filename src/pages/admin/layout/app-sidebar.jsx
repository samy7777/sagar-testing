import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ClipboardList,
  Command,
  ContactRound,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  LocateIcon,
  Map,
  PieChart,
  Settings2,
  ShieldX,
  SquareTerminal,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { permission } from "@/constants/permission";
import { getPermissionSuccess } from "@/redux/auth/action";
import { useDispatch } from "react-redux";
import useHasPermission from "@/components/PermissionWrapper";

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
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    // {
    //   title: "Dashbooard",
    //   url: "/admin/dashboard",
    //   icon: LayoutDashboard,
    // },
    {
      title: "Employee",
      url: "#",
      icon: ContactRound,
      items: [
        {
          title: "Employee List",
          url: "/admin/employee",
        },
        {
          title: "Roles & Permissions",
          url: "/admin/roles",
        },
      ],
    },
    {
      title: "User",
      url: "#",
      icon: User,
      items: [
        {
          title: "User List",
          url: "/admin/user",
          permission: "USER_ALL_VIEW"
        },
        {
          title: "User Search",
          url: "/admin/userSearch",
          permission: "USER_ALL_VIEW"
        },
      ],
    },
    {
      title: "Termination",
      url: "#",
      icon: ShieldX,
      items: [
        {
          title: "Termination List",
          url: "/admin/terminate",
          permission: "TERMINATION_ALL_VIEW"
        },
        // {
        //   title: "Termination Add",
        //   url: "/admin/terminate/add",
        //   permission: "TERMINATION_CREATE"
        // },
      ],
    },
    // {
    //   title: "Loan",
    //   url: "#",
    //   icon: ClipboardList,
    //   items: [
    //     {
    //       title: "Loan List",
    //       url: "/admin/loan",
    //       permission: "LOAN_ALL_VIEW"
    //     },
    //     {
    //       title: "Loan Type",
    //       url: "/admin/loanType",
    //       permission: "LOANTYPE_ALL_VIEW"
    //     },
    //   ],
    // },
    {
      title: "State & City",
      url: "#",
      icon: LocateIcon,
      items: [
        {
          title: "State List",
          url: "/admin/state",
          permission: "STATE_ALL_VIEW"
        },
        {
          title: "City List",
          url: "/admin/city",
          permission: "CITY_ALL_VIEW"
        },
        {
          title: "Region List",
          url: "/admin/region",
          permission: "REGION_ALL_VIEW"
        },
      ],
    },
  ],
  projects: [],
};

export function AppSidebar({ ...props }) {
  const dispatch = useDispatch();
  const hasPermission = useHasPermission();
  useEffect(() => {
    dispatch(getPermissionSuccess({permissions: permission}));
  }, []);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <Separator />
        {/* <NavProjects projects={data.projects} /> */}
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
