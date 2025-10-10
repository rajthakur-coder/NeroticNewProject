import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";

const ProgressWatcher: React.FC = () => {
  const location = useLocation();

  useEffect(() => {

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300); 

    return () => clearTimeout(timeout);
  }, [location]);

  return null;
};

export default ProgressWatcher;
