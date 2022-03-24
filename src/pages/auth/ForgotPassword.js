import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user?.token) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
        handleCodeInApp: true,
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then((res) => {
          if (res.status === 200) {
            setEmail("");
            toast.success(`Email Sent to ${email} to reset the password`);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4 className="text-center">Forgot password</h4>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          placeholder="Type Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <div className="d-flex justify-content-center mt-4">
          <Button
            type="primary"
            disabled={!email ? true : false}
            block
            shape="round"
            htmlType="submit"
            loading={loading}
          >
            SUBMIT
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
