import React from "react";
import ReferenciarForm from "../../components/candidaturas/referenciar";

const Candidatar = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <ReferenciarForm />
      </div>
    </div>
  );
};

export default Candidatar;
