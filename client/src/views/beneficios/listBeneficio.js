import React from "react";
import ListBeneficioForm from "../../components/beneficios/listBeneficio";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const ListBeneficio = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar/>
      <ListBeneficioForm style={{ flex: 1 }} />
      <Footer/>
    </div>
  );
};

export default ListBeneficio;