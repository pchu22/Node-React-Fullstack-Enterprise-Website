import React from "react";
import FormEditFiliais from "../../components/filiais/updateFilial";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const EditUser = () => {
  return (
    <div>
      <Navbar/><br/><br/>
      <FormEditFiliais/>
      <Footer/>
    </div>
  );
};

export default EditUser;
