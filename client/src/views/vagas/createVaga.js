import React from "react";
import FormCreateVaga from "../../components/vagas/createVaga";

const CreateVaga = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }} >
        <FormCreateVaga />
      </div>
    </div>
  );
};

export default CreateVaga;
