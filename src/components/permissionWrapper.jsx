import { useSelector } from "react-redux";

const useHasPermission = () => {
  const { getPermission } = useSelector((state) => state.Authsection);
  const hasPermission = (section) => {
    return getPermission?.permissions?.includes?.(section);
  };
  return hasPermission;
};

export default useHasPermission;
