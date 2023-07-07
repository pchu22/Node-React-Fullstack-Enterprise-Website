import React from "react";
import CreateParceriaForm from "../../../components/oportunidades/parcerias/createParceria";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

const CreateParceria = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar style={{ flex: 1 }} />
      <div style={{ flex: 1 }}>
        <CreateParceriaForm />
      </div>
      <Footer/>
    </div>
  );
};

export default CreateParceria;
