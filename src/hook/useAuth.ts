import { useSelector } from "react-redux";

const useAuth = () => {
  const { user } = useSelector((state) => state.auth) || {};

  if (user) {
    return user;
  }

  return null;
};

export default useAuth;
