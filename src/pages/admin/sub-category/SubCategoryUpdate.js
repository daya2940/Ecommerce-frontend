import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../utils/category";

import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../components/common-component/CategoryForm";

const SubCategoryUpdate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { slug } = useParams();

  const { user } = useSelector((state) => ({ ...state })); // obtaining token from the redux store

  useEffect(() => {
    const loadCategories = async () => {
      try {
        await getCategory(slug).then((res) => {
          if (res?.status === 200) {
            setName(res.data.name);
          } else {
            throw res;
          }
        });
      } catch (err) {
        console.log(err, "unable to load categories");
      }
    };
    loadCategories();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateCategory(slug, name, user.token).then((res) => {
        setName("");
        toast.success(`${res?.data?.name} is updated`);
        navigate("/admin/category");
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data);
    } finally {
      setLoading(true);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Update Category</h4>
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
