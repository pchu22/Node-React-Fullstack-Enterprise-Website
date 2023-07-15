import React from "react";
import CreateNegocioForm from "../../../components/oportunidades/negocios/createNegocio";

const CreateNegocio = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <CreateNegocioForm />
      </div>
    </div>
  );
};

export default CreateNegocio;
