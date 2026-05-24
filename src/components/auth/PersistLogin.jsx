import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const PersistLogin = () => {
  const isFirstTime = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const reLogin = async () => {
      console.log("Relogin");
      await refresh(true);
      setIsLoading(false);
    };
    if (!auth?.accessToken && isFirstTime.current) reLogin();
    else if (auth?.accessToken) setIsLoading(false);

    return () => {
      isFirstTime.current = false;
    };
  }, [auth?.accessToken, refresh]);

  return isLoading ? <p>Loading</p> : <Outlet />;
};

export default PersistLogin;
