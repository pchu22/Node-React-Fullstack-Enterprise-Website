import React from "react";
import UpdateIdeiaForm from "../../components/ideias/updateIdeia";
import Navbar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer";

const UpdateIdeia = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <UpdateIdeiaForm style={{ flex: 1 }} />
    </div>
  );
};

export default UpdateIdeia;