import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import FormCreateDepartamento from "../../../components/area-administrativa/departamentos/createDepartamento";
import Navbar from "../../../components/sidebar/sidebar";

const CreateDepartamento = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <FormCreateDepartamento />
      </div>
    </div>
  );
};

export default CreateDepartamento;
