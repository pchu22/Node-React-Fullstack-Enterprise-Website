import React from "react";
import CreateInvestimentoForm from "../../../components/oportunidades/investimentos/createInvestimento";
import Navbar from "../../../components/sidebar/sidebar";
import Footer from "../../../components/footer";

const CreateInvestimento = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <CreateInvestimentoForm />
    </div>
  );
};

export default CreateInvestimento;
