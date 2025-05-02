import { useEffect, useState, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader/loader";
import FileUpload from "@/components/fileupload/fileUpload";
import FileMultiUpload from "@/components/fileupload/fileMuiltipleUpload";

import usePermissionRoute from "@/components/permissionRoute";
import { getPhotoIdAction } from "@/redux/photoId/action";
import { getStateAction } from "@/redux/state/action";
import { postUserAction } from "@/redux/user/action";

function UserForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  usePermissionRoute("USER_CREATE");

  const { postUser, postUserLoading, postUserError } = useSelector(
    (state) => state.UserSection
  );
  const { getPhotoId } = useSelector((state) => state.PhotoIdSection);
  const { getState } = useSelector((state) => state.StateSection);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getPhotoIdAction());
    dispatch(getStateAction());
  }, []);

  useEffect(() => {
    if (loader && postUser.status === 201) {
      toast.success("User created successfully", { id: "user-toast" });
      setLoader(false);
      navigate("/admin/user");
    }
  }, [postUser]);

  useEffect(() => {
    if (loader && postUserError?.status >= 400) {
      toast.error(postUserError?.data?.error || "Failed to create user", {
        id: "user-toast",
      });
      setLoader(false);
    }
  }, [postUserError]);

  const photoIdTypes = useMemo(() => getPhotoId?.data || [], [getPhotoId]);
  const aadhaarType = photoIdTypes.find((t) => t.name === "AADHAAR");
  const panType = photoIdTypes.find((t) => t.name === "PAN");

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    isDefaulter: "false",
    creditScore: "",
    proofOfIncome: "",
    profession: "",
    address: "",
    country: "",
    stateId: "",
    cityId: "",
    regionId: "",
    photo: {},
    proofOfIncomeImages: [],
    photoIds: [
      {
        photoIdTypeId: aadhaarType?.id || "",
        photoIdNumber: "",
        images: [],
      },
      {
        photoIdTypeId: panType?.id || "",
        photoIdNumber: "",
        images: [],
      },
    ],
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").nullable(),
    phone: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Enter a valid Indian mobile number")
      .required("Phone is required"),
    isDefaulter: Yup.string().required("Defaulter status is required"),
    creditScore: Yup.number()
      .min(0)
      .max(900)
      .required("Credit score is required"),
    proofOfIncome: Yup.string().required("Proof of income is required"),
    profession: Yup.string().required("Profession is required"),
    country: Yup.string().required("Country is required"),
    stateId: Yup.string().required("State is required"),
    cityId: Yup.string().required("City is required"),
    photoIds: Yup.array()
      .of(
        Yup.object().shape({
          photoIdTypeId: Yup.string().required("Photo ID type is required"),
          photoIdNumber: Yup.string()
            .required("Photo ID number is required")
            .test("matches-format", "Invalid ID format", function (value) {
              const { photoIdTypeId } = this.parent;
              const type = photoIdTypes.find((t) => t.id === photoIdTypeId);
              return type?.validation
                ? new RegExp(type.validation).test(value)
                : true;
            })
            .test("min-length", "Too short", function (value) {
              const { photoIdTypeId } = this.parent;
              const type = photoIdTypes.find((t) => t.id === photoIdTypeId);
              return type?.minLength ? value?.length >= type.minLength : true;
            })
            .test("max-length", "Too long", function (value) {
              const { photoIdTypeId } = this.parent;
              const type = photoIdTypes.find((t) => t.id === photoIdTypeId);
              return type?.maxLength ? value?.length <= type.maxLength : true;
            }),
          images: Yup.array().min(1, "At least one image is required"),
        })
      )
      .min(2, "At least two Photo IDs are required"),
  });
  
  const handleSubmit = (values) => {
    dispatch(postUserAction(values));
    setLoader(true);
    toast.loading("Creating user...", { id: "user-toast" });
  };

  return (
    <div className="py-6">
      {postUserLoading && <Loader />}
      <h2 className="text-xl font-bold mb-4">Create User</h2>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section: Basic Info */}
            <FieldWithLabel name="name" label="Name" placeholder="Full Name" />
            <FieldWithLabel name="email" label="Email" placeholder="Email" />
            <FieldWithLabel
              name="phone"
              label="Phone"
              placeholder="Phone Number"
            />

            {/* Section: Defaulter Status */}
            <div>
              <Label>Defaulter</Label>
              <Select
                value={values.isDefaulter}
                onValueChange={(val) => setFieldValue("isDefaulter", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Section: Photo */}
            <div className="md:col-span-2">
              <Label>Profile Photo</Label>
              <FileUpload
                name="photo"
                values={values.photo}
                setFieldValue={setFieldValue}
              />
            </div>

            {/* Section: Photo IDs */}
            <div className="md:col-span-2">
              <Label>Photo IDs</Label>
              <FieldArray name="photoIds">
                {({ push, remove }) => (
                  <div className="space-y-6">
                    {values.photoIds.map((pid, index) => {
                      const currentType = photoIdTypes.find(
                        (type) => type.id === pid.photoIdTypeId
                      );
                      return (
                        <div
                          key={index}
                          className="p-4 border rounded grid grid-cols-2 gap-4"
                        >
                          <div>
                            <Label>Photo ID Type</Label>
                            <Select
                              value={pid.photoIdTypeId}
                              onValueChange={(val) =>
                                setFieldValue(
                                  `photoIds[${index}].photoIdTypeId`,
                                  val
                                )
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select ID Type" />
                              </SelectTrigger>
                              <SelectContent>
                                {photoIdTypes.map((type) => (
                                  <SelectItem key={type.id} value={type.id}>
                                    {type.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Photo ID Number</Label>
                            <Field
                              name={`photoIds[${index}].photoIdNumber`}
                              as={Input}
                              placeholder={
                                currentType?.numberTypeEg
                                  ? `e.g. ${currentType.numberTypeEg}`
                                  : "Enter Photo ID Number"
                              }
                            />
                            <ErrorMessage
                              name={`photoIds[${index}].photoIdNumber`}
                              component="div"
                              className="text-sm text-red-500"
                            />
                          </div>

                          <div className="col-span-2">
                            <FileMultiUpload
                              name={`photoIds[${index}].images`}
                              values={pid.images}
                              setFieldValue={setFieldValue}
                            />
                          </div>

                          {values.photoIds.length > 2 && (
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => remove(index)}
                            >
                              Remove ID
                            </Button>
                          )}
                        </div>
                      );
                    })}
                    <Button
                      type="button"
                      variant="link"
                      onClick={() =>
                        push({
                          photoIdTypeId: "",
                          photoIdNumber: "",
                          images: [],
                        })
                      }
                    >
                      + Add Another Photo ID
                    </Button>
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Section: Income Details */}
            <FieldWithLabel name="proofOfIncome" label="Proof of Income" />
            <FieldWithLabel name="creditScore" label="Credit Score" />
            <FieldWithLabel name="profession" label="Profession" />
            <FieldWithLabel name="address" label="Address" />
            <FieldWithLabel name="country" label="Country" />
{console.log(getState)}
            {/* Section: State/City */}
            <div>
              <Label>State</Label>
              <Select
                value={values.stateId}
                onValueChange={(val) => {
                  setFieldValue("stateId", val);
                  setFieldValue("cityId", "");
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {getState?.data?.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>City</Label>
              <Select
                value={values.cityId}
                onValueChange={(val) => setFieldValue("cityId", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {getState?.data
                    ?.find((s) => s.id === values.stateId)
                    ?.city?.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <Button type="submit" className="w-full">
                Create User
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const FieldWithLabel = ({ name, label, ...rest }) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <Field name={name} as={Input} {...rest} />
    <ErrorMessage
      name={name}
      component="div"
      className="text-sm text-red-500"
    />
  </div>
);

export default UserForm;
