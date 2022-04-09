import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user?.token) {
      navigate("/");
    }
  }, [user]);
  const handleSubmit = async (e) => {
    if (user?.email === email) {
      toast.error("User already exist.Please login");
      navigate("/login");
      return;
    }
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
          disabled={!email ? true : false}
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
