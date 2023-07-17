import React from "react";
import CreateAreaForm from "../../components/areas-negocio/createAreaNegocio";

const CreateAreaNegocio = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <CreateAreaForm />
      </div>
    </div>
  );
};

export default CreateAreaNegocio;
