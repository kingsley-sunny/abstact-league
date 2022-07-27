import React from "react";

const Container = (props) => {
  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto px-4">{props.children}</div>
  );
};

export default Container;
