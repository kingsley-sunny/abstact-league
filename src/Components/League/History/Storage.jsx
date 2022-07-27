import React from "react";

const Storage = () => {
  const stored = localStorage.getItem("abstractLeague");
  return <div>{stored}</div>;
};

export default Storage;
