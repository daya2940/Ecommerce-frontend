import React from "react";
import Usernav from "../../components/nav/UserNav";

const History = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Usernav />
        </div>
        <div className="col">user history</div>
      </div>
    </div>
  );
};

export default History;
