import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import ListDepartamento from "../../components/departamentos/listDepartamentos";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const List = () => {
  return (
    <div>
      <Navbar/><br/><br/><br/>
      <ListDepartamento/>
      <Footer/>
    </div>
    
  );
};

export default List;
