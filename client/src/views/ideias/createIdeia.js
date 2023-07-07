import React from "react";
import CreateIdeiaForm from "../../components/ideias/createIdeia";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const CreateIdeia = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar style={{ flex: 1 }} />
      <div style={{ flex: 1 }}>
        <CreateIdeiaForm />
      </div>
      <Footer/>
    </div>
  );
};

export default CreateIdeia;
