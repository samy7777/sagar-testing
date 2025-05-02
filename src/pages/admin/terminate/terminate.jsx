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
import { MoreHorizontal, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTerminateAction } from "@/redux/terminate/action";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { AiFillFilePdf } from "react-icons/ai";
import Loader from "@/components/loader/loader";
import usePermissionRoute from "@/components/permissionRoute";

function Terminate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  usePermissionRoute("TERMINATION_ALL_VIEW")

  const { getTerminate, getTerminateLoading, getTerminateError } = useSelector(
    (state) => state.TerminateSection
  );

  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const limit = 10;

  const debouncedSearch = React.useMemo(
    () =>
      debounce((term) => {
        dispatch(getTerminateAction({ page, limit, search: term }));
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
    dispatch(getTerminateAction({ page, limit, search }));
  };

  const columns = [
    {
      accessorKey: "regnNo",
      header: "Number",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("regnNo")}</div>
      ),
    },
    {
      accessorKey: "chassisNo",
      header: "Email",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("chassisNo")}</div>
      ),
    },
    {
      accessorKey: "terminationDt",
      header: "Termination Date",
      cell: ({ row }) => (
        <div className="uppercase">
          {moment(row.original.terminationDt).format("DD/MM/YYYY")}
        </div>
      ),
    },
    {
      accessorKey: "docUrl",
      header: "Document",
      cell: ({ row }) => 
        row.original.docFile.format === "pdf" ? (
          <a href={row.original.docFile.url} target="_blank" className="flex gap-1">
            <AiFillFilePdf className="text-red-500" size={20} />
            <span className="underline text-sm  my-auto">View PDF</span>
          </a>
        ) : (
          <img src={row.original.docFile.url} />
        )
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const isBlocked = row.getValue("status");
        return isBlocked === "SUCCESS" ? (
          <Badge variant="destructive">Failed</Badge>
        ) : (
          <Badge variant="">Success</Badge>
        );
      },
    },
  ];

  const table = useReactTable({
    data: getTerminate?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((getTerminate?.total || 0) / limit),
  });

  return (
    <>
    {getTerminateLoading &&  <Loader />}
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
          <Button
            variant=""
            onClick={() => navigate("add")}
            className="ml-auto cursor-pointer "
            >
            Terminate Vehicle
          </Button>
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
          Page {page} of {Math.ceil((getTerminate?.total || 1) / limit)}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPage((prev) =>
              prev < Math.ceil((getTerminate?.total || 1) / limit)
          ? prev + 1
          : prev
        )
      }
      disabled={page >= Math.ceil((getTerminate?.total || 1) / limit)}
      >
          Next
        </Button>
      </div>
    </div>
          </>
  );
}

export default Terminate;
