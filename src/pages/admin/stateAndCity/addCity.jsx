import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getByIdCityAction,
  postCityAction,
  putCityAction,
} from "@/redux/city/action";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getStateAction } from "@/redux/state/action";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Loader from "@/components/loader/loader";
import usePermissionRoute from "@/components/permissionRoute";
import useHasPermission from "@/components/permissionWrapper";

const citySchema = Yup.object().shape({
  name: Yup.string()
    .required("City name is required")
    .matches(/^[A-Za-z\s]+$/, "City name must contain only letters and spaces"),
  stateId: Yup.string().required("State is required"),
});

const AddCity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasPermission = useHasPermission()
  usePermissionRoute("CITY_CREATE")
  const [searchParams] = useSearchParams();
  const cityId = searchParams.get("id");
  const stateId = searchParams.get("stateId");

  const {
    postCity,
    postCityLoading,
    postCityError,
    putCity,
    putCityLoading,
    putCityError,
    getByIdCity,
    getByIdCityLoading,
  } = useSelector((state) => state.CitySection);
  const { getState, getStateLoading } = useSelector((state) => state.StateSection);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getStateAction());
    if (cityId && hasPermission("CITY_EDIT")) {
      dispatch(getByIdCityAction(cityId));
    }else if(stateId && !cityId) {
      // dispatch(getByIdCityAction(null));
    }
  }, [dispatch, cityId]);

  const initialValues = {
    name: getByIdCity?.name || "",
    stateId: getByIdCity?.stateId || stateId || "",
  };

  useEffect(() => {
    if (loader && (postCity?.status === 201 || putCity?.status === 200)) {
      toast.success(postCity?.data?.message || putCity?.data?.message, {
        id: "city-save",
      });
      setLoader(false);
      navigate("/admin/city");
    }
  }, [postCity, putCity]);

  useEffect(() => {
    if (loader && postCityError?.status >= 400) {
      toast.error(postCityError?.data?.error || "Failed to add city", {
        id: "city-save",
      });
      setLoader(false);
    }
  }, [postCityError]);

  useEffect(() => {
    if (loader && putCityError?.status >= 400) {
      toast.error(putCityError?.data?.error || "Failed to update city", {
        id: "city-save",
      });
      setLoader(false);
    }
  }, [putCityError]);

  const handleSubmit = (values) => {
    setLoader(true);
    if (cityId) {
      toast.loading("Updating city...", { id: "city-save" });
      dispatch(putCityAction({ id: cityId, data: values }));
    } else {
      toast.loading("Creating city...", { id: "city-save" });
      dispatch(postCityAction(values));
    }
  };


  return (
    <div className="mx-auto py-10 ">
      {(postCityLoading || putCityLoading || getByIdCityLoading || getStateLoading) && <Loader />}
      <h2 className="text-lg font-semibold mb-4">
        {cityId ? "Edit City" : "Add City"}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={citySchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="grid grid-cols-2 gap-6">
            {/* City Name */}
            <div className="space-y-1">
              <Label htmlFor="name">City Name</Label>
              <Field name="name" as={Input} placeholder="e.g., Raipur" />
              <ErrorMessage
                name="name"
                component="span"
                className="text-sm text-red-500"
              />
            </div>

            {/* State Dropdown */}
            <div className="space-y-1">
              <Label htmlFor="stateId">State</Label>
              <Select
                value={values.stateId}
                onValueChange={(val) => setFieldValue("stateId", val)}
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
              <ErrorMessage
                name="stateId"
                component="span"
                className="text-sm text-red-500"
              />
            </div>

            <div className="col-span-2">
              <Button type="submit" className="w-full">
                {cityId ? "Update City" : "Create City"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCity;
