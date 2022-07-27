import React from "react";

const EachTeam = (props) => {
  const tableCellClass =
    "w-14 lg:w-24 h-6 lg:h-8 border flex items-center px-2 justify-center";
  return (
    <header className="flex odd:bg-gray-700 odd:text-white">
      <div className={tableCellClass}>{props.no}</div>
      <div className="h-6 lg:h-8 grow border px-2 flex items-center  min-w-[7rem]">
        {props.name}
      </div>
      <div className={tableCellClass}>{props.attack}</div>
      <div className={tableCellClass}>{props.midfield}</div>
      <div className={tableCellClass}>{props.defence}</div>
      <div className={tableCellClass}>{props.overall}</div>
    </header>
  );
};

export default EachTeam;
