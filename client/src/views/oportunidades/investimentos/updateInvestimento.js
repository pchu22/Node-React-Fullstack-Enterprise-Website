import React from "react";
import UpdateInvestimentoForm from "../../../components/oportunidades/investimentos/updateInvestimento";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

const UpdateInvestimento = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar style={{ flex: 1 }} />
      <div style={{ flex: 1 }}>
        <UpdateInvestimentoForm />
      </div>
      <Footer/>
    </div>
  );
};

export default UpdateInvestimento;
