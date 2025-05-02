import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { permission } from "@/constants/permission"; // adjust path if needed
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getByIdRoleAction,
  postRoleAction,
  putRoleAction,
} from "@/redux/role/action";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getByIdEmployeeAction,
  getByIdEmployeeSuccess,
} from "@/redux/employee/action";
import Loader from "@/components/loader/loader";
import usePermissionRoute from "@/components/permissionRoute";
import useHasPermission from "@/components/permissionWrapper";

const roleSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[A-Z_]+$/,
      "Must be uppercase, spaces not allowed please follow the format ABC_CED"
    )
    .required("Role name is required"),
  description: Yup.string(),
  permissions: Yup.array().min(1, "At least one permission must be selected"),
});

const AddRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  usePermissionRoute("ROLE_CREATE");
  const hasPermission = useHasPermission()
  const [searchParams] = useSearchParams();
  const roleId = searchParams.get("id");
  const {
    postRole,
    postRoleLoading,
    postRoleError,
    putRole,
    putRoleLoading,
    putRoleError,
    getByIdRole,
    getByIdRoleLoading,
    getByIdRoleError,
  } = useSelector((state) => state.RoleSection);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (roleId && hasPermission("ROLE_EDIT")) {
      dispatch(getByIdRoleAction(roleId));
    }
  }, [dispatch, roleId]);
  const initialValues = {
    name: getByIdRole?.name || "",
    description: getByIdRole?.description || "",
    permissions: getByIdRole?.permissions || [],
    isEdit: Boolean(roleId),
  };

  useEffect(() => {
    if (loader && (postRole.status === 201 || putRole.status === 200)) {
      toast.success(postRole?.data?.message || putRole?.data?.message, {
        id: "create-role",
      });
      setLoader(false);
      if (roleId) {
      }
      navigate("/admin/roles");
    }
  }, [postRole, putRole]);

  useEffect(() => {
    if (
      loader &&
      (postRoleError.status === 400 || postRoleError.status === 500)
    ) {
      toast.error(postRoleError?.data?.error, { id: "create-role" });
      setLoader(false);
    }
  }, [postRoleError]);

  useEffect(() => {
    if (
      loader &&
      (putRoleError.status === 400 || putRoleError.status === 500)
    ) {
      toast.error(putRoleError?.data?.error, { id: "create-toast" });
      setLoader(false);
    }
  }, [putRoleError]);

  const handleSubmit = (values, { resetForm }) => {
    setLoader(true);

    const payload = { ...values };
    delete payload.isEdit;

    if (roleId) {
      toast.loading("Updating...", { id: "create-role" });
      dispatch(putRoleAction({ id: roleId, data: payload }));
    } else {
      toast.loading("Creating...", { id: "create-role" });
      dispatch(postRoleAction(payload));
    }
  };

  return (
    <div className=" mx-auto py-10">
      {(getByIdRoleLoading || postRoleLoading || putRoleLoading) && <Loader />}
      <Formik
        initialValues={initialValues}
        validationSchema={roleSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6 grid grid-cols-2 gap-6">
            {/* Role Name */}
            <div className="space-y-1">
              <Label htmlFor="name">Role Name</Label>
              <Field
                name="name"
                as={Input}
                placeholder="Enter role name eg: ABC_CED, ABC"
              />
              <ErrorMessage
                name="name"
                component="span"
                className="text-sm text-red-500"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Field
                name="description"
                as={Input}
                placeholder="Optional description"
              />
              <ErrorMessage
                name="description"
                component="span"
                className="text-sm text-red-500"
              />
            </div>

            {/* Permissions */}
            <div className="space-y-2 col-span-2">
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-h-60 overflow-y-auto border p-2 rounded-md">
                {permission.map((perm) => (
                  <label key={perm} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      id={perm}
                      checked={values.permissions.includes(perm)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFieldValue("permissions", [
                            ...values.permissions,
                            perm,
                          ]);
                        } else {
                          setFieldValue(
                            "permissions",
                            values.permissions.filter((p) => p !== perm)
                          );
                        }
                      }}
                    />
                    {perm}
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="permissions"
                component="span"
                className="text-sm text-red-500"
              />
            </div>

            {/* Submit */}
            <div className="col-start-1">
              <Button type="submit" className="w-full">
                Create Role
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRole;
