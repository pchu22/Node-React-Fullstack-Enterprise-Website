import React from "react";
import ListIdeiaForm from "../../components/ideias/listIdeia";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const ListIdeia = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar/>
      <ListIdeiaForm style={{ flex: 1 }} />
      <Footer/>
    </div>
  );
};

export default ListIdeia;