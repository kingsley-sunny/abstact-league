import { useContext, useState, useEffect } from "react";
import League_Context from "../../../Store/league-context";
import uid from "../../Functions/uid";
import Container from "../../UI/Container";
import EachTableRow from "./EachTableRow";

const Table = () => {
  const ctx = useContext(League_Context);
  const [table, setTable] = useState([]);
  const tableCellClass =
    "w-10 lg:w-16 h-6 lg:h-8 border px-2 text-center flex items-center";

  useEffect(() => {
    const teams = ctx[ctx.currentLeague].teams;

    const sortedTeams = teams.sort((teamA, teamB) => {
      return (
        teamB.league.pts - teamA.league.pts ||
        teamB.league.GD - teamA.league.GD ||
        teamA.league.GA - teamB.league.GA
      );
    });

    setTable(sortedTeams);
  }, [ctx[ctx.currentLeague]]);

  return (
    <Container>
      <h2>This is the table for this season</h2>
      <div className="w-full overflow-scroll">
        <div className="text-xs lg:text-base  min-w-[470px] max-w-5xl ">
          <header className="flex w-full odd:bg-green-800 odd:text-white">
            <div className={tableCellClass}>No</div>
            <div className="h-6 lg:h-8 grow border px-2 flex items-center ">
              Team
            </div>
            <div className={tableCellClass}>MP</div>
            <div className={tableCellClass}>W</div>
            <div className={tableCellClass}>D</div>
            <div className={tableCellClass}>L</div>
            <div className={tableCellClass}>PTS</div>
            <div className={tableCellClass}>GD</div>
            <div className={tableCellClass}>GF</div>
            <div className={tableCellClass}>GA</div>
          </header>

          {table.map((team, i) => (
            <EachTableRow
              no={i + 1}
              name={team.name}
              {...team.league}
              key={uid()}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Table;
