import React from "react";
import EditCandidaturaForm from "../../components/candidaturas/updateCandidatura";

const EditUser = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <EditCandidaturaForm />
      </div>
    </div>
  );
};

export default EditUser;
