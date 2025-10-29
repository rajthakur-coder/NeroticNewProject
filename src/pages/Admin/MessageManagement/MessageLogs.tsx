import React, { useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/ui/Icon";
import DateAndTime from "../../../components/Common/DateAndTime";
import Checkbox from "../../../components/Common/Checkbox";
import AnimatedDropdown from "../../../components/Common/AnimatedDropdown";

interface MessageLog {
  id: string;
  sender: string;
  receiver: string;
  messageType: string;
  status: string;
  remarks: string;
  created: string;
}

// ✅ Static sample data
const messageLogsData: MessageLog[] = [
  {
    id: "1",
    sender: "System",
    receiver: "User_01",
    messageType: "SMS",
    status: "Delivered",
    remarks: "Message sent successfully",
    created: "24 Oct 2025, 10:15 AM",
  },
  {
    id: "2",
    sender: "Admin",
    receiver: "User_02",
    messageType: "Email",
    status: "Failed",
    remarks: "Invalid email address",
    created: "24 Oct 2025, 09:45 AM",
  },
  {
    id: "3",
    sender: "Support",
    receiver: "User_03",
    messageType: "Notification",
    status: "Pending",
    remarks: "Will retry in 10 min",
    created: "23 Oct 2025, 04:22 PM",
  },
];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

const MessageLogs = () => {
  const [allLogs] = useState(messageLogsData);
  const [search, setSearch] = useState("");
  const [filteredLogs, setFilteredLogs] = useState(messageLogsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 🔹 Filter by search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const filtered = allLogs.filter(
      (log) =>
        log.sender.toLowerCase().includes(query) ||
        log.receiver.toLowerCase().includes(query) ||
        log.messageType.toLowerCase().includes(query) ||
        log.status.toLowerCase().includes(query)
    );
    setFilteredLogs(filtered);
    setCurrentPage(1);
  };

  // 🔹 Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);

  // ---------------- JSX ----------------
  return (
    <div className="rounded-lg bg-surface-body text-text-main">
      <div className="shadow-xl bg-surface-card rounded-xl">
          {/* 🔹 Right Section - Search + Filter Date */}
          <div className="p-4 sm:p-6 flex flex-wrap items-center gap-2">
            {/* 🔹 Date Range Inputs side by side */}
            <div className="flex items-center gap-2">
              {/* Dates Section */}
              <div className="flex flex-col w-full gap-3 sm:flex-row md:gap-4 md:w-auto">
                <div className="w-full sm:w-auto">
                  <DateAndTime />
                </div>
                <span className="text-text-subtle ">to</span>
                <div className="w-full sm:w-auto">
                  <DateAndTime label="End Date" />
                </div>
              </div>
            </div>
          </div>

        {/* Table Section */}
        <div className="relative w-full mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-[800px] md:min-w-full w-full divide-gray-200">
              <thead className="bg-surface-hover text-text-subtle">
                <tr>
                  <th className="table-header">#</th>
                  <th className="table-header">Sender</th>
                  <th className="table-header">Receiver</th>
                  <th className="table-header">Type</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Remarks</th>
                  <th className="table-header">Created</th>
                </tr>
              </thead>

              <tbody className="divide-y bg-surface-card divide-border-primary divide-dashed">
                {currentLogs.length > 0 ? (
                  currentLogs.map((log, index) => (
                    <tr
                      key={log.id}
                      className="transition-colors hover:bg-surface-hover"
                    >
                      <td className="table-data">
                        {indexOfFirstRow + index + 1}
                      </td>
                      <td className="table-data">{log.sender}</td>
                      <td className="table-data">{log.receiver}</td>
                      <td className="table-data">{log.messageType}</td>
                      <td
                        className={clsx(
                          "table-data font-medium",
                          log.status === "Delivered" && "text-green-600",
                          log.status === "Failed" && "text-red-600",
                          log.status === "Pending" && "text-yellow-500"
                        )}
                      >
                        {log.status}
                      </td>
                      <td className="table-data text-sm">{log.remarks}</td>
                      <td className="table-data text-sm">{log.created}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-10 text-text-subtle italic"
                    >
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section */}
        <div className="flex flex-col gap-4 px-5 py-6 border-t sm:flex-row sm:items-center sm:justify-end border-border-primary text-xs text-text-subtle">
          <div className="flex flex-wrap items-center justify-between w-full gap-4 sm:justify-end sm:gap-8 sm:w-auto">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-text-main whitespace-nowrap">
                Rows per page:
              </span>

              <AnimatedDropdown
                isOpen={isDropdownOpen}
                setIsOpen={setIsDropdownOpen}
                button={
                  <button className="flex items-center font-medium text-text-main">
                    {rowsPerPage}
                    <Icon
                      name={
                        isDropdownOpen ? "bx:chevron-up" : "bx:chevron-down"
                      }
                      size={16}
                      className="ml-0.5 transition-transform duration-200"
                    />
                  </button>
                }
              >
                {ROWS_PER_PAGE_OPTIONS.map((rows) => (
                  <div
                    key={rows}
                    className={clsx(
                      "px-3 py-1 text-sm cursor-pointer rounded-md transition-colors",
                      rows === rowsPerPage
                        ? "bg-primary text-white font-semibold"
                        : "text-text-main hover:bg-surface-hover"
                    )}
                    onClick={() => {
                      setRowsPerPage(rows);
                      setCurrentPage(1);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {rows}
                  </div>
                ))}
              </AnimatedDropdown>
            </div>

            <span className="font-medium text-text-main whitespace-nowrap">
              {filteredLogs.length > 0 ? indexOfFirstRow + 1 : 0}-
              {Math.min(indexOfLastRow, filteredLogs.length)} of{" "}
              {filteredLogs.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                className="p-1 rounded-full text-text-subtle hover:bg-surface-hover disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <Icon name="bx:chevron-left" size={20} />
              </button>
              <button
                className="p-1 rounded-full text-text-subtle hover:bg-surface-hover disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                <Icon name="bx:chevron-right" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageLogs;