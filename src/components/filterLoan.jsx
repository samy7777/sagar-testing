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
import { useSelector } from "react-redux";
import { Label } from "./ui/label";

const FilterLoanDialog = ({ open, onOpenChange, onFilter, filters }) => {
  const { getState } = useSelector((state) => state.StateSection);
  const { getRegion } = useSelector((state) => state.RegionSection);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Loan</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={{
            fromDate: filters.fromDate || "",
            toDate: filters.toDate || "",
            stateId: filters.stateId || "",
            cityId: filters.cityId || "",
            regionId: filters.regionId || "",
            isActive: filters.isActive || "",
            isDefaulted: filters.isDefaulted || "",
          }}
          validationSchema={Yup.object({
            fromDate: Yup.string().nullable(),
            toDate: Yup.string().nullable(),
          })}
          onSubmit={(values) => {
            onFilter(values);
            onOpenChange(false);
          }}
        >
          {({ values, setFieldValue, resetForm }) => (
            <Form>
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
                    onValueChange={(val) => setFieldValue("isActive", val === "all" ? "" : val)}
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
                    value={values.isDefaulted === "" ? "all" : values.isDefaulted}
                    onValueChange={(val) => setFieldValue("isDefaulted", val === "all" ? "" : val)}
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
                <Button type="button" variant="secondary" onClick={()=>resetForm()}>Reset</Button>
                <Button type="submit">Filter</Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default FilterLoanDialog;
