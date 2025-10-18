import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import DateAndTime from "../../../components/Common/DateAndTime";
import DynamicSidebarMenu from "../../../components/Modal/SidebarSubmenu";
import {
  EditIcon,
  DeleteIcon,
} from "../../../components/ContentModal/SidebarSubmenuContent";
import SearchModalWrapper from "../../../components/Modal/SearchModalWrapper";
import type { Country } from "../../../components/ContentModal/SearchContentModal";
import Icon from "../../../components/ui/Icon";
import DeleteModal from "../../../components/Modal/DeleteModal";
import AnimatedDeleteButton from "../../../components/Common/AnimatedDeleteButton";
import StatusBadge from "../../../components/Common/StatusBadge";
import { Button } from "../../../components/Common/Button";
import TransactionsModal from "../../../components/Modal/TransactionsModal";

interface Product {
  id: string;
  categroyName: string;
  name: string;
  date: string;
  time: string;
  slug: string;
  status: "All" | "Active" | "Inactive";
  avatar: string;
}

const productData: Product[] = [
  {
    id: "11",
    categroyName: "Aadhaar / Pan",
    name: "Jayvion Simon",
    date: "20 Sep 2025",
    time: "11:01 am",
    slug: "aadhaar-pan",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: "10",
    categroyName: "Aadhaar / Pan",
    name: "Lucian Obrien",
    date: "19 Sep 2025",
    time: "10:01 am",
    slug: "aadhaar-pan",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: "9",
    categroyName: "Aadhaar / Pan",
    name: "Soren Durham",
    date: "10 Sep 2025",
    time: "1:01 am",
    slug: "aadhaar-pan",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: "8",
    categroyName: "Aadhaar / Pan",
    name: "Cortez Herring",
    date: "09 Sep 2025",
    time: "12:01 am",
    slug: "aadhaar-pan",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: "7",
    categroyName: "Aadhaar / Pan",
    name: "Brycen Jimenez",
    date: "07 Sep 2025",
    time: "11:01 pm",
    slug: "aadhaar-pan",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: "6",
    categroyName: "Aadhaar / Pan",
    name: "Shawn Manning",
    date: "16 Sep 2025",
    time: "1:20 am",
    slug: "aadhaar-pan",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=21",
  },
  {
    id: "5",
    categroyName: "Aadhaar / Pan",
    name: "Chase Day",
    date: "17 Sep 2025",
    time: "2:20 am",
    slug: "aadhaar-pan",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=22",
  },
  {
    id: "4",
    categroyName: "Aadhaar / Pan",
    name: "Melanie Noble",
    date: "18 Sep 2025",
    time: "3:20 am",
    slug: "aadhaar-pan",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=23",
  },
  {
    id: "3",
    categroyName: "Aadhaar / Pan",
    name: "Christopher Cardenas",
    date: "19 Sep 2025",
    time: "4:20 am",
    slug: "aadhaar-pan",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=24",
  },
  {
    id: "2",
    categroyName: "Aadhaar / Pan",
    name: "Lainey Davidson",
    date: "20 Sep 2025",
    time: "5:20 am",
    slug: "aadhaar-pan",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=25",
  },
  {
    id: "1",
    categroyName: "Aadhaar / Pan",
    name: "Elias Graham",
    date: "21 Sep 2025",
    time: "6:00 am",
    slug: "aadhaar-pan",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=26",
  },
];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

