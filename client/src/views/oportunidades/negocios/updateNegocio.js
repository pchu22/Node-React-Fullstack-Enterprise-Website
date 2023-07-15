import React from "react";
import UpdateNegocioForm from "../../../components/oportunidades/negocios/updateNegocio";

const UpdateNegocio = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <UpdateNegocioForm />
      </div>
    </div>
  );
};

export default UpdateNegocio;
