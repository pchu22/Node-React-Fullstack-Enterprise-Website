import React from "react";
import CreateProjetoForm from "../../../components/oportunidades/projetos/createProjeto";

const CreateProjeto = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <CreateProjetoForm />
      </div>
    </div>
  );
};

export default CreateProjeto;
