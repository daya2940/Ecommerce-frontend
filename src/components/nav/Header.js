import React, { useState } from "react";
import { Menu } from "antd";
import { LOGOUT } from "../../constants/userConstants";
import { MailOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch } from "react-redux";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("mail");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    dispatch({
      type: LOGOUT,
      payload: null,
    });
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<MailOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="Login" icon={<UserOutlined />} className="pull-right">
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="Register" icon={<UserOutlined />}>
        <Link to="/register">Register</Link>
      </Menu.Item>
      <SubMenu key="Username" icon={<SettingOutlined />} title="UserName">
        <Menu.Item key="logout" onClick={handleLogout}>
          Logout
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
