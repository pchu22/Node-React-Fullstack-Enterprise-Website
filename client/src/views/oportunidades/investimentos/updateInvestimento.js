import React from "react";
import UpdateInvestimentoForm from "../../../components/oportunidades/investimentos/updateInvestimento";

const UpdateInvestimento = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <UpdateInvestimentoForm />
      </div>
    </div>
  );
};

export default UpdateInvestimento;
