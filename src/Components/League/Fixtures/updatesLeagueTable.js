const updatesLeagueTable = (
  previousHomeLeagueStat,
  previousAwayLeagueStat,
  homeScore,
  awayScore,
  homeTeam,
  awayTeam
) => {
  if (homeScore > awayScore) {
    homeTeam.league.wins = previousHomeLeagueStat.wins + 1;
    homeTeam.league.draw = previousHomeLeagueStat.draw;
    homeTeam.league.lose = previousHomeLeagueStat.lose;
    homeTeam.league.pts = previousHomeLeagueStat.pts + 3;

    // check for the away
    awayTeam.league.wins = previousAwayLeagueStat.wins;
    awayTeam.league.draw = previousAwayLeagueStat.draw;
    awayTeam.league.lose = previousAwayLeagueStat.lose + 1;
    awayTeam.league.pts = previousAwayLeagueStat.pts;

    // if the home draw
  } else if (homeScore === awayScore) {
    homeTeam.league.wins = previousHomeLeagueStat.wins;
    homeTeam.league.draw = previousHomeLeagueStat.draw + 1;
    homeTeam.league.lose = previousHomeLeagueStat.lose;
    homeTeam.league.pts = previousHomeLeagueStat.pts + 1;

    // check for the away
    awayTeam.league.wins = previousAwayLeagueStat.wins;
    awayTeam.league.draw = previousAwayLeagueStat.draw + 1;
    awayTeam.league.lose = previousAwayLeagueStat.lose;
    awayTeam.league.pts = previousAwayLeagueStat.pts + 1;

    // check if home lose
  } else if (awayScore > homeScore) {
    awayTeam.league.wins = previousAwayLeagueStat.wins + 1;
    awayTeam.league.draw = previousAwayLeagueStat.draw;
    awayTeam.league.lose = previousAwayLeagueStat.lose;
    awayTeam.league.pts = previousAwayLeagueStat.pts + 3;

    // check for the away
    homeTeam.league.wins = previousHomeLeagueStat.wins;
    homeTeam.league.draw = previousHomeLeagueStat.draw;
    homeTeam.league.lose = previousHomeLeagueStat.lose + 1;
    homeTeam.league.pts = previousHomeLeagueStat.pts;
  }

  return { homeStat: homeTeam.league, awayStat: awayTeam.league };
};

export default updatesLeagueTable;
