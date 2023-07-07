import React from "react";
import EditCandidaturaForm from "../../components/candidaturas/updateCandidatura";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const EditUser = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar/><br/><br/>
      <EditCandidaturaForm style={{ flex: 1 }} />
      <Footer/>
    </div>
  );
};

export default EditUser;
