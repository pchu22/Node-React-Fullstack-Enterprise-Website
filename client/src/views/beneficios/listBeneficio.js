import React, {useState} from "react";
import ListBeneficioForm from "../../components/beneficios/listBeneficio";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";

const ListBeneficio = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
      setSidebarOpen(true);
  };

  const closeSidebar = () => {
      setSidebarOpen(false);
  };

  return (
    <div className="container-sidebar">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <ListBeneficioForm />
    </div>
  );
};

export default ListBeneficio;