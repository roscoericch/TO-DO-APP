import React from "react";
import { useState, useContext } from "react";
import { useRef } from "react";
import { ListContext } from "../../contexts/to-do-list.contexts";

function Time() {
  const currentTime = new Date();
  const { SetTime, SetActiveTimer } = useContext(ListContext);
  return (
    <div className="timer">
      <input
        type="time"
        name="timer"
        className="timer-input"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value) {
            SetTime(e.target.value);
            SetActiveTimer();
            console.log(e.target.value);
          }
        }}
        onInput={(e) => {
          SetTime(e.target.value);
          // SetActiveTimer();
          console.log(e.target.value);
        }}
      />
    </div>
  );
}

export default Time;
