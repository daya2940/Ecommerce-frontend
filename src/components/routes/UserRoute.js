import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

//Role based authentication and route protecion
const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return user?.token ? (
    <Outlet {...rest} render={() => children} />
  ) : (
    <h1 className="text-danger">Loading...</h1>
  );
};

export default UserRoute;
