import React from "react";
import FormCreateVaga from "../../components/vagas/createVaga";
import Navbar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer";

const CreateVaga = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <FormCreateVaga style={{ flex: 1 }} />
    </div>
  );
};

export default CreateVaga;
