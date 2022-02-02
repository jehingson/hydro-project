import React from "react";
import "./styles.css";

export default function Loading() {
  return (
    <div className="loadcenter">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  );
}