import React, { useEffect } from "react";
import "./App.css";
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
import AdminRoute from "./components/routes/AdminRoutes";
import UserPassword from "./pages/user/Password";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCategoryCreate from "./pages/admin/sub-category/SubCategoryCreate";
import SubCategoryUpdate from "./pages/admin/sub-category/SubCategoryUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";

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
        <Route exact path="/user/password" element={<UserRoute />}>
          <Route exact path="/user/password" element={<UserPassword />}></Route>
        </Route>
        <Route exact path="/user/wishlist" element={<UserRoute />}>
          <Route exact path="/user/wishlist" element={<Wishlist />}></Route>
        </Route>
        <Route exact path="/admin/dashboard" element={<AdminRoute />}>
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route exact path="/admin/category" element={<AdminRoute />}>
          <Route exact path="/admin/category" element={<CategoryCreate />} />
        </Route>
        <Route exact path="/admin/category/:slug" element={<AdminRoute />}>
          <Route
            exact
            path="/admin/category/:slug"
            element={<CategoryUpdate />}
          />
        </Route>
        <Route exact path="/admin/subcategory" element={<AdminRoute />}>
          <Route
            exact
            path="/admin/subcategory"
            element={<SubCategoryCreate />}
          />
        </Route>
        <Route exact path="/admin/subcategory/:slug" element={<AdminRoute />}>
          <Route
            exact
            path="/admin/subcategory/:slug"
            element={<SubCategoryUpdate />}
          />
        </Route>
        <Route exact path="/admin/product" element={<AdminRoute />}>
          <Route exact path="/admin/product" element={<ProductCreate />} />
        </Route>
        <Route exact path="/admin/products" element={<AdminRoute />}>
          <Route exact path="/admin/products" element={<AllProducts />} />
        </Route>
        <Route exact path="/admin/product/:slug" element={<AdminRoute />}>
          <Route
            exact
            path="/admin/product/:slug"
            element={<ProductUpdate />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
