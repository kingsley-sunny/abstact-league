import React from "react";

const SideNavLinks = (props) => {
  return (
    <li className="w-full h-full p-4 cursor-pointer" onClick={props.onClick}>
      {props.value}
    </li>
  );
};

export default SideNavLinks;
