import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../utils/product";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { getCategories, getProductSubCategory } from "../../../utils/category";
import {} from "react-router-dom";
import { Select } from "antd";

const { Option } = Select;

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subCategory: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "white", "Blue", "Red", "Green"],
  brands: ["Apple", "Samsung", "Microsoft", "Asus", "Lenevo"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const { user } = useSelector((state) => ({ ...state })); // obtaining token from the redux store
  const [subs, setSubs] = useState([]);
  const [subOptions, setSubOptions] = useState("");
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
    colors,
    categories,
    brands,
  } = values;

  const loadCategories = async () => {
    try {
      await getCategories().then((res) => {
        if (res?.status === 200) {
          setvalues({ ...values, categories: res?.data });
        } else {
          throw res;
        }
      });
    } catch (err) {
      console.log(err, "unable to load categories");
    }
  };

  const loadSubcategory = async (id) => {
    try {
      if (id !== "Please Select") {
        await getProductSubCategory(id).then((res) => {
          if (res.status === 200) {
            console.log(res);
            setSubs(res.data);
          } else {
            throw res;
          }
        });
      }
    } catch (err) {
      toast.error(err?.response?.data?.err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

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
      toast.error(err.response.data.err);
    }
  };

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setvalues({ ...values, category: e.target.value });
    loadSubcategory(e.target.value);
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
              <label className="fw-bold mt-2">Description :</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="fw-bold mt-2">Price :</label>
              <input
                type="number"
                name="price"
                className="form-control mt-2"
                value={price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="fw-bold mt-2">Shipping :</label>
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
              <label className="fw-bold mt-2">Quantity :</label>
              <input
                type="number"
                name="quantity"
                className="form-control mt-2"
                value={quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="fw-bold mt-2">Color :</label>
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
              <label className="fw-bold mt-2">Brand :</label>
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
            <div className="from-group">
              <label className="fw-bold mt-2">Category :</label>
              <select
                name="category"
                className="form-control mt-2"
                onChange={handleCategoryChange}
              >
                <option>Please Select</option>
                {categories?.map((item) => {
                  return (
                    <option value={item._id} key={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {subs?.length > 0 && (
              <div className="from-group">
                <label className="fw-bold mt-2">SubCategory :</label>
                <Select
                  name="subCategory"
                  style={{ width: "100%" }}
                  mode="multiple"
                  placeholder="Please select"
                  value={subCategory}
                  onChange={(value) =>
                    setvalues({ ...values, subCategory: value })
                  }
                >
                  {subs?.map((item) => {
                    return (
                      <Option value={item._id} key={item._id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            )}

            <button
              className="btn btn-outline-primary mt-2 block"
              disabled={
                !title ||
                !description ||
                !quantity ||
                !price ||
                !shipping ||
                !colors.includes(color) ||
                !brands.includes(brand)
              }
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
