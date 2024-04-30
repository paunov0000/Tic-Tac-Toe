import React from "react";

function handleClick() {
  console.log("Clicked");
}

export default function Square({ value }) {
  return (
    <button onClick={handleClick} className="square">
      {value}
    </button>
  );
}
