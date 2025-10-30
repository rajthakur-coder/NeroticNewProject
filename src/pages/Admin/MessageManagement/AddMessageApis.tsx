import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import DynamicSidebarMenu from "../../../components/Modal/SidebarSubmenu";
import {
  EditIcon,
  DeleteIcon,
} from "../../../components/ContentModal/SidebarSubmenuContent";
import InputField from "../../../components/Common/inputField";
import CustomSelect from "../../../components/Common/CustomSelect";
import Icon from "../../../components/ui/Icon";
import DeleteModal from "../../../components/Modal/DeleteModal";
import AnimatedDeleteButton from "../../../components/Common/AnimatedDeleteButton";
import Tab from "../../../components/Common/Tabs";
import StatusBadge from "../../../components/Common/StatusBadge";
import { Button } from "../../../components/Common/Button";
import AddMessageApiModal from "../../../components/Modal/AddMessageApiModal";

export interface ApiTableData {
  id: number;
  apiName: string;
  type: string;
  method: string;
  created_at: string;
  status: "Active" | "Inactive";
}

export const apiTableData: ApiTableData[] = [
  {
    id: 1,
    apiName: "Message Gateway",
    type: "SMS",
    method: "POST",
    created_at: "2025-10-20",
    status: "Active",
  },
  {
    id: 2,
    apiName: "Promo Gateway",
    type: "WhatsApp",
    method: "GET",
    created_at: "2025-10-21",
    status: "Inactive",
  },
];


const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

const AddMessageApis = () => {
  // Combine both arrays once into state
  const [allOrders, setAllOrders] = useState([...apiTableData]);
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
  console.log(selectedId);

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
    const matchesSearch = order.apiName
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
    { label: "Edit", icon: <EditIcon />, onClick: () => {
        const orderToEdit = allOrders.find(o => o.id === selectedOrderId);
        if (orderToEdit) {
            handleEdit(orderToEdit);
        }
    } },
    {
      label: "Delete",
      icon: <DeleteIcon />,
      onClick: deleteSelectedOrders,
      danger: true,
    },
  ];

  const orderTabs: Tab[] = [
    { name: "All", key: "All", count: allOrders.length },
    {
      name: "Active",
      key: "Active",
      count: allOrders.filter((o) => o.status === "Active").length,
    },
    {
      name: "Inactive",
      key: "Inactive",
      count: allOrders.filter((o) => o.status === "Inactive").length,
    },
  ];

  // ------------------ JSX ------------------
  return (
    <div className="rounded-lg bg-surface-body text-text-main">
      <div className="shadow-xl bg-surface-card rounded-xl">
        <div className="p-4 sm:p-6">
          <Tab
            tabs={orderTabs}
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />

          <div className={`-mx-4 border-b-[1px] border-border-primary`}></div>

          <div className="flex flex-col gap-4 mt-6 md:flex-row md:items-center md:gap-4">
            {/* Dropdown / Filter Input */}
            <div className="relative flex-1">
              <CustomSelect
                label="API Type"
                value=""
                options={[
                  { label: "All", value: "all" },
                  { label: "SMS", value: "sms" },
                  { label: "WhatsApp", value: "whatsapp" },
                ]}
                onChange={() => {}}
              />
            </div>

            {/* Dropdown / Filter Input */}
            <div className="relative flex-1">
              <InputField
                type="text"
                placeholder="Search by name"
                value=""
                onChange={() => {}}
                themeMode="light"
              />
            </div>

            {/* Add Button */}
            <div>
              <Button
                className="p-2 transition-colors rounded-full"
                text="Add API"
                onClick={handleAdd}
                size="sm"
                width="150px"
                height="48px"
                icon={() => <Icon name="ri-add-fill" size={20} />}
              />
            </div>
          </div>

          {selectedTab !== "All" && (
            <>
              <div className="mt-4 text-xs font-bold">
                {filteredOrders.length}

                <span className="font-normal text-text-subtle">
                  {" "}
                  result found
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="flex items-center px-3 py-2 text-xs font-semibold border border-dashed rounded-lg bg-surface-card border-border-primary text-text-main">
                  Status:
                  <span className="flex items-center px-2 py-1 ml-2 font-medium rounded-md bg-surface-hover text-xxs text-text-main">
                    {selectedTab}
                    <button
                      onClick={() => setSelectedTab("All")}
                      // Inner button is neutral gray, using subtle text color as BG
                      className="flex items-center justify-center w-3.5 h-3.5 ml-2 text-white bg-text-subtle rounded-full hover:bg-text-main"
                    >
                      <Icon
                        name="x"
                        className="w-1.5 h-1.5 text-white dark:text-black"
                      />
                    </button>
                  </span>
                </span>
                <AnimatedDeleteButton
                  onClick={() => setSelectedTab("All")}
                  label="Clear"
                />
              </div>
            </>
          )}
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
                        className={`
                                                    w-4 h-4
                                                    appearance-none rounded
                                                    bg-[var(--color-checkbox-bg)] border-[1.5px] border-[var(--color-checkbox-border)]
                                                    checked:bg-primary checked:border-primary checked:border-none
                                                    cursor-pointer focus:outline-none focus:ring-0
                                                `}
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
                  </th>
                  <th className="table-header">#</th>
                  <th className="table-header">API Name</th>
                  <th className="table-header">API Type</th>
                  <th className="table-header">Method</th>
                  <th className="table-header">Created Date</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Actions</th>
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
                      <td className="table-data">{order.apiName}</td>
                      <td className="table-data">{order.type}</td>
                      <td className="table-data">{order.method}</td>
                      <td className="table-data">{order.created_at}</td>
                      <td className="p-3">
                        <td className="p-3">
                          <StatusBadge
                            status={order.status}
                            onClick={() => toggleStatus(order.id)}
                            loading={
                              statusState.loading && statusState.id === order.id
                            }
                          />
                        </td>
                      </td>
                      <td className="p-3">
                        <button
                          className="px-2 py-2 rounded-full text-text-subtle hover:text-text-main hover:bg-surface-hover"
                          onClick={(e) => openPopup(e, order.id)}
                        >
                          <Icon name="bx bx-dots-vertical-rounded" />
                        </button>
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
            <div className="flex items-center gap-2"></div>
          </div>
        </div>
      </div>

      {/* ✅ Modal used for both Add and Edit */}
      <AddMessageApiModal
        isOpen={isAddModalOpen}
        toggle={toggleAddModal}
        apiData={selectedId} // null → Add mode | object → Edit mode
      />

      {/* Existing Modals */}
      {selectedOrderId && (
        <DynamicSidebarMenu
          open={menuOpen}
          position={menuPosition}
          onClose={() => setMenuOpen(false)}
          actions={actions}
        />
      )}

      <DeleteModal
        isOpen={isDeleteModalOpen}
        toggle={closeDeleteModal}
        itemsToDelete={selectedOrders.length}
        confirmColor="bg-red-600 hover:bg-red-700 text-white"
        cancelColor="bg-gray-200 hover:bg-gray-300 text-black"
      />
    </div>
  );
};

export default AddMessageApis;