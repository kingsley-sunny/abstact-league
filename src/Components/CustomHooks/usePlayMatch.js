import { useContext } from "react";
import League_Context from "../../Store/league-context";
import getTeamsStatictics from "../Functions/getTeamsStatictics";


const FULL_MATCH_MINUTES = 90;

const usePlayMatch = () => {
  const ctx = useContext(League_Context);
  function playNow(
    home,
    away,
    competitionName,
    matchTime,
    updatedMatch,
    extraTime,
    startMatch,
    awayTeamToShoot,
    homeTeamToShoot,
    matchWeek,
    matchId
  ) {
    let homeTeam = { ...home };
    let awayTeam = { ...away };

    updatedMatch.matchStatus = "live " + matchTime;

    ctx.setMatchUpdates({
      fixtureUpdate: { ...updatedMatch },
      competitionName,
      matchId,
    });

    // If the match has ended
    if (matchTime === FULL_MATCH_MINUTES + extraTime) {
      clearInterval(startMatch);
      clearInterval(awayTeamToShoot);
      clearInterval(homeTeamToShoot);

      updatedMatch.matchStatus = "full-time";

      const gotten = getTeamsStatictics(
        { ...homeTeam },
        { ...awayTeam },
        { ...updatedMatch }
      );

      homeTeam = { ...homeTeam, ...gotten.home };
      awayTeam = { ...awayTeam, ...gotten.away };

      ctx.setMatchUpdates({
        fixtureUpdate: {
          ...updatedMatch,
          homeTeam: homeTeam,
          awayTeam: awayTeam,
        },
        competitionName,
        matchId,
      });

      ctx.setTeamUpdates(homeTeam, awayTeam, competitionName);
    }
  }

  return playNow;
};

export default usePlayMatch;
