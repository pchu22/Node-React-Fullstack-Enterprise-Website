import React from "react";
import UpdateVagaForm from "../../components/vagas/updateVaga";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const UpdateVaga = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar/>
      <UpdateVagaForm style={{ flex: 1 }} />
      <Footer/>
    </div>
  );
};

export default UpdateVaga;
