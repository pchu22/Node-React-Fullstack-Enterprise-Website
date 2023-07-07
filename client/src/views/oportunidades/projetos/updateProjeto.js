import React from "react";
import UpdateProjetoForm from "../../../components/oportunidades/projetos/updateProjeto";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

const UpdateProjeto = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar style={{ flex: 1 }} />
      <div style={{ flex: 1 }}>
        <UpdateProjetoForm />
      </div>
      <Footer/>
    </div>
  );
};

export default UpdateProjeto;
