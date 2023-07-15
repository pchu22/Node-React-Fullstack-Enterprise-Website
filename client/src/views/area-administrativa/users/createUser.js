import React from "react";
import FormCreateUser from "../../../components/area-administrativa/users/createUser";

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
