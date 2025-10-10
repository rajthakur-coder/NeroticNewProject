// import { FiSearch, FiMenu } from "react-icons/fi";

// const TopbarLeft = ({ toggleSidebar }: { toggleSidebar: () => void }) => (
//   <div className="flex items-center gap-3 ml-3">
//     <button
//       onClick={toggleSidebar}
//       className="p-2 rounded-md lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
//     >
//       <FiMenu size={20} />
//     </button>

//     {/* Search box */}
//     <div className="flex items-center px-3 py-1 border border-gray-200 rounded-md bg-white/70 backdrop-blur-sm dark:bg-gray-700/70 dark:border-gray-600">
//       <FiSearch className="text-gray-500 cursor-pointer dark:text-gray-300" />
//       <input
//         type="text"
//         placeholder="Search..."
//         aria-label="Search"
//         className="hidden px-2 py-1 ml-2 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none md:block w-52 dark:text-gray-200"
//       />
//     </div>
//   </div>
// );

// export default TopbarLeft;




import { FiSearch, FiMenu } from "react-icons/fi";
import clsx from "clsx"; // Assuming clsx is available

const TopbarLeft = ({ toggleSidebar }: { toggleSidebar: () => void }) => (
  <div className="flex items-center gap-3 ml-3">
    <button
      onClick={toggleSidebar}
      // Button hover uses semantic surface-hover
      className="p-2 rounded-md lg:hidden hover:bg-surface-hover"
    >
      <FiMenu size={20} />
    </button>

    {/* Search box */}
    <div 
      className={clsx(
        "flex items-center px-3 py-1 rounded-md backdrop-blur-sm",
        // Search box background uses surface-card with transparency
        "bg-surface-card/70",
        // Border uses semantic secondary border color
        "border border-border-secondary"
      )}
    >
      {/* Icon color uses subtle text variable */}
      <FiSearch className="cursor-pointer text-text-subtle" />
      
      <input
        type="text"
        placeholder="Search..."
        aria-label="Search"
        className={clsx(
          "hidden px-2 py-1 ml-2 text-sm bg-transparent outline-none md:block w-52",
          // Input text color uses primary text
          "text-text-primary",
          // Placeholder text color uses subtle text
          "placeholder-text-subtle"
        )}
      />
    </div>
  </div>
);

export default TopbarLeft;




