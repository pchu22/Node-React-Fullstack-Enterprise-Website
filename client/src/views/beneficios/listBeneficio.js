import React from "react";
import ListBeneficioForm from "../../components/beneficios/listBeneficio";
import Navbar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer";

const ListBeneficio = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ListBeneficioForm style={{ flex: 1 }} />
    </div>
  );
};

export default ListBeneficio;