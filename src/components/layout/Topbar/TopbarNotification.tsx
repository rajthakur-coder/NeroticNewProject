// import Icon from "../../ui/Icon";

// const TopbarNotification = ({ count }: { count: number }) => (
//   <div className="relative">
//     <button
//       // data-ripple
//       className=" flex items-center justify-center p-2  text-[#637381] transition duration-200 transform rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 active:scale-95"
//     >
//       <Icon name="bx:bx-bell" size={20} />
//     </button>

//     {count > 0 && (
//       <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] text-white rounded-full px-1">
//         {count}
//       </span>
//     )}
//   </div>
// );

// export default TopbarNotification;







import Icon from "../../ui/Icon";
import clsx from "clsx";

const TopbarNotification = ({ count }: { count: number }) => (
  <div className="relative">
    <button
      className={clsx(
        "flex items-center justify-center p-2 transition duration-200 transform rounded-full hover:scale-110 active:scale-95",
        
        // ICON COLOR: Hardcoded dark classes ko replace karke semantic variable use kiya.
        "text-text-subtle", 
        
        // HOVER BG: Semantic variable use kiya.
        "hover:bg-surface-hover"
      )}
    >
      <Icon name="bx:bx-bell" size={20} />
    </button>

    {count > 0 && (
      <span 
        className={clsx(
          "absolute -top-1 -right-1 text-[10px] rounded-full px-1 text-white",
          
          // BADGE BG: Hardcoded red ko replace karke semantic variable use kiya.
          // (NOTE: Agar ab bhi red nahi dikhta hai, to aapko Tailwind config me is variable ko theek karna hoga).
          "bg-action-danger" 
        )}
      >
        {count}
      </span>
    )}
  </div>
);

export default TopbarNotification;