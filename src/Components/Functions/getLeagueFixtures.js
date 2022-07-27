import uid from "./uid";

// The league argument can be a string
const GetLeagueFixtures = (array, league) => {
  // lets declear number of features
  const noOfFeatures = array.length - 1;
  // lets declear fixtures
  let fixtures = [];
  // array must be even

  // lets get first column
  const firstRow = array.filter(
    (team) => array.indexOf(team) < array.length / 2
  );
  const secondRow = array
    .filter((team) => array.indexOf(team) >= array.length / 2)
    .reverse();

  // lets loop through all match day
  for (let matchDay = 1; matchDay <= noOfFeatures; matchDay++) {
    // if it is the first match day lets get just the fixtures
    if (matchDay === 1) {
      // lets set the fixtures match day
      const matchDayIndex = matchDay - 1;
      fixtures[matchDayIndex] = { matchDay: matchDay, fixtures: [] };

      // lets fix the fixtures for the first day
      firstRow.forEach((team, index) => {
        const teamA = firstRow[index];
        const teamB = secondRow[index];
        fixtures[matchDayIndex].fixtures.push({
          id: uid(),
          name: `${teamB.name} vs ${teamA.name}`,
          homeTeam: teamB,
          awayTeam: teamA,
          winner: "null",
          loser: "null",
          draw: "null",
          homeScore: "",
          awayScore: "",
          matchStatus: "not yet Played",
        });
      });
    } else {
      // lets do the logic for the other day (now i != 0)
      // lets find the last team of the firstRow and the first team of the secondRow
      const lastTeamOfFirstRow = firstRow[firstRow.length - 1];
      const firstTeamOfSecondRow = secondRow[0];

      // lets put the first team of the second column to the second index of the first column and then remove it
      firstRow.splice(1, 0, firstTeamOfSecondRow);
      secondRow.shift();

      // lets put the last team of the firstRow to the last index  of the second column and then remove it
      secondRow.push(lastTeamOfFirstRow);
      firstRow.pop();

      const matchDayIndex = matchDay - 1;
      fixtures[matchDayIndex] = { matchDay: matchDay, fixtures: [] };

      // lets fix the fixtures for the rest of the day
      firstRow.forEach((team, index) => {
        // Make a home team and away team variable
        const teamA = firstRow[index];
        const teamB = secondRow[index];

        // check if the match Day is even or old, if it is odd teamA is home and vice-virsa
        if (matchDay % 2 === 0) {
          fixtures[matchDayIndex].fixtures.push({
            id: uid(),
            name: `${teamB.name} vs ${teamA.name}`,
            homeTeam: teamB,
            awayTeam: teamA,
            winner: "null",
            loser: "null",
            draw: "null",
            homeScore: "",
            awayScore: "",
            matchStatus: "not yet Played",
          });
        } else {
          fixtures[matchDayIndex].fixtures.push({
            id: uid(),
            name: `${teamA.name} vs ${teamB.name}`,
            homeTeam: teamA,
            awayTeam: teamB,
            winner: "null",
            loser: "null",
            draw: "null",
            homeScore: "",
            awayScore: "",
            matchStatus: "not yet Played",
          });
        }
      });
    }
  }
  // get the fixtures for the round 1
  const roundOne = [...fixtures];

  // get the fixtures for the round 2: to get this fixtures we have to split the fixtures into two halfs and then randomly get the fixtures for the first one and then for the second one;

  // initializing roundTwo
  const roundTwo = [...roundOne];
  // Loop through the round two array
  roundTwo.forEach((matches, index) => {
    // make a new variable to hold the desturctured matches object
    const newMatches = { ...matches };

    //   Fixing the match day
    newMatches.matchDay += array.length - 1;

    //   fixing the fixtures
    let fixFixtures = [];

    newMatches.fixtures.forEach((fix, i) => {
      const newFix = { ...fix };

      // This interchange the old sim and the away sim
      const homeTeam = newFix.awayTeam;
      const awayTeam = newFix.homeTeam;

      // Assinging the interchanged value
      newFix.homeTeam = homeTeam;
      newFix.awayTeam = awayTeam;

      newFix.name = `${newFix.homeTeam.name} vs ${newFix.awayTeam.name}`;

      //   lets create a new id
      newFix.id = uid();

      fixFixtures.push(newFix);
    });

    newMatches.fixtures = fixFixtures;

    roundTwo[index] = { ...newMatches };
  });

  return [...roundOne, ...roundTwo];
};

export default GetLeagueFixtures;
