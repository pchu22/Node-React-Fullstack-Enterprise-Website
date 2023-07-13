import React from "react";
import UpdateVagaForm from "../../components/vagas/updateVaga";
import Navbar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer";

const UpdateVaga = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <UpdateVagaForm style={{ flex: 1 }} />
    </div>
  );
};

export default UpdateVaga;
