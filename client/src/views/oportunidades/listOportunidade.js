import React from "react";
import ListOportunidadeForm from "../../components/oportunidades/listOportunidade";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const ListOportunidade = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar style={{ flex: 1 }} />
      <div style={{ flex: 1 }}>
        <ListOportunidadeForm />
      </div>
    </div>
  );
};

export default ListOportunidade;
