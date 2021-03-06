import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { Row, Col, Modal } from "antd";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../utils/category";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {} from "react-router-dom";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/common-component/CategoryForm";
import LocalSearch from "../../../components/common-component/LocalSearch";

const { confirm } = Modal;

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((state) => ({ ...state })); // obtaining token from the redux store

  useEffect(() => {
    loadCategories();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createCategory(name, user.token).then((res) => {
        setName("");
        toast.success(`${res?.data?.name} is created`);
        loadCategories();
      });
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
          await removeCategory(slug, user.token).then((res) => {
            toast.success(`${res?.data?.name} is deleted`);
            loadCategories();
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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col mt-2">
          <h4>Create Category</h4>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="mt-5">
            {categories
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
                      to={`/admin/category/${item.slug}`}
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

export default CategoryCreate;
