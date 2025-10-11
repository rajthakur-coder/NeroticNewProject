import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import SidebarSubmenu from "../../../components/Modal/SidebarSubmenu";
import Icon from "../../../components/ui/Icon";
import DeleteModal from "../../../components/Modal/DeleteModal";
import AnimatedDeleteButton from "../../../components/Common/AnimatedDeleteButton";
import Tab from "../../../components/Common/Tabs";
import StatusBadge from "../../../components/Common/StatusBadge";
import { Button } from "../../../components/Common/Button";
import AddCategoryModal from "../../../components/Modal/AddCategoryModal";

interface Order {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  items: number;
  amount: string;
  status: "All" | "Active" | "Inactive";
  avatar: string;
}

const ordersData: Order[] = [
  {
    id: "#6010",
    name: "Jayvion Simon",
    email: "nannie.abernathy70@yahoo.com",
    date: "20 Sep 2025",
    time: "11:01 am",
    items: 6,
    amount: "$484.15",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: "#6011",
    name: "Lucian Obrien",
    email: "ashlynn.ohara62@gmail.com",
    date: "19 Sep 2025",
    time: "10:01 am",
    items: 1,
    amount: "$83.74",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: "#60110",
    name: "Soren Durham",
    email: "vergie.block82@hotmail.com",
    date: "10 Sep 2025",
    time: "1:01 am",
    items: 5,
    amount: "$400.41",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: "#60111",
    name: "Cortez Herring",
    email: "vito.hudson@hotmail.com",
    date: "09 Sep 2025",
    time: "12:01 am",
    items: 1,
    amount: "$83.74",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: "#60112",
    name: "Brycen Jimenez",
    email: "tyrel.greenholt@gmail.com",
    date: "07 Sep 2025",
    time: "11:01 pm",
    items: 6,
    amount: "$484.15",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
];

const screenshotOrders: Order[] = [
  {
    id: "#6019",
    name: "Shawn Manning",
    email: "marjoline.white94@gmail.com",
    date: "16 Sep 2025",
    time: "1:20 am",
    items: 1,
    amount: "$83.74",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=21",
  },
  {
    id: "#6018",
    name: "Chase Day",
    email: "joana.simonis84@gmail.com",
    date: "17 Sep 2025",
    time: "2:20 am",
    items: 5,
    amount: "$400.41",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=22",
  },
  {
    id: "#6017",
    name: "Melanie Noble",
    email: "luella.ryan33@gmail.com",
    date: "18 Sep 2025",
    time: "3:20 am",
    items: 1,
    amount: "$83.74",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=23",
  },
  {
    id: "#6016",
    name: "Christopher Cardenas",
    email: "lenna.bergnaum27@hotmail.com",
    date: "19 Sep 2025",
    time: "4:20 am",
    items: 6,
    amount: "$484.15",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=24",
  },
  {
    id: "#6015",
    name: "Lainey Davidson",
    email: "aditya.greenfelder31@gmail.com",
    date: "20 Sep 2025",
    time: "5:20 am",
    items: 1,
    amount: "$83.74",
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=25",
  },
  {
    id: "#6014",
    name: "Elias Graham",
    email: "elias.graham@gmail.com",
    date: "21 Sep 2025",
    time: "6:00 am",
    items: 2,
    amount: "$150.99",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/40?img=26",
  },
];
const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

const Product = () => {
  // Combine both arrays once into state
  const [allOrders, setAllOrders] = useState([
    ...screenshotOrders,
    ...ordersData,
  ]);
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
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const selectAllHeaderRef = useRef<HTMLInputElement>(null);
  const selectAllOverlayRef = useRef<HTMLInputElement>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<any>(null);

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
    setPopupPos({
      top: rect.bottom + window.scrollY - 40,
      left: rect.right - 170,
    });
    setSelectedOrderId(id);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

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
            <div className="flex items-center w-full gap-2 md:flex-1">
              <div className="relative flex-1 w-1/2">
                <Icon
                  name="ri-search-line"
                  className="absolute -translate-y-1/2 text-text-subtle left-3 top-1/2"
                />
                <input
                  placeholder="Search By Name..."
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-1/2 px-3 py-3.5 pl-10 text-sm border rounded-lg cursor-pointer bg-surface-card text-text-main placeholder-text-subtle
    border-border-input hover:border-[var(--color-border-input-hover)] 
    focus:border-[var(--color-border-input-focus)] focus:ring-primary"
                />
              </div>

              <div className="text-text-subtle">
                <Button
                  className="p-2 transition-colors rounded-full"
                  text="Add Product"
                //   onClick={handleAdd}
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

                    {/* FIX: Checkmark icon rendered only when fully checked, subtract icon for indeterminate */}
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
                  <th className="px-3 py-5 text-xs font-semibold text-left">
                    #
                  </th>
                  <th className="px-3 py-5 text-xs font-semibold text-left">
                    Icon
                  </th>
                  <th className="px-3 py-5 text-xs font-semibold text-left">
                    Category
                  </th>
                  <th className="px-3 py-5 text-xs font-semibold text-left">
                    Name
                  </th>
                  <th className="px-3 py-5 text-xs font-semibold text-left">
                    Slug
                  </th>
                  <th className="px-3 py-5 text-xs font-semibold text-left">
                    Created
                  </th>
                  <th className="px-3 py-5 text-xs font-semibold text-left">
                    Status
                  </th>
                  <th className="px-3 py-5 text-xs font-semibold text-left">
                    Action
                  </th>
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
                      <td className="p-3 text-xs font-medium text-text-main">
                        {order.id}
                      </td>
                      <td className="flex items-center gap-2 p-3">
                        <img
                          src={order.avatar}
                          alt={order.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          {/* <div className="text-xs font-medium text-text-main">
                            {order.name}
                          </div>
                          <div className="text-text-subtle text-xxs">
                            {order.email}
                          </div> */}
                        </div>
                      </td>
                      <td className="p-3 text-xs">
                        <div className="text-text-main">{order.date}</div>
                        <div className="text-text-subtle text-xxs">
                          {order.time}
                        </div>
                      </td>
                      <td className="p-3 text-xs text-text-main">
                        {order.items}
                      </td>
                      <td className="p-3 text-xs text-text-main">
                        {order.amount}
                      </td>
                      <td className="p-3 text-xs">
                        <div className="text-text-main">{order.date}</div>
                        <div className="text-text-subtle text-xxs">
                          {order.time}
                        </div>
                      </td>
                      <td className="p-3">
                        <StatusBadge
                          status={order.status}
                          onClick={() => toggleStatus(order.id)}
                          loading={
                            statusState.loading && statusState.id === order.id
                          }
                        />
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
      <AddCategoryModal
        isOpen={isAddModalOpen}
        toggle={toggleAddModal}
        categoryData={selectedId} // null → Add mode | object → Edit mode
      />

      {/* Existing Modals */}
      {selectedOrderId && (
        <SidebarSubmenu
          open={popupOpen}
          position={popupPos}
          onClose={closePopup}
        //   onEdit={() => {
        //     closePopup();
        //     handleEdit(selectedOrderId);
        //   }}
          onDelete={() => {
            closePopup();
            openDeleteModal();
          }}
        />
      )}

      <DeleteModal
        isOpen={isDeleteModalOpen}
        toggle={closeDeleteModal}
        itemsToDelete={selectedOrders.length}
      />
    </div>
  );
};

export default Product;
