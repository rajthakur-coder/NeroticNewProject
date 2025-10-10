import { TOASTER_LIBRARY } from "../Config/toaster.config";
import * as HotToast from "react-hot-toast";
import * as SonnerToast from "sonner";
import * as Toastify from "react-toastify";
import { Store } from "react-notifications-component";
import 'react-toastify/dist/ReactToastify.css';
import 'react-notifications-component/dist/theme.css';

// Standard interface
export interface ToastInterface {
  success: (msg: string) => void;
  error: (msg: string) => void;
  info: (msg: string) => void;
  loading: (msg: string) => string | number;
  dismiss: (id?: string | number) => void;
}

// Factory function
const createToastInterface = (libName: string): ToastInterface => {
  switch (libName) {
    case "hot-toast":
      return {
        success: (msg) => HotToast.toast.success(msg),
        error: (msg) => HotToast.toast.error(msg),
        info: (msg) => HotToast.toast(msg),
        loading: (msg) => HotToast.toast.loading(msg),
        dismiss: (id) => HotToast.toast.dismiss(id),
      };

    case "sonner":
      return {
        success: (msg) => SonnerToast.toast.success(msg),
        error: (msg) => SonnerToast.toast.error(msg),
        info: (msg) => SonnerToast.toast(msg),
        loading: (msg) => SonnerToast.toast.loading(msg),
        dismiss: (id) => SonnerToast.toast.dismiss(id),
      };

    case "toastify":
      return {
        success: (msg) => Toastify.toast.success(msg),
        error: (msg) => Toastify.toast.error(msg),
        info: (msg) => Toastify.toast.info(msg),
        loading: (msg) => Toastify.toast.info(msg + " ⏳"),
        dismiss: (id) => Toastify.toast.dismiss(id),
      };

    case "react-notifications-component":
      return {
        success: (msg) =>
          Store.addNotification({
            title: "Success",
            message: msg,
            type: "success",
            insert: "top",
            container: "top-right",
            dismiss: { duration: 3000, onScreen: true },
          }),
        error: (msg) =>
          Store.addNotification({
            title: "Error",
            message: msg,
            type: "danger",
            insert: "top",
            container: "top-right",
            dismiss: { duration: 3000, onScreen: true },
          }),
        info: (msg) =>
          Store.addNotification({
            title: "Info",
            message: msg,
            type: "info",
            insert: "top",
            container: "top-right",
            dismiss: { duration: 3000, onScreen: true },
          }),
        loading: (msg) =>
          Store.addNotification({
            title: "Loading",
            message: msg,
            type: "default",
            insert: "top",
            container: "top-right",
            dismiss: { duration: 3000, onScreen: true },
          }),
        dismiss: () => {}, 
      };

    default:
      throw new Error(`Unsupported toaster library: ${libName}`);
  }
};


export const ToasterUtils: ToastInterface = createToastInterface(TOASTER_LIBRARY);
