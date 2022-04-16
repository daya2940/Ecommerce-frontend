import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getSubCategory, updateSubCategory } from "../../../utils/subCategory";
import { getCategories } from "../../../utils/category";

import { Select } from "antd";

import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../components/common-component/CategoryForm";
const { Option } = Select;

const SubCategoryUpdate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [parent, setParent] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const { slug } = useParams();

  const { user } = useSelector((state) => ({ ...state })); // obtaining token from the redux store

  useEffect(() => {
    loadSubCategories();
    loadCategories();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateSubCategory(slug, { name, parent }, user.token).then(
        (res) => {
          setName("");
          toast.success(`${res?.data?.name} is updated`);
          navigate("/admin/subcategory");
        }
      );
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data);
    } finally {
      setLoading(true);
    }
  };

  const handleSelect = (value) => {
    setParent(value);
  };

  const loadCategories = async () => {
    try {
      await getCategories().then((res) => {
        if (res?.status === 200) {
          setCategories(res?.data);
        } else {
          throw res;
        }
      });
    } catch (err) {
      console.log(err, "unable to load categories");
    }
  };

  const loadSubCategories = async () => {
    try {
      await getSubCategory(slug).then((res) => {
        if (res?.status === 200) {
          setName(res.data.name);
          setParent(res.data.parent);
        } else {
          throw res;
        }
      });
    } catch (err) {
      console.log(err, "unable to load subcategories");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Update SubCategory</h4>
          <div className="from-group">
            <label>Parent Category :</label>
            <Select
              name="category"
              style={{ width: 120 }}
              className="m-2"
              defaultValue={"Select"}
              onChange={handleSelect}
            >
              {categories?.map((item) => {
                return (
                  <Option value={item._id} key={item._id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </div>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default SubCategoryUpdate;
