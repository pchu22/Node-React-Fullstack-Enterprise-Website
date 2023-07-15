import React from "react";
import CandidatarForm from "../../components/candidaturas/candidatar";

const Candidatar = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CandidatarForm/>
    </div>
  );
};

export default Candidatar;
