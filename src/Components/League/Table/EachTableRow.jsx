import React from "react";

const EachTableRow = (props) => {
  const tableCellClass =
    "w-10 lg:w-16 h-6 lg:h-8 border px-2  flex justify-end items-center";
  return (
    <div className="odd:bg-gray-300 ">
      <header className="flex ">
        <div className={tableCellClass}>{props.no}</div>
        <div className="h-6 lg:h-8 border px-2 grow flex items-center">
          {props.name}
        </div>
        <div className={tableCellClass}>{props.matchPlayed}</div>
        <div className={tableCellClass}>{props.wins}</div>
        <div className={tableCellClass}>{props.draw}</div>
        <div className={tableCellClass}>{props.lose}</div>
        <div className={`${tableCellClass} font-bold`}>{props.pts}</div>
        <div className={tableCellClass}>{props.GD}</div>
        <div className={tableCellClass}>{props.GF}</div>
        <div className={tableCellClass}>{props.GA}</div>
      </header>
    </div>
  );
};

export default EachTableRow;
