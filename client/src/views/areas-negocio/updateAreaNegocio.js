import React from "react";
import UpdateAreaForm from "../../components/areas-negocio/updateAreaNegocio";

const UpdateAreaNegocio = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <UpdateAreaForm />
      </div>
    </div>
  );
};

export default UpdateAreaNegocio;
