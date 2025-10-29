import type { IconType } from "react-icons";
// import { RiHomeLine, RiShoppingBagLine, RiUserLine, RiBriefcase2Fill, RiPencilFill, RiPrinterFill, RiCheckFill, RiSubtractLine, RiSubtractFill, RiEyeCloseFill, RiEyeCloseLine, RiEyeOffLine, RiEyeFill, RiSearchLine, RiLock2Line, RiMailLine, RiArrowLeftLine, RiCornerRightUpFill, RiSettingsLine } from "react-icons/ri";
// import { BiUser, BiChevronRight, BiChevronLeft, BiChevronDown, BiBell, BiBriefcaseAlt2 ,BiPoll, BiTrash, BiDotsVerticalRounded, BiChevronUp, BiExport, BiImport, BiArrowBack, BiMobile } from "react-icons/bi";
import { RiHomeLine, RiShoppingBagLine, RiUserLine, RiBriefcase2Fill, RiPencilFill, RiPrinterFill, RiCheckFill, RiSubtractLine, RiSubtractFill, RiEyeCloseFill, RiEyeCloseLine, RiEyeOffLine, RiEyeFill, RiSearchLine, RiLock2Line, RiMailLine, RiArrowLeftLine, RiCornerRightUpFill, RiAddFill,RiKeyFill, RiSettingsLine, RiSendPlane2Line } from "react-icons/ri";
import { BiUser, BiChevronRight, BiChevronLeft, BiChevronDown, BiBell, BiBriefcaseAlt2 ,BiPoll, BiTrash, BiDotsVerticalRounded, BiChevronUp, BiExport, BiImport, BiArrowBack, BiMobile, } from "react-icons/bi";
import { FiCamera, FiX } from "react-icons/fi";
import { SiBitcoin } from "react-icons/si";

// Correct import for Vite
import * as mdi from "@mdi/js";

type IconEntry = string | IconType;

export const iconMap: Record<string, IconEntry> = {
  // Material Design Icons
  "mdi:apps": mdi.mdiApps,
  "mdi:shopping-bag": mdi.mdiShoppingBag,
  "mdi:chart-bar": mdi.mdiChartBar,
  "mdi:bank-outline": mdi.mdiBankOutline,
  "mdi:calendar-check-outline": mdi.mdiCalendarCheckOutline,
  "mdi:file-outline": mdi.mdiFileOutline,
  "mdi:monitor": mdi.mdiMonitor,
  "mdi:account-outline": mdi.mdiAccountOutline,
  "mdi:package-variant": mdi.mdiPackageVariant,
  "mdi:arrow-left-thin": mdi.mdiArrowLeftThin,

  // Remix Icons
  "ri:home-line": RiHomeLine,
  "ri:shopping-bag-line": RiShoppingBagLine,
  "ri:user-line": RiUserLine,
  "ri:briefcase-2-fill": RiBriefcase2Fill,
  "ri-pencil-fill":RiPencilFill,
  "ri-printer-fill":RiPrinterFill,
  "ri-check-fill": RiCheckFill,
  "ri-subtract-line": RiSubtractLine,
  "ri-subtract-fill":RiSubtractFill,
  "ri-eye-close-fill":RiEyeCloseFill,
  "ri-eye-close-line":RiEyeCloseLine,
  "ri-eye-off-line":RiEyeOffLine,
  "ri-eye-fill":RiEyeFill,
  "ri-search-line":RiSearchLine,
  "ri-lock-2-line":RiLock2Line,
  "ri-user-line":RiUserLine,
  "ri-mail-line":RiMailLine,
  "ri-settings-line":RiSettingsLine, 
  "ri-add-fill": RiAddFill,
  "ri-key-fill": RiKeyFill,
  "ri-send-plane-2-line": RiSendPlane2Line,


  // Boxicons
  "bx:user": BiUser,
  "bx:chevron-right": BiChevronRight,
  "bx:chevron-left": BiChevronLeft,
  "bx:chevron-down": BiChevronDown,
  "bx:chevron-up":BiChevronUp,
  "bx:bx-bell": BiBell,
  "bx:bxs-briefcase-alt-2": BiBriefcaseAlt2,
  "bx bx-poll":BiPoll ,
  "bx bx-trash":BiTrash,
  "bx bx-dots-vertical-rounded":BiDotsVerticalRounded,
  "bx bx-export": BiExport,
  "bx bx-import": BiImport,
  "bx bx-arrow-back": BiArrowBack,
  "bx bx-mobile": BiMobile,

  // Feather
  "fi:camera": FiCamera,
  "x":FiX,

  // SimpleIcons
  "si:bitcoin": SiBitcoin,
};
