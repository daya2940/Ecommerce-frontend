import React, { useState } from "react";
import { Button } from "antd";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(`Email is sent to ${email}.Click to complete registration`);
    localStorage.setItem("emailForRegistraion", email);
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <div className="d-flex justify-content-center mt-4">
        <Button
          type="primary"
          type="primary"
          htmlType="submit"
          className="mb-3"
          block
          shape="round"
        >
          Register
        </Button>
      </div>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4 className="text-center">Register</h4>

          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
