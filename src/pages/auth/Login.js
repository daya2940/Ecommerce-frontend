import React, { useState } from "react";
import { Button } from "antd";
import { MailOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";

import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();

    console.table(email, password);
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <input
          type="password"
          className="form-control mt-4"
          placeholder="Your password"
          value={email}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Button
          type="primary"
          htmlType="submit"
          className="mb-3"
          block
          shape="round"
          size="large"
          disabled={!email || password.length < 6 ? true : false}
          icon={<MailOutlined />}
        >
          Login with email/password
        </Button>
      </div>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4 className="text-center">Login</h4>

          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
