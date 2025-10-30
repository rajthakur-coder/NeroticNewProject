import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import DateAndTime from "../../../components/Common/DateAndTime";
import SearchModalWrapper from "../../../components/Modal/SearchModalWrapper";
import type { Country } from "../../../components/ContentModal/SearchContentModal";
import Icon from "../../../components/ui/Icon";
import DeleteModal from "../../../components/Modal/DeleteModal";
import { Button } from "../../../components/Common/Button";
import Checkbox from "../../../components/Common/Checkbox";
import TransactionsModal from "../../../components/Modal/TransactionsModal";

interface Transaction {
  txnId: string;
  user: {
    name: string;
    avatar: string;
    userId: number;
  };
  date: string;
  time: string;
  preBalance: number;
  amount: number;
  postBalance: number;
  paymentMode: string;
  utrOrRemark: string;
  bank: string;
}

export const transactionsData: Transaction[] = [
  {
    txnId: "TXN001",
    user: {
      name: "Jayvion Simon",
      avatar: "https://i.pravatar.cc/40?img=1",
      userId: 1,
    },
    date: "20 Sep 2025",
    time: "11:01 AM",
    preBalance: 5000,
    amount: 1000,
    postBalance: 6000,
    paymentMode: "Bank Transfer",
    utrOrRemark: "UTR9845123",
    bank: "HDFC Bank - 1234",
  },
  {
    txnId: "TXN002",
    user: {
      name: "Lucian Obrien",
      avatar: "https://i.pravatar.cc/40?img=2",
      userId: 2,
    },
    date: "19 Sep 2025",
    time: "10:15 AM",
    preBalance: 4500,
    amount: -500,
    postBalance: 4000,
    paymentMode: "UPI",
    utrOrRemark: "remark: monthly charge",
    bank: "SBI - 4321",
  },
  {
    txnId: "TXN003",
    user: {
      name: "Soren Durham",
      avatar: "https://i.pravatar.cc/40?img=3",
      userId: 3,
    },
    date: "18 Sep 2025",
    time: "03:25 PM",
    preBalance: 12000,
    amount: 2000,
    postBalance: 14000,
    paymentMode: "Cash Deposit",
    utrOrRemark: "Deposit via branch",
    bank: "ICICI Bank - 8765",
  },
  {
    txnId: "TXN004",
    user: {
      name: "Cortez Herring",
      avatar: "https://i.pravatar.cc/40?img=4",
      userId: 4,
    },
    date: "17 Sep 2025",
    time: "01:10 PM",
    preBalance: 8500,
    amount: 500,
    postBalance: 9000,
    paymentMode: "NEFT/RTGS",
    utrOrRemark: "UTR8475239",
    bank: "Axis Bank - 9988",
  },
  {
    txnId: "TXN005",
    user: {
      name: "Brycen Jimenez",
      avatar: "https://i.pravatar.cc/40?img=5",
      userId: 5,
    },
    date: "16 Sep 2025",
    time: "09:45 AM",
    preBalance: 10000,
    amount: -1200,
    postBalance: 8800,
    paymentMode: "Debit Card",
    utrOrRemark: "Payment to vendor",
    bank: "Kotak Bank - 5544",
  },
];


const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

