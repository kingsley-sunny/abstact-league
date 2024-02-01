import React, { useContext } from "react";
import League_Context from "../../../Store/league-context";
import useAwayToScore from "../../CustomHooks/useAwayToScore";
import useHomeToScore from "../../CustomHooks/useHomeToScore";
import usePlayMatch from "../../CustomHooks/usePlayMatch";
import changeHistory from "../../Functions/changeHistory";
import getLeagueFixtures from "../../Functions/getLeagueFixtures";
import getMatchShotStatictics, { getGoal } from "../../Functions/getMatchShotStatictics";
import getTeamsAndRelegatedTeams from "../../Functions/getTeamsAndRelegatedTeams";
import Button from "../../UI/Button";
import EachFixture from "./EachFixture";

const Fixtures = () => {
  // The league context
  const ctx = useContext(League_Context);
  const playNow = usePlayMatch();
  const setHomeToScore = useHomeToScore();
  const setAwayToScore = useAwayToScore();

  const currentFixture = ctx[ctx.currentLeague].currentFixtures;
  const lastFixtures = ctx[ctx.currentLeague].fixtures.length;

  //   All the states

  //   This will set a new fixtures for the season
  const setNewFixturesHandler = () => {
    const gottenFixtures = getLeagueFixtures(ctx[ctx.currentLeague].teams, ctx.currentLeague);
    ctx.setFixtures(gottenFixtures);
    ctx.setCurrentFixtures(0, ctx.currentLeague, "next");
  };

  //   This fuction will end the season
  const endSeasonHandler = () => {
    const lastFixture = ctx[ctx.currentLeague].fixtures.at(-1);
    let live = [];
    lastFixture.fixtures.forEach(fixture => {
      if (fixture.matchStatus.includes("live")) {
        live.push(true);
      } else {
        live.push(false);
      }
    });

    const findEnded = live.find(team => team === true);

    if (findEnded) {
      alert("Allow match to finish first");
    } else {
      ctx.setFixtures([]);
      ctx.clearCurrentFixtures(ctx.currentLeague);
      const gottenHistory = changeHistory(
        ctx[ctx.currentLeague].history,
        ctx[ctx.currentLeague].teams,
        ctx.currentLeague
      );
      ctx.setHistory(gottenHistory.history, gottenHistory.leagueName);
      ctx.clearTeamLeagueStat(ctx.currentLeague);
      // ctx.setHistory();
      setTimeout(() => {
        const teams = getTeamsAndRelegatedTeams(
          ctx[ctx.currentLeague].teams,
          ctx[ctx.currentLeague].relegatedTeams,
          ctx.currentLeague
        );
        ctx.setTeamsAndRelegatedTeams(teams.teams, teams.relegatedTeams, teams.league);
      }, 1000);
    }
  };

  const data = [2, 3, 45, 4];

  for (let i = data.length - 1; i === 2; i--) {
    console.log(i);
    if (i === data.length - 3) {
      break;
    }
  }

  //   This function is controls how the match is played
  const playMatchHandler = (match, competitionName, matchWeek) => {
    let seconds = 500;

    // lets name the change the variables

    const home = {
      ...ctx[competitionName].teams.find(team => team.id === match.homeTeam.id),
    };
    const away = {
      ...ctx[competitionName].teams.find(team => team.id === match.awayTeam.id),
    };

    ctx[competitionName].currentMatchWeek = matchWeek;

    const homeTeam = home;
    const awayTeam = away;

    const previousHome = { ...homeTeam.league };
    const previousAway = { ...awayTeam.league };

    // lets set the home team and the away team match played
    homeTeam.league.matchPlayed += 1;
    awayTeam.league.matchPlayed += 1;

    // lets set the home and away team and the away team to be draw initially
    homeTeam.league.draw += 1;
    awayTeam.league.draw += 1;

    homeTeam.league.pts += 1;
    awayTeam.league.pts += 1;

    // lets get the statictics for the shot
    const { homeTeamInterval, awayTeamInterval } = getMatchShotStatictics(
      homeTeam.midfield,
      awayTeam.midfield,
      seconds
    );

    // set the match time variable and the extra time
    let matchTime = 0;
    const extraTime = Math.floor(Math.random() * 10);

    // // ================================
    // THIS IS WHERE WE SET ALL THE INITIAL MATCH DETAILS ;
    const updatedMatch = match;
    // set the match status to live
    updatedMatch.matchStatus = "live " + matchTime;

    // lets update the home and the away score
    updatedMatch.homeScore = 0;
    updatedMatch.awayScore = 0;

    const matchId = match.id;

    ctx.setMatchUpdates({
      fixtureUpdate: { ...updatedMatch },
      competitionName,
      matchId,
    });

    const homeTeamToShoot = setInterval(() => {
      const goal = getGoal();
      setHomeToScore(
        homeTeam,
        awayTeam,
        previousHome,
        previousAway,
        goal,
        updatedMatch,
        competitionName,
        match.id
      );
    }, homeTeamInterval);

    const awayTeamToShoot = setInterval(() => {
      const goal = getGoal();
      setAwayToScore(
        homeTeam,
        awayTeam,
        previousHome,
        previousAway,
        goal,
        updatedMatch,
        competitionName,
        match.id
      );
    }, awayTeamInterval);

    const startMatch = setInterval(() => {
      matchTime++;
      playNow(
        homeTeam,
        awayTeam,
        competitionName,
        matchTime,
        updatedMatch,
        extraTime,
        startMatch,
        awayTeamToShoot,
        homeTeamToShoot,
        matchWeek,
        match.id
      );
    }, seconds);
  };

  const setNextFixturesHandler = (matchDay, type) => {
    ctx.setCurrentFixtures(matchDay, ctx.currentLeague, type);
  };

  const playAllMatchHandler = matchDay => {
    const fixtures = ctx[ctx.currentLeague].fixtures[matchDay - 1].fixtures;
    fixtures.forEach(match => {
      if (match.matchStatus === "not yet Played") {
        playMatchHandler(match, ctx.currentLeague, matchDay);
      }
    });
  };

  const nextButtonUI =
    lastFixtures !== currentFixture.matchDay && lastFixtures !== 0 ? (
      <Button
        className=' px-4 py-2 border'
        onClick={() => {
          setNextFixturesHandler(currentFixture.matchDay, "next");
        }}
      >
        next
      </Button>
    ) : (
      ""
    );

  const prevButtonUI =
    currentFixture.matchDay !== 1 ? (
      <Button
        className=' px-4 py-2 border'
        onClick={() => {
          setNextFixturesHandler(currentFixture.matchDay, "previous");
        }}
      >
        prev
      </Button>
    ) : (
      ""
    );

  const fixturesHeaderUI =
    ctx[ctx.currentLeague].fixtures.length !== 0 ? (
      <div className='flex justify-between items-center'>
        <span>Match Day {currentFixture.matchDay}</span>
        <div className='space-x-2'>
          {prevButtonUI}
          {nextButtonUI}
        </div>
        <Button
          className='bg-gradient-to-r to-green-800 from-gray-800 text-white px-4 py-1 rounded'
          onClick={playAllMatchHandler.bind(null, currentFixture.matchDay)}
        >
          Play All Match
        </Button>
      </div>
    ) : (
      ""
    );

  const fixturesLayoutUI = currentFixture.fixtures.map(match => (
    <EachFixture
      disabled={match.matchStatus === "not yet Played" ? false : true}
      key={match.id}
      id={match.id}
      homeTeam={match.homeTeam.name}
      awayTeam={match.awayTeam.name}
      homeScore={match.homeScore}
      awayScore={match.awayScore}
      matchStatus={match.matchStatus}
      onPlayMatch={() => {
        playMatchHandler(match, ctx.currentLeague, currentFixture.matchDay);
      }}
    />
  ));

  const endTheSesasonUI = true ? (
    <Button
      className='bg-gradient-to-r from-red-600 to-red-900 mt-8 rounded px-4 py-2 text-white'
      onClick={endSeasonHandler}
    >
      End the season
    </Button>
  ) : null;

  // const endTheSesasonUI = (
  //   <Button
  //     className='bg-gradient-to-r from-red-600 to-red-900 mt-8 rounded px-4 py-2 text-white'
  //     onClick={endSeasonHandler}
  //   >
  //     End the season
  //   </Button>
  // );

  return (
    <section className='lg:text-base pb-10'>
      {lastFixtures === 0 && (
        <div className='flex flex-col h-72 justify-center items-center '>
          <p>Click the button to start a new season</p>
          <Button
            onClick={setNewFixturesHandler}
            className=' bg-green-800 text-white p-4 mt-4 rounded-lg flex items-center'
          >
            Start new season
          </Button>
        </div>
      )}

      <div>
        <div className='px-4 lg:px-8'>
          <div className=''>
            <div className=''>
              {fixturesHeaderUI}

              <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5'>
                {fixturesLayoutUI}
              </div>
            </div>
          </div>

          {endTheSesasonUI}
        </div>
      </div>
    </section>
  );
};

export default Fixtures;
