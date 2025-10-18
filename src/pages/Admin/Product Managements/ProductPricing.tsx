import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import DynamicSidebarMenu from "../../../components/Modal/SidebarSubmenu";
import {
  EditIcon,
  DeleteIcon,
} from "../../../components/ContentModal/SidebarSubmenuContent";
import Icon from "../../../components/ui/Icon";
import DeleteModal from "../../../components/Modal/DeleteModal";
import AnimatedDeleteButton from "../../../components/Common/AnimatedDeleteButton";
import { Button } from "../../../components/Common/Button";
import AddProductPricingModal from "../../../components/Modal/AddProductPricingModal";
import SearchInput from "../../../components/Common/SearchInput";
import AnimatedDropdown from "../../../components/Common/AnimatedDropdown";
import Checkbox from "../../../components/Common/Checkbox";

interface ProductPriceTable {
  id: string;
  productName: string;
  price: string; // or number
  date: string;
  time: string;
  created: string; // e.g., "20 Sep 2025 11:01 am"
}

const productPricingData: ProductPriceTable[] = [
  {
    id: "11",
    productName: "Jayvion Simon",
    price: "₹499",
    date: "20 Sep 2025",
    time: "11:01 am",
    created: "20 Sep 2025 11:01 am",
  },
  {
    id: "10",
    productName: "Lucian Obrien",
    price: "₹299",
    date: "20 Sep 2025",
    time: "11:01 am",
    created: "19 Sep 2025 10:01 am",
  },
  {
    id: "9",
    productName: "Soren Durham",
    price: "₹199",
    date: "20 Sep 2025",
    time: "11:01 am",
    created: "10 Sep 2025 01:01 am",
  },
  {
    id: "8",
    productName: "Cortez Herring",
    price: "₹399",
    date: "20 Sep 2025",
    time: "11:01 am",
    created: "09 Sep 2025 12:01 am",
  },
  {
    id: "7",
    productName: "Brycen Jimenez",
    price: "₹599",
    date: "20 Sep 2025",
    time: "11:01 am",
    created: "07 Sep 2025 11:01 pm",
  },
  {
    id: "6",
    productName: "Shawn Manning",
    price: "₹299",
    date: "20 Sep 2025",
    time: "11:01 am",
    created: "16 Sep 2025 01:20 am",
  },
  {
    id: "5",
    productName: "Chase Day",
    price: "₹699",
    date: "20 Sep 2025",
    time: "11:01 am",
    created: "17 Sep 2025 02:20 am",
  },
  {
    id: "4",
    productName: "Melanie Noble",
    price: "₹199",
    date: "20 Sep 2025",
    time: "11:01 am",
    created: "18 Sep 2025 03:20 am",
  },
  {
    id: "3",
    productName: "Christopher Cardenas",
    price: "₹499",
    date: "20 Sep 2025",
    time: "11:01 am",
    created: "19 Sep 2025 04:20 am",
  },
  {
    id: "2",
    productName: "Lainey Davidson",
    price: "₹299",
    date: "20 Sep 2025",
    time: "11:01 am",
    created: "20 Sep 2025 05:20 am",
  },
  {
    id: "1",
    productName: "Elias Graham",
    price: "₹399",
    date: "20 Sep 2025",
    time: "11:01 am",
    created: "21 Sep 2025 06:00 am",
  },
];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

// Helper function to get the correct icon for the header/overlay
const getHeaderIcon = (allSelected: boolean, partiallySelected: boolean) => {
  if (allSelected) {
    return <Icon name="ri-check-fill" size={12} className="text-white" />;
  }
  if (partiallySelected) {
    return <Icon name="ri-subtract-fill" size={10} className="text-white" />;
  }
  return null; // The default unchecked state has no icon
};

