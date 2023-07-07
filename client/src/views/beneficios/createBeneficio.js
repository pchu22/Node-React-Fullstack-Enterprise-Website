import React from "react";
import CreateBeneficioForm from "../../components/beneficios/createBeneficio";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const CreateBeneficio = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar style={{ flex: 1 }} />
      <div style={{ flex: 1 }}>
        <CreateBeneficioForm />
      </div>
      <Footer/>
    </div>
  );
};

export default CreateBeneficio;
