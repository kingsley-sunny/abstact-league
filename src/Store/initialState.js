import animalTeams from "./animalTeams";
import carsTeams from "./carsTeams";
import fruitsTeams from "./fruitsTeams";
import phonesTeams from "./phonesTeams";

const initialState = {
  animalsLeague: {
    teams: animalTeams.teams,
    relegatedTeams: animalTeams.relegatedTeams,
    fixtures: [],
    currentFixtures: { matchDay: 1, fixtures: [] },
    currentMatchWeek: 0,
    history: {
      winners: [
        { name: "hyena", pts: 79 },
        { name: "elephant", pts: 16 },
        { name: "lion", pts: 15 },
        { name: "lion", pts: 14 },
        { name: "whale", pts: 14 },
        { name: "elephant", pts: 13 },
      ],
      highestPointsInALeague: { name: "hyena", value: 79 },
      highestGoalInALeague: { name: "eagle", value: 67 },
      highestGoalDiffInALeague: { name: "eagle", value: 39 },
      highestWinsInALeague: { name: "eagle", value: 21 },
    },
  },
  fruitsLeague: {
    teams: fruitsTeams.teams,
    relegatedTeams: fruitsTeams.relegatedTeams,
    fixtures: [],
    currentFixtures: { matchDay: 1, fixtures: [] },
    currentMatchWeek: 0,
    history: {
      winners: [
        { name: "Apple", pts: 15 },
        { name: "Pineapple", pts: 16 },
        { name: "Pineapple", pts: 14 },
        { name: "Apple", pts: 10 },
      ],
      highestPointsInALeague: { name: "Pineapple", value: 0 },
      highestGoalInALeague: { name: "Pineapple", value: 0 },
      highestGoalDiffInALeague: { name: "Pineapple", value: 0 },
      highestWinsInALeague: { name: "Pineapple", value: 0 },
    },
  },
  phonesLeague: {
    teams: phonesTeams.teams,
    relegatedTeams: phonesTeams.relegatedTeams,
    fixtures: [],
    currentFixtures: { matchDay: 1, fixtures: [] },
    currentMatchWeek: 0,
    history: {
      winners: [],
      highestPointsInALeague: { name: "Iphone", value: 0 },
      highestGoalInALeague: { name: "Iphone", value: 0 },
      highestGoalDiffInALeague: { name: "Iphone", value: 0 },
      highestWinsInALeague: { name: "Iphone", value: 0 },
    },
  },
  carsLeague: {
    teams: carsTeams.teams,
    relegatedTeams: carsTeams.relegatedTeams,
    fixtures: [],
    currentFixtures: { matchDay: 1, fixtures: [] },
    currentMatchWeek: 0,
    history: {
      winners: [],
      highestPointsInALeague: { name: "Camry", value: 0 },
      highestGoalInALeague: { name: "Camry", value: 0 },
      highestGoalDiffInALeague: { name: "Camry", value: 0 },
      highestWinsInALeague: { name: "Camry", value: 0 },
    },
  },
  currentLeague: "animalsLeague",
};

export default initialState;
