import React, {useState} from "react";
import CalendarioComponent from "../components/calendar";
import Sidebar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';

const Calendario = () => {
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
      <CalendarioComponent />
    </div>
  );
};

export default Calendario;
