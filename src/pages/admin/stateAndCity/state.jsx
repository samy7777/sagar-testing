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
import { deleteStateAction, getStateAction } from "@/redux/state/action";
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
import useHasPermission from "@/components/permissionWrapper";
import usePermissionRoute from "@/components/permissionRoute";

function States() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasPermission = useHasPermission();
  usePermissionRoute("STATE_ALL_VIEW");
  const {
    getState,
    getStateLoading,
    deleteState,
    deleteStateLoading,
    deleteStateError,
  } = useSelector((state) => state.StateSection);
  const [deleteTarget, setDeleteTarget] = React.useState(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const limit = 10;

  React.useEffect(() => {
    initialLoad();
  }, [dispatch]);

  const initialLoad = () => {
    dispatch(getStateAction());
  };

  React.useEffect(() => {
    if (deleteTarget && deleteLoading && deleteState?.status === 200) {
      toast.success(deleteState.data.message, { id: "state-delete" });
      setDeleteTarget(null);
      setDeleteLoading(false);
      initialLoad();
    }
  }, [deleteState]);

  React.useEffect(() => {
    if (deleteTarget && deleteLoading && deleteStateError?.status > 400) {
      toast.success(deleteStateError?.data?.error, {
        id: "state-delete",
      });

      setDeleteLoading(false);
    }
  }, [deleteStateError]);

  const handleEdit = (state) => navigate(`add?id=${state.id}`);
  const handleAddCity = (state) =>
    navigate(`/admin/city/add?stateId=${state.id}`);
  const handleDelete = (state) => {
    dispatch(deleteStateAction(state));
    setDeleteLoading(true);
    toast.loading("Deleting...", { id: "state-delete" });
  };

  const columns = [
    {
      accessorKey: "name",
      header: "State Name",
      cell: ({ row }) => (
        <div className="font-semibold">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "city",
      header: "Cities",
      cell: ({ row }) => {
        const cities = row.original?.city || [];
        return cities.length ? (
          <ul className="text-sm list-disc pl-5 space-y-1">
            {cities.map((city) => (
              <li key={city.id}>{city.name}</li>
            ))}
          </ul>
        ) : (
          <div className="text-muted-foreground italic">No cities</div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const state = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {hasPermission("STATE_EDIT") && (
                <DropdownMenuItem onClick={() => handleEdit(state)}>
                  ✏️ Edit
                </DropdownMenuItem>
              )}
              {hasPermission("CITY_CREATE") && (
                <DropdownMenuItem onClick={() => handleAddCity(state)}>
                  Add City
                </DropdownMenuItem>
              )}
              {hasPermission("STATE_DELETE") && (
                <DropdownMenuItem onClick={() => setDeleteTarget(state)}>
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
    data: getState?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      {(getStateLoading || deleteStateLoading) && <Loader />}
      <div className="w-full space-y-4">
        <div className="flex items-center justify-end gap-2 py-2">
          {hasPermission("STATE_CREATE") && <Button
            variant=""
            onClick={() => navigate("add")}
            className="ml-auto cursor-pointer "
          >
            Add State
          </Button>}
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
                //   disabled={deleteStateLoading}
                variant="ghost"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                //   disabled={deleteStateLoading}
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

export default States;
