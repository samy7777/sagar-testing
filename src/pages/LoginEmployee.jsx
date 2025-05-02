import { getCookies, setCookies } from "@/auth/auth";
import useDeviceInfoAndLocation from "@/auth/useDeviceAndLocation";
import Loader from "@/components/loader/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postEmployeeLoginAction } from "@/redux/auth/action";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const LoginEmployee = () => {
  const { postEmployeeLogin, postEmployeeLoginLoading, postEmployeeLoginError } = useSelector(
    (state) => state.Authsection
  );
  const { deviceInfo, location } = useDeviceInfoAndLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loader, setloader] = useState(false);
  useEffect(() => {
    if (loader) {
      handler();
    }
  }, [postEmployeeLogin]);

  const handler = async () => {
    if (postEmployeeLogin.status === 200) {
      toast.success("Logged In", { id: "login-toast" });
      setloader(false);
      const token = await setCookies("access_token", postEmployeeLogin.data.token);
      await setCookies("employee_name", postEmployeeLogin.data.employee.name);
      await setCookies("employee_id", postEmployeeLogin.data.employee.id);
      await setCookies("employee_email", postEmployeeLogin.data.employee.email);
      const userType = await setCookies("user_role", "employee");
      if (token.status === true && userType.status === true) {
        navigate(`/employee/dashboard`);
      }
    } else if (postEmployeeLogin.status > 400) {
      toast.error(postEmployeeLogin.error, { id: "login-toast" });
    } else if (postEmployeeLogin.status === 500) {
      toast.error(postEmployeeLogin.error, { id: "login-toast" });
    }
  };

  useEffect(() => {
    initialLoad();
  }, [navigate]);

  const initialLoad = async () => {
    const token = await getCookies("access_token");
    const userType = await getCookies("user_role");
    if (token && userType && loader === false) {
      navigate(`/${userType}/dashboard`);
    }
  };
  const initialValues = {
    email: "",
    password: "",
    deviceName: deviceInfo.deviceName,
    deviceType: deviceInfo.deviceType,
    latitude: location.latitude,
    longitude: location.longitude,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("required"),
    password: Yup.string().required("required"),
  });

  const onSubmit = (values) => {
    values.email = values.email.toLowerCase();
    const formData = {
      ...values,
      deviceName: deviceInfo.deviceName,
      deviceType: deviceInfo.deviceType,
      latitude: location.latitude,
      longitude: location.longitude,
    };
    dispatch(postEmployeeLoginAction(formData));
    setloader(true);
    toast.loading("Logging In...", { id: "login-toast" });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      {postEmployeeLoginLoading && <Loader />}
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6 mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center gap-5 text-center">
                    <h1 className="text-2xl font-bold">
                      Login to your account
                    </h1>
                    <p className="text-muted-foreground text-sm text-balance">
                      Enter your email below to login to your account
                    </p>
                  </div>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                  >
                    <Form className="grid gap-6">
                      <div className="grid gap-3">
                        {" "}
                        <Label htmlFor="email">Email</Label>
                        <Field
                          name="email"
                          as={Input}
                          type="email"
                          placeholder="you@example.com"
                          required
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <div className="grid gap-3">
                        {" "}
                        <Label htmlFor="password">Password</Label>
                        <Field
                          name="password"
                          as={Input}
                          type="password"
                          placeholder="••••••••"
                          required
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <Button
                        className="w-full"
                        type="submit"
                        disabled={postEmployeeLoginLoading}
                      >
                        {postEmployeeLoginLoading ? "Logging in..." : "Login"}
                      </Button>
                    </Form>
                  </Formik>
                </div>
                <div className="relative hidden bg-muted md:block">
                  <img
                    src="/placeholder.svg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginEmployee;
