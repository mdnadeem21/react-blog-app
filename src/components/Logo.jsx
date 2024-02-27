import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div>
        <img src="src\assets\logo.jpg" className="rounded-full" alt="logo" />
    </div>
  );
}

export default Logo;
