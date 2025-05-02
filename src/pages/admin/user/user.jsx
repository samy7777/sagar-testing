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
import { AiFillFilePdf } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { useSelector, useDispatch } from "react-redux";
import { getUserAction } from "@/redux/user/action";
import { debounce } from "lodash";
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
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useHasPermission from "@/components/PermissionWrapper";
import usePermissionRoute from "@/components/permissionRoute";
import Loader from "@/components/loader/loader";

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasPermission = useHasPermission();

  const { getUser, getUserLoading } = useSelector((state) => state.UserSection);

  const [blockTarget, setBlockTarget] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const limit = 10;

  usePermissionRoute("USER_ALL_VIEW");

  const debouncedSearch = React.useMemo(
    () =>
      debounce((term) => {
        console.log("object");
        dispatch(getUserAction({ page, limit, search: term }));
      }, 500),
    [dispatch, page]
  );

  React.useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search, page]);

  //   React.useEffect(() => {
  //     dispatch(getUserAction({ page, limit, search }));
  //   }, [dispatch, page]);

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
        <div className="font-semibold">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "profilePhoto",
      header: "Photo",
      cell: ({ row }) => {
        const photo = row.original.details?.photo;
        return photo ? (
          <img
            src={photo.url}
            alt="photo"
            className="w-10 h-10 rounded object-cover"
          />
        ) : (
          "—"
        );
      },
    },
    {
      header: "Photo ID",
      cell: ({ row }) => (
        <div>
          {row.original.photoIds?.map((item) => (
            <div className="flex ">
              {item?.photoIdType?.name}
             -
              <span className="font-semibold">
                {item?.photoIdNumber}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      header: "Loan",
      cell: ({ row }) => <div>{row?.original?.loans?.length}</div>,
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              {hasPermission("USER_EDIT") && (
                <DropdownMenuItem
                  onClick={() => navigate(`${user.id}/add?edit=true`)}
                >
                  ✏️ Edit
                </DropdownMenuItem>
              )}
              {hasPermission("USER_BLOCK") && (
                <DropdownMenuItem onClick={() => setBlockTarget(user)}>
                  {user?.isBlocked ? "✅ Unblock" : "🚫 Block"}
                </DropdownMenuItem>
              )}
              {hasPermission("USER_VIEW") && (
                <DropdownMenuItem onClick={() => navigate(user.id)}>
                  <Eye className="text-gray-400" /> View
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: getUser?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((getUser?.total || 1) / limit),
  });

  return (
    <>
      {getUserLoading && <Loader />}
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          {hasPermission("USER_CREATE") && (
            <Button
              variant=""
              onClick={() => navigate("add")}
              className="ml-auto cursor-pointer "
            >
              Create User
            </Button>
          )}
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
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
              <Button variant="ghost" onClick={() => setBlockTarget(null)}>
                Cancel
              </Button>
              <Button
                variant={blockTarget?.isBlocked ? "" : "destructive"}
                onClick={() => handleBlock(blockTarget)}
              >
                {blockTarget?.isBlocked ? "Confirm Unblock" : "Confirm Block"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default User;
