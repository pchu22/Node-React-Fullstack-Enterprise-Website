import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import RecoverAcc from '../components/auth/recuperarConta';

export default function Recover() {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <div style={{ flex: 1 }}>
                <RecoverAcc />
            </div>
        </div>
    );
}