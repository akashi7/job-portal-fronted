import React from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";



export const AppHeader = () => {
  return (
    <div className="appbar">
      <p>AKASHI</p>
      <div className="phone">
        <FaPhoneAlt />
        <p style={{ marginLeft: "10px" }}>+250781273704</p>
      </div>
      <div className="email">
        <FaEnvelope />
        <p style={{ marginLeft: "10px" }} >akashikabuto7@gmail.com</p>
      </div>
      <a href="#id">Projects</a>
    </div>
  );
};
