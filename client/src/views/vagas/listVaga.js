import React from "react";
import ListvagaForm from "../../components/vagas/listVaga";

const ListVaga = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ListvagaForm style={{ flex: 1 }} />
    </div>
  );
};

export default ListVaga;
