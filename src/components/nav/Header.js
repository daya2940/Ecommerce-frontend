import React, { useState } from "react";
import { Menu } from "antd";
import { LOGOUT } from "../../constants/userConstants";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  MacCommandOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    navigate("/login");
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      {!user ? (
        <>
          <Menu.Item
            key="Login"
            icon={<UserOutlined />}
            className="float-right"
          >
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="Register" icon={<UserOutlined />}>
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      ) : (
        <SubMenu
          key="Username"
          icon={<SettingOutlined />}
          title={user?.email.split("@")[0]}
          // className="float-right"
        >
          {user?.role === "subscriber" ? (
            <Menu.Item key="subscriber" icon={<MacCommandOutlined />}>
              <Link to="/user/history">Dashboard</Link>
            </Menu.Item>
          ) : (
            <Menu.Item key="admin" icon={<MacCommandOutlined />}>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Menu.Item>
          )}
          <Menu.Item
            key="logout"
            onClick={handleLogout}
            icon={<LogoutOutlined />}
          >
            Logout
          </Menu.Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
