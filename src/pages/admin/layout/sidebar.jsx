import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router-dom";

function AdminSidebar() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-fit flex-1 px-10 py-5">

      <SidebarTrigger className="-ml-1" />
      <div className="w-full py-5">

      <Outlet />
      </div>
      </div>
    </SidebarProvider>
  );
}

export default AdminSidebar;
