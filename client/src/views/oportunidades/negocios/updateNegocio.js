import React from "react";
import UpdateNegocioForm from "../../../components/oportunidades/negocios/updateNegocio";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

const UpdateNegocio = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar style={{ flex: 1 }} />
      <div style={{ flex: 1 }}>
        <UpdateNegocioForm />
      </div>
      <Footer/>
    </div>
  );
};

export default UpdateNegocio;
