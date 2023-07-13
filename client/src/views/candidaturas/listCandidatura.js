import React from "react";
import ListCandidaturaForm from "../../components/candidaturas/listCandidatura";
import Navbar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer";

const ListCandidatura = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ListCandidaturaForm style={{ flex: 1 }} />
    </div>
  );
};

export default ListCandidatura;
