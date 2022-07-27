const getMatchShotStatictics = (homeMidfield, awayMidfield, seconds) => {
  const shotRatio = Math.floor(Math.random() * 15) + 30;
  let homeTeamNoOfShots = Math.round(shotRatio / awayMidfield);
  let awayTeamNoOfShots = Math.round(shotRatio / homeMidfield);

  let homeTeamInterval = Math.floor((90 * seconds) / homeTeamNoOfShots);
  let awayTeamInterval = Math.floor((90 * seconds) / awayTeamNoOfShots);

  const goal = parseFloat((Math.random() * 3).toFixed(2)) + 8;

  return { goal, homeTeamInterval, awayTeamInterval };
};

export default getMatchShotStatictics;
