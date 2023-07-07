import React from "react";
import FormCreateUser from "../../components/users/createUser";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const CreateUser = () => {
  return (
    <div>
      <Navbar/><br/><br/>
      <FormCreateUser/>
      <Footer/>
    </div>
  );
};

export default CreateUser;