const WalletTransfer = () => {
  // Combine both arrays once into state
  const [allOrders, setAllOrders] = useState([...productData]);
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
        const matchesSearch = order.name
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
    
      const toggleStatus = (id) => {
        setStatusState({ loading: true, id });
        setTimeout(() => {
          setAllOrders((prev) =>
            prev.map((product) =>
              product.id === id
                ? {
                    ...product,
                    status: product.status === "Active" ? "Inactive" : "Active",
                  }
                : product
            )
          );
          setStatusState({ loading: false, id: null });
        }, 800);
      };
    
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
    
      const handleTabChange = (key: string) => {
        setSelectedTab(key);
        setSelectedOrders([]);
        setCurrentPage(1);
      };
    
      const openPopup = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMenuPosition({
          top: rect.bottom + window.scrollY - 40,
          left: rect.right - 170,
        });
        setSelectedOrderId(id);
        setMenuOpen(true);
      };
    
    const actions = [
      { label: "Edit", icon: <EditIcon />, onClick: handleEdit },
      {
        label: "Delete",
        icon: <DeleteIcon />,
        onClick: deleteSelectedOrders,
        danger: true,
      },
    ];

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
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.0 }}
                className="absolute top-0 left-0 right-0 z-[0] flex items-center justify-between h-[60px] order-item-active px-6 "
              >
                <div className="flex items-center gap-4 text-sm font-medium">
                  <div className="relative w-4 h-4">
                    {/* Overlay Checkbox Input */}
                    <input
                      type="checkbox"
                      ref={selectAllOverlayRef}
                      onChange={toggleSelectAll}
                      className={clsx(
                        "w-4 h-4 appearance-none rounded cursor-pointer focus:outline-none focus:ring-0",
                        selectedOrders.length > 0
                          ? "bg-primary text-white"
                          : "bg-[var(--color-checkbox-bg)] border-[1.5px] border-[var(--color-checkbox-border)]"
                      )}
                    />

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
                      <input
                        type="checkbox"
                        ref={selectAllHeaderRef}
                        onChange={toggleSelectAll}
                        // Removed 'checked' prop here, letting the ref manage the state
                        className={`
                                                    w-4 h-4 
                                                    appearance-none rounded 
                                                    bg-[var(--color-checkbox-bg)] border-[1.5px] border-[var(--color-checkbox-border)] 
                                                    checked:bg-primary checked:border-primary checked:border-none 
                                                    cursor-pointer focus:outline-none focus:ring-0
                                                `}
                      />
                      {/* FIX: Checkmark icon rendered only when fully checked, subtract icon for indeterminate */}
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
                  <th className="table-header">Bank Detials</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y bg-surface-card divide-border-primary divide-dashed">
                {currentOrders.map((order) => {
                  const isChecked = selectedOrders.includes(order.id);
                  return (
                    <tr
                      key={order.id}
                      className={clsx(
                        "transition-colors duration-200 cursor-pointer",
                        isChecked
                          ? "bg-surface-hover/50"
                          : "hover:bg-surface-hover"
                      )}
                    >
                      <td className="p-3 w-12 min-w-[48px] pl-6">
                        <div className="relative w-4 h-4">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSelect(order.id)}
                            className={`
                                                            w-4 h-4
                                                            appearance-none
                                                            rounded
                                                            bg-[var(--color-checkbox-bg)] border-[1.5px] border-[var(--color-checkbox-border)]
                                                            checked:bg-primary checked:border-primary checked:border-none
                                                            cursor-pointer
                                                            focus:outline-none focus:ring-0
                                                        `}
                          />
                          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {isChecked && (
                              <Icon
                                name="ri-check-fill"
                                size={12}
                                className="font-extrabold text-white"
                              />
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="table-data">{order.id}</td>
                      <td className="table-data">
                        <img
                          src={order.avatar}
                          alt={order.name}
                          className="w-8 h-8 rounded-full"
                        />
                      </td>
                      <td className="table-data">
                        <div className="text-text-main">
                          {order.categroyName}
                        </div>
                      </td>
                      <td className="table-data">{order.name}</td>
                      <td className="table-data">{order.slug}</td>
                      <td className="table-data">
                        <div>{order.date}</div>
                        <div className="text-md text-text-subtle">
                          {order.time}
                        </div>
                      </td>
                      <td className="table-data">
                        <div className="text-text-main">
                          {order.categroyName}
                        </div>
                      </td>
                      <td className="table-data">
                        <div className="text-text-main">
                          {order.categroyName}
                        </div>
                      </td>
                      <td className="table-data">
                        <div className="text-text-main">
                          {order.categroyName}
                        </div>
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
            <div className="flex items-center gap-2">
              <span className="font-semibold text-text-main whitespace-nowrap">
                Rows per page:
              </span>
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center font-medium text-text-main"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {rowsPerPage}
                  <Icon
                    name={isDropdownOpen ? "bx:chevron-up" : "bx:chevron-down"}
                    size={16}
                    className="ml-0.5 transition-transform duration-200"
                  />
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 z-20 w-16 p-1 mb-2 overflow-hidden border rounded-lg shadow-lg bg-surface-card border-border-primary bottom-full"
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
                          onClick={() => handleRowsPerPageChange(rows)}
                        >
                          {rows}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Showing range */}
            <span className="font-medium text-text-main whitespace-nowrap">
              {filteredOrders.length > 0 ? indexOfFirstRow + 1 : 0}-
              {Math.min(indexOfLastRow, filteredOrders.length)} of{" "}
              {filteredOrders.length}
            </span>

            {/* Pagination arrows */}
            <div className="flex items-center gap-2">
              <button
                className="p-1 rounded-full text-text-subtle hover:bg-surface-hover disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <Icon name="bx:chevron-left" size={20} />
              </button>
              <button
                className="p-1 rounded-full text-text-subtle hover:bg-surface-hover disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={
                  currentPage === totalPages || filteredOrders.length === 0
                }
              >
                <Icon name="bx:chevron-right" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Modal used for both Add and Edit */}
      <TransactionsModal isOpen={isAddModalOpen} toggle={toggleAddModal} />

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
