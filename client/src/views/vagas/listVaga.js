import React from "react";
import ListvagaForm from "../../components/vagas/listVaga";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const ListVaga = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <ListvagaForm style={{ flex: 1 }} />
      <Footer />
    </div>
  );
};

export default ListVaga;
