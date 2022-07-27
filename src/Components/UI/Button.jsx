import React from "react";

const Button = (props) => {
  return (
    <button className="py-2 px-4 rounded" {...props}>
      {props.children}
    </button>
  );
};

export default Button;
