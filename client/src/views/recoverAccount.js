import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import RecoverAcc from '../components/auth/recuperarConta';
import Footer from '../components/footer';

export default function Recover() {
    return (
        <div>
            <RecoverAcc />
            <Footer />
        </div>
    );
}