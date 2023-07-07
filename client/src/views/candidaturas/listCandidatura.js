import React from "react";
import ListCandidaturaForm from "../../components/candidaturas/listCandidatura";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const ListCandidatura = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <ListCandidaturaForm style={{ flex: 1 }} />
      <Footer />
    </div>
  );
};

export default ListCandidatura;
