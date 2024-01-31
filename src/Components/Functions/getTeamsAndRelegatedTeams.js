const getTeamsAndRelegatedTeams = (formalTeams, formalRelegatedTeams, league) => {
  const promotedTeamsId = [];
  const promotedTeams = [];
  let relegatedTeams = [];

  const teams = [...formalTeams];
  let lowerLeagueTeams = [...formalRelegatedTeams];

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

  const deletedTeams = teams.reverse().splice(0, 3);
  console.log("deleted_teams", deletedTeams);

  console.log("deletedTeams: ", deletedTeams, "promotedTeams: ", promotedTeams);

  promotedTeams.forEach(team => {
    lowerLeagueTeams = lowerLeagueTeams.filter(relTeam => relTeam.id !== team.id);
  });

  // get the lowest team in the formalLeague
  const averageTeams = deletedTeams.reduce((prev, curr) => {
    return {
      attack: prev.attack + curr.attack,
      midfield: prev.midfield + curr.midfield,
      defence: prev.defence + curr.defence,
      overall: prev.overall + curr.overall,
    };
  });

  //   we reset the promoted teams attack, midfield and defense
  promotedTeams.forEach(team => {
    team.attack = Number((averageTeams.attack / 3).toFixed(4));
    team.defence = Number((averageTeams.defence / 3).toFixed(4));
    team.midfield = Number((averageTeams.midfield / 3).toFixed(4));
    team.overall = Number((averageTeams.overall / 3).toFixed(4));
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

  console.log("new teams: ", teams);

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