const ProductPricing = () => {
  // Combine both arrays once into state
  const [allOrders, setAllOrders] = useState([...productPricingData]);
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
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
    setSelectedId(category); // pass category data
    setIsAddModalOpen(true);
  };

  // ✅ Toggle modal close/open
  const toggleAddModal = () => setIsAddModalOpen((prev) => !prev);

  const filteredOrders = allOrders.filter((order) => {
    const matchesSearch = order.productName
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearch;
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

  const handleRowsPerPageChange = (newRows: number) => {
    setRowsPerPage(newRows);
    setCurrentPage(1);
    setIsDropdownOpen(false); // Close dropdown after selection
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
    {
      label: "Edit",
      icon: <EditIcon />,
      onClick: () =>
        handleEdit(allOrders.find((o) => o.id === selectedOrderId)),
    }, // Pass the correct data
    {
      label: "Delete",
      icon: <DeleteIcon />,
      onClick: deleteSelectedOrders,
      danger: true,
    },
  ];

  // ------------------ JSX ------------------
  return (
    <div className="rounded-lg bg-surface-body text-text-main">
      <div className="shadow-xl bg-surface-card rounded-xl">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 mt-0 md:flex-row md:items-center md:gap-4">
            <div className="flex items-center w-full gap-2 md:flex-1">
              <div className="relative flex-1 w-1/2">
                <Icon
                  name="ri-search-line"
                  className="absolute -translate-y-1/2 text-text-subtle left-3 top-1/2"
                />
                <SearchInput
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search By Name..."
                  width="100%"
                  wrapperClassName="w-1/2"
                />
              </div>

              <div className="text-text-subtle">
                <Button
                  className="p-2 transition-colors rounded-full"
                  text="Add price"
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
                className="absolute top-0 left-0 right-0 z-[0] flex items-center justify-between h-[55px] order-item-active px-6 "
              >
                <div className="flex items-center gap-4 text-sm font-medium">
                  {/* ✅ NEW: Checkbox Component for Overlay */}
                  <Checkbox
                    checked={allSelected || partiallySelected}
                    onChange={toggleSelectAll}
                    size="xs"
                    shape="rounded"
                    checkedColor="bg-primary"
                    uncheckedColor="bg-[var(--color-checkbox-bg)] border-[1.5px] border-[var(--color-checkbox-border)]"
                    checkedIcon={getHeaderIcon(allSelected, partiallySelected)}
                  />
                  {/* ========================================== */}

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
              <thead className="top-0 z-0 bg-surface-hover text-text-subtle">
                <tr>
                  <th className="w-12 pl-6">
                    {/* ✅ NEW: Checkbox Component for Table Header */}
                    <Checkbox
                      checked={allSelected || partiallySelected}
                      onChange={toggleSelectAll}
                      size="xs"
                      shape="rounded"
                      checkedColor="bg-primary"
                      uncheckedColor="bg-[var(--color-checkbox-bg)] border-[1.5px] border-[var(--color-checkbox-border)]"
                      checkedIcon={getHeaderIcon(
                        allSelected,
                        partiallySelected
                      )}
                    />
                    {/* ========================================== */}
                  </th>
                  <th className="table-header">#</th>
                  <th className="table-header">Product Name</th>
                  <th className="table-header">Price</th>
                  <th className="table-header">Created</th>
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
                        {/* ✅ NEW: Checkbox Component for Row Item */}
                        <Checkbox
                          checked={isChecked}
                          onChange={() => toggleSelect(order.id)}
                          size="xs"
                          shape="rounded"
                          checkedColor="bg-primary"
                          uncheckedColor="bg-[var(--color-checkbox-bg)] border-[1.5px] border-[var(--color-checkbox-border)]"
                          // The row item checkbox uses the default checkmark when checked
                        />
                      </td>
                      <td className="table-data">{order.id}</td>
                      <td className="table-data">
                        <div className="text-text-main">
                          {order.productName}
                        </div>
                      </td>
                      <td className="table-data">{order.price}</td>
                      <td className="table-data">
                        <div className="text-text-main">{order.date}</div>
                        <div className="text-md text-text-subtle">
                          {order.time}
                        </div>
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

        <div className="flex flex-col gap-4 px-5 py-6 mt-0 text-xs border-t sm:flex-row sm:items-center sm:justify-end sm:gap-8 border-border-primary text-text-subtle">
          <div className="flex flex-wrap items-center justify-between w-full gap-4 sm:justify-end sm:gap-8 sm:w-auto">
            {/* Rows per page selector: Refactored to use AnimatedDropdown */}
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
      <AddProductPricingModal
        isOpen={isAddModalOpen}
        toggle={toggleAddModal}
        pricingData={selectedId} // null → Add mode | object → Edit mode
      />

      {/* Existing Modals */}
      {selectedOrderId && (
        <DynamicSidebarMenu
          open={menuOpen}
          position={menuPosition}
          onClose={() => setMenuOpen(false)}
          actions={actions.map((action) => ({
            ...action,
            onClick:
              action.label === "Edit"
                ? () => {
                    handleEdit(allOrders.find((o) => o.id === selectedOrderId));
                    setMenuOpen(false); // Close menu after action
                  }
                : () => {
                    deleteSelectedOrders();
                    setMenuOpen(false); // Close menu after action
                  },
          }))}
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

export default ProductPricing;
