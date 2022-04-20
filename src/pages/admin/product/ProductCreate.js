import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { Row, Col, Modal } from "antd";
import { useSelector } from "react-redux";
import { createProduct } from "../../../utils/product";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {} from "react-router-dom";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/common-component/CategoryForm";
import LocalSearch from "../../../components/common-component/LocalSearch";

const initialState = {
  title: "",
  description: "",
  price: "",
  // categories: [],
  // category: "",
  // subCategory:[],
  shipping: "",
  quantity: "",
  // images: [],
  colors: ["Black", "Brown", "Silver", "white", "Blue", "Red", "Green"],
  brands: ["Apple", "Samsung", "Microsoft", "Asus", "Lenevo"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const { user } = useSelector((state) => ({ ...state })); // obtaining token from the redux store
  const [values, setvalues] = useState(initialState);
  const {
    title,
    description,
    price,
    category,
    subCategory,
    shipping,
    quantity,
    images,
    color,
    brand,
    categories,
    brands,
  } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(values, user.token).then((res) => {
        if (res.status === 200) {
          toast.success(`${res.data.title} is created`);
          window.location.reload();
        } else {
          throw res;
        }
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10 mt-2">
          <h4>Product Create</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="fw-bold">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="fw-bold mt-2">Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="fw-bold mt-2">Price</label>
              <input
                type="number"
                name="price"
                className="form-control mt-2"
                value={price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="fw-bold mt-2">Shipping</label>
              <select
                name="shipping"
                className="form-control mt-2"
                onChange={handleChange}
              >
                <option>Please Select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label className="fw-bold mt-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control mt-2"
                value={quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="fw-bold mt-2">Color</label>
              <select
                name="color"
                className="form-control mt-2"
                onChange={handleChange}
              >
                <option>Please Select</option>
                {initialState?.colors?.map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label className="fw-bold mt-2">Brand</label>
              <select
                name="brand"
                className="form-control mt-2"
                onChange={handleChange}
              >
                <option>Please Select</option>
                {brands.map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              className="btn btn-outline-primary mt-2"
              // disabled={
              //   !title ||
              //   !description ||
              //   !quantity ||
              //   !price ||
              //   !shipping ||
              //   initialState.colors !== "Please Select" ||
              //   brand !== "Please Select"
              // }
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
