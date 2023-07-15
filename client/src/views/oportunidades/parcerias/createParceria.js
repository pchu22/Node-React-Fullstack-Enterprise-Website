import React from "react";
import CreateParceriaForm from "../../../components/oportunidades/parcerias/createParceria";

const CreateParceria = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <CreateParceriaForm />
      </div>
    </div>
  );
};

export default CreateParceria;
