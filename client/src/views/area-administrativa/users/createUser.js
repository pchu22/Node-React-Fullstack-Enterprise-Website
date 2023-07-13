import React from "react";
import FormCreateUser from "../../../components/area-administrativa/users/createUser";
import Navbar from "../../../components/sidebar/sidebar";

const CreateUser = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <FormCreateUser />
      </div>
    </div>
  );
};

export default CreateUser;
