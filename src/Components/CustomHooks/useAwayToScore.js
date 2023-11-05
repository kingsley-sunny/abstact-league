import { useContext } from "react";
import League_Context from "../../Store/league-context";
import updatesLeagueTable from "../League/Fixtures/updatesLeagueTable";

const useAwayToScore = () => {
  const ctx = useContext(League_Context);

  function setAwayToScore(
    home,
    away,
    previousHome,
    previousAway,
    goal,
    match,
    competitionName,
    matchId
  ) {
    const homeTeam = home;
    const awayTeam = away;
    const updatedMatch = match;
    const awayToScore =
      Math.floor(Math.random() * (goal + awayTeam.overall / 1.5)) + awayTeam.attack;

    if (awayToScore - homeTeam.defence - homeTeam.midfield / 3 - homeTeam.attack / 2 >= goal) {
      updatedMatch.awayScore += 1;

      // setting the GF for the league if the home team scores
      awayTeam.league.GF += 1;
      awayTeam.league.GD += 1;

      // setting the GD for the league if the home team scores
      homeTeam.league.GA += 1;
      homeTeam.league.GD -= 1;

      // lets check for homes and away team
      const updatedLeagueTable = updatesLeagueTable(
        previousHome,
        previousAway,
        updatedMatch.homeScore,
        updatedMatch.awayScore,
        homeTeam,
        awayTeam
      );

      // lets update the home teams base on the data gotten from the updatesleagueTable function
      homeTeam.league.wins = updatedLeagueTable.homeStat.wins;
      homeTeam.league.draw = updatedLeagueTable.homeStat.draw;
      homeTeam.league.lose = updatedLeagueTable.homeStat.lose;
      homeTeam.league.pts = updatedLeagueTable.homeStat.pts;

      // lets update the away teams base on the data gotten from the updatesleagueTable function
      awayTeam.league.wins = updatedLeagueTable.awayStat.wins;
      awayTeam.league.draw = updatedLeagueTable.awayStat.draw;
      awayTeam.league.lose = updatedLeagueTable.awayStat.lose;
      awayTeam.league.pts = updatedLeagueTable.awayStat.pts;

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

  return setAwayToScore;
};

export default useAwayToScore;
