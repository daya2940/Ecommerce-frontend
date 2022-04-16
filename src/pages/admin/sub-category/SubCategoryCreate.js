import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { Row, Col, Modal, Select } from "antd";
import { useSelector } from "react-redux";
import {
  createSubCategory,
  getSubCategories,
  removeSubCategory,
} from "../../../utils/subCategory";
import { getCategories } from "../../../utils/category";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {} from "react-router-dom";
import { Link } from "react-router-dom";
import SubCategoryForm from "../../../components/common-component/CategoryForm";
import LocalSearch from "../../../components/common-component/LocalSearch";
const { Option } = Select;

const { confirm } = Modal;

const SubCategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const { user } = useSelector((state) => ({ ...state })); // obtaining token from the redux store

  useEffect(() => {
    loadCategories();
    loadSubCategoties();
  }, []);

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

  const loadSubCategoties = async () => {
    try {
      await getSubCategories().then((res) => {
        if (res?.status === 200) {
          setSubCategory(res?.data);
        } else {
          throw res;
        }
      });
    } catch (err) {
      console.log(err, "unable to load subcategories");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createSubCategory({ name, parent: category }, user.token).then(
        (res) => {
          setName("");
          toast.success(`${res?.data?.name} is created`);
          loadSubCategoties();
        }
      );
    } catch (err) {
      toast.error(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        try {
          await removeSubCategory(slug, user.token).then((res) => {
            toast.success(`${res?.data?.name} is deleted`);
            loadSubCategoties();
          });
        } catch (err) {
          toast.error(err?.response?.data);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleSelect = (value) => {
    setCategory(value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col mt-2">
          <h4>Create SubCategory</h4>

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
          <SubCategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="mt-5">
            {subCategory
              .filter((val) => {
                if (searchQuery === "") {
                  return val.name;
                } else if (val.name.includes(searchQuery)) {
                  return val.name;
                }
                return "";
              })
              ?.map((item) => (
                <Row className="alert alert-secondary" key={item._id}>
                  <Col span={22}>{item.name}</Col>
                  <Col span={1}>
                    <Link
                      to={`/admin/Subcategory/${item.slug}`}
                      className=" justify-content-end"
                    >
                      <EditOutlined className="text-warning" />
                    </Link>
                  </Col>
                  <Col span={1}>
                    <DeleteOutlined
                      className="text-danger"
                      onClick={() => handleDelete(item?.slug)}
                    />
                  </Col>
                </Row>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCreate;
