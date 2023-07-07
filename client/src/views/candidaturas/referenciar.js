import React from "react";
import ReferenciarForm from "../../components/candidaturas/referenciar";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const Candidatar = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <ReferenciarForm style={{ flex: 1 }} />
      <Footer />
    </div>
  );
};

export default Candidatar;
