import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getLoanAction, putCloseLoanAction } from "@/redux/loan/action";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getStateAction } from "@/redux/state/action";
import { getRegionAction } from "@/redux/region/action";
import DownloadLoanDialog from "@/components/downloadLoan";
import FilterLoanDialog from "@/components/filterLoan";
import usePermissionRoute from "@/components/permissionRoute";
import useHasPermission from "@/components/permissionWrapper";

const LoanTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasPermission = useHasPermission()
  const { getLoan, getLoanLoading } = useSelector((state) => state.LoanSection);
  const [page, setPage] = useState(1);
  usePermissionRoute("LOAN_ALL_VIEW")
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    stateId: "",
    cityId: "",
    regionId: "",
    isActive: "",
    isDefaulted: "",
    fromDate: "",
    toDate: "",
  });
  const [confirmClose, setConfirmClose] = useState(null);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  const limit = 10;

  const [hasSearchedOnce, setHasSearchedOnce] = useState(false);

  const debouncedSearch = useMemo(
    () =>
      debounce((term) => {
        if (hasSearchedOnce) {
          dispatch(
            getLoanAction({
              page,
              limit,
              search: term,
              stateId: filters.stateId,
              cityId: filters.cityId,
              regionId: filters.regionId,
              isActive: filters.isActive,
              isDefaulted: filters.isDefaulted,
              fromDate: filters.fromDate,
              toDate: filters.toDate,
            })
          );
        }
      }, 500),
    [page, limit, filters, hasSearchedOnce]
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  useEffect(() => {
    dispatch(getStateAction());
    dispatch(getRegionAction());
  }, []);

  useEffect(() => {
    dispatch(
      getLoanAction({
        page,
        limit,
        search,
        stateId: filters.stateId,
        cityId: filters.cityId,
        regionId: filters.regionId,
        isActive: filters.isActive,
        isDefaulted: filters.isDefaulted,
        fromDate: filters.fromDate,
        toDate: filters.toDate,
      })
    );
  }, [page, filters]);

  const handleCloseLoan = (loan) => {
    dispatch(putCloseLoanAction(loan.id));
    toast.success("Loan Closed");
    setConfirmClose(null);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setHasSearchedOnce(true); // avoid firing on first mount
    debouncedSearch(value);
  };

  const handleEdit = (loan) => navigate(`/admin/loans/edit?id=${loan.id}`);
  const handlePayment = (loan) =>
    navigate(`/admin/loans/payment?id=${loan.id}`);

  const columns = [
    {
      accessorKey: "user.name",
      header: "User",
      cell: ({ row }) => row.original?.user?.name || "—",
    },
    {
      accessorKey: "loanType.label",
      header: "Loan Type",
      cell: ({ row }) => row.original?.loanType?.label || "—",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => `₹${row.original?.amount?.toFixed(2)}`,
    },
    {
      accessorKey: "pendingAmount",
      header: "Pending",
      cell: ({ row }) => `₹${row.original?.pendingAmount?.toFixed(2)}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const loan = row.original;
        if (loan.isClosed)
          return <span className="text-green-600">Closed</span>;
        if (loan.isDefaulted)
          return <span className="text-red-600">Defaulted</span>;
        return <span className="text-blue-600">Active</span>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const loan = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
             {hasPermission("LOAN_EDIT") && <DropdownMenuItem onClick={() => handleEdit(loan)}>
                ✏️ Edit
              </DropdownMenuItem>}
             {hasPermission("LOAN_GET_PAYMENT") && <DropdownMenuItem onClick={() => handlePayment(loan)}>
                💸 Make Payment
              </DropdownMenuItem>}
              {!loan.isClosed && (
               hasPermission("LOAN_CLOSE") && <DropdownMenuItem onClick={() => setConfirmClose(loan)}>
                  ✅ Close
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: getLoan?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((getLoan?.total || 0) / limit),
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 py-2">
        <Input
          placeholder="Search by name or phone..."
          value={search}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowFilterDialog(true)}>
            🧩 Filters
          </Button>
          <FilterLoanDialog
            open={showFilterDialog}
            onOpenChange={setShowFilterDialog}
            onclose={() => setShowFilterDialog(false)}
            filters={filters}
            onFilter={setFilters}
          />
          <Button variant="outline" onClick={() => setShowDownloadDialog(true)}>
            ⬇️ Download Report
          </Button>
        </div>

        <DownloadLoanDialog
          open={showDownloadDialog}
          onOpenChange={setShowDownloadDialog}
          onclose={() => setShowDownloadDialog(false)}
          filters={filters}

        />
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {getLoanLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-4 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {Math.ceil((getLoan?.total || 1) / limit)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPage((prev) =>
              prev < Math.ceil((getLoan?.total || 1) / limit) ? prev + 1 : prev
            )
          }
          disabled={page >= Math.ceil((getLoan?.total || 1) / limit)}
        >
          Next
        </Button>
      </div>

      {/* ❗ Confirmation Dialog */}
      <Dialog open={!!confirmClose} onOpenChange={() => setConfirmClose(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Close</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to close this loan?</p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmClose(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleCloseLoan(confirmClose)}
            >
              Confirm Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoanTable;
