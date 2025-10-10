import React from 'react';
import clsx from 'clsx';

interface StatusBadgeProps {
  status: Order['status'];
}

// Map status to CSS variable based Tailwind classes
const STATUS_CLASSES: Record<Order['status'], string> = {
  Pending: 'bg-badge-pending-bg text-badge-pending-text',
  Completed: 'bg-badge-completed-bg text-badge-completed-text',
  Cancelled: 'bg-badge-cancelled-bg text-badge-cancelled-text',
  Refunded: 'bg-badge-refunded-bg text-badge-refunded-text',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const classes = STATUS_CLASSES[status] || 'bg-badge-refunded-bg text-badge-refunded-text';

  return (
    <span
      className={clsx(
        "px-2 py-1.5 rounded-md text-xxs font-semibold",
        classes
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
