import React from "react";
import UpdateTipoForm from "../../components/tipos-projeto/updateTiposProjeto";

const UpdateTipoProjeto = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <UpdateTipoForm />
      </div>
    </div>
  );
};

export default UpdateTipoProjeto;
