// import React from 'react';
// import clsx from 'clsx';

// interface StatusBadgeProps {
//   status: Order["status"];
//   onClick: () => void;
//   loading: any
// }

// // Map status to CSS variable based Tailwind classes
// const STATUS_CLASSES: Record<Order['status'], string> = {
//   // Pending: 'bg-badge-pending-bg text-badge-pending-text',
//   Active: 'bg-badge-completed-bg text-badge-completed-text',
//   Inactive: 'bg-badge-cancelled-bg text-badge-cancelled-text',
//   // Refunded: 'bg-badge-refunded-bg text-badge-refunded-text',
// };

// const StatusBadge: React.FC<StatusBadgeProps> = ({
//   status,
//   onClick,
//   loading,
// }) => {
//   const classes =
//     STATUS_CLASSES[status] || "bg-badge-refunded-bg text-badge-refunded-text";

//   return (
//     <span
//       className={clsx("px-2 py-1.5 rounded-md text-xxs font-semibold", classes)}
//     >
//       {status}
//     </span>
//   );
// };
// export default StatusBadge;




import React from "react";
import clsx from "clsx";
import { Spinner } from "reactstrap";

interface StatusBadgeProps {
  status:"All" |"Active" | "Inactive"; // you can extend this based on your Order["status"]
  onClick?: () => void;
  loading?: boolean;
}

// Tailwind-style custom badge classes
const STATUS_CLASSES: Record<StatusBadgeProps["status"], string> = {
  Active: "bg-badge-completed-bg text-badge-completed-text",
  Inactive: "bg-badge-cancelled-bg text-badge-cancelled-text",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  onClick,
  loading,
}) => {
  const classes =
    STATUS_CLASSES[status] || "bg-badge-refunded-bg text-badge-refunded-text";

  return (
    <span
      className={clsx(
        "px-2 py-1.5 rounded-md text-xs font-semibold cursor-pointer inline-flex items-center gap-1 transition",
        classes,
        {
          "opacity-70": loading,
          "hover:opacity-90": !loading,
        }
      )}
      onClick={loading ? undefined : onClick}
    >
      {loading ? (
        <Spinner size="xs" style={{ width: "1rem", height: "1rem" }} />
      ) : (
        status
      )}
      {/* {status} */}
    </span>
  );
};

export default StatusBadge;