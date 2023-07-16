import React, { useState } from "react";
import ReportingComponent from '../components/reporting';
import Sidebar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';

export default function Recover() {
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
            <ReportingComponent />
        </div>
    );
}