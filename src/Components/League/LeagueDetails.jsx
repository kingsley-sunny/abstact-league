import { useContext, useState, useEffect } from "react";
import League_Context from "../../Store/league-context";
import MobileBurger from "../UI/MobileBurger";
import Fixtures from "./Fixtures/Fixtures";
import History from "./History/History";
import Table from "./Table/Table";
import Teams from "./Teams/Teams";

const LeagueDetails = (props) => {
  const ctx = useContext(League_Context);
  const [state, setstate] = useState("table");
  const [seasonEnded, setSeasonEnded] = useState(false);

  const linkClass = "mt-8 cursor-pointer w-full text-center";
  const borderClass = "border-b-4 border-green-800";

  useEffect(() => {
    if (ctx[ctx.currentLeague].fixtures.length === 0) {
      setSeasonEnded(true);
    } else {
      setSeasonEnded(false);
    }
  }, [ctx[ctx.currentLeague]]);

  const setStateHandler = (newState) => {
    setstate(newState);
  };

  const toggleMenuHandler = () => {
    props.toggleMenu();
  };

  let content = "table";

  if (state === "table") {
    content = <Table />;
  } else if (state === "fixtures") {
    content = <Fixtures ended={seasonEnded} />;
  } else if (state === "teams") {
    content = <Teams />;
  } else if (state === "history") {
    content = <History />;
  }

  return (
    <div className="w-full ">
      <header className="bg-gradient-to-r to-green-50 from-gray-200 ">
        <div className="px-4 py-4 flex justify-between items-center">
          <h2 className=" text-3xl ">{ctx.currentLeague}</h2>
          <MobileBurger onClick={toggleMenuHandler}></MobileBurger>
        </div>
        <div className="px-4 pb-1 flex justify-evenly items-center ">
          <div
            className={`${linkClass} ${state === "table" ? borderClass : ""} `}
            onClick={setStateHandler.bind(null, "table")}>
            Table
          </div>
          <div
            className={`${linkClass} ${
              state === "fixtures" ? borderClass : ""
            } `}
            onClick={setStateHandler.bind(null, "fixtures")}>
            Fixtures
          </div>
          <div
            className={`${linkClass} ${state === "teams" ? borderClass : ""} `}
            onClick={setStateHandler.bind(null, "teams")}>
            Teams
          </div>
          <div
            className={`${linkClass} ${
              state === "history" ? borderClass : ""
            } `}
            onClick={setStateHandler.bind(null, "history")}>
            History
          </div>
        </div>
      </header>
      <div className="mt-8">{content}</div>
    </div>
  );
};

export default LeagueDetails;
