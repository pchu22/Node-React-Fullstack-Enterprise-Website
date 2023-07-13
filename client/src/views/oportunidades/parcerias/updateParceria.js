import React from "react";
import UpdateParceriaForm from "../../../components/oportunidades/parcerias/updateParceria";
import Navbar from "../../../components/sidebar/sidebar";
import Footer from "../../../components/footer";

const UpdateParceria = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <UpdateParceriaForm />
      </div>
    </div>
  );
};

export default UpdateParceria;
