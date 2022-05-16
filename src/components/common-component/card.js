import React from "react";
import { Card, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { removeProduct } from "../../utils/product";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const { confirm } = Modal;
const { Meta } = Card;

const CommonCard = ({ product, getProducts }) => {
  const { title, images, description, price, brand, slug } = product;
  const { user } = useSelector((state) => ({ ...state })); // obtaining token from the redux store

  const handleDelete = async (slug) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        try {
          await removeProduct(slug, user.token).then((res) => {
            console.log(res);
            toast.success(`${res?.data?.title} is deleted`);
            getProducts();
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
    <Card
      hoverable
      style={{ width: 450, margin: "10px" }}
      cover={
        <img
          alt="example"
          src={images?.length > 0 ? images[0].url : ""}
          style={{ height: "250px", objectFit: "cover" }}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src =
              "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
          }}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleDelete(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 50)}...`}
      />
    </Card>
  );
};

export default CommonCard;
