import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../utils/auth";

//Role based authentication and route protecion
const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    if (user?.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("current admin response");
          setAdminRoute(true);
        })
        .catch((Error) => {
          console.log("Not a admin route");
          console.log(Error);
          setAdminRoute(false);
        });
    }
  }, [user]);

  return adminRoute ? (
    <Outlet {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
