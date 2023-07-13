import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import FormUpdateDepartamento from "../../../components/area-administrativa/departamentos/updateDepartamento"
import Navbar from "../../../components/sidebar/sidebar";

const UpdateDepartamento = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <FormUpdateDepartamento />
      </div>
    </div>

  );
};

export default UpdateDepartamento;
