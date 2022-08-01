import "./activity-input.styles.scss";
import { useState, useRef ,useEffect} from "react";
import { useContext } from "react";
import { ListContext } from "../../contexts/to-do-list.contexts";
import Time from "../Time/set-time.component";
import { BiTimer } from "react-icons/bi";
import { MdLibraryAdd } from "react-icons/md";
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
  useEffect(()=>{
    inputref.current.focus();
  },[])
  return (
    <div className="input-container">
      <MdLibraryAdd
        className="addIcon"
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
      />
      {/* <div
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
        <MdLibraryAdd 
        onClick={() => {
          const Data = { activities: inputActivity, Time: time };
          if (inputref.current.value) addActivityToList(Data);
          inputref.current.value = "";
          setInputActivity("");
          SetTime(null);
          console.log(toDoList);
          console.log(new Date());
          // return updateLocalStorage();
        }}/>
      </div> */}
      <input
        ref={inputref}
        type="text"
        onChange={InputHandler}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const Data = { activities: inputActivity, Time: time };
            if (inputref.current.value) addActivityToList(Data);
            inputref.current.value = "";
            setInputActivity("");
            SetTime(null);
          }
        }}
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
          <BiTimer className="timeIcon"/>
        </span>
      </div>
    </div>
  );
};

export default ActivityInput;
