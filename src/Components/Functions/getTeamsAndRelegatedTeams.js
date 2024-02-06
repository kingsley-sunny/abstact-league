const getTeamsAndRelegatedTeams = (formalTeams, formalRelegatedTeams, league) => {
  const promotedTeamsId = [];
  const promotedTeams = [];
  let relegatedTeams = [];

  const teams = [
    ...formalTeams.sort((teamA, teamB) => {
      return (
        teamB.league.pts - teamA.league.pts ||
        teamB.league.GD - teamA.league.GD ||
        teamA.league.GA - teamB.league.GA
      );
    }),
  ];
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
  console.log("teams: ", formalTeams);

  const deletedTeams = teams.slice(-3);
  console.log("deleted_teams", deletedTeams);

  // remove the three last teams
  teams.pop();
  teams.pop();
  teams.pop();

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

  const newTeams = teams.map((team, index) => {
    if (index >= 0 && index < 4) {
      return {
        ...team,
        attack: 2.8,
        midfield: 4.8,
        defence: 2.8,
        overall: 10.4,
      };
    }
    if (index > 3 && index < 8) {
      return {
        ...team,
        attack: 2.6,
        midfield: 4.6,
        defence: 2.6,
        overall: 9.8,
      };
    }
    if (index > 7 && index < 12) {
      return {
        ...team,
        attack: 2.4,
        midfield: 4.4,
        defence: 2.4,
        overall: 9.2,
      };
    }
    if (index > 11 && index < 16) {
      return {
        ...team,
        attack: 2.2,
        midfield: 4.2,
        defence: 2.2,
        overall: 8.6,
      };
    }
    if (index > 15 && index < 20) {
      return {
        ...team,
        attack: 2,
        midfield: 4,
        defence: 2,
        overall: 8,
      };
    }
  });

  console.log("new teams: ", newTeams);

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

  return { teams: newTeams, relegatedTeams: lowerLeagueTeams, league };
};

export default getTeamsAndRelegatedTeams;
