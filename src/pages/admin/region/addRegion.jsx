import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getByIdRegionAction,
  postRegionAction,
  putRegionAction,
} from "@/redux/region/action";
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

const regionSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z_]+$/, "Must be uppercase and underscore only")
    .required("Region name is required"),
  stateId: Yup.string().required("State is required"),
  cityId: Yup.string().required("City is required"),
});

const AddRegion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  usePermissionRoute("REGION_CREATE")
  const hasPermission = useHasPermission()
  const [searchParams] = useSearchParams();
  const regionId = searchParams.get("id");

  const {
    postRegion,
    postRegionLoading,
    putRegion,
    putRegionLoading,
    getByIdRegion,
    getByIdRegionLoading,
    postRegionError,
    putRegionError,
  } = useSelector((state) => state.RegionSection);
  const { getState, getStateLoading } = useSelector((state) => state.StateSection);
  // const { getCityByState } = useSelector((state) => state.CitySection);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getStateAction());
    if (regionId && hasPermission("REGION_EDIT")) {
      dispatch(getByIdRegionAction(regionId));
    }
  }, [regionId]);

  const initialValues = {
    name: getByIdRegion?.name || "",
    stateId: getByIdRegion?.stateId || "",
    cityId: getByIdRegion?.cityId || "",
  };
  
  useEffect(() => {
    if (loader && (postRegion?.status === 201 || putRegion?.status === 200)) {
      toast.success(postRegion?.data?.message || putRegion?.data?.message, {id: "region-toast"});
      setLoader(false);
      navigate("/admin/region");
    }
  }, [postRegion, putRegion, loader]);

  
  useEffect(() => {
    if (
      loader &&
      (postRegionError.status === 400 || postRegionError.status === 500)
    ) {
      toast.error(postRegionError?.data?.error, { id: "region-toast" });
      setLoader(false);
    }
  }, [postRegionError]);

  
  useEffect(() => {
    if (loader && (putRegionError.status === 400 || putRegionError.status === 500)) {
      toast.error(putRegionError?.data?.error, { id: "region-toast" });
      setLoader(false);
    }
  }, [putRegionError]);


  const handleSubmit = (values) => {
    setLoader(true);
    const payload = {
      name: values.name,
      stateId: values.stateId,
      cityId: values.cityId,
    };

    if (regionId) {
      toast.loading("Updating region...", {id: "region-toast"});
      dispatch(putRegionAction({ id: regionId, data: payload }));
    } else {
      toast.loading("Creating region...", {id: "region-toast"});
      dispatch(postRegionAction(payload));
    }
  };

  return (
    <div className="mx-auto py-10">
      {(postRegionLoading || putRegionLoading || getByIdRegionLoading || getStateLoading) && <Loader />}
      <Formik
        initialValues={initialValues}
        validationSchema={regionSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="grid grid-cols-2 gap-6">
            <div>
              <Label>Region Name</Label>
              <Field name="name" as={Input} placeholder="E.g. NORTH_ZONE" />
              <ErrorMessage
                name="name"
                component="span"
                className="text-sm text-red-500"
              />
            </div>

            <div>
              <Label>State</Label>

              <Select
                value={values.stateId}
                onValueChange={(value) => {
                  setFieldValue("stateId", value)
                  setFieldValue("cityId", ""); // Reset city
               } }
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
                    ?.find((state) => state.id === values.stateId)
                    ?.city?.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <ErrorMessage
                name="cityId"
                component="span"
                className="text-sm text-red-500"
              />
            </div>

            <div className="col-span-2">
              <Button type="submit" className="w-full">
                {regionId ? "Update Region" : "Create Region"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRegion;
