import React from "react";
import ListOportunidadeForm from "../../components/oportunidades/listOportunidade";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const ListOportunidade = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <ListOportunidadeForm style={{ flex: 1 }} />
      <Footer />
    </div>
  );
};

export default ListOportunidade;
