import React, { useEffect, useState, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getRoleAction } from "@/redux/role/action";
import {
  postEmployeeAction,
  putEmployeeAction,
  getByIdEmployeeAction,
} from "@/redux/employee/action";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getRegionAction } from "@/redux/region/action";
import Loader from "@/components/loader/loader";
import usePermissionRoute from "@/components/permissionRoute";
import useHasPermission from "@/components/permissionWrapper";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().when("isEdit", {
    is: false,
    then: (schema) => schema.required("Password is required"),
    otherwise: (schema) => schema,
  }),
  roleId: Yup.string().required("Role is required"),
  regionId: Yup.string().required("Region is required"),
});

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  usePermissionRoute("EMPLOYEE_CREATE");
  const hasPermission = useHasPermission();
  const [searchParams] = useSearchParams();
  const employeeId = searchParams.get("id");

  const { getRole, getRoleLoading } = useSelector((state) => state.RoleSection);
  const {
    postEmployee,
    postEmployeeLoading,
    postEmployeeError,
    putEmployee,
    putEmployeeLoading,
    putEmployeeError,
    getByIdEmployee,
    getByIdEmployeeLoading,
  } = useSelector((state) => state.EmployeeSection);
  const { getRegion, getRegionLoading } = useSelector((state) => state.RegionSection);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getRoleAction());
    dispatch(getRegionAction());
    if (employeeId && hasPermission("EMPLOYEE_EDIT")) {
      dispatch(getByIdEmployeeAction(employeeId));
    }
  }, [dispatch, employeeId]);

  useEffect(() => {
    if (loader && (postEmployee.status === 201 || putEmployee.status === 200)) {
      toast.success(postEmployee?.data?.message || putEmployee?.data?.message, { id: "employee-toast" });
      setLoader(false);
      navigate("/admin/employee");
    }
  }, [postEmployee, putEmployee]);

  useEffect(() => {
    if (loader && (postEmployeeError.status === 400 || postEmployeeError.status === 500)) {
      toast.error(postEmployeeError?.data?.error, { id: "employee-toast" });
      setLoader(false);
    }
  }, [postEmployeeError]);

  useEffect(() => {
    if (loader && (putEmployeeError.status === 400 || putEmployeeError.status === 500)) {
      toast.error(putEmployeeError?.data?.error, { id: "employee-toast" });
      setLoader(false);
    }
  }, [putEmployeeError]);

  const initialValues = useMemo(() => ({
    name: getByIdEmployee?.data?.name || "",
    email: getByIdEmployee?.data?.email || "",
    password: "",
    roleId: getByIdEmployee?.data?.role?.id || "",
    regionId: getByIdEmployee?.data?.region?.id || "",
    isEdit: Boolean(employeeId),
  }), [getByIdEmployee, employeeId]);

  const handleSubmit = (values) => {
    setLoader(true);
    toast.loading("Saving...", { id: "employee-toast" });

    const payload = { ...values };
    delete payload.isEdit;

    if (employeeId) {
      dispatch(putEmployeeAction({ id: employeeId, data: payload }));
    } else {
      dispatch(postEmployeeAction(payload));
    }
  };

  return (
    <div className=" py-10">
      {(postEmployeeLoading || putEmployeeLoading || getByIdEmployeeLoading || getRegionLoading || getRoleLoading ) && <Loader />}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Field
                name="name"
                as={Input}
                disabled={postEmployeeLoading || putEmployeeLoading}
                placeholder="Enter employee name"
              />
              <ErrorMessage name="name" component="p" className="text-sm text-red-500" />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Field
                name="email"
                as={Input}
                disabled={postEmployeeLoading || Boolean(employeeId) || putEmployeeLoading}
                placeholder="Enter email address"
              />
              <ErrorMessage name="email" component="p" className="text-sm text-red-500" />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Field
                name="password"
                as={Input}
                type="text"
                
                placeholder={
                  employeeId ? "Leave blank to keep existing" : "Enter a secure password"
                }
              />
              <ErrorMessage name="password" component="p" className="text-sm text-red-500" />
            </div>

            {/* Role */}
            <div className="space-y-1">
              <Label htmlFor="roleId">Role</Label>
              <Select
                value={values.roleId}
                onValueChange={(val) => setFieldValue("roleId", val)}
                disabled={getRoleLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {getRole?.data?.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.roleId && touched.roleId && (
                <p className="text-sm text-red-500">{errors.roleId}</p>
              )}
            </div>
            <div>
              <Label htmlFor="regionId">Region</Label>
              <Select
                value={values.regionId}
                onValueChange={(val) => setFieldValue("regionId", val)}
                disabled={getRegionLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  {getRegion?.data?.map((region) => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.regionId && touched.regionId && (
                <p className="text-sm text-red-500">{errors.regionId}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="col-span-1 sm:col-span-2">
              <Button
                type="submit"
                className="w-full"
                disabled={postEmployeeLoading || getRoleLoading || putEmployeeLoading || getByIdEmployeeLoading}
              >
                {employeeId ? "Update" : "Add"} Employee
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEmployee;
