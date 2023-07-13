import React from "react";
import CreateNegocioForm from "../../../components/oportunidades/negocios/createNegocio";
import Navbar from "../../../components/sidebar/sidebar";
import Footer from "../../../components/footer";

const CreateNegocio = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <CreateNegocioForm />
      </div>
    </div>
  );
};

export default CreateNegocio;
