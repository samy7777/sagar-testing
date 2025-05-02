import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const usePermissionRoute = (route) => {
  const navigate = useNavigate();
  const { getPermission, getPermissionLoading } = useSelector(
    (state) => state.Authsection
  );

  useEffect(() => {
    if (
      getPermission?.permissions?.length > 0 &&
      getPermissionLoading === false
    ) {
      const hasAccess = getPermission?.permissions?.includes?.(route);
      if (!hasAccess) {
        navigate("/not-authorized");
      }
    }
  }, [getPermission, getPermissionLoading, route, navigate]);
};

export default usePermissionRoute;
