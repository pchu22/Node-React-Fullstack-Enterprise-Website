import React from "react";
import FormEditUsers from "../../components/users/updateUser";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const EditUser = () => {
  return (
    <div>
      <Navbar/><br/><br/>
      <FormEditUsers/>
      <Footer/>
    </div>
  );
};

export default EditUser;
