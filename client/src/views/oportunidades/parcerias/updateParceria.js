import React from "react";
import UpdateParceriaForm from "../../../components/oportunidades/parcerias/updateParceria";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

const UpdateParceria = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar style={{ flex: 1 }} />
      <div style={{ flex: 1 }}>
        <UpdateParceriaForm />
      </div>
      <Footer/>
    </div>
  );
};

export default UpdateParceria;
