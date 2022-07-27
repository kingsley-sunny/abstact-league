import { useContext, useState, useEffect } from "react";
import League_Context from "../../../Store/league-context";
import uid from "../../Functions/uid";
import Container from "../../UI/Container";
import EachTeam from "./EachTeam";

const Teams = () => {
  const ctx = useContext(League_Context);
  const [teamsData, setTeamsData] = useState(ctx[ctx.currentLeague].teams);
  const tableCellClass =
    "w-14 lg:w-24 h-6 lg:h-8 border flex items-center justify-center text-center";

  useEffect(() => {
    const teams = ctx[ctx.currentLeague].teams;

    const sortedTeams = teams.sort((teamA, teamB) => {
      return teamB.overall > teamA.overall;
    });
    setTeamsData(sortedTeams);
  }, [ctx]);

  return (
    <>
      <Container>
        <h2>This is the table for this season</h2>
        <div className="w-full overflow-scroll">
          <div className="text-xs lg:text-base  min-w-fit">
            <header className="flex w-full odd:bg-green-800 odd:text-white">
              <div className={tableCellClass}>No</div>
              <div className="h-6 lg:h-8 grow border px-2 flex items-center min-w-[7rem]">
                Team
              </div>
              <div className={tableCellClass}>Attack</div>
              <div className={tableCellClass}>Midfield</div>
              <div className={tableCellClass}>Defence</div>
              <div className={tableCellClass}>Overall</div>
            </header>

            {teamsData.map((team, i) => (
              <EachTeam
                no={i + 1}
                name={team.name}
                attack={team.attack}
                midfield={team.midfield}
                defence={team.defence}
                overall={team.overall}
                key={uid()}
              />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Teams;
