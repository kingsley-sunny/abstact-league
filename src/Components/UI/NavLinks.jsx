import React from "react";

const NavLinks = (props) => {
  return (
    <li onClick={props.onClick}>
      <p
        className="block cursor-pointer py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white"
        aria-current="page">
        {props.children}
      </p>
    </li>
  );
};

export default NavLinks;
