import React from "react";
import CreateEventoForm from "../../components/calendario/createEvento";

const CreateEvento = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <CreateEventoForm />
      </div>
    </div>
  );
};

export default CreateEvento;
