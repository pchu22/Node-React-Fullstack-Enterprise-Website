import React from "react";
import ListIdeiaForm from "../../components/ideias/listIdeia";
import Navbar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer";

const ListIdeia = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ListIdeiaForm style={{ flex: 1 }} />
    </div>
  );
};

export default ListIdeia;