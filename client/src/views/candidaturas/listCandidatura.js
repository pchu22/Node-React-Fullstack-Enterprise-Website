import React, {useState} from "react";
import ListCandidaturaForm from "../../components/candidaturas/listCandidatura";
import Sidebar from '../../components/sidebar/sidebar';
import Navbar from '../../components/navbar/navbar';

const ListCandidatura = () => {
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
      <ListCandidaturaForm />
    </div>
  );
};

export default ListCandidatura;
