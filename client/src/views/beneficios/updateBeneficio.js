import React from "react";
import UpdateBeneficioForm from "../../components/beneficios/updateBeneficio";

const UpdateBeneficio = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }} >
        <UpdateBeneficioForm />
      </div>
    </div>
  );
};

export default UpdateBeneficio;