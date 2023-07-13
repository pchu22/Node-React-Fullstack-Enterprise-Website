import React from "react";
import CreateBeneficioForm from "../../components/beneficios/createBeneficio";
import Navbar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer";

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
