import { useContext } from "react";
import League_Context from "../../Store/league-context";
import SideNavLinks from "./SideNavLinks";

const SideNav = (props) => {
  const ctx = useContext(League_Context);

  const setCurrentLeague = (leagueName) => {
    ctx.setCurrentLeague(leagueName);
    props.toggleMenu();
  };
  return (
    <ul>
      <div>
        <h2 className="text-3xl p-4">Leagues</h2>
      </div>
      <SideNavLinks
        value="Animal"
        onClick={setCurrentLeague.bind(null, "animalsLeague")}
      />
      <SideNavLinks
        value="Fruits"
        onClick={setCurrentLeague.bind(null, "fruitsLeague")}
      />
      <SideNavLinks
        value="Phones"
        onClick={setCurrentLeague.bind(null, "phonesLeague")}
      />
      <SideNavLinks
        value="Cars"
        onClick={setCurrentLeague.bind(null, "carsLeague")}
      />
    </ul>
  );
};

export default SideNav;
