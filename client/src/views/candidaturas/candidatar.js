import React from "react";
import CandidatarForm from "../../components/candidaturas/candidatar";

const Candidatar = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <CandidatarForm />
      </div>
    </div>
  );
};

export default Candidatar;
