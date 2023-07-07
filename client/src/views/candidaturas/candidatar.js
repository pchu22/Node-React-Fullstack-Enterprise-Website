import React from "react";
import CandidatarForm from "../../components/candidaturas/candidatar";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const Candidatar = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <CandidatarForm style={{ flex: 1 }} />
      <Footer />
    </div>
  );
};

export default Candidatar;
