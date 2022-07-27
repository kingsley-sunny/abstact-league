import React from "react";
import Button from "../../UI/Button";

const EachFixture = (props) => {
  let button;

  if (props.matchStatus === "not yet Played") {
    button = (
      <Button
        onClick={props.onPlayMatch}
        disabled={props.disabled}
        className="text-xs font-bold px-2 py-0.5 bg-gradient-to-r to-green-800 from-gray-800 rounded text-white">
        Play {props.matchStatus === "not yet Played" ? " " : props.matchStatus}
      </Button>
    );
  } else {
    button = "";
  }
  return (
    <div className="bg-gradient-to-r to-green-50 from-gray-200 px-4 py-2 shadow-md border rounded-lg">
      <div
        className={`${"flex justify-end text-xs capitalize"} ${
          props.matchStatus.includes("live") ? "text-green-900 font-bold" : ""
        }`}>
        {props.matchStatus === "not yet Played" ? " " : props.matchStatus}
        {button}
      </div>
      <div className="flex justify-between">
        <span>{props.homeTeam}</span>
        <span className="text-lg font-bold">{props.homeScore}</span>
      </div>
      <div className="flex justify-between mt-2">
        <span>{props.awayTeam}</span>
        <span className="text-lg font-bold">{props.awayScore}</span>
      </div>
    </div>
  );
};

export default EachFixture;
