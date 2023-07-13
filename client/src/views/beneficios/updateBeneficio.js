import React from "react";
import UpdateBeneficioForm from "../../components/beneficios/updateBeneficio";
import Navbar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer";

const UpdateBeneficio = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <UpdateBeneficioForm style={{ flex: 1 }} />
    </div>
  );
};

export default UpdateBeneficio;