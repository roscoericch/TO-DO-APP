import "./to-do-list.styles.scss";
import { useContext } from "react";
import { ListContext } from "../../contexts/to-do-list.contexts";
import Activity from "../Activity/Activity.components";
import { v4 as uuid } from "uuid";
import { ExpiryTime } from "../Time/calculate-expiryTime";
import "../Activity/Activity.styles.scss";
const ActivityList = () => {
  const { toDoList, SetTime, setActiveActivity } = useContext(ListContext);
  const unique_id = uuid();
  return (
    <div className="activities-container">
      {toDoList.map((element, index) => {
        const { activity, activestate, dueTime } = element;
        console.log(element, activity, activestate);
        // if (dueTime !== null) {
        //   const expiryTime = dueTime.split(":");
        //   const TimeOut = ExpiryTime(new Date(), expiryTime);
        //   console.log(TimeOut);
        //   if (TimeOut > 0) {
        //     setTimeout(() => {
        //       console.log(TimeOut, activity, "expired");
        //       SetTime(null);
        //       setActiveActivity(element, index);
        //     }, TimeOut);
        //   } else if (TimeOut < 0) {
        //     SetTime(null);
        //     setActiveActivity(element, index);
        //   }
        // }
        return (
          <>
            <Activity
              key={unique_id}
              activity={activity}
              element={element}
              index={index}
              activestate={activestate}
              dueTime={dueTime}
              // activestate={activestate}
            ></Activity>
          </>
        );
      })}
      {toDoList.length > 0 && (
        <div className="activity-footer activity-container">
          <span>5 items left</span>
          <span>clear completed</span>
        </div>
      )}
    </div>
  );
};
export default ActivityList;
