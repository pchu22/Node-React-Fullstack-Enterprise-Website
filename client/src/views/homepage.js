import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from "react";
import Homepage from '../components/homepage/homepage';
import Sidebar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';

export default function Homepage_() {
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
            <Homepage />
        </div>
    );
}
