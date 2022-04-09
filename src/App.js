import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { LOGGED_IN_USER } from "./constants/userConstants";
import { currentUser } from "./utils/helper";
import UserRoute from "./components/routes/UserRoute";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
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
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    return () => unSubscribe();
  }, []);
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/register/complete" element={<RegisterComplete />} />
        <Route exact path="/forgot/password" element={<ForgotPassword />} />
        <Route exact path="/user/history" element={<UserRoute />}>
          <Route exact path="/user/history" element={<History />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
