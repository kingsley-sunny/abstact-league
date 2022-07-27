import React from "react";
import Container from "../UI/Container";
import MobileBurger from "../UI/MobileBurger";
import NavLinks from "../UI/NavLinks";

const Nav = () => {
  return (
    <nav className="bg-blue-700 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
      <Container>
        <div className="  flex flex-wrap justify-between items-center mx-auto">
          <div className="flex gap-2 items-center ">
            <span className="self-center text-xl md:text-3xl text-white font-semibold whitespace-nowrap dark:text-white">
              EKC Recog
            </span>
          </div>
          <MobileBurger />
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium">
              <NavLinks>Image Recognition</NavLinks>
              <NavLinks>Object Detection</NavLinks>
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Nav;
