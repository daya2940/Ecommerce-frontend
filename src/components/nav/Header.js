import React, { useState } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Header = () => {
  const [current, setCurrent] = useState("mail");
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<MailOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="Login" icon={<UserOutlined />}>
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="Register" icon={<UserOutlined />}>
        <Link to="/register">Register</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
