import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
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
  }, [toDoList]);
  return (
    <DndProvider options={HTML5toTouch}>
      <div className="App-container">
        <ActivityInput />
        <ActivityList />
        <ActivityCategory />
      </div>
    </DndProvider>
  );
}

export default App;
