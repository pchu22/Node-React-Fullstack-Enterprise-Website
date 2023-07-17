import React, {useState} from "react";
import ListAreasForm from "../../components/areas-negocio/listAreaNegocio";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";

const ListArea = () => {
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
      <ListAreasForm />
    </div>
  );
};

export default ListArea;