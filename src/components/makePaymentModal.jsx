import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { postLoanPaymentAction } from "@/redux/loan/action";

const MakePaymentModal = ({ open, onClose, loanId, onPaymentSuccess }) => {
 

  const dispatch = useDispatch()


  const schema = Yup.object().shape({
    mode: Yup.string().required("Payment type is required"),
    paymentFor: Yup.string().required("Month is required"),
    amount: Yup.number().required("Amount is required").min(1),
    transactionId: Yup.string().when("mode", {
      is: "ONLINE",
      then: Yup.string().required("Transaction number required"),
    }),
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make Payment</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={{
            loanId: loanId,
            mode: "CASH",
            paymentFor: "",
            amount: 0,
            transactionId: "",
          }}
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            dispatch(postLoanPaymentAction(values))
          }}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <Label>Payment Month</Label>
                <Select value={values.paymentFor} onValueChange={(val) => setFieldValue("paymentFor", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {pendingInfo.pendingMonths?.map((pm) => (
                      <SelectItem key={pm.month} value={pm.month}>
                        {pm.month} — ₹{pm.amount}
                      </SelectItem>
                    ))}
                    <SelectItem value="ADVANCE">Advance Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Amount</Label>
                <Field name="amount" type="number" className="input w-full" />
              </div>

              {pendingInfo?.fineAmount && (
                <p className="text-sm text-red-500">
                  Fine applicable: ₹{pendingInfo.fineAmount.toFixed(2)}
                </p>
              )}

              <div>
                <Label>Payment Type</Label>
                <Select value={values.mode} onValueChange={(val) => setFieldValue("mode", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CASH">Cash</SelectItem>
                    <SelectItem value="ONLINE">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {values.mode === "ONLINE" && (
                <div>
                  <Label>Transaction Number</Label>
                  <Field name="transactionId" type="text" className="input w-full" />
                </div>
              )}

              <DialogFooter className="pt-4">
                <Button type="button" variant="ghost" onClick={() => onClose(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Payment</Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default MakePaymentModal;
