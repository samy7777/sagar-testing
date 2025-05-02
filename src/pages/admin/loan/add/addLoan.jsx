import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByIdAction } from "@/redux/user/action";
import { getLoanTypeAction } from "@/redux/loanType/action";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/datePicker";
import { postLoanAction } from "@/redux/loan/action";
import toast from "react-hot-toast";
import usePermissionRoute from "@/components/permissionRoute";
import useHasPermission from "@/components/permissionWrapper";

export default function AddLoan() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();
  const hasPermission = useHasPermission()
  usePermissionRoute("LOAN_CREATE");
  const { postLoan, postLoanLoading, postLoanError } = useSelector(
    (state) => state.LoanSection
  );
  const { getLoanType } = useSelector((state) => state.LoanTypeSection);
  const { getUserById } = useSelector((state) => state.UserSection);

  useEffect(() => {
    dispatch(getLoanTypeAction());
  }, [dispatch]);

  useEffect(() => {
    if (userId && hasPermission("USER_VIEW")) dispatch(getUserByIdAction(userId));
  }, [dispatch, userId]);

  const initialValues = {
    userId,
    loanTypeId: "",
    amount: "",
    interestRate: "",
    tenureMonths: "",
    startDate: "",
    twoWheeler: {
      vehicleType: "",
      brand: "",
      model: "",
      registrationNumber: "",
      chassisNumber: "",
      engineNumber: "",
      dealerName: "",
    },
    agriculture: {
      equipment: "",
      usageArea: "",
      isSeasonal: false,
    },
    msme: {
      businessName: "",
      registrationNumber: "",
      businessType: "",
      monthlyRevenue: "",
      gstNumber: "",
    },
  };

  const validationSchema = Yup.object().shape({
    userId: Yup.string().required("User ID is required"),
    loanTypeId: Yup.string().required("Loan type is required"),
    amount: Yup.number().required("Loan amount is required"),
    interestRate: Yup.number().required("Interest rate is required"),
    tenureMonths: Yup.number().required("Tenure in months is required"),
    startDate: Yup.date().required("Start date is required"),
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (postLoan?.status === 200 && loading) {
      setLoading(true);
      toast.success("Loan created successfully", { id: "loan-create" });
      navigate(-1);
    }
  }, [postLoan]);

  useEffect(() => {
    if (postLoanError?.status > 400 && loading) {
      setLoading(false);
      toast.error("Failed to create loan", { id: "loan-create-error" });
    }
  }, [postLoanError]);

  const handleSubmit = (values) => {
    const selectedType = getLoanType?.data?.data?.find(
      (t) => t.id === values.loanTypeId
    );

    const typeName = selectedType?.name;

    const payload = {
      userId: values.userId,
      loanTypeId: values.loanTypeId,
      amount: Number(values.amount),
      interestRate: Number(values.interestRate),
      tenureMonths: Number(values.tenureMonths),
      startDate: values.startDate,
      details:
        typeName === "TWOWHEELER"
          ? values.twoWheeler
          : typeName === "AGRICULTURE"
          ? values.agriculture
          : typeName === "MSME"
          ? values.msme
          : {},
    };
    setLoading(true);
    toast.loading("Creating loan...", { id: "loan-create" });

    dispatch(postLoanAction(payload));
  };

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-4">Add Loan</h2>

      {getUserById?.status === 200 && (
        <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-gray-50">
          <h3 className="text-md font-semibold mb-2 text-gray-800">
            User Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p>
              <strong>Name:</strong> {getUserById?.data?.name}
            </p>
            <p>
              <strong>Phone:</strong> {getUserById.data.phone || "—"}
            </p>
            <p>
              <strong>Email:</strong> {getUserById.data.email || "—"}
            </p>
            <p>
              <strong>{getUserById?.data?.details?.photoIdType?.name}:</strong>{" "}
              {getUserById.data.details?.photoIdNumber || "—"}
            </p>
            <p className="col-span-2">
              <strong>Address:</strong>{" "}
              {getUserById.data.details?.address +
                ", " +
                getUserById.data.details.state.name +
                ", " +
                getUserById.data.details.city.name || "—"}
            </p>
          </div>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => {
          const selectedLoanType = getLoanType?.data?.data?.find(
            (t) => t.id === values.loanTypeId
          );

          // 💰 Monthly calculation
          const principal = Number(values.amount);
          const rateDecimal = Number(values.interestRate) / 100;
          const tenure = Number(values.tenureMonths);

          const totalPayableAmount =
            principal && rateDecimal && tenure
              ? Number(
                  (principal * Math.pow(1 + rateDecimal, tenure / 12)).toFixed(
                    2
                  )
                )
              : 0;

          const monthlyInstallment =
            totalPayableAmount && tenure
              ? Number((totalPayableAmount / tenure).toFixed(2))
              : 0;

          return (
            <Form className="grid grid-cols-2 gap-4">
              <div>
                <Label>Loan Type</Label>
                <Select
                  value={values.loanTypeId}
                  onValueChange={(val) => setFieldValue("loanTypeId", val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Loan Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {getLoanType?.data?.data?.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Amount</Label>
                <Field name="amount" as={Input} />
                <Label className="text-sm text-gray-500 mt-1">
                  {values.amount && values.amount > 0
                    ? new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(values.amount)
                    : ""}
                </Label>
              </div>

              <div>
                <Label>Interest Rate (%)</Label>
                <Field name="interestRate" as={Input} />
              </div>

              <div>
                <Label>Tenure (months)</Label>
                <Field name="tenureMonths" as={Input} />
              </div>

              <div>
                <Label>Start Date</Label>
                <DatePicker
                  name="startDate"
                  minDate={new Date()}
                  placeholderText="Select start date"
                  setFieldValue={setFieldValue}
                  values={values.startDate}
                />
              </div>
              {/* 💸 EMI Preview Section */}
              {values.amount && values.interestRate && values.tenureMonths && (
                <div className="col-span-2 mt-2 rounded border bg-gray-100 p-4">
                  <h4 className="font-semibold text-sm mb-2">
                    EMI Calculation Summary
                  </h4>
                  <div className="text-sm space-y-1">
                    <p>
                      📌 <strong>Principal:</strong>{" "}
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(principal)}
                    </p>
                    <p>
                      📈 <strong>Total Payable:</strong>{" "}
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(totalPayableAmount)}
                    </p>
                    <p>
                      📅 <strong>Monthly EMI:</strong>{" "}
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(monthlyInstallment)}{" "}
                      for {tenure} months
                    </p>
                  </div>
                </div>
              )}
              {/* Conditional fields by type */}
              {selectedLoanType?.name === "TWOWHEELER" && (
                <>
                  <h4 className="font-medium text-base col-span-2 mt-4">
                    Two-Wheeler Loan Details
                  </h4>
                  {[
                    { name: "vehicleType", label: "Vehicle Type" },
                    { name: "brand", label: "Brand" },
                    { name: "model", label: "Model" },
                    {
                      name: "registrationNumber",
                      label: "Registration Number",
                      placeholder: "e.g. MH12AB1234",
                    },
                    {
                      name: "chassisNumber",
                      label: "Chassis Number",
                      placeholder: "eg:1ABCD123456789999",
                    },
                    { name: "engineNumber", label: "Engine Number" },
                    { name: "dealerName", label: "Dealer Name" },
                  ].map(({ name, label, placeholder }) => (
                    <div key={name}>
                      <Label htmlFor={`twoWheeler.${name}`}>{label}</Label>
                      <Field
                        id={`twoWheeler.${name}`}
                        name={`twoWheeler.${name}`}
                        placeholder={placeholder}
                        as={Input}
                      />
                    </div>
                  ))}
                </>
              )}

              {selectedLoanType?.name === "AGRICULTURE" && (
                <>
                  <h4 className="font-medium text-base col-span-2 mt-4">
                    Agriculture Loan Details
                  </h4>
                  <div>
                    <Label>Equipment</Label>
                    <Field name="agriculture.equipment" as={Input} />
                  </div>
                  <div>
                    <Label>Usage Area</Label>
                    <Field name="agriculture.usageArea" as={Input} />
                  </div>
                </>
              )}

              {selectedLoanType?.name === "MSME" && (
                <>
                  <h4 className="font-medium text-base col-span-2 mt-4">
                    MSME Loan Details
                  </h4>
                  {[
                    { name: "businessName", label: "Business Name" },
                    {
                      name: "registrationNumber",
                      label: "Registration Number",
                    },
                    { name: "businessType", label: "Business Type" },
                    { name: "monthlyRevenue", label: "Monthly Revenue" },
                    { name: "gstNumber", label: "GST Number" },
                  ].map(({ name, label }) => (
                    <div key={name}>
                      <Label>{label}</Label>
                      <Field name={`msme.${name}`} as={Input} />
                    </div>
                  ))}
                </>
              )}

              <Button type="submit" className="col-start-1 mt-4">
                Create Loan
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
