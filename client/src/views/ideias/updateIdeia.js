import React from "react";
import UpdateIdeiaForm from "../../components/ideias/updateIdeia";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const UpdateIdeia = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar/>
      <UpdateIdeiaForm style={{ flex: 1 }} />
      <Footer/>
    </div>
  );
};

export default UpdateIdeia;