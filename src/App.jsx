import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/admin/dashboard/dashboard";
import { ProtectedRoute } from "./auth/protectedRoute";
import Employee from "./pages/admin/employee/employee";
import AddEmployee from "./pages/admin/employee/addEmployee";
import Roles from "./pages/admin/employee/roles/roles";
import AddRole from "./pages/admin/employee/roles/addRole";
import Terminate from "./pages/admin/terminate/terminate";
import AddTerminate from "./pages/admin/terminate/addTerminate";
import User from "./pages/admin/user/user";
import AddUser from "./pages/admin/user/addUser";
import UserDetails from "./pages/admin/user/details/userDetails";
import AddLoan from "./pages/admin/loan/add/addLoan";
import AddLoanType from "./pages/admin/loan/type/addLoanType";
import LoanType from "./pages/admin/loan/type/loanType";
import AddState from "./pages/admin/stateAndCity/addState";
import AddCity from "./pages/admin/stateAndCity/addCity";
import States from "./pages/admin/stateAndCity/state";
import Citys from "./pages/admin/stateAndCity/city";
import AddRegion from "./pages/admin/region/addRegion";
import Regions from "./pages/admin/region/region";
import LoanTable from "./pages/admin/loan/loan";
import LoginEmployee from "./pages/LoginEmployee";
import EmployeeDashboard from "./pages/employee/dashboard/dashboard";
import NotFoundPage from "./pages/404/404";
import DefaulterSearch from "./pages/admin/user/defaulter/defaulter";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/employee" element={<LoginEmployee />} />
        <Route element={<ProtectedRoute userType="admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/roles" element={<Roles />} />
          <Route path="/admin/roles/add" element={<AddRole />} />
          <Route path="/admin/employee" element={<Employee />} />
          <Route path="/admin/employee/add" element={<AddEmployee />} />
          <Route path="/admin/terminate" element={<Terminate />} />
          <Route path="/admin/user" element={<User />} />
          <Route path="/admin/userSearch" element={<DefaulterSearch />} />
          {/* <Route path="/admin/user/:id/add" element={<AddDetails />} /> */}
          <Route path="/admin/loanType/add" element={<AddLoanType />} />
          <Route path="/admin/loanType" element={<LoanType />} />
          <Route path="/admin/loan/:userId/add" element={<AddLoan />} />
          <Route path="/admin/loan" element={<LoanTable />} />
          <Route path="/admin/user/:id" element={<UserDetails />} />
          <Route path="/admin/user/add" element={<AddUser />} />
          <Route path="/admin/state/add" element={<AddState />} />
          <Route path="/admin/region/add" element={<AddRegion />} />
          <Route path="/admin/city/add" element={<AddCity />} />
          <Route path="/admin/state" element={<States />} />
          <Route path="/admin/region" element={<Regions />} />
          <Route path="/admin/city" element={<Citys />} />
          <Route path="/admin/terminate/add" element={<AddTerminate />} />
        </Route>
        <Route element={<ProtectedRoute userType="employee" />}>
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/user" element={<User />} />
          <Route path="/employee/user/add" element={<AddUser />} />
          <Route path="/employee/userSearch" element={<DefaulterSearch />} />
          {/* <Route path="/employee/user/:id/add" element={<AddDetails />} /> */}
          <Route path="/employee/user/:id" element={<UserDetails />} />
          <Route path="/employee/roles" element={<Roles />} />
          <Route path="/employee/roles/add" element={<AddRole />} />
          <Route path="/employee/employee" element={<Employee />} />
          <Route path="/employee/employee/add" element={<AddEmployee />} />
          <Route path="/employee/terminate" element={<Terminate />} />
          <Route path="/employee/terminate/add" element={<AddTerminate />} />
          <Route path="/employee/state/add" element={<AddState />} />
          <Route path="/employee/region/add" element={<AddRegion />} />
          <Route path="/employee/city/add" element={<AddCity />} />
          <Route path="/employee/state" element={<States />} />
          <Route path="/employee/region" element={<Regions />} />
          <Route path="/employee/city" element={<Citys />} />
          <Route path="/employee/loanType/add" element={<AddLoanType />} />
          <Route path="/employee/loanType" element={<LoanType />} />
          <Route path="/employee/loan/:userId/add" element={<AddLoan />} />
          <Route path="/employee/loan" element={<LoanTable />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
