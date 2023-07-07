import React from "react";
import CreateProjetoForm from "../../../components/oportunidades/projetos/createProjeto";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

const CreateProjeto = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar style={{ flex: 1 }} />
      <div style={{ flex: 1 }}>
        <CreateProjetoForm />
      </div>
      <Footer/>
    </div>
  );
};

export default CreateProjeto;
