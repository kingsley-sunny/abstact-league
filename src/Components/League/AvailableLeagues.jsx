import { useContext } from "react";
import League_Context from "../../Store/league-context";

const AvailableLeagues = () => {
  const context = useContext(League_Context);
  return <div>THIS IS THE {context.currentLeague} LEAGUE</div>;
};

export default AvailableLeagues;
