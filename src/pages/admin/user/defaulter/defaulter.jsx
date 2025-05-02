import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { getCookies } from "@/auth/auth";
import toast from "react-hot-toast";
import Loader from "@/components/loader/loader";
import { getUserAction } from "@/redux/user/action";

const DefaulterSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getDefaulterUser, getDefaulterUserLoading } = useSelector(
    (state) => state.UserSection
  );
  const [loader, setLoader] = useState(false);
  
  useEffect(() => {
    const checkLoader = async () => {
      const userType = await getCookies("user_role");
      if (getDefaulterUser?.status === 200 && loader && userType) {
        toast.dismiss("defaulter-search");
        setLoader(false);
        if (getDefaulterUser?.data?.data?.length === 1) {
          navigate(`/${userType}/user/${getDefaulterUser.data.data[0].id}`);
        }
      }
    };
    checkLoader();
  }, [getDefaulterUser]);

  return (
    <>
    {getDefaulterUserLoading && <Loader />}
    <div className="p-6 space-y-6 mx-auto">
      <h2 className="text-xl font-bold">Search Users</h2>

      <Formik
        initialValues={{
          photoIdNumber: "",
          name: "",
          email: "",
          phone: "",
        }}
        validationSchema={Yup.object({
          // Optional validation
        })}
        onSubmit={(values) => {
          setLoader(true);
          toast.loading("Searching for defaulter...", {
            id: "defaulter-search"});
            dispatch(getUserAction(values));
          }}
          >
        {({ handleChange, handleSubmit, values }) => (
          <Form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="photoIdNumber">Photo ID Number</Label>
                <Field
                  as={Input}
                  name="photoIdNumber"
                  placeholder="Enter Photo ID Number Eg:AADHAR, PAN etc"
                  />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Field as={Input} name="name" placeholder="Enter Name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Field
                  as={Input}
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Field
                  as={Input}
                  name="phone"
                  placeholder="Enter Phone"
                  />
              </div>
            </div>
            <Button type="submit" disabled={getDefaulterUserLoading}>
              {getDefaulterUserLoading ? "Searching..." : "Search"}
            </Button>
          </Form>
        )}
      </Formik>

      {/* Result */}
      {!getDefaulterUserLoading && (
        <div>
          {getDefaulterUser?.data?.data?.length === 0 ? (
            <div className="text-red-500 font-medium mt-6 text-center">
              🚫 No defaulter found with given details.
            </div>
          ) : getDefaulterUser?.data?.data?.length > 1 ? (
            <Table className="mt-6">
              <TableHeader>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Photo ID</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getDefaulterUser?.data?.data?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.phone || "—"}</TableCell>
                    <TableCell>{user.email || "—"}</TableCell>
                    <TableCell>{user.details?.photoIdNumber || "—"}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/admin/user/${user.id}`)}
                        >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : null}
        </div>
      )}
    </div>
      </>
  );
};

export default DefaulterSearch;
