import React from 'react';
import '../custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import ItemsList from "./itemMenuPrincipal"

const MenuPrincipal = () => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center py-5" style={{ backgroundColor: '#D9D9D9', }}>
            <div className="rounded p-4 bg-light d-flex flex-column justify-content-center my-3">
                <div className="">
                    <ItemsList />
                </div>
            </div>
        </div>
    );
}

export default MenuPrincipal;




