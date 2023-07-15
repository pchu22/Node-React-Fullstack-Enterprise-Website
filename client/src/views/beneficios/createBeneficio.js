import React from "react";
import CreateBeneficioForm from "../../components/beneficios/createBeneficio";

const CreateBeneficio = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <CreateBeneficioForm />
      </div>
    </div>
  );
};

export default CreateBeneficio;
