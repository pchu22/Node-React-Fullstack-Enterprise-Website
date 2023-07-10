import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import ResetPassword from '../components/auth/resetPassword';

export default function Reset() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <ResetPassword />
      </div>
    </div>
  );
}