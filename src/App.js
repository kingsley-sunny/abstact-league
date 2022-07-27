import { useState } from "react";
import SideNav from "./Components/SideNav/SideNav";
import LeagueProvider from "./Store/LeagueProvider";
import LeagueDetails from "./Components/League/LeagueDetails";

function App() {
  const [menuShown, setMenuShown] = useState(false);
  const toggleMenuHandler = () => {
    setMenuShown((prevState) => !prevState);
  };
  return (
    <LeagueProvider>
      <main className=" block lg:flex text-sm lg:text-base h-[100vh] lg:overflow-hidden">
        <section
          className={`${
            menuShown
              ? "lg:block transform -translate-x-0 lg:translate-x-0"
              : "lg:block transform  -translate-x-full lg:translate-x-0"
          } lg:block md:w-72 md:h-[100vh] lg:relative bg-gradient-to-b from-green-800 to-gray-800 text-white fixed w-[65%] h-full top-0 transition duration-250`}>
          <SideNav menuShown={menuShown} toggleMenu={toggleMenuHandler} />
        </section>

        <section className="grow overflow-y-scroll">
          <LeagueDetails toggleMenu={toggleMenuHandler} />
        </section>
      </main>
    </LeagueProvider>
  );
}

export default App;
