import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import FormCreateFilial from "../../../components/area-administrativa/filiais/createFilial";
import Navbar from "../../../components/sidebar/sidebar";

const CreateFilial = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <FormCreateFilial />
      </div>
    </div>
  );
};

export default CreateFilial;
