import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LOGGED_IN_USER } from "../../constants/userConstants";
import { useNavigate, Link } from "react-router-dom";

import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { createOrUpdateUser } from "../../utils/auth";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state })); //accessing user from the state

  useEffect(() => {
    if (user?.token) {
      navigate("/");
    }
  }, [user]);

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/history");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: LOGGED_IN_USER,
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: LOGGED_IN_USER,
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
      </div>

      <Button
        type="primary"
        className="mb-3 mt-4"
        block
        shape="round"
        size="large"
        disabled={!email || password.length < 6 ? true : false}
        icon={<MailOutlined />}
        loading={loading}
        onClick={handleSubmit}
      >
        Login with email/password
      </Button>
      <Button
        type="danger"
        className="mb-3"
        block
        shape="round"
        size="large"
        icon={<GoogleOutlined />}
        onClick={handleGoogleLogin}
      >
        Login with Google
      </Button>
      <Link
        to="/forgot/password"
        className="d-flex justify-content-end text-danger"
      >
        Forgot password
      </Link>
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
