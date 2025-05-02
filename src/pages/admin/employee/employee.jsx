import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreHorizontal, ChevronDown, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  blockedEmployeeAction,
  deleteEmployeeAction,
  getEmployeeAction,
} from "@/redux/employee/action";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/loader/loader";
import useHasPermission from "@/components/permissionWrapper";
import usePermissionRoute from "@/components/permissionRoute";

function Employee() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasPermission = useHasPermission();
  usePermissionRoute("EMPLOYEE_ALL_VIEW");
  const {
    getEmployee: employeeData,
    getEmployeeLoading,
    getEmployeeError,
    deleteEmployee,
    deleteEmployeeLoading,
    deleteEmployeeError,
    blockedEmployee,
    blockedEmployeeLoading,
    blockedEmployeeError,
  } = useSelector((state) => state.EmployeeSection);

  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [deleteTarget, setDeleteTarget] = React.useState(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [blockTarget, setBlockTarget] = React.useState(null);
  const [blockLoading, setBlockLoading] = React.useState(false);
  const limit = 10;

  const debouncedSearch = React.useMemo(
    () =>
      debounce((term) => {
        dispatch(getEmployeeAction({ page, limit, search: term }));
      }, 500),
    [dispatch, page, limit]
  );

  React.useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search]);

  React.useEffect(() => {
    if (deleteTarget && deleteLoading && deleteEmployee?.status === 200) {
      toast.success(deleteEmployee.data.message, { id: "employee-delete" });
      setDeleteTarget(null);
      setDeleteLoading(false);
      initialLoad();
    }
  }, [deleteEmployee]);

  React.useEffect(() => {
    if (deleteTarget && deleteLoading && deleteEmployeeError?.status === 200) {
      toast.success(deleteEmployeeError?.data?.error, {
        id: "employee-delete",
      });

      setDeleteLoading(false);
    }
  }, [deleteEmployeeError]);
  React.useEffect(() => {
    if (blockTarget && blockLoading && blockedEmployee?.status === 200) {
      toast.success(blockedEmployee.data.message, { id: "employee-block" });
      setBlockTarget(null);
      setBlockLoading(false);
      initialLoad();
    }
  }, [blockedEmployee]);

  React.useEffect(() => {
    if (blockTarget && blockLoading && blockedEmployeeError?.status === 200) {
      toast.success(blockedEmployeeError?.data?.error, {
        id: "employee-block",
      });

      setBlockLoading(false);
    }
  }, [blockedEmployeeError]);

  // React.useEffect(() => {
  //   initialLoad();
  // }, [dispatch, page]);

  const initialLoad = () => {
    dispatch(getEmployeeAction({ page, limit, search }));
  };

  const handleEdit = (employee) => navigate(`add?id=${employee.id}`);
  const handleDelete = (employee) => {
    dispatch(deleteEmployeeAction(employee));
    setDeleteLoading(true);
    toast.loading("Deleting...", { id: "employee-delete" });
  };
  const handleBlock = (employee) => {
    const updatedStatus = !employee.isBlocked;
    dispatch(blockedEmployeeAction(employee));
    setBlockLoading(true);
    toast.loading(`${updatedStatus ? "Blocking" : "Unblocking"}...`, {
      id: "employee-block",
    });
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="uppercase">{row.original.role?.name || "N/A"}</div>
      ),
    },
    {
      accessorKey: "region",
      header: "Region",
      cell: ({ row }) => (
        <div className="">
          {row.original.region ? (
            <div>
              <div className="font-semibold">{row.original.region.name}</div>
              <div className="flex gap-1">
                <div>{row.original.region.city.name}</div>,
                <div>{row.original.region.state.name}</div>
              </div>
            </div>
          ) : (
            "N/A"
          )}
        </div>
      ),
    },

    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: ({ row }) => (
        <div className="text-xs text-muted-foreground whitespace-pre-line">
          {(row.original.role?.permissions || []).join("\n")}
        </div>
      ),
    },
    {
      accessorKey: "isBlocked",
      header: "Blocked",
      cell: ({ row }) => {
        const isBlocked = row.getValue("isBlocked");
        return isBlocked ? (
          <Badge variant="destructive">Blocked</Badge>
        ) : (
          <Badge variant="">Active</Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const employee = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              {hasPermission("EMPLOYEE_EDIT") && (
                <DropdownMenuItem onClick={() => handleEdit(employee)}>
                  ✏️ Edit
                </DropdownMenuItem>
              )}
              {hasPermission("EMPLOYEE_BLOCK") && (
                <DropdownMenuItem onClick={() => setBlockTarget(employee)}>
                  {employee.isBlocked ? "✅ Unblock" : "🚫 Block"}
                </DropdownMenuItem>
              )}
              {hasPermission("EMPLOYEE_VIEW") && (
                <DropdownMenuItem onClick={() => navigate(employee.id)}>
                  <Eye className="text-gray-400" /> View
                </DropdownMenuItem>
              )}
              {/* <DropdownMenuItem onClick={() => setDeleteTarget(employee)}>
                🗑️ Delete
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: employeeData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((employeeData?.total || 0) / limit),
  });

  return (
    <>
      {(getEmployeeLoading ||
        deleteEmployeeLoading ||
        blockedEmployeeLoading) && <Loader />}
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between gap-2 py-2">
          <Input
            placeholder="Search by name, email, or role..."
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
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
           {hasPermission("EMPLOYEE_CREATE") && <Button
              variant=""
              onClick={() => navigate("add")}
              className="ml-auto cursor-pointer "
            >
              Add Employee
            </Button>}
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
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
            Page {page} of {Math.ceil((employeeData?.total || 1) / limit)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPage((prev) =>
                prev < Math.ceil((employeeData?.total || 1) / limit)
                  ? prev + 1
                  : prev
              )
            }
            disabled={page >= Math.ceil((employeeData?.total || 1) / limit)}
          >
            Next
          </Button>
        </div>

        {/* 🧩 ShadCN Dialog for Block */}
        <Dialog open={!!blockTarget} onOpenChange={() => setBlockTarget(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {blockTarget?.isBlocked ? "Confirm Unblock" : "Confirm Block"}
              </DialogTitle>
            </DialogHeader>
            <p>
              Are you sure you want to{" "}
              {blockTarget?.isBlocked ? "unblock" : "block"} {blockTarget?.name}
              ?
            </p>
            <DialogFooter>
              <Button
                disabled={blockedEmployeeLoading}
                variant="ghost"
                onClick={() => setBlockTarget(null)}
              >
                Cancel
              </Button>
              <Button
                variant={blockTarget?.isBlocked ? "" : "destructive"}
                disabled={blockedEmployeeLoading}
                onClick={() => handleBlock(blockTarget)}
              >
                {blockTarget?.isBlocked ? "Confirm Unblock" : "Confirm Block"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 🧩 ShadCN Dialog for Delete */}
        <Dialog
          open={!!deleteTarget}
          onOpenChange={() => setDeleteTarget(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete {deleteTarget?.name}?</p>
            <DialogFooter>
              <Button
                disabled={deleteEmployeeLoading}
                variant="ghost"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={deleteEmployeeLoading}
                onClick={() => handleDelete(deleteTarget)}
              >
                Confirm Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default Employee;
