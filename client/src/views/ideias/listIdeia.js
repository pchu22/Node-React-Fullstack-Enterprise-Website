import React, {useState} from "react";
import ListIdeiaForm from "../../components/ideias/listIdeia";
import Sidebar from '../../components/sidebar/sidebar';
import Navbar from '../../components/navbar/navbar';

const ListIdeia = () => {
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
      <ListIdeiaForm />
    </div>
  );
};

export default ListIdeia;