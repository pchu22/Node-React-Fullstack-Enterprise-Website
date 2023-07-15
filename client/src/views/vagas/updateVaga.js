import React from "react";
import UpdateVagaForm from "../../components/vagas/updateVaga";

const UpdateVaga = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }} >
        <UpdateVagaForm />
      </div>
    </div>
  );
};

export default UpdateVaga;
