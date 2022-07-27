const changeHistory = (history, teams, leagueName) => {
  // lets add to the winners
  const winner = { name: teams[0].name, pts: teams[0].league.pts };
  console.log(history.winners);
  history.winners.unshift(winner);
  const winners = history.winners;

  // lets check the higest points in a league;
  // let leagueHighPoint = teams.sort((teamA, teamB) => teamB.league.pts - teamA.league.pts)[0];
  // let leagueHighestPoint = {name: leagueHighPoint.name, pts: leagueHighPoint.league.pts};
  // let highestPoint = history.highestPointsInALeague;
  // if (leagueHighestGoalDif.value > highestGoalDif.value) {
  //     highestGoalDif = leagueHighestGoalDif;
  //   }

  const highPointed = teams[0];
  let highPoint = { name: highPointed.name, value: highPointed.league.pts };
  let highestPoint = history.highestPointsInALeague;
  if (highPoint.value > highestPoint.value) {
    highestPoint = highPoint;
  } else {
    highestPoint = history.highestPointsInALeague;
  }

  //   lets check for the highestGoal
  const leagueHighGoal = teams.sort(
    (teamA, teamB) => teamB.league.GF - teamA.league.GF
  )[0];
  let leagueHighestGoal = {
    name: leagueHighGoal.name,
    value: leagueHighGoal.league.GF,
  };
  let highestGoal = history.highestGoalInALeague;
  if (leagueHighestGoal.value > highestGoal.value) {
    highestGoal = leagueHighestGoal;
  }

  // lets check for the highest goal difference
  const leagueHighGoalDif = teams.sort(
    (teamA, teamB) => teamB.league.GD - teamA.league.GD
  )[0];
  let leagueHighestGoalDif = {
    name: leagueHighGoalDif.name,
    value: leagueHighGoal.league.GD,
  };
  let highestGoalDif = history.highestGoalDiffInALeague;
  if (leagueHighestGoalDif.value > highestGoalDif.value) {
    highestGoalDif = leagueHighestGoalDif;
  }

  // lets check for the highest wins
  const leagueHighWin = teams.sort(
    (teamA, teamB) => teamB.league.wins - teamA.league.wins
  )[0];
  let leagueHighestWin = {
    name: leagueHighWin.name,
    value: leagueHighWin.league.wins,
  };
  let highestWins = history.highestGoalDiffInALeague;
  if (leagueHighestWin.value > highestWins.value) {
    highestWins = leagueHighestWin;
  }

  return {
    history: {
      winners: winners,
      highestPointsInALeague: highestPoint,
      highestGoalInALeague: highestGoal,
      highestGoalDiffInALeague: highestGoalDif,
      highestWinsInALeague: highestWins,
    },
    leagueName: leagueName,
  };
};

export default changeHistory;
