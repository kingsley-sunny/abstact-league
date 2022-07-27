import { createContext } from "react";

const League_Context = createContext({
  animalLeague: {
    teams: [
      {
        name: "tiger",
        league: { wins: 0, draw: 0, lose: 0, GF: 0, GA: 0, currentGoal: 0 },
        attack: 2,
        id: "team1",
        defence: 2,
      },
      {
        name: "lion",
        league: { wins: 0, draw: 0, lose: 0, GF: 0, GA: 0, currentGoal: 0 },
        attack: 2,
        id: "team2",
        defence: 2,
      },
      {
        name: "elephant",
        league: { wins: 0, draw: 0, lose: 0, GF: 0, GA: 0, currentGoal: 0 },
        attack: 2,
        id: "team3",
        defence: 2,
      },
      {
        name: "whale",
        league: { wins: 0, draw: 0, lose: 0, GF: 0, GA: 0, currentGoal: 0 },
        attack: 2,
        id: "team4",
        defence: 2,
      },
      // {name: "crocodile", league: {wins:0, draw: 0, lose: 0, GF: 0, GA: 0, currentGoal: 0}, attack: 2, id: "team5", defence: 2},
      // {name: "hippotamus", league: {wins:0, draw: 0, lose: 0, GF: 0, GA: 0, currentGoal: 0}, attack: 2, id: "team6", defence: 2},
      // {name: "eagle", league: {wins:0, draw: 0, lose: 0, GF: 0, GA: 0, currentGoal: 0}, attack: 2, id: "team7", defence: 2},
      // {name: "leopard", league: {wins:0, draw: 0, lose: 0, GF: 0, GA: 0, currentGoal: 0}, attack: 2, id: "team8, defence: 2},
    ],
    fixtures: [],
  },
  currentLeague: "animal",
  setLatestFixtures: () => {},
});

export default League_Context;
