import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import BemVindo from '../components/bemVindo';
import Menu from '../components/menuPrincipal';
import React from "react";


export default function HomePage() {
    return (
        <div>
            <Navbar/>
            <BemVindo />
            <Menu />
            <Footer/>
        </div>
    );
}