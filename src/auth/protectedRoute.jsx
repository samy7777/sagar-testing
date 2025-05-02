import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookies } from "./auth";
import AdminSidebar from "@/pages/admin/layout/sidebar";
import EmployeeSidebar from "@/pages/employee/layout/sidebar";


const sidebarMap = {
  admin: AdminSidebar,
  employee: EmployeeSidebar,
};

export const ProtectedRoute = ({ userType }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    (async () => {
      const token = await getCookies("access_token");
      const roleFromCookie = await getCookies("user_role");

      if (!token) return navigate("/");
      if (roleFromCookie !== userType) return navigate(-1);
      
      setRole(roleFromCookie);
    })();
  }, []);

  if (!role) return null; // Or return a <Loader /> component

  const SidebarComponent = sidebarMap[role];

  return (
    <SidebarComponent>
      <Outlet />
    </SidebarComponent>
  );
};
