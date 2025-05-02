import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdAction } from "@/redux/user/action";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AiFillFilePdf } from "react-icons/ai";
import usePermissionRoute from "@/components/permissionRoute";
import moment from "moment";
import Loader from "@/components/loader/loader";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getUserById: user, getUserByIdLoading } = useSelector(
    (state) => state.UserSection
  );
  usePermissionRoute("USER_VIEW");
  useEffect(() => {
    if (id) dispatch(getUserByIdAction(id));
  }, [id]);

  if (getUserByIdLoading || !user) return <p>Loading...</p>;

  const {
    name,
    email,
    phone,
    createdBy,
    isDefaulter,
    details,
    loans,
    employee,
  } = user.data;

  return (
    <div className="p-6 gap-6">
      {getUserByIdLoading && <Loader />}
      {/* Sidebar */}
      <div className="grid grid-cols-5 gap-5">
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm w-full flex gap-5 col-span-4 h-full items-center">
          <div>
            <img
              src={details?.photo?.url}
              alt="User"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-lg uppercase">{name}</h2>
            <p className="text-sm text-muted-foreground">{email}</p>
            <div className="mt-2">
              <Badge
                variant={isDefaulter ? "destructive" : "outline"}
                className="text-xs"
              >
                {isDefaulter ? "Defaulter" : "Not a Defaulter"}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/admin/loan/${user.data.id}/add`)}
              className="w-full"
            >
              Add Loan
            </Button>
            <Button
              onClick={() => navigate(`add?edit=true`)}
              className="w-full"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-5 space-y-6">
        {/* Profile Details */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-muted-foreground">{phone}</p>
            </div>

            <div>
              <p className="font-semibold">Profession</p>
              <p className="text-muted-foreground">{details?.profession}</p>
            </div>
            <div>
              <p className="font-semibold">Credit Score</p>
              <p className="text-muted-foreground">{details?.creditScore}</p>
            </div>
            <div>
              <p className="font-semibold">Adress</p>
              <p className="text-muted-foreground">{details?.address}</p>
            </div>
            <div>
              <p className="font-semibold">City</p>
              <p className="text-muted-foreground">{details?.city.name}</p>
            </div>
            <div>
              <p className="font-semibold">State</p>
              <p className="text-muted-foreground">{details?.state.name}</p>
            </div>
            <div>
              <p className="font-semibold">Country</p>
              <p className="text-muted-foreground">{details?.country}</p>
            </div>
            <div>
              <p className="font-semibold">Created By</p>
              <p className="text-muted-foreground">{createdBy}</p>
            </div>
            {createdBy === "EMPLOYEE" && (
              <div>
                <p className="font-semibold">Created By Employee Name</p>
                <Link
                  to={`/admin/employee/${employee.id}`}
                  className="text-muted-foreground"
                >
                  {employee.name}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* KYC & Proof of Income */}
        <div className="grid grid-cols-2 gap-5">
          <Card>
            <CardHeader>
              <CardTitle>KYC Documents</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div>
                <p className="font-semibold mb-2">Photo ID Images / PDFs</p>
                <div className="flex flex-wrap gap-4">
                  {details?.photoIdTypeImages?.map((file, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 border p-2 rounded-md w-32 bg-white shadow-sm"
                    >
                      {file.format === "pdf" ? (
                        <>
                          <AiFillFilePdf className="text-red-500 text-4xl" />
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 text-sm underline"
                          >
                            View PDF
                          </a>
                        </>
                      ) : (
                        <img
                          src={file.url}
                          alt={`KYC ${i + 1}`}
                          className="w-28 h-28 object-cover rounded-md"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-semibold">Photo ID Type</p>
                  <p className="text-muted-foreground">
                    {details?.photoIdType?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Photo ID Number</p>
                  <p className="text-muted-foreground">
                    {details?.photoIdNumber || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Proof of Income</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div>
                <p className="font-semibold mb-2">Proof of Income Files</p>
                <div className="flex flex-wrap gap-4">
                  {details?.proofOfIncomeImages?.map((file, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 border p-2 rounded-md w-32 bg-white shadow-sm"
                    >
                      {file.format === "pdf" ? (
                        <>
                          <AiFillFilePdf className="text-red-500 text-4xl" />
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 text-sm underline"
                          >
                            View PDF
                          </a>
                        </>
                      ) : (
                        <img
                          src={file.url}
                          alt={`Income Proof ${i + 1}`}
                          className="w-28 h-28 object-cover rounded-md"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm">
                <p className="font-semibold">Proof of Income Type</p>
                <p className="text-muted-foreground">
                  {details?.proofOfIncome || "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loan Table */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Loan Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Pending Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tenure</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans?.length ? (
                loans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell>{loan.id}</TableCell>
                    <TableCell>₹{loan.totalPayableAmount}</TableCell>
                    <TableCell>₹{loan.pendingAmount}</TableCell>
                    <TableCell>{loan.loanType.label}</TableCell>
                    <TableCell>
                      <Badge variant={loan.isClosed ? "destructive" : ""}>
                        {loan.isClosed ? "Closed" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        {moment(loan.startDate).format("DD/MMM/YYYY")} -{" "}
                        {moment(loan.endDate).format("DD/MMM/YYYY")}
                        <div className="font-semibold">({loan.tenureMonths} months)</div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    No loans found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
