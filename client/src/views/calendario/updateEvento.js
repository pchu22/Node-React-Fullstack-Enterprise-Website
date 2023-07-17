import React from "react";
import UpdateEventoForm from "../../components/calendario/updateEvento";

const UpdateEvento = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <UpdateEventoForm />
      </div>
    </div>
  );
};

export default UpdateEvento;
