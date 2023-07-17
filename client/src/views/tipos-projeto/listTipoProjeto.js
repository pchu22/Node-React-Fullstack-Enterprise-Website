import React, {useState} from "react";
import ListTiposForm from "../../components/tipos-projeto/listTiposProjetos";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";

const ListTipo = () => {
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
      <ListTiposForm />
    </div>
  );
};

export default ListTipo;