import React from "react";
import CreateProjetoForm from "../../../components/oportunidades/projetos/createProjeto";
import Navbar from "../../../components/sidebar/sidebar";
import Footer from "../../../components/footer";

const CreateProjeto = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <CreateProjetoForm />
      </div>
    </div>
  );
};

export default CreateProjeto;
