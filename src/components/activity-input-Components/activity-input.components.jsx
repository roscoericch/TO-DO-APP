import "./activity-input.styles.scss";
import { useState, useRef } from "react";
import { useContext } from "react";
import { ListContext } from "../../contexts/to-do-list.contexts";
import Time from "../Time/set-time.component";
// import { Time } from "../Time/set-time.component";
const ActivityInput = () => {
  const [inputActivity, setInputActivity] = useState("");
  const inputref = useRef();
  const {
    addActivityToList,
    toDoList,
    activetimer,
    SetActiveTimer,
    time,
    SetTime,
  } = useContext(ListContext);
  const InputHandler = (event) => {
    setInputActivity(event.target.value);
  };
  return (
    <div className="input-container">
      <div
        className="check-box check-box-active"
        onClick={() => {
          const Data = { activities: inputActivity, Time: time };
          if (inputref.current.value) addActivityToList(Data);
          inputref.current.value = "";
          setInputActivity("");
          SetTime(null);
          console.log(toDoList);
          console.log(new Date());
          // return updateLocalStorage();
        }}
      >
        <span>&#10003;</span>
      </div>
      <input
        ref={inputref}
        type="text"
        onChange={InputHandler}
        className="activity-input-container"
        placeholder="Create a new todo..."
      />
      <div>
        {activetimer && inputActivity && <Time />}
        <span
          onClick={() => {
            if (inputref.current.value) {
              SetActiveTimer();
            }
          }}
        >
          &#10003;
        </span>
      </div>
    </div>
  );
};

export default ActivityInput;
