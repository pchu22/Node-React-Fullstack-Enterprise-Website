import React from "react";
import EditCandidaturaForm from "../../components/candidaturas/updateCandidatura";
import Navbar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer";

const EditUser = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <EditCandidaturaForm style={{ flex: 1 }} />
    </div>
  );
};

export default EditUser;
