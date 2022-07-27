import { useState } from "react";
import Container from "../../UI/Container";
import LeagueRecords from "./LeagueRecords";
import PreviousWinners from "./PreviousWinners";
import Storage from "./Storage";
import Winners from "./Winners";

const History = () => {
  const [state, setstate] = useState("prevWinners");

  const setStateHandler = (newState) => {
    setstate(newState);
  };
  return (
    <>
      <Container>
        <div className="flex justify-between border-gray-700/25 border-b-2 -mt-6">
          <div
            className={
              state === "prevWinners"
                ? "text-green-800 cursor-pointer"
                : "cursor-pointer"
            }
            onClick={setStateHandler.bind(null, "prevWinners")}>
            PreviousWinners
          </div>
          <div
            className={
              state === "records"
                ? "text-green-800 cursor-pointer"
                : "cursor-pointer"
            }
            onClick={setStateHandler.bind(null, "records")}>
            League Records
          </div>
          <div
            className={
              state === "winners"
                ? "text-green-800 cursor-pointer"
                : "cursor-pointer"
            }
            onClick={setStateHandler.bind(null, "winners")}>
            Winners
          </div>
          <div
            className={
              state === "storage"
                ? "text-green-800 cursor-pointer"
                : "cursor-pointer"
            }
            onClick={setStateHandler.bind(null, "storage")}>
            Storage
          </div>
        </div>
        {state === "prevWinners" && <PreviousWinners />}
        {state === "records" && <LeagueRecords />}
        {state === "winners" && <Winners />}
        {state === "storage" && <Storage />}
      </Container>
    </>
  );
};

export default History;
