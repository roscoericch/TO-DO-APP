import { useState, useContext, useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ListContext } from "../../contexts/to-do-list.contexts";
import SetTime from "../Time/set-time.component";
import { ExpiryTime } from "../Time/calculate-expiryTime";
import "./Activity.styles.scss";
const Activity = ({ activity, element, index, activestate, dueTime }) => {
  const {
    completedActivity,
    removeActivity,
    toDoList,
    moveListItem,
    setActiveActivity,
    moveItemOnHover,
    SetTime,
  } = useContext(ListContext);
  const activeIndex = index;
  const ref = useRef(null);
  // console.log(element);
  const [{ isDragging }, dragRef] = useDrag({
    type: "activity",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [spec, dropRef] = useDrop({
    accept: "activity",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveItemOnHover(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
    // drop: (element, monitor) => {
    //   const dragIndex = element.index;
    //   const hoverIndex = index;
    //   const hoverBoundingRect = ref.current?.getBoundingClientRect();
    //   const hoverMiddleY =
    //     (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    //   const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

    //   console.log(dragIndex, hoverIndex);
    //   // if dragging down, continue only when hover is smaller than middle Y
    //   if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
    //   // if dragging up, continue only when hover is bigger than middle Y
    //   if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;
    //   moveItemOnHover(dragIndex, hoverIndex);
    //   // item.index = hoverIndex
    // },
  });
  const dragDropRef = dragRef(dropRef(ref));

  const opacity = isDragging ? 0 : 1;
  /////////////calculate event expiry Time
  if (dueTime !== null) {
    const expiryTime = dueTime.split(":");
    const TimeOut = ExpiryTime(new Date(), expiryTime);
    // console.log(TimeOut);
    if (TimeOut > 0) {
      setTimeout(() => {
        console.log(TimeOut, activity, "expired");
        // SetTime(null);
        setActiveActivity(element, index);
      }, TimeOut);
    } else if (TimeOut < 0) {
      if (activestate) {
        setActiveActivity(element, index);
      }
    }
  }
  return (
    <div className="activity-container" ref={dragDropRef} style={{ opacity }}>
      <div
        className={activestate ? "check-box" : "check-box check-box-active"}
        onClick={() => {
          setActiveActivity(element, index);
          completedActivity(element);
        }}
      >
        {!activestate && <span>&#10003;</span>}
      </div>
      <span
        className={activestate ? "activity" : "activity activity-completed"}
      >
        {activity}
      </span>
      <span
        className="clear-activity"
        onClick={() => {
          removeActivity(element);
        }}
      >
        &#10006;
      </span>
      {/* <SetTime /> */}
    </div>
  );
};
export default Activity;
