import React, { useState } from "react";
import ListOportunidadeForm from "../../components/oportunidades/listOportunidade";
import Sidebar from '../../components/sidebar/sidebar';
import Navbar from '../../components/navbar/navbar';

const ListOportunidade = () => {
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
      <ListOportunidadeForm />
    </div>
  );
};

export default ListOportunidade;
