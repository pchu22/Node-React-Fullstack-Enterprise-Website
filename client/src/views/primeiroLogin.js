import React from "react";
import PrimeiroLoginForm from "../components/auth/primeiroLoginForm";

const PrimeiroLogin = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <PrimeiroLoginForm />
      </div>
    </div>
  );
};

export default PrimeiroLogin;
