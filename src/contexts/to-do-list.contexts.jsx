import { createContext } from "react";
import { useState, useCallback } from "react";
import update from "immutability-helper";

export const ListContext = createContext({
  toDoList: [],
  activetimer: false,
  time: null,
  SetTime: () => {},
  SetActiveTimer: () => {},
  completedActivity: () => {},
  addActivityToList: () => {},
  removeActivity: () => {},
  moveListItem: () => {},
  moveItemOnHover: () => {},
  setActiveActivity: () => {},
  updateLocalStorage: () => {},
  sortCompleteActivity: () => {},
});

export const ListProvider = ({ children }) => {
  const storedActivity = JSON.parse(localStorage.getItem("list"));
  const initialState = storedActivity ? storedActivity : [];
  const [toDoList, setToDoList] = useState(initialState);
  const [activetimer, setactivetimer] = useState(false);
  const [time, setTime] = useState(null);

  const addActivityToList = (activities) => {
    console.log(activities);
    setToDoList([
      ...toDoList,
      {
        activity: activities.activities,
        activestate: true,
        dueTime: activities.Time,
      },
    ]);
  };

  const removeActivity = (activity) => {
    const SortList = toDoList.filter((element) => element !== activity);
    setToDoList(SortList);
  };

  const sortCompleteActivity = () => {
    const completedActivity = toDoList.filter(
      (element) => element.activestate === true
    );
    setToDoList(completedActivity);
  };

  const setActiveActivity = (element, index) => {
    setToDoList((toDoList) => {
      const updatedTodo = [...toDoList];
      updatedTodo[index] = {
        activity: element.activity,
        activestate: !element.activestate,
        dueTime: element.dueTime,
      };
      console.log(updatedTodo);
      return updatedTodo;
    });
  };
  const moveListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = toDoList[dragIndex];
      const hoverItem = toDoList[hoverIndex];
      // Swap places of dragItem and hoverItem in the pets array
      setToDoList((toDoList) => {
        const updatedActivity = [...toDoList];
        updatedActivity[dragIndex] = hoverItem;
        updatedActivity[hoverIndex] = dragItem;
        console.log(updatedActivity);
        return updatedActivity;
      });
    },
    [toDoList]
  );

  const moveItemOnHover = useCallback((dragIndex, hoverIndex) => {
    setToDoList((toDoList) =>
      update(toDoList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, toDoList[dragIndex]],
        ],
      })
    );
  }, []);

  const completedActivity = (Activity) => {
    const SortList = toDoList.map((element, index) => {
      if (element === Activity) {
        element.activestate = !element.activestate;
        return element;
      }
      return element;
    });

    setToDoList(SortList);
    console.log(SortList, toDoList);
  };

  const updateLocalStorage = () => {
    localStorage.setItem("list", JSON.stringify(toDoList));
    const storedActivity = JSON.parse(localStorage.getItem("list"));
    // console.log(storedActivity);
  };

  const SetActiveTimer = () => {
    setactivetimer(!activetimer);
  };

  const SetTime = (time) => {
    setTime(time);
  };

  const value = {
    addActivityToList,
    toDoList,
    completedActivity,
    removeActivity,
    moveListItem,
    moveItemOnHover,
    setActiveActivity,
    updateLocalStorage,
    time,
    SetTime,
    activetimer,
    SetActiveTimer,
    sortCompleteActivity,
  };
  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};
