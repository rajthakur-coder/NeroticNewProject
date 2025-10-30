import Icon from "../../ui/Icon";

export const sidebarSections = [
  {
    section: "Overview",
    items: [
      { name: "App", path: "/app", icon: <Icon name="mdi:apps" /> },
      {
        name: "Ecommerce",
        path: "/ecommerce",
        icon: <Icon name="ri:briefcase-2-fill" />,
      },
      {
        name: "Analytics",
        path: "/analytics",
        icon: <Icon name="mdi:chart-bar" />,
      },
      {
        name: "Banking",
        path: "/banking",
        icon: <Icon name="mdi:bank-outline" />,
      },
      { name: "File", path: "/file", icon: <Icon name="mdi:file-outline" /> },
      { name: "Course", path: "/course", icon: <Icon name="mdi:monitor" /> },
    ],
  },
  {
    section: "Management",
    items: [
      {
        name: "Product Management",
        icon: <Icon name="mdi:account-outline" />,
        children: [
          { name: "Product Category", path: "/product-category" },
          { name: "Product", path: "/products" },
          { name: "Product Pricing", path: "/product-pricing" },
        ],
      },
      {
        name: "Setting Management",
        icon: <Icon name="mdi:package-variant" />,
        children: [
          { name: "APIs", path: "/setting-management/apis" },
          {
            name: "Service Switcing",
            path: "/setting-management/service-switching",
          },
        ],
      },
      {
        name: "Account Management",
        icon: <Icon name="mdi:package-variant" />,
        children: [
          {
            name: "Wallet Transfer",
            path: "/account-management/wallet-transfer",
          },
        ],
      },
      {
        name: "Message Management",
        icon: <Icon name="mdi:package-variant" />,
        children: [
          {
            name: "Add Message API(s)",
            path: "/message-management/add-msg",
          },
          {
            name: "Message Content",
            path: "/message-management/add-msg",
          },
          {
            name: "Send Message",
            path: "/message-management/send-message",
          },
          {
            name: "Message Signature",
            path: "/message-management/msg-signature",
          },
          {
            name: "Message Logs",
            path: "/message-management/message-logs",
          },
        ],
      },
      { name: "Order", path: "/order", icon: <Icon name="mdi:bank-outline" /> },
      {
        name: "Invoice",
        path: "/invoice",
        icon: <Icon name="mdi:chart-bar" />,
      },
      { name: "Blog", path: "/blog", icon: <Icon name="mdi:file-outline" /> },
      {
        name: "Job",
        path: "/job",
        icon: <Icon name="bx:bxs-briefcase-alt-2" />,
      },
      { name: "Tour", path: "/tour", icon: <Icon name="mdi:apps" /> },
      {
        name: "File",
        path: "/file-manager",
        icon: <Icon name="mdi:file-outline" />,
      },
    ],
  },
];
