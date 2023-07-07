import React from "react";
import CreateInvestimentoForm from "../../../components/oportunidades/investimentos/createInvestimento";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

const CreateInvestimento = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar style={{ flex: 1 }} />
      <div style={{ flex: 1 }}>
        <CreateInvestimentoForm />
      </div>
      <Footer/>
    </div>
  );
};

export default CreateInvestimento;
