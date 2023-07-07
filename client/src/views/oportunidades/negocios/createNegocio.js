import React from "react";
import CreateNegocioForm from "../../../components/oportunidades/negocios/createNegocio";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

const CreateNegocio = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar style={{ flex: 1 }} />
      <div style={{ flex: 1 }}>
        <CreateNegocioForm />
      </div>
      <Footer/>
    </div>
  );
};

export default CreateNegocio;
