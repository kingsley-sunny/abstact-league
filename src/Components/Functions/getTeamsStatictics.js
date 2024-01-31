const getTeamsStatictics = (home, away, match) => {
  const homeTeam = {
    attack: home.attack,
    defence: home.defence,
    midfield: home.midfield,
    overall: home.overall,
  };
  const awayTeam = {
    attack: away.attack,
    defence: away.defence,
    midfield: away.midfield,
    overall: away.overall,
  };

  for (const key in homeTeam) {
    if (homeTeam[key] < 1.5 && homeTeam[key] !== "midfield") {
      homeTeam[key] = 2;
    } else if (homeTeam[key] < 3 && homeTeam[key] === "midfield") {
      homeTeam[key] = 4;
    } else {
      homeTeam[key] += 0.0025;
    }
  }

  for (const key in awayTeam) {
    if (awayTeam[key] < 1.5) {
      awayTeam[key] = 2;
    } else if (awayTeam[key] > 3 && awayTeam[key] === "midfield") {
      awayTeam[key] = 4;
    } else {
      awayTeam[key] += 0.0025;
    }
  }

  //   Setting the highest key to a particular value
  for (const key in homeTeam) {
    if (homeTeam[key] > 5 && homeTeam[key] !== "midfield") {
      homeTeam[key] = 5;
    } else if (homeTeam[key] > 10 && homeTeam[key] === "midfield") {
      homeTeam[key] = 8;
    }
  }

  for (const key in awayTeam) {
    if (awayTeam[key] > 5 && awayTeam[key] !== "midfield") {
      awayTeam[key] = 5;
    } else if (awayTeam[key] > 10 && awayTeam[key] === "midfield") {
      awayTeam[key] = 8;
    }
  }

  //   This update the home teams base on  teams that wins and draw
  if (match.homeScore > match.awayScore) {
    for (const key in homeTeam) {
      homeTeam[key] += 0.0005;
    }

    for (const key in awayTeam) {
      awayTeam[key] -= 0.0005;
    }
  }
  if (match.homeScore < match.awayScore) {
    for (const key in homeTeam) {
      homeTeam[key] -= 0.0005;
    }

    for (const key in awayTeam) {
      awayTeam[key] += 0.0005;
    }
  }

  // This updates the teams base on score
  if (match.homeScore > 3) {
    homeTeam.attack += 0.0025;
    homeTeam.midfield += 0.0125;

    awayTeam.defence -= 0.0025;
    awayTeam.midfield -= 0.0125;
  }

  if (match.awayScore > 3) {
    awayTeam.attack += 0.0025;
    awayTeam.midfield += 0.0125;

    homeTeam.defence -= 0.0025;
    homeTeam.midfield -= 0.0125;
  }

  // This updates the teams base on score
  if (match.homeScore < 2) {
    awayTeam.defence += 0.0025;
    awayTeam.midfield += 0.0125;

    if (match.homeScore === 0) {
      awayTeam.defence += 0.0025;
      awayTeam.midfield += 0.0125;

      homeTeam.attack = homeTeam.attack - 0.0025;
      homeTeam.midfield -= 0.0025;
    }
  }

  if (match.awayScore < 2) {
    homeTeam.defence += 0.0025;
    homeTeam.midfield += 0.0125;

    if (match.awayScore === 0) {
      homeTeam.defence += 0.0025;
      homeTeam.midfield += 0.0125;

      awayTeam.attack = awayTeam.attack - 0.0025;
      awayTeam.midfield -= 0.0025;
    }
  }

  if (homeTeam.overall - awayTeam.overall >= 0.5 && match.awayScore >= match.homeScore) {
    homeTeam.attack -= 0.1;
    homeTeam.midfield -= 0.2;
    homeTeam.defence -= 0.1;
  }

  if (awayTeam.overall - homeTeam.overall >= 0.5 && match.homeScore >= match.awayScore) {
    awayTeam.attack -= 0.1;
    awayTeam.midfield -= 0.2;
    awayTeam.defence -= 0.1;
  }

  homeTeam.overall = homeTeam.attack + homeTeam.defence + homeTeam.midfield;
  awayTeam.overall = awayTeam.attack + awayTeam.defence + awayTeam.midfield;

  for (const key in homeTeam) {
    homeTeam[key] = parseFloat(parseFloat(homeTeam[key]).toFixed(4));
    awayTeam[key] = parseFloat(parseFloat(awayTeam[key]).toFixed(4));
  }

  return { home: homeTeam, away: awayTeam };
};

export default getTeamsStatictics;
