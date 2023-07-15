import React from "react";
import UpdateIdeiaForm from "../../components/ideias/updateIdeia";

const UpdateIdeia = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <UpdateIdeiaForm />
      </div>
    </div>
  );
};

export default UpdateIdeia;