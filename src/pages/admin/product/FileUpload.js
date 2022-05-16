import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar, Badge, message } from "antd";

import { useSelector } from "react-redux";

const FileUpload = ({ values, setvalues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    const files = e.target.files;
    const allUploadFiles = values.images;
    console.log(files);
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadImages`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                allUploadFiles.push(res?.data);
                setvalues({ ...values, images: allUploadFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemoval = (public_id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeImage`,
        {
          public_id,
        },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        const filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setvalues({ ...values, images: filteredImages });
        message.success("Successfully Deleted");
      })
      .catch((err) => {
        setLoading(false);
        message.error(err);
      });
  };
  return (
    <>
      <div className="d-flex justify-content-space-around">
        <label className="fw-bold">Choose File:</label>
        <input
          type="file"
          multiple
          accept="images/*"
          onChange={fileUploadAndResize}
        />
      </div>
      <div className="col mt-3">
        {values?.images?.map((image, index) => {
          return (
            <Badge
              count="X"
              key={image.public_id}
              onClick={() => handleImageRemoval(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={image.url}
                size={80}
                shape="square"
                className="m-2"
              />
            </Badge>
          );
        })}
      </div>
    </>
  );
};

export default FileUpload;
