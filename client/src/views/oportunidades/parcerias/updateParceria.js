import React from "react";
import UpdateParceriaForm from "../../../components/oportunidades/parcerias/updateParceria";

const UpdateParceria = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <UpdateParceriaForm />
      </div>
    </div>
  );
};

export default UpdateParceria;
