import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  getByIdLoanTypeAction,
  postLoanTypeAction,
  putLoanTypeAction,
} from "@/redux/loanType/action";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePermissionRoute from "@/components/permissionRoute";
import useHasPermission from "@/components/permissionWrapper";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required").uppercase("Must be uppercase"),
  label: Yup.string().required("Required"),
  description: Yup.string(),
  rules: Yup.string(),
});

function AddLoanType() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasPermission = useHasPermission()
  usePermissionRoute("LOANTYPE_CREATE")
  const [searchParams] = useSearchParams();
  const loanTypeId = searchParams.get("id");

  const {
    getByIdLoanType,
    getByIdLoanTypeLoading,
    getByIdLoanTypeError,
    postLoanType,
    postLoanTypeLoading,
    postLoanTypeError,
    putLoanType,
    putLoanTypeLoading,
    putLoanTypeError,
  } = useSelector((state) => state.LoanTypeSection);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (loanTypeId && hasPermission("LOANTYPE_EDIT")) {
      dispatch(getByIdLoanTypeAction(loanTypeId));
    }
    else {
      dispatch(getByIdLoanTypeAction(null));
    }
  }, [dispatch, loanTypeId]);

  useEffect(() => {
    if (loader && (postLoanType?.status === 201 || putLoanType?.status === 200)) {
      toast.success(postLoanType?.data?.message || putLoanType?.data?.message, {
        id: "create-loan-type",
      });
      setLoader(false);
      navigate("/admin/loanType");
    }
  }, [postLoanType, putLoanType]);

  useEffect(() => {
    if (
      loader &&
      (postLoanTypeError.status === 400 || postLoanTypeError.status === 500)
    ) {
      toast.error(postLoanTypeError?.data?.error, { id: "create-loan-type" });
      setLoader(false);
    }
  }, [postLoanTypeError]);

  useEffect(() => {
    if (
      loader &&
      (putLoanTypeError.status === 400 || putLoanTypeError.status === 500)
    ) {
      toast.error(putLoanTypeError?.data?.error, { id: "create-loan-type" });
      setLoader(false);
    }
  }, [putLoanTypeError]);

  const handleSubmit = (values, { resetForm }) => {
    setLoader(true);

    const payload = { ...values };

    if (loanTypeId) {
      toast.loading("Updating...", { id: "create-loan-type" });
      dispatch(putLoanTypeAction({ id: loanTypeId, data: payload }));
    } else {
      toast.loading("Creating...", { id: "create-loan-type" });
      dispatch(postLoanTypeAction(payload));
    }
  };

  const data = getByIdLoanType?.data?.data

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add Loan Type</h2>
      <Formik
        initialValues={{
          name: data?.name || "",
          label: data?.label || "",
          description: data?.description || "",
          rules: data?.rules || "",
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Name (e.g. TWOWHEELER)</label>
              <Field name="name" as={Input} placeholder="TWOWHEELER" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-sm text-red-500"
              />
            </div>
            <div>
              <label className="font-medium">Label</label>
              <Field name="label" as={Input} placeholder="Two-Wheeler Loan" />
              <ErrorMessage
                name="label"
                component="div"
                className="text-sm text-red-500"
              />
            </div>
            <div className="col-span-2">
              <label className="font-medium">Description</label>
              <Field name="description" as={Textarea} placeholder="..." />
            </div>
            {/* <div className="col-span-2">
              <label className="font-medium">Rules (JSON)</label>
              <Field
                name="rules"
                as={Textarea}
                placeholder='{"required": ["field1"], "hints": {"field1": "hint"}}'
              />
              <ErrorMessage
                name="rules"
                component="div"
                className="text-sm text-red-500"
              />
            </div> */}
            <div className="col-span-2">
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default AddLoanType;
