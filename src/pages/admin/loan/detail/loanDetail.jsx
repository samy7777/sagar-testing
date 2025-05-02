import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoanByIdAction } from "@/redux/loan/action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import usePermissionRoute from "@/components/permissionRoute";

const LoanDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  usePermissionRoute("LOAN_VIEW")
  const { loanById, loanByIdLoading } = useSelector((state) => state.LoanSection);

  useEffect(() => {
    if (id) dispatch(getLoanByIdAction(id));
  }, [id]);

  if (loanByIdLoading || !loanById?.data) return <p>Loading...</p>;

  const loan = loanById.data;
  const payments = loan.payments || [];

  return (
    <div className="space-y-6 p-6">
      {/* Loan Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Loan Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Loan ID</p>
            <p>{loan.id}</p>
          </div>
          <div>
            <p className="text-muted-foreground">User</p>
            <p>{loan.user?.name} ({loan.user?.phone})</p>
          </div>
          <div>
            <p className="text-muted-foreground">Loan Type</p>
            <p>{loan.type}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Amount</p>
            <p>₹{loan.amount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Interest Rate</p>
            <p>{loan.interestRate * 100}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Start Date</p>
            <p>{format(new Date(loan.startDate), "dd MMM yyyy")}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Scheduled End</p>
            <p>{format(new Date(loan.endDate), "dd MMM yyyy")}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Actual End</p>
            <p>
              {loan.actualEndDate
                ? format(new Date(loan.actualEndDate), "dd MMM yyyy")
                : "—"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Status</p>
            <Badge variant={loan.isClosed ? "default" : "secondary"}>
              {loan.isClosed ? "Closed" : "Active"}
            </Badge>
          </div>
          <div>
            <p className="text-muted-foreground">Defaulted</p>
            <Badge variant={loan.isDefaulted ? "destructive" : "outline"}>
              {loan.isDefaulted ? "Yes" : "No"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Payment Table */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Payments</CardTitle>
          {/* Optional Add Payment Button */}
          <Button size="sm" variant="outline">
            Add Payment
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paid On</TableHead>
                <TableHead>Payment For</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Penalty</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      {format(new Date(payment.paidOn), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(payment.paymentFor), "MMM yyyy")}
                    </TableCell>
                    <TableCell>₹{payment.amount}</TableCell>
                    <TableCell>
                      {payment.isDelayed ? (
                        <Badge variant="destructive">Delayed</Badge>
                      ) : (
                        <Badge variant="outline">On Time</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {payment.fineAmount ? `₹${payment.fineAmount}` : "—"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No payments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanDetails;
