import { useContext } from "react";
import League_Context from "../../../Store/league-context";

const LeagueRecords = () => {
  const ctx = useContext(League_Context);

  const highestPoints = ctx[ctx.currentLeague].history.highestPointsInALeague;
  const highestGoals = ctx[ctx.currentLeague].history.highestGoalInALeague;
  const highestGoalDif =
    ctx[ctx.currentLeague].history.highestGoalDiffInALeague;
  const highestWins = ctx[ctx.currentLeague].history.highestWinsInALeague;

  const className = "flex justify-between items-center py-2 text-xs gap-4 mt-3";

  return (
    <div>
      <div className={className}>
        <div className="grow">Highest Points in a League</div>
        <div className="w-24 text-center">{highestPoints.name}</div>
        <div className="w-24 text-center">{highestPoints.value}</div>
      </div>

      <div className={className}>
        <div className="grow">Highest Goals in a League</div>
        <div className="w-24 text-center">{highestGoals.name}</div>
        <div className="w-24 text-center">{highestGoals.value}</div>
      </div>

      <div className={className}>
        <div className="grow">Highest Goal Diff a League</div>
        <div className="w-24 text-center">{highestGoalDif.name}</div>
        <div className="w-24 text-center">{highestGoalDif.value}</div>
      </div>

      <div className={className}>
        <div className="grow">Highest Wins in a League</div>
        <div className="w-24 text-center">{highestWins.name}</div>
        <div className="w-24 text-center">{highestWins.value}</div>
      </div>
    </div>
  );
};

export default LeagueRecords;
