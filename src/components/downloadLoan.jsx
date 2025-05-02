import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { DatePicker } from "./ui/datePicker";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "./ui/label";
import { FaRegFilePdf } from "react-icons/fa";
import { RiFileExcel2Line } from "react-icons/ri";
import { VscJson } from "react-icons/vsc";
import { getLoanDownloadAction } from "@/redux/loan/action";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { generateLoanPDF } from "./loanPDFDocument";
import Loader from "./loader/loader";

const DownloadLoanDialog = ({ open, onOpenChange, onDownload, filters }) => {
  const dispatch = useDispatch();
  const { getState } = useSelector((state) => state.StateSection);
  const { getRegion } = useSelector((state) => state.RegionSection);
  const { getLoanDownload } = useSelector((state) => state.LoanSection);
  const [loader, setLoader] = useState(false);
  const [format, setFormat] = useState(null);
  const [values, setValues] = useState(filters);


  useEffect(() => {
    if (getLoanDownload?.status === 200 && loader) {
      if (getLoanDownload?.data?.data?.length === 0) {
       return toast.error("No data found for the selected filters", {
          id: "downloadLoan",
        });
      }
      const blobData = getLoanDownload?.data;

      if (!blobData || !format) return;

      if (format === "json") {
        const blob = new Blob([JSON.stringify(blobData, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "loan-report.json";
        link.click();
        URL.revokeObjectURL(url);
      } else if (format === "excel") {
        const blob = new Blob([blobData], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "loan-report.xlsx";
        link.click();
        URL.revokeObjectURL(url);
      } else if (format === "pdf") {
        const stateName = getState?.data?.find((s) => s.id === values.stateId)?.name || "";
        const cityName = getState?.data
          ?.find((s) => s.id === values.stateId)
          ?.city?.find((c) => c.id === values.cityId)?.name || "";
        const regionName = getRegion?.data?.find((r) => r.id === values.regionId)?.name || "";
        
        generateLoanPDF({
          data: getLoanDownload?.data?.data,
          totalAmount: {
            amount: getLoanDownload.totalAmount,
            pendingAmount: getLoanDownload.totalPending,
          },
          filters: values,
          stateName,
          cityName,
          regionName,
        });
      }

      toast.success("Report downloaded successfully", {
        id: "downloadLoan",
      });

      setLoader(false);
    }
  }, [getLoanDownload, loader]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download Report</DialogTitle>
        </DialogHeader>
{loader && <Loader/>}
        <Formik
          initialValues={{
            format: "pdf",
            fromDate: filters.fromDate || "",
            toDate: filters.toDate || "",
            stateId: filters.stateId || "",
            cityId: filters.cityId || "",
            regionId: filters.regionId || "",
            isActive: filters.isActive || "",
            isDefaulted: filters.isDefaulted || "",
          }}
          validationSchema={Yup.object({
            format: Yup.string().required(),
            fromDate: Yup.string().nullable().required(),
            toDate: Yup.string().nullable().required(),
          })}
          onSubmit={(values) => {
            setFormat(values.format);
            const { format, ...filteredValues } = values;
            dispatch(getLoanDownloadAction(filteredValues));
            setValues(filteredValues);

            setLoader(true);
            setValues(values);
            toast.loading("Downloading report...", {
              id: "downloadLoan",
            });
          }}
        >
          {({ values, setFieldValue, resetForm }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Format */}
                <div>
                  <Label>State</Label>
                  {/* State */}
                  <Select
                    value={values.stateId}
                    onValueChange={(val) => {
                      setFieldValue("stateId", val);
                      setFieldValue("cityId", "");
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                      {getState?.data?.map((state) => (
                        <SelectItem key={state.id} value={state.id}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* City */}
                {values.stateId && (
                  <div>
                    <Label>City</Label>
                    <Select
                      value={values.cityId}
                      onValueChange={(val) => setFieldValue("cityId", val)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        {getState?.data
                          ?.find((s) => s.id === values.stateId)
                          ?.city?.map((city) => (
                            <SelectItem key={city.id} value={city.id}>
                              {city.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Region */}
                <div>
                  <Label>Region</Label>
                  <Select
                    value={values.regionId}
                    onValueChange={(val) => setFieldValue("regionId", val)}
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
                </div>

                {/* Status Filters */}
                <div>
                  <Label>Status</Label>
                  <Select
                    value={values.isActive === "" ? "all" : values.isActive}
                    onValueChange={(val) =>
                      setFieldValue("isActive", val === "all" ? "" : val)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Active Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="false">Active</SelectItem>
                      <SelectItem value="true">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Is Defaulter</Label>
                  <Select
                    value={
                      values.isDefaulted === "" ? "all" : values.isDefaulted
                    }
                    onValueChange={(val) =>
                      setFieldValue("isDefaulted", val === "all" ? "" : val)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Default Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="true">Defaulted</SelectItem>
                      <SelectItem value="false">Non-default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>From Date</Label>
                  {/* Date Pickers */}
                  <DatePicker
                    name="fromDate"
                    placeholderText="Select from date"
                    setFieldValue={setFieldValue}
                    values={values.fromDate}
                  />
                </div>
                <div>
                  <Label>To Date</Label>
                  <DatePicker
                    name="toDate"
                    placeholderText="Select to date"
                    setFieldValue={setFieldValue}
                    values={values.toDate}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Download Format</Label>
                  <Select
                    value={values.format}
                    className="col-span-2"
                    onValueChange={(val) => setFieldValue("format", val)}
                  >
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">
                        {" "}
                        <FaRegFilePdf className="text-red-400" />
                        PDF
                      </SelectItem>
                      <SelectItem value="json">
                        {" "}
                        <VscJson className="text-yellow-600" />
                        JSON
                      </SelectItem>
                      <SelectItem value="excel">
                        <RiFileExcel2Line className="text-blue-600" /> Excel
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Buttons */}
              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="button" onClick={() => resetForm()}>
                  Reset
                </Button>
                <Button type="submit">Download</Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadLoanDialog;
