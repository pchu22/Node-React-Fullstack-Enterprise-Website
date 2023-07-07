import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import CreateFilial from "../../components/filiais/createFilial";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const List = () => {
  return (
    <div>
      <Navbar/><br/><br/><br/>
      <CreateFilial/>
      <Footer/>
    </div>
    
  );
};

export default List;
