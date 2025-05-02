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
import { deleteRegionAction, getRegionAction } from "@/redux/region/action";
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

function Regions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasPermission = useHasPermission()
  usePermissionRoute("REGION_ALL_VIEW")
  const { getRegion, getRegionLoading, deleteRegion, deleteRegionLoading, deleteRegionError } = useSelector((state) => state.RegionSection);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [deleteTarget, setDeleteTarget] = React.useState(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const limit = 10;

  const debouncedSearch = React.useMemo(
    () =>
      debounce((term) => {
        dispatch(getRegionAction({ page, limit, search: term }));
      }, 500),
    [dispatch, page, limit]
  );
  React.useEffect(() => {
      debouncedSearch(search);
      return () => debouncedSearch.cancel();
    }, [search]);

  
  
    const initialLoad = () => {
      dispatch(getRegionAction({ page, limit, search }));
    };
  

  React.useEffect(() => {
    if (deleteTarget && deleteLoading && deleteRegion?.status === 200) {
      toast.success(deleteRegion.data.message, { id: "region-delete" });
      setDeleteTarget(null);
      setDeleteLoading(false);
      initialLoad();
    }
  }, [deleteRegion]);

  React.useEffect(() => {
    if (deleteTarget && deleteLoading && deleteRegionError?.status > 400) {
      toast.success(deleteRegionError?.data?.error, {
        id: "region-delete",
      });

      setDeleteLoading(false);
    }
  }, [deleteRegionError]);

  const handleEdit = (region) => navigate(`add?id=${region.id}`);
  const handleDelete = (region) => {
    dispatch(deleteRegionAction(region));
    setDeleteLoading(true);
    toast.loading("Deleting...", { id: "region-delete" });
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Region Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      id: "state",
      header: "State",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original?.state?.name || "—"}
        </div>
      ),
    },
    {
      id: "city",
      header: "City",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original?.city?.name || "—"}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const region = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {hasPermission("REGION_EDIT") && <DropdownMenuItem onClick={() => handleEdit(region)}>
                ✏️ Edit
              </DropdownMenuItem>}
             {hasPermission("REGION_DELETE") && <DropdownMenuItem onClick={() => setDeleteTarget(region)}>
                🗑️ Delete
              </DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  
  const table = useReactTable({
    data: getRegion?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((getRegion?.total || 0) / limit),
  });
  return (
    <>
    {(getRegionLoading || deleteRegionLoading ) && <Loader />}
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between gap-2 py-2">
        <Input
          placeholder="Search"
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
         {hasPermission("REGION_CREATE") && <Button
            variant=""
            onClick={() => navigate("add")}
            className="ml-auto cursor-pointer "
          >
            Add Region
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
          Page {page} of {Math.ceil((getRegion?.total || 1) / limit)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPage((prev) =>
              prev < Math.ceil((getRegion?.total || 1) / limit) ? prev + 1 : prev
            )
          }
          disabled={page >= Math.ceil((getRegion?.total || 1) / limit)}
        >
          Next
        </Button>
      </div>

      {/* 🧩 ShadCN Dialog for Delete */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete {deleteTarget?.name}?</p>
          <DialogFooter>
            <Button
              //   disabled={deleteRegionLoading}
              variant="ghost"
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              //   disabled={deleteRegionLoading}
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

export default Regions;
