import FileUpload from "@/components/fileupload/fileUpload";
import Loader from "@/components/loader/loader";
import usePermissionRoute from "@/components/permissionRoute";
import useHasPermission from "@/components/permissionWrapper";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postTerminateAction } from "@/redux/terminate/action";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  regnNo: Yup.string()
    .matches(
      /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/,
      "Invalid registration number format (e.g., AB12C1234 or AB12CD1234)"
    )
    .required("Registration number is required"),

  chassisNo: Yup.string()
    .min(5, "Chassis number must be at least 5 characters")
    .max(5, "Chassis number must be at least 5 characters")
    .required("Chassis number is required"),

  terminationDt: Yup.date().required("Termination date is required"),

  doc: Yup.object(),
  // .shape({
  //   secure_url: Yup.string().url("Invalid document URL").required("Document upload required"),
  //   public_id: Yup.string().required("Missing document identifier"),
  // })
  // // .required("Document is required"),
});

function AddTerminate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  usePermissionRoute("TERMINATION_CREATE")
  const hasPermission = useHasPermission()
  const { postTerminate, postTerminateLoading, postTerminateError } =
    useSelector((state) => state.TerminateSection);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (loader && postTerminate.status === 200) {
      toast.success(postTerminate?.data?.message, { id: "terminate-toast" });
      setLoader(false);
      navigate("/admin/terminate");
    }
  }, [postTerminate]);

  const onSubmit = (values) => {
    dispatch(postTerminateAction(values));
    setLoader(true);
    toast.loading("Terminating...", { id: "terminate-toast" });
  };

  return (
    <div className=" py-10">
      {postTerminateLoading && <Loader />}
      <Formik
        initialValues={{
          regnNo: "",
          doc: { secure_url: "", public_id: "" },
          chassisNo: "",
          terminationDt: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label htmlFor="regnNo">Register No</Label>
              <Field name="regnNo" as={Input} placeholder="eg: AB12CD1234 / AB12A1234" />
              <ErrorMessage
                name="regnNo"
                component="div"
                className="text-sm text-red-500"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="chassisNo">Chassis No (last 5 digit)</Label>
              <Field name="chassisNo" as={Input} placeholder="eg: 12345" />
              <ErrorMessage
                name="chassisNo"
                component="div"
                className="text-sm text-red-500"
              />
            </div>
            <div className="space-y-1 ">
              <Label htmlFor="name">Document</Label>
              <FileUpload
                setFieldValue={setFieldValue}
                name="doc"
                values={values.doc}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="terminationDt">Termination Date</Label>
              <DatePicker
                name="terminationDt"
                setFieldValue={setFieldValue}
                values={values.terminationDt}
              />
              <ErrorMessage
                name="terminationDt"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-1 sm:col-span-2">
             {hasPermission("TERMINATION_CREATE") && <Button type="submit" className="w-full">
                Terminate
              </Button>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddTerminate;
