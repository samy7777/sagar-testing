import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
import { ChevronDown, MoreHorizontal } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { getLoanTypeAction, deleteLoanTypeAction } from "@/redux/loanType/action";
import usePermissionRoute from "@/components/permissionRoute";
import useHasPermission from "@/components/permissionWrapper";

const LoanTypeTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasPermission = useHasPermission()
  usePermissionRoute("LOANTYPE_ALL_VIEW")

  const { getLoanType, getLoanTypeError, deleteLoanType, deleteLoanTypeError } =
    useSelector((state) => state.LoanTypeSection);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const limit = 10;

  const debouncedSearch = useMemo(
    () =>
      debounce((term) => {
        dispatch(getLoanTypeAction({ page, limit, search: term }));
      }, 500),
    [dispatch, page, limit]
  );

  useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search]);

  useEffect(() => {
    dispatch(getLoanTypeAction({ page, limit, search }));
  }, [dispatch, page]);

  useEffect(() => {
    if (getLoanTypeError?.status > 400) {
      toast.error(getLoanTypeError?.data?.error || "Failed to fetch loan types", {
        id: "fetch-loan-types",
      });
    }
  }, [getLoanTypeError]);

  useEffect(() => {
    if (deleteTarget && deleteLoading && deleteLoanType?.status === 200) {
      toast.success("Loan type deleted successfully", { id: "loan-type-delete" });
      setDeleteTarget(null);
      setDeleteLoading(false);
      dispatch(getLoanTypeAction({ page, limit, search }));
    }
  }, [deleteLoanType]);

  useEffect(() => {
    if (deleteTarget && deleteLoading && deleteLoanTypeError?.status > 400) {
      toast.error(deleteLoanTypeError?.data?.error || "Failed to delete", {
        id: "loan-type-delete",
      });
      setDeleteLoading(false);
    }
  }, [deleteLoanTypeError]);

  const handleDelete = (loanType) => {
    dispatch(deleteLoanTypeAction(loanType));
    setDeleteLoading(true);
    toast.loading("Deleting...", { id: "loan-type-delete" });
  };

  const handleEdit = (loanType) => navigate(`add?id=${loanType.id}`);

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "label",
      header: "Label",
      cell: ({ row }) => row.getValue("label"),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-muted-foreground text-sm">{row.getValue("description") || "—"}</div>
      ),
    },
    // {
    //   accessorKey: "rules",
    //   header: "Rules",
    //   cell: ({ row }) => (
    //     <div className="text-xs whitespace-pre-wrap">
    //       {row.original?.rules ? JSON.stringify(row.original.rules, null, 2) : "—"}
    //     </div>
    //   ),
    // },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const loanType = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            {hasPermission("LOANTYPE_EDIT") &&  <DropdownMenuItem onClick={() => handleEdit(loanType)}>
                ✏️ Edit
              </DropdownMenuItem>}
              {hasPermission("LOANTYPE_DELETE") && <DropdownMenuItem onClick={() => setDeleteTarget(loanType)}>
                🗑️ Delete
              </DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: getLoanType?.data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((getLoanType?.total || 1) / limit),
  });

  return (
    <div className="w-full space-y-4">
      {/* Header and Filters */}
      <div className="flex items-center justify-between gap-2 py-2">
        <Input
          placeholder="Search loan types..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns().filter(col => col.getCanHide()).map(col => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(v) => col.toggleVisibility(!!v)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {hasPermission("LOANTYPE_CREATE") &&  <Button onClick={() => navigate("add")}>Add Loan Type</Button>}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No Loan Types Found
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
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {Math.ceil((getLoanType?.total || 1) / limit)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(prev =>
            prev < Math.ceil((getLoanType?.total || 1) / limit) ? prev + 1 : prev
          )}
          disabled={page >= Math.ceil((getLoanType?.total || 1) / limit)}
        >
          Next
        </Button>
      </div>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete <strong>{deleteTarget?.name}</strong>?</p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleDelete(deleteTarget)}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoanTypeTable;