const WalletTransfer = () => {
  // Combine both arrays once into state
  const [allOrders, setAllOrders] = useState([...transactionsData]);
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [statusState, setStatusState] = useState({
    loading: false,
    id: null,
  });
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const selectAllHeaderRef = useRef<HTMLInputElement>(null);
  const selectAllOverlayRef = useRef<HTMLInputElement>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<any>(null);
    const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isSearchContentModalOpen, setIsSearchContentModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
      
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setSearch(country.name);
    setIsSearchContentModalOpen(false);
    };

  // ✅ Open modal for Add
  const handleAdd = () => {
    setSelectedId(null); // no category selected
    setIsAddModalOpen(true);
  };

  // ✅ Open modal for Edit
  const handleEdit = (category: any) => {
    setSelectedId(category);
    setIsAddModalOpen(true);
    };
    
      // ✅ Toggle modal close/open
      const toggleAddModal = () => setIsAddModalOpen((prev) => !prev);
    
      const filteredOrders = allOrders.filter((order) => {
        const matchesTab = selectedTab === "All" || order.status === selectedTab;
        const matchesSearch = order.user.name
          .toLowerCase()
          .includes(search.toLowerCase());
        return matchesTab && matchesSearch;
      });
    
      const indexOfLastRow = currentPage * rowsPerPage;
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      const currentOrders = filteredOrders.slice(indexOfFirstRow, indexOfLastRow);
      const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
    
      const allSelected =
        currentOrders.length > 0 && selectedOrders.length === currentOrders.length;
      const partiallySelected =
        selectedOrders.length > 0 && selectedOrders.length < currentOrders.length;
    
      useEffect(() => {
        const indeterminate = selectedOrders.length > 0 && !allSelected;
    
        if (selectAllHeaderRef.current) {
          selectAllHeaderRef.current.indeterminate = indeterminate;
          selectAllHeaderRef.current.checked = allSelected;
        }
    
        if (selectAllOverlayRef.current) {
          selectAllOverlayRef.current.indeterminate = indeterminate;
          selectAllOverlayRef.current.checked = allSelected;
        }
      }, [selectedOrders, currentOrders, allSelected]);
    
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
          ) {
            setIsDropdownOpen(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);
    
      const closeDeleteModal = () => setIsDeleteModalOpen(false);
      const openDeleteModal = () => setIsDeleteModalOpen(true);
    
      const handleRowsPerPageChange = (newRows: number) => {
        setRowsPerPage(newRows);
        setCurrentPage(1);
        setIsDropdownOpen(false);
      };
    
      const toggleSelect = (id: string) => {
        setSelectedOrders((prev) =>
          prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
      };
    
      const toggleSelectAll = () => {
        if (
          selectedOrders.length === currentOrders.length &&
          currentOrders.length > 0
        ) {
          setSelectedOrders([]);
        } else {
          // Select all visible orders on the current page
          setSelectedOrders(currentOrders.map((o) => o.id));
        }
      };
    
      const deleteSelectedOrders = () => {
        openDeleteModal();
      };
    
    
    const getHeaderIcon = (allSelected: boolean, partiallySelected: boolean) => {
    if (allSelected) {
      return <Icon name="ri-check-fill" size={12} className="text-white" />;
    }
    if (partiallySelected) {
      return <Icon name="ri-subtract-fill" size={10} className="text-white" />;
    }
    return null; // The default unchecked state has no icon
  };
  


  return (
    <div className="rounded-lg bg-surface-body text-text-main">
      <div className="shadow-xl bg-surface-card rounded-xl">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 mt-1 md:flex-row md:items-center md:gap-4">
            {/* Dates Section */}
            <div className="flex flex-col w-full gap-3 sm:flex-row md:gap-4 md:w-auto">
              <div className="w-full sm:w-auto">
                <DateAndTime />
              </div>
              <div className="w-full sm:w-auto">
                <DateAndTime label="End Date" />
              </div>
            </div>
            <div className="flex items-center w-full gap-2 md:flex-1">
              {/* Dropdown / Filter Input */}
              <div className="relative flex-1">
                <Icon
                  name="ri-search-line"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle"
                />
                <input
                  readOnly
                  value={selectedCountry ? `${selectedCountry.name}` : search}
                  placeholder="Select User"
                  onClick={() => setIsSearchContentModalOpen(true)}
                  className="w-full px-3 py-3.5 pl-10 text-sm border rounded-lg cursor-pointer bg-surface-card
                 text-text-main placeholder-text-subtle border-border-input
                 hover:border-[var(--color-border-input-hover)] 
                 focus:border-[var(--color-border-input-focus)] focus:ring-primary"
                />
                {selectedCountry && (
                  <button
                    data-no-ripple
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCountry(null);
                      setSearch("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full 
                   text-text-subtle hover:bg-surface-hover hover:text-text-main transition-colors"
                  >
                    <Icon name="x" className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="relative flex-1">
                <Icon
                  name="ri-search-line"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle"
                />
                <input
                  readOnly
                  value={selectedCountry ? `${selectedCountry.name}` : search}
                  placeholder="Select Bank"
                  onClick={() => setIsSearchContentModalOpen(true)}
                  className="w-full px-3 py-3.5 pl-10 text-sm border rounded-lg cursor-pointer bg-surface-card
                 text-text-main placeholder-text-subtle border-border-input
                 hover:border-[var(--color-border-input-hover)] 
                 focus:border-[var(--color-border-input-focus)] focus:ring-primary"
                />
                {selectedCountry && (
                  <button
                    data-no-ripple
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCountry(null);
                      setSearch("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full 
                   text-text-subtle hover:bg-surface-hover hover:text-text-main transition-colors"
                  >
                    <Icon name="x" className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="relative flex-1">
                <Icon
                  name="ri-search-line"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle"
                />
                <input
                  readOnly
                  value={selectedCountry ? `${selectedCountry.name}` : search}
                  placeholder="Select Mode"
                  onClick={() => setIsSearchContentModalOpen(true)}
                  className="w-full px-3 py-3.5 pl-10 text-sm border rounded-lg cursor-pointer bg-surface-card
                 text-text-main placeholder-text-subtle border-border-input
                 hover:border-[var(--color-border-input-hover)] 
                 focus:border-[var(--color-border-input-focus)] focus:ring-primary"
                />
                {selectedCountry && (
                  <button
                    data-no-ripple
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCountry(null);
                      setSearch("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full 
                   text-text-subtle hover:bg-surface-hover hover:text-text-main transition-colors"
                  >
                    <Icon name="x" className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="text-text-subtle">
                <Button
                  className="p-2 transition-colors rounded-full"
                  text="Balance Credit/Debit"
                  onClick={handleAdd}
                  size="sm"
                  width="150px"
                  height="48px"
                  icon={() => <Icon name="ri-add-fill" size={20} />}
                ></Button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="relative w-full mt-4">
          {/* Selected Row Overlay */}
          <AnimatePresence>
            {selectedOrders.length > 0 && (
              <motion.div
                initial={{ x: "0%" }}
                animate={{ x: "0%" }}
                exit={{ x: "0%" }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 left-0 right-0 z-[1] flex items-center justify-between h-[65px] order-item-active px-6 "
              >
                <div className="flex items-center gap-6 text-sm font-medium">
                  <Checkbox
                    // Set to true if all are selected OR partially selected
                    checked={allSelected || partiallySelected}
                    onChange={toggleSelectAll}
                    size="xs"
                    shape="rounded"
                    checkedColor="bg-primary"
                    uncheckedColor="bg-[var(checkbox-bg)] border-[1.5px] border-[var(--color-checkbox-border)]"
                    checkedIcon={getHeaderIcon(allSelected, partiallySelected)}
                  />
                  <span>{selectedOrders.length} selected</span>
                </div>
                <button
                  className="p-2 rounded-full text-primary hover:bg-gray-200"
                  onClick={deleteSelectedOrders}
                >
                  <Icon name="bx bx-trash" size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Table Scroll Container */}
          <div
            className="overflow-x-auto overflow-y-visible  max-h-[500px] w-full"
            style={{ marginTop: selectedOrders.length > 0 ? "0" : "0" }}
          >
            <table className="min-w-[800px] md:min-w-full divide-gray-200 w-full">
              {/* Table Header */}
              <thead className="top-0 z-0 bg-surface-hover text-text-subtle">
                <tr>
                  <th className="w-12 pl-6">
                    <div className="relative w-4 h-4">
                      <Checkbox
                        checked={allSelected || partiallySelected}
                        onChange={toggleSelectAll}
                        size="xs"
                        shape="rounded"
                        checkedColor="bg-primary"
                        uncheckedColor="bg-checkbox-bg border-[1.5px] border-checkbox-border"
                        checkedIcon={getHeaderIcon(
                          allSelected,
                          partiallySelected
                        )}
                      />
                      {/* Header / Overlay */}
                      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {allSelected && (
                          <Icon
                            name="ri-check-fill"
                            size={12}
                            className="text-white"
                          />
                        )}
                        {partiallySelected && (
                          <Icon
                            name="ri-subtract-fill"
                            size={10}
                            className="text-white"
                          />
                        )}
                      </span>
                    </div>
                  </th>
                  <th className="table-header">Txn id</th>
                  <th className="table-header">User Details</th>
                  <th className="table-header">Data & Time</th>
                  <th className="table-header">pre (₹)</th>
                  <th className="table-header">Amount</th>
                  <th className="table-header">Post (₹)</th>
                  <th className="table-header">Payment Mode</th>
                  <th className="table-header">UTR/Remark</th>
                  <th className="table-header">Bank Details</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y bg-surface-card divide-border-primary divide-dashed">
                {currentOrders.map((order) => {
                  const isChecked = selectedOrders.includes(order.txnId);
                  return (
                    <tr
                      key={order.user.userId}
                      className={clsx(
                        "transition-colors duration-200 cursor-pointer",
                        isChecked
                          ? "bg-surface-hover/50"
                          : "hover:bg-surface-hover"
                      )}
                    >
                      <td className="p-3 w-12 min-w-[48px] pl-6">
                        <Checkbox
                          checked={isChecked}
                          onChange={() => toggleSelect(order.user.userId)}
                          size="xs"
                          shape="rounded"
                          checkedColor="bg-primary"
                          uncheckedColor="bg-checkbox-bg border-[1.5px] border-checkbox-border"
                        />
                      </td>
                      <td className="table-data">{order.txnId}</td>
                      <td className="table-data">
                        <img
                          src={order.user.avatar}
                          alt={order.user.name}
                          className="w-8 h-8 rounded-full"
                        />
                      </td>
                      <td className="table-data">
                        <div className="text-text-main">{order.date}</div>
                        <div className="text-md text-text-subtle">
                          {order.time}
                        </div>
                      </td>
                      <td className="table-data">{order.preBalance}</td>
                      <td className="table-data">{order.amount}</td>
                      <td className="table-data">{order.postBalance}</td>
                      <td className="table-data">
                        <div className="text-text-main">
                          {order.paymentMode}
                        </div>
                      </td>
                      <td className="table-data">
                        <div className="text-text-main">
                          {order.utrOrRemark}
                        </div>
                      </td>
                      <td className="table-data">
                        <div className="text-text-main">{order.bank}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-4 px-5 py-6 mt-0 text-xs border-t sm:flex-row sm:items-center sm:justify-end sm:gap-8 border-border-primary text-text-subtle">
          <div className="flex flex-wrap items-center justify-between w-full gap-4 sm:justify-end sm:gap-8 sm:w-auto">
            {/* Rows per page selector */}

            {/* Showing range */}


            {/* Pagination arrows */}
            <div className="flex items-center gap-2">

            </div>
          </div>
        </div>
      </div>

      {/* ✅ Modal used for both Add and Edit */}
      <TransactionsModal isOpen={isAddModalOpen} toggle={toggleAddModal} />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        toggle={closeDeleteModal}
        itemsToDelete={selectedOrders.length}
        confirmColor="bg-danger hover:bg-red-700 text-white"
      />

      <SearchModalWrapper
        initialSearch={search}
        isOpen={isSearchContentModalOpen}
        onClose={() => setIsSearchContentModalOpen(false)}
        onSelect={handleCountrySelect}
      />
    </div>
  );
};

export default WalletTransfer;
