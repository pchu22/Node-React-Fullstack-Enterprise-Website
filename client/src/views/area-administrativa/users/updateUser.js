import React from "react";
import FormEditUsers from "../../../components/area-administrativa/users/updateUser";


const EditUser = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <FormEditUsers />
      </div>
    </div>
  );
};

export default EditUser;
