import React from "react";
import ReferenciarForm from "../../components/candidaturas/referenciar";
import Navbar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer";

const Candidatar = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ReferenciarForm style={{ flex: 1 }} />
    </div>
  );
};

export default Candidatar;
