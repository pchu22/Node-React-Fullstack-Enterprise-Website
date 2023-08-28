import React from "react";
import Conta from '../components/minhaConta';
export default function Perfil() {
    return (

        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <Conta/>
      </div>
    </div>
        
    );
}