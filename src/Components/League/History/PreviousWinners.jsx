import { useContext } from "react";
import League_Context from "../../../Store/league-context";
import uid from "../../Functions/uid";

const PreviousWinners = () => {
  const ctx = useContext(League_Context);

  console.log(ctx[ctx.currentLeague].history);

  return (
    <div className="text-sm mt-4">
      <div className="flex justify-between odd:bg-green-800 odd:text-white p-2">
        <div className="">Name</div>
        <div className="">pts</div>
      </div>
      <div className="">
        {ctx[ctx.currentLeague].history.winners.map((his) => (
          <div
            key={uid()}
            className="flex justify-between even:bg-gray-700 even:text-white p-2">
            <div className="">{his.name}</div>
            <div className="">{his.pts}</div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("abstractLeague");
        }}>
        remove
      </button>
    </div>
  );
};

export default PreviousWinners;
