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
import { NavUser } from "./nav-user";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { getCookies } from "@/auth/auth";
import { getPermissionAction } from "@/redux/auth/action";
import { NavMain } from "@/pages/admin/layout/nav-main";

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
    //   url: "/employee/dashboard",
    //   icon: LayoutDashboard,
    // },
    {
      title: "Employee",
      url: "#",
      icon: ContactRound,
      items: [
        {
          title: "Employee List",
          url: "/employee/employee",
          permission: "EMPLOYEE_ALL_VIEW",
        },
        {
          title: "Roles & Permissions",
          url: "/employee/roles",
          permission: "ROLE_ALL_VIEW",
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
          url: "/employee/user",
          permission: "USER_ALL_VIEW",
        },
        {
          title: "User Search",
          url: "/employee/userSearch",
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
          url: "/employee/terminate",
          permission: "TERMINATION_ALL_VIEW",
        },
        {
          title: "Termination Add",
          url: "/employee/terminate/add",
          permission: "TERMINATION_CREATE",
        },
      ],
    },
    {
      title: "Loan",
      url: "#",
      icon: ClipboardList,
      items: [
        {
          title: "Loan List",
          url: "/employee/loan",
          permission: "LOAN_ALL_VIEW",
        },
        {
          title: "Loan Type",
          url: "/employee/loanType",
          permission: "LOANTYPE_ALL_VIEW",
        },
      ],
    },
    {
      title: "State & City",
      url: "#",
      icon: LocateIcon,
      items: [
        {
          title: "State List",
          url: "/employee/state",
          permission: "STATE_ALL_VIEW",
        },
        {
          title: "City List",
          url: "/employee/city",
          permission: "CITY_ALL_VIEW",
        },
        {
          title: "Region List",
          url: "/employee/region",
          permission: "REGION_ALL_VIEW",
        },
      ],
    },
  ],
  projects: [],
};

export function AppSidebar({ ...props }) {
  const dispatch = useDispatch();
  const { getPermission } = useSelector((state) => state.Authsection);

  React.useEffect(() => {
    initialLoad();
  }, []);
  const initialLoad = async () => {
    const userId = await getCookies("employee_id");
    dispatch(getPermissionAction(userId));
  };

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
        {getPermission && <NavMain items={data.navMain} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
