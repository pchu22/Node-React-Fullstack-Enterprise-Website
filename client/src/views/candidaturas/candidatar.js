import React from "react";
import CandidatarForm from "../../components/candidaturas/candidatar";
import Navbar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer";

const Candidatar = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CandidatarForm style={{ flex: 1 }} />
    </div>
  );
};

export default Candidatar;
