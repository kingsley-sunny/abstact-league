const getTeamsAndRelegatedTeams = (jj, ll, league) => {
  const promotedTeamsId = [];
  const promotedTeams = [];
  let relegatedTeams = [];

  const teams = [...jj];
  let lowerLeagueTeams = [...ll];

  //   lets get the promotedTeams id randomly
  while (promotedTeamsId.length < 3) {
    const random = Math.floor(Math.random() * lowerLeagueTeams.length);
    const gottenQualifiedTeam = lowerLeagueTeams[random];
    if (!promotedTeamsId.includes(gottenQualifiedTeam.id)) {
      promotedTeamsId.push(gottenQualifiedTeam.id);
      promotedTeams.push(gottenQualifiedTeam);
    }
  }

  // lets get the relegatedTeams;
  console.log("teams: ", teams);

  const deletedTeams = teams.splice(0, 3);
  console.log(deletedTeams);

  console.log("deletedTeams: ", deletedTeams, "promotedTeams: ", promotedTeams);

  promotedTeams.forEach((team) => {
    lowerLeagueTeams = lowerLeagueTeams.filter(
      (relTeam) => relTeam.id !== team.id
    );
  });

  teams.push(promotedTeams[0]);
  teams.push(promotedTeams[1]);
  teams.push(promotedTeams[2]);

  lowerLeagueTeams.push(deletedTeams[0]);
  lowerLeagueTeams.push(deletedTeams[1]);
  lowerLeagueTeams.push(deletedTeams[2]);

  //   lets push the promoted to the main teams
  //   promotedTeams.forEach((team) => {
  //     teams.push(team);
  //   });

  //   console.log("teams: ", teams);

  //   promotedTeams.forEach((team) => {
  //     lowerLeagueTeams = lowerLeagueTeams.filter(
  //       (relTeam) => relTeam.id !== team.id
  //     );
  //   });

  //   console.log("lowerLeagueTeams: ", lowerLeagueTeams);

  //   deletedTeams.forEach((team) => {
  //     lowerLeagueTeams.push(team);
  //   });

  //   console.log("lowerLeagueTeams: ", lowerLeagueTeams);

  //   console.log("teams: ", teams, "lower league teams: ", lowerLeagueTeams);

  return { teams: teams, relegatedTeams: lowerLeagueTeams, league };
};

export default getTeamsAndRelegatedTeams;
