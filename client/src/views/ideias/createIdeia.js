import React from "react";
import CreateIdeiaForm from "../../components/ideias/createIdeia";
import Navbar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer";

const CreateIdeia = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <CreateIdeiaForm />
      </div>
    </div>
  );
};

export default CreateIdeia;
