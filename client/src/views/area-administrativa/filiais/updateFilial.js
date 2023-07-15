import React from "react";
import FormEditFiliais from "../../../components/area-administrativa/filiais/updateFilial";

const EditFiliais = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <FormEditFiliais />
      </div>
    </div>
  );
};

export default EditFiliais;
