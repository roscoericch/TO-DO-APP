import "./to-do-list.styles.scss";
import { useContext } from "react";
import { ListContext } from "../../contexts/to-do-list.contexts";
import Activity from "../Activity/Activity.components";
import { v4 as uuid } from "uuid";
import "../Activity/Activity.styles.scss";
const ActivityList = () => {
  const { toDoList, sortCompleteActivity } = useContext(ListContext);
  const unique_id = uuid();
  return (
    <div className="activities-container">
      {toDoList.map((element, index) => {
        const { activity, activestate, dueTime } = element;
        console.log(element, activity, activestate);
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
          <span>{toDoList.length} item(s) left</span>
          <span
            onClick={() => {
              sortCompleteActivity();
            }}
            className="clear-complete"
          >
            clear completed
          </span>
        </div>
      )}
    </div>
  );
};
export default ActivityList;
