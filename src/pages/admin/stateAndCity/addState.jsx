import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getByIdStateAction,
  postStateAction,
  putStateAction,
} from "@/redux/state/action";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "@/components/loader/loader";
import useHasPermission from "@/components/permissionWrapper";
import usePermissionRoute from "@/components/permissionRoute";

// ✅ Schema Validation
const stateSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[A-Za-z\s]+$/,
      "State name must contain only letters and spaces"
    )
    .required("State name is required"),
});

const AddState = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasPermission = useHasPermission()
  usePermissionRoute("STATE_CREATE")
  const [searchParams] = useSearchParams();
  const stateId = searchParams.get("id");

  const {
    postState,
    postStateLoading,
    postStateError,
    putState,
    putStateLoading,
    putStateError,
    getByIdState,
    getByIdStateLoading
  } = useSelector((state) => state.StateSection);

  const [loader, setLoader] = useState(false);

  // Fetch state data if editing
  useEffect(() => {
    if (stateId && hasPermission("STATE_EDIT")) {
      dispatch(getByIdStateAction(stateId));
    }
  }, [dispatch, stateId]);

  const initialValues = {
    name: getByIdState?.name || "",
  };

  // Handle success
  useEffect(() => {
    if (loader && (postState?.status === 201 || putState?.status === 200)) {
      toast.success(
        postState?.data?.message || putState?.data?.message || "Success",
        { id: "state-save" }
      );
      setLoader(false);
      navigate("/admin/state");
    }
  }, [postState, putState]);

  // Handle errors
  useEffect(() => {
    if (loader && postStateError?.status >= 400) {
      toast.error(postStateError?.data?.error || "Failed to add state", {
        id: "state-save",
      });
      setLoader(false);
    }
  }, [postStateError]);

  useEffect(() => {
    if (loader && putStateError?.status >= 400) {
      toast.error(putStateError?.data?.error || "Failed to update state", {
        id: "state-save",
      });
      setLoader(false);
    }
  }, [putStateError]);

  const handleSubmit = (values) => {
    setLoader(true);
    if (stateId) {
      toast.loading("Updating state...", { id: "state-save" });
      dispatch(putStateAction({ id: stateId, data: values }));
    } else {
      toast.loading("Creating state...", { id: "state-save" });
      dispatch(postStateAction(values));
    }
  };

  return (
    <div className="mx-auto py-10 max-w-3xl">
      {(postStateLoading || putStateLoading || getByIdStateLoading) && <Loader/>}
      <h2 className="text-lg font-semibold mb-4">
        {stateId ? "Edit State" : "Add State"}
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={stateSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        <Form className="grid grid-cols-2 gap-6">
          {/* State Name */}
          <div className="space-y-1 col-span-2 md:col-span-1">
            <Label htmlFor="name">State Name</Label>
            <Field
              name="name"
              as={Input}
              placeholder="e.g., Chhattisgarh"
            />
            <ErrorMessage
              name="name"
              component="span"
              className="text-sm text-red-500"
            />
          </div>

          {/* Submit */}
          <div className="col-start-1">
            <Button type="submit" className="w-full">
              {stateId ? "Update State" : "Create State"}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddState;
