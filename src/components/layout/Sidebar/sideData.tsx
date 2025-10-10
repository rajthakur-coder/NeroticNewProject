import Icon from "../../ui/Icon";

export const sidebarSections = [
  {
    section: "Overview",
    items: [
      { name: "App", path: "/app", icon: <Icon name="mdi:apps" /> },
      { name: "Ecommerce", path: "/ecommerce", icon: <Icon name="ri:briefcase-2-fill" />  },
      { name: "Analytics", path: "/analytics", icon: <Icon name="mdi:chart-bar" /> },
      { name: "Banking", path: "/banking", icon: <Icon name="mdi:bank-outline" /> },
      { name: "Booking", path: "/booking", icon: <Icon name="mdi:calendar-check-outline" /> },
      { name: "File", path: "/file", icon: <Icon name="mdi:file-outline" /> },
      { name: "Course", path: "/course", icon: <Icon name="mdi:monitor" /> },
    ],
  },
  {
    section: "Management",
    items: [
      {
        name: "User",
        icon: <Icon name="mdi:account-outline" />,
        children: [
          { name: "Profile", path: "/user/profile" },
          { name: "Cards", path: "/user/cards" },
          { name: "List", path: "/user/list" },
          { name: "Create", path: "/user/create" },
          { name: "Edit", path: "/user/edit" },
          { name: "Account", path: "/user/account" },
        ],
      },
      {
        name: "Product",
        icon: <Icon name="mdi:package-variant" />,
        children: [
          { name: "List", path: "/product/list" },
          { name: "Details", path: "/product/details" },
          { name: "Create", path: "/product/create" },
          { name: "Edit", path: "/product/edit" },
        ],
      },
      { name: "Order", path: "/order", icon: <Icon name="mdi:bank-outline" /> },
      { name: "Invoice", path: "/invoice", icon: <Icon name="mdi:chart-bar" /> },
      { name: "Blog", path: "/blog", icon: <Icon name="mdi:file-outline" /> },
      { name: "Job", path: "/job", icon: <Icon name="bx:bxs-briefcase-alt-2" /> },
      { name: "Tour", path: "/tour", icon: <Icon name="mdi:apps" /> },
      { name: "File", path: "/file-manager", icon: <Icon name="mdi:file-outline" /> },
    ],
  },
];
