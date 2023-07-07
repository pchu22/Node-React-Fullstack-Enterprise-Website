import React from "react";
import FormCreateVaga from "../../components/vagas/createVaga";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const CreateVaga = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar/>
      <FormCreateVaga style={{ flex: 1 }} />
      <Footer/>
    </div>
  );
};

export default CreateVaga;
