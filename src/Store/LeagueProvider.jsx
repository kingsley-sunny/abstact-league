import { useEffect, useReducer } from "react";
import initialState from "./initialState";
import League_Context from "./league-context";

let LOCAL_DATA;
if (localStorage.getItem("abstractLeague") === null) {
  LOCAL_DATA = initialState;
  localStorage.setItem("abstractLeague", JSON.stringify(LOCAL_DATA));
} else {
  LOCAL_DATA = { ...JSON.parse(localStorage.getItem("abstractLeague")) };
}

const leagueReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_LEAGUE":
      return { ...state, currentLeague: action.payload };
    case "SET_NEW_FIXTURES":
      return {
        ...state,
        [state.currentLeague]: {
          ...state[state.currentLeague],
          fixtures: action.payload,
        },
      };
    case "SET_MATCH_UPDATES":
      // lets make a new state so that we wont affect the other state.
      const updatedState = { ...state };
      //   this will extract the variables from the payload
      const { fixtureUpdate, competitionName, matchId } = action.payload;
      //   lets get the specific match fixture
      updatedState[competitionName].fixtures.forEach((matchWk) => {
        matchWk.fixtures.forEach((match, index) => {
          if (match.id === matchId) {
            matchWk.fixtures[index] = fixtureUpdate;
          }
        });
      });

      return { ...updatedState };
    case "SET_TEAM_UPDATES":
      //   lets check the team in the competition name
      const { homeTeam, awayTeam, competiton, matchWeek } = action.payload;
      const competitionType = { ...state[competiton] };
      competitionType.currentMatchWeek = matchWeek;
      competitionType.teams.forEach((team, index) => {
        if (team.id === homeTeam.id) {
          competitionType.teams[index] = homeTeam;
        } else if (team.id === awayTeam.id) {
          competitionType.teams[index] = awayTeam;
        }
      });

      return { ...state, [competiton]: competitionType };
    case "SET_CURRENT_FIXTURES":
      const fixtures = state[action.payload.leagueName].fixtures;
      let fixture;
      if (action.payload.type === "next") {
        fixture = fixtures[action.payload.index];
      }
      if (action.payload.type === "previous") {
        fixture = fixtures[action.payload.index - 1 - 1];
      }
      return {
        ...state,
        [action.payload.leagueName]: {
          ...state[action.payload.leagueName],
          currentFixtures: fixture,
        },
      };

    case "CLEAR_CURRENT_FIXTURES":
      const emptyFixture = { matchDay: 1, fixtures: [] };
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          currentFixtures: emptyFixture,
        },
      };

    case "CLEAR_LEAGUE_STAT":
      const teams = state[action.payload].teams;
      teams.forEach((team) => {
        for (const key in team.league) {
          team.league[key] = 0;
        }
      });

      return {
        ...state,
        [action.payload]: { ...state[action.payload], teams: teams },
      };

    case "ADD_TO_WINNERS":
      const history = state[action.payload.leagueName].history.winners;
      const winnerTeam = { name: action.payload.team.name };
      history.unshift(winnerTeam);
      return {
        ...state,
        [action.payload.leagueName]: {
          ...state[action.payload.leagueName],
          history: history,
        },
      };

    case "STORE":
      return { ...action.payload };

    case "SET_HISTORY":
      return {
        ...state,
        [action.payload.leagueName]: {
          ...state[action.payload.leagueName],
          history: action.payload.history,
        },
      };

    case "SET_TEAMS_AND_RELEGATED_TEAMS":
      return {
        ...state,
        [action.payload.leagueName]: {
          ...state[action.payload.leagueName],
          teams: action.payload.teams,
          relegatedTeams: action.payload.relegatedTeams,
        },
      };
    default:
      break;
  }
};

const LeagueProvider = (props) => {
  const [allDataState, dispatchLeagueReducer] = useReducer(
    leagueReducer,
    LOCAL_DATA
  );

  useEffect(() => {
    localStorage.setItem("abstractLeague", JSON.stringify(allDataState));
  }, [allDataState]);

  const setCurrentLeagueHandler = (league) => {
    dispatchLeagueReducer({ payload: league, type: "SET_CURRENT_LEAGUE" });
  };

  const setFixturesHandler = (gottenFixtures) => {
    dispatchLeagueReducer({
      payload: gottenFixtures,
      type: "SET_NEW_FIXTURES",
    });
  };

  const setMatchUpdatesHandler = ({
    fixtureUpdate,
    competitionName,
    matchId,
  }) => {
    dispatchLeagueReducer({
      type: "SET_MATCH_UPDATES",
      payload: { fixtureUpdate, competitionName, matchId },
    });
  };

  const setTeamUpdatesHandler = (homeTeam, awayTeam, competiton) => {
    dispatchLeagueReducer({
      type: "SET_TEAM_UPDATES",
      payload: { homeTeam, awayTeam, competiton },
    });
  };

  const setCurrentFixturesHandler = (index, competitionName, type) => {
    dispatchLeagueReducer({
      type: "SET_CURRENT_FIXTURES",
      payload: { index: index, leagueName: competitionName, type: type },
    });
  };

  const clearCurrentFixturesHandler = (leagueName) => {
    dispatchLeagueReducer({
      type: "CLEAR_CURRENT_FIXTURES",
      payload: leagueName,
    });
  };

  const clearTeamLeagueStatHandler = (leagueName) => {
    dispatchLeagueReducer({ type: "CLEAR_LEAGUE_STAT", payload: leagueName });
  };

  const updateLeagueWinnersHandler = (leagueName, team) => {
    dispatchLeagueReducer({
      type: "ADD_TO_WINNERS",
      payload: { leagueName: leagueName, winner: team },
    });
  };

  const setHistoryHandler = (history, leagueName) => {
    dispatchLeagueReducer({
      type: "SET_HISTORY",
      payload: { leagueName: leagueName, history: history },
    });
  };

  const setTeamsAndRelegatedTeamsHandler = (
    teams,
    relegatedTeams,
    leagueName
  ) => {
    dispatchLeagueReducer({
      type: "SET_TEAMS_AND_RELEGATED_TEAMS",
      payload: {
        leagueName: leagueName,
        teams: teams,
        relegatedTeams: relegatedTeams,
      },
    });
  };

  const leagueContext = {
    ...allDataState,
    setFixtures: setFixturesHandler,
    setCurrentLeague: setCurrentLeagueHandler,
    setMatchUpdates: setMatchUpdatesHandler,
    setTeamUpdates: setTeamUpdatesHandler,
    setCurrentFixtures: setCurrentFixturesHandler,
    clearCurrentFixtures: clearCurrentFixturesHandler,
    clearTeamLeagueStat: clearTeamLeagueStatHandler,
    updateLeagueWinners: updateLeagueWinnersHandler,
    setHistory: setHistoryHandler,
    setTeamsAndRelegatedTeams: setTeamsAndRelegatedTeamsHandler,
  };

  //   throw Error("hslkjf");

  return (
    <League_Context.Provider value={{ ...leagueContext }}>
      {props.children}
    </League_Context.Provider>
  );
};

export default LeagueProvider;
