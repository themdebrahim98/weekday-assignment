import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "9999", // to make sure it's on top of everything
      }}
    >
      <h1>Loading...</h1>
    </div>
  );
};

export default Loader;
