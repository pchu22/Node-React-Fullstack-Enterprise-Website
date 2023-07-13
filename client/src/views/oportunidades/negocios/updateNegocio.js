import React from "react";
import UpdateNegocioForm from "../../../components/oportunidades/negocios/updateNegocio";
import Navbar from "../../../components/sidebar/sidebar";
import Footer from "../../../components/footer";

const UpdateNegocio = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <UpdateNegocioForm />
      </div>
    </div>
  );
};

export default UpdateNegocio;
