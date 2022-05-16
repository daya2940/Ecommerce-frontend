import { message } from "antd";
import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../utils/product";
import AdminCard from "../../../components/common-component/card";

const AllProducts = () => {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    await getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        message.err(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        {loading ? (
          <h4 className="text-danger">Loading...</h4>
        ) : (
          <div className="col-md-10">
            <div className="row">
              {product?.map((item) => {
                return (
                  <AdminCard
                    product={item}
                    key={item._id}
                    getProducts={getProducts}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
