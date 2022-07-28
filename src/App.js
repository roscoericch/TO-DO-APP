import { DndContext, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ActivityInput from "./components/activity-input-Components/activity-input.components";
import ActivityList from "./components/To-do-list/to-do-list.components";
import ActivityCategory from "./components/Activity-category/ActivityCategory.components";
import "./App.scss";
import { useContext, useEffect } from "react";
import { ListContext } from "./contexts/to-do-list.contexts";

function App() {
  const { updateLocalStorage, toDoList, addActivityToList } =
    useContext(ListContext);
  useEffect(() => {
    updateLocalStorage();
    // const currentTime = new Date();
    // console.log(currentTime.getMinutes());
    // console.log(currentTime.getHours());
  }, [toDoList]);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App-container">
        <ActivityInput />
        <ActivityList />
        <ActivityCategory />
      </div>
    </DndProvider>
  );
}

export default App;
