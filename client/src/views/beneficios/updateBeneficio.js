import React from "react";
import UpdateBeneficioForm from "../../components/beneficios/updateBeneficio";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const UpdateBeneficio = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar/>
      <UpdateBeneficioForm style={{ flex: 1 }} />
      <Footer/>
    </div>
  );
};

export default UpdateBeneficio;