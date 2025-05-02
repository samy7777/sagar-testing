import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { deleteRoleAction, getRoleAction } from "@/redux/role/action";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { debounce } from "lodash";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/loader/loader";
import usePermissionRoute from "@/components/permissionRoute";
import useHasPermission from "@/components/permissionWrapper";

function Roles() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  usePermissionRoute("ROLE_ALL_VIEW");
  const hasPermission = useHasPermission();
  const {
    getRole,
    getRoleLoading,
    deleteRole,
    deleteRoleLoading,
    deleteRoleError,
  } = useSelector((state) => state.RoleSection);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [deleteTarget, setDeleteTarget] = React.useState(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const limit = 10;

  const debouncedSearch = React.useMemo(
    () =>
      debounce((term) => {
        dispatch(getRoleAction({ page, limit, search: term }));
      }, 500),
    [dispatch, page, limit]
  );
  React.useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search]);

  // React.useEffect(() => {
  //   initialLoad();
  // }, [dispatch, page]);

  const initialLoad = () => {
    dispatch(getRoleAction({ page, limit, search }));
  };

  React.useEffect(() => {
    if (deleteTarget && deleteLoading && deleteRole?.status === 200) {
      toast.success(deleteRole.data.message, { id: "role-delete" });
      setDeleteTarget(null);
      setDeleteLoading(false);
      initialLoad();
    }
  }, [deleteRole]);

  React.useEffect(() => {
    if (deleteTarget && deleteLoading && deleteRoleError?.status > 400) {
      toast.success(deleteRoleError?.data?.error, {
        id: "role-delete",
      });

      setDeleteLoading(false);
    }
  }, [deleteRoleError]);

  const handleEdit = (role) => navigate(`add?id=${role.id}`);
  const handleDelete = (role) => {
    dispatch(deleteRoleAction(role));
    setDeleteLoading(true);
    toast.loading("Deleting...", { id: "role-delete" });
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
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: ({ row }) => (
        <div className="text-xs text-muted-foreground whitespace-pre-line">
          {(row.original?.permissions || []).join("\n")}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const role = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              {hasPermission("ROLE_EDIT") && (
                <DropdownMenuItem onClick={() => handleEdit(role)}>
                  ✏️ Edit
                </DropdownMenuItem>
              )}

              {hasPermission("ROLE_DELETE") && (
                <DropdownMenuItem onClick={() => setDeleteTarget(role)}>
                  🗑️ Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const table = useReactTable({
    data: getRole?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((getRole?.total || 0) / limit),
  });
  return (
    <>
      {(getRoleLoading || deleteRoleLoading) && <Loader />}
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
            {hasPermission("ROLE_CREATE") && <Button
              variant=""
              onClick={() => navigate("add")}
              className="ml-auto cursor-pointer "
            >
              Add Role
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
            Page {page} of {Math.ceil((getRole?.total || 1) / limit)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPage((prev) =>
                prev < Math.ceil((getRole?.total || 1) / limit)
                  ? prev + 1
                  : prev
              )
            }
            disabled={page >= Math.ceil((getRole?.total || 1) / limit)}
          >
            Next
          </Button>
        </div>

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
                //   disabled={deleteRoleLoading}
                variant="ghost"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                //   disabled={deleteRoleLoading}
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

export default Roles;
