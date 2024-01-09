import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { LOGGED_IN_USER } from "../../constants/userConstants";
import { createOrUpdateUser, currentUser } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(localStorage.getItem("emailForRegistraion"));
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email or password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be atleadt six character");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        localStorage.removeItem("emailForRegistraion");
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        //redux store
        //redirection to login page
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
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const completeRegisterationForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        placeholder="Enter Email"
        value={email}
        disabled
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <input
        type="password"
        className="form-control mt-3"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <div className="d-flex justify-content-center mt-4">
        <Button type="primary" htmlType="submit" className="btn btn-raised">
          Complete Registeration
        </Button>
      </div>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4 className="text-center">Register</h4>
          {completeRegisterationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
