import { useContext } from "react";
import League_Context from "../../../Store/league-context";
import getWinners from "../../Functions/getWinners";
import uid from "../../Functions/uid";

const Winners = () => {
  const ctx = useContext(League_Context);

  const gottenWinners = getWinners(ctx[ctx.currentLeague].history.winners);

  return (
    <div className="text-sm mt-4">
      <div className="flex justify-between odd:bg-green-800 odd:text-white p-2">
        <div className="">Name</div>
        <div className="">NO</div>
      </div>
      <div className="">
        {gottenWinners.map((his) => (
          <div
            key={uid()}
            className="flex justify-between even:bg-gray-700 even:text-white p-2">
            <div className="">{his.name}</div>
            <div className="">{his.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Winners;
