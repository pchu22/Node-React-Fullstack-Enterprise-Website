import React from "react";
import ListOportunidadeForm from "../../components/oportunidades/listOportunidade";

const ListOportunidade = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ListOportunidadeForm />
    </div>
  );
};

export default ListOportunidade;
