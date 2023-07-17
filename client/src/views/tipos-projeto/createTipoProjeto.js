import React from "react";
import CreateTipoForm from "../../components/tipos-projeto/createTiposProjeto";

const CreateTipoProjeto = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <CreateTipoForm />
      </div>
    </div>
  );
};

export default CreateTipoProjeto;
