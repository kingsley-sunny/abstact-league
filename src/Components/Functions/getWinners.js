const getWinners = (winners) => {
  const gottenWinnersNames = [];
  const gottenWinners = [];

  winners.forEach((winner) => {
    if (!gottenWinnersNames.includes(winner.name)) {
      gottenWinnersNames.push(winner.name);
      gottenWinners.push({ name: winner.name, value: 1 });
    } else {
      const index = gottenWinners.findIndex((win) => win.name === winner.name);
      gottenWinners[index] = {
        name: gottenWinners[index].name,
        value: gottenWinners[index].value + 1,
      };
    }
  });

  const sortedWinners = gottenWinners.sort(
    (teamA, teamB) => teamB.value - teamA.value
  );

  return sortedWinners;
};

export default getWinners;
