import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import ListFilial from "../../components/filiais/listFiliais";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const List = () => {
  return (
    <div>
      <Navbar/><br/><br/><br/>
      <ListFilial/>
      <Footer/>
    </div>
    
  );
};

export default List;
