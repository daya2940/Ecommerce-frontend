import React from "react";
import Usernav from "../../components/nav/UserNav";

const Wishlist = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Usernav />
        </div>
        <div className="col">user wishlist</div>
      </div>
    </div>
  );
};

export default Wishlist;
