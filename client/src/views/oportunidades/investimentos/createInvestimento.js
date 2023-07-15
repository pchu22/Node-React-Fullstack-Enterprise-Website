import React from "react";
import CreateInvestimentoForm from "../../../components/oportunidades/investimentos/createInvestimento";

const CreateInvestimento = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <CreateInvestimentoForm />
      </div>
    </div>
  );
};

export default CreateInvestimento;
