import { motion, AnimatePresence } from "framer-motion";
import React, { useState,} from "react";
import clsx from "clsx";
import DynamicSidebarMenu from "../../../components/Modal/SidebarSubmenu";
import {
  EditIcon,
  DeleteIcon,
} from "../../../components/ContentModal/SidebarSubmenuContent";
import Icon from "../../../components/ui/Icon";
import DeleteModal from "../../../components/Modal/DeleteModal";
import AnimatedDeleteButton from "../../../components/Common/AnimatedDeleteButton";
import Tab from "../../../components/Common/Tabs";
import StatusBadge from "../../../components/Common/StatusBadge";
import { Button } from "../../../components/Common/Button";
import AddProductModal from "../../../components/Modal/AddproductModal";
import SearchInput from "../../../components/Common/SearchInput";
import Checkbox from "../../../components/Common/Checkbox"; // Assuming this path is correct
import AnimatedDropdown from "../../../components/Common/AnimatedDropdown";

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
    id: "1",
    categroyName: "Aadhaar / Pan",
    name: "Jayvion Simon",
    date: "20 Sep 2025",
    time: "11:01 am",
    slug: "aadhaar-pan",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: "2",
    categroyName: "Aadhaar / Pan",
    name: "Lucian Obrien",
    date: "19 Sep 2025",
    time: "10:01 am",
    slug: "aadhaar-pan",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: "3",
    categroyName: "Aadhaar / Pan",
    name: "Soren Durham",
    date: "10 Sep 2025",
    time: "1:01 am",
    slug: "aadhaar-pan",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: "4",
    categroyName: "Aadhaar / Pan",
    name: "Cortez Herring",
    date: "09 Sep 2025",
    time: "12:01 am",
    slug: "aadhaar-pan",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: "5",
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
    id: "7",
    categroyName: "Aadhaar / Pan",
    name: "Chase Day",
    date: "17 Sep 2025",
    time: "2:20 am",
    slug: "aadhaar-pan",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=22",
  },
  {
    id: "8",
    categroyName: "Aadhaar / Pan",
    name: "Melanie Noble",
    date: "18 Sep 2025",
    time: "3:20 am",
    slug: "aadhaar-pan",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=23",
  },
  {
    id: "9",
    categroyName: "Aadhaar / Pan",
    name: "Christopher Cardenas",
    date: "19 Sep 2025",
    time: "4:20 am",
    slug: "aadhaar-pan",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=24",
  },
  {
    id: "10",
    categroyName: "Aadhaar / Pan",
    name: "Lainey Davidson",
    date: "20 Sep 2025",
    time: "5:20 am",
    slug: "aadhaar-pan",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=25",
  },
  {
    id: "11",
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

const Product = () => {
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
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

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

  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);

  const toggleStatus = (id: string) => {
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

  const getHeaderIcon = (allSelected: boolean, partiallySelected: boolean) => {
    if (allSelected) {
      return <Icon name="ri-check-fill" size={12} className="text-white" />;
    }
    if (partiallySelected) {
      return <Icon name="ri-subtract-fill" size={10} className="text-white" />;
    }
    return null; // The default unchecked state has no icon
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
        <div className="p-4 sm:p-6 md:p-4">
          <Tab
            tabs={orderTabs}
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />

          <div className={`-mx-4 border-b-[1px] border-border-primary`}></div>

          <div className="flex flex-col gap-4 mt-3 md:flex-row md:items-center md:gap-4">
            <div className="flex items-center w-full gap-2 md:flex-1">
              <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search By Name..."
                width="50%" // Full width within its flex container
                wrapperClassName="w-1/2" // Original container width
              />

              <div className="text-text-subtle">
                <Button
                  className="p-2 transition-colors rounded-full"
                  text="Add Product"
                  onClick={handleAdd}
                  size="sm"
                  width="150px"
                  height="48px"
                  icon={() => <Icon name="ri-add-fill" size={20} />}
                ></Button>
              </div>
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
            className="overflow-x-auto overflow-y-visible  max-h-[500px] w-full"
            style={{ marginTop: selectedOrders.length > 0 ? "0" : "0" }}
          >
            <table className="min-w-[800px] md:min-w-full divide-gray-200 w-full">
              {/* Table Header */}
              <thead className="sticky top-0 z-[0] bg-surface-hover text-text-subtle h-[60px]">
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
                  <th className="table-header">#</th>
                  <th className="table-header">Icon</th>
                  <th className="table-header">Category</th>
                  <th className="table-header">Name</th>
                  <th className="table-header">Slug</th>
                  <th className="table-header">Created</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Action</th>
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
                        <Checkbox
                          checked={isChecked}
                          onChange={() => toggleSelect(order.id)}
                          size="xs"
                          shape="rounded"
                          checkedColor="bg-primary"
                          uncheckedColor="bg-checkbox-bg border-[1.5px] border-checkbox-border"
                        />
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
                        <div className="text-text-main">{order.date}</div>
                        <div className="text-md text-text-subtle">
                          {order.time}
                        </div>
                      </td>
                      <td className="table-data">
                        <StatusBadge
                          status={order.status}
                          onClick={() => toggleStatus(order.id)}
                          loading={
                            statusState.loading && statusState.id === order.id
                          }
                        />
                      </td>
                      <td className="table-data">
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
            {/* Rows per page selector - Menggunakan AnimatedDropdown */}
            <div className="flex items-center gap-2 ">
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
                    onClick={() => handleRowsPerPageChange(rows)}
                  >
                    {rows}
                  </div>
                ))}
              </AnimatedDropdown>
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
      <AddProductModal
        isOpen={isAddModalOpen}
        toggle={toggleAddModal}
        productData={selectedId} // null → Add mode | object → Edit mode
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

export default Product;