import React from "react";
import UpdateProjetoForm from "../../../components/oportunidades/projetos/updateProjeto";

const UpdateProjeto = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <UpdateProjetoForm />
      </div>
    </div>
  );
};

export default UpdateProjeto;
