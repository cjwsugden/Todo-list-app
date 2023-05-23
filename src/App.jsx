//App.jsx

import { useState, useRef } from "react";
import "./App.css";
import Todo from "./comps/Todo";
import FilterBtn from "./comps/FilterBtn";

function App() {
  const inputRef = useRef(null);
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchState, setSearchState] = useState("Hidden");

  function handleTodoComplete(todoID) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === todoID ? { ...item, completed: !item.completed } : item
      )
    );

    setCompletedCount((prevCount) =>
      items.find((item) => item.id === todoID && !item.completed)
        ? prevCount + 1
        : prevCount - 1
    );
  }

  function handleTodoDelete(todoId) {
    setItems((prevItems) => {
      const deletedItem = prevItems.find((item) => item.id === todoId);
      const updatedItems = prevItems.filter((item) => item.id !== todoId);

      if (!deletedItem.completed) {
        setCompletedCount((prevCount) => Math.max(prevCount - 1, 0));
      }

      return updatedItems;
    });
  }

  function addItem() {
    if (!newItem) {
      alert("Add an Item");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
      completed: false,
    };

    setItems((oldList) => [...oldList, item]);

    setNewItem("");
    console.log(items);
  }

  const filteredItems = items.filter((item) => {
    if (filter === "completed" && !item.completed) {
      return false;
    }

    if (filter === "active" && item.completed) {
      return false;
    }

    if (
      searchQuery &&
      !item.value.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  function handleSearchInput(event) {
    setSearchQuery(event.target.value);
    console.log("Clicked");
  }

  function handleSearchClick() {
    if (searchState === "Hidden") {
      setSearchState("Active");
    } else {
      setSearchState("Hidden");
    }
  }

  const remainingTasks = filteredItems.filter((item) => !item.completed).length;

  return (
    <>
      <div className="container">
        <h1>THINGS TO DO</h1>
        <input
          value={newItem}
          className="user-input-field"
          type="text"
          placeholder="Enter task details..."
          onChange={(e) => setNewItem(e.target.value)}
        />
        <ul className="task-list">
          {filteredItems
            .filter((item) => {
              if (filter === "active") {
                return !item.completed;
              } else if (filter === "completed") {
                return item.completed;
              }
              return true; // "all" filter
            })
            .map((item) => (
              <Todo
                key={item.id}
                id={item.id}
                name={item.value}
                completed={item.completed}
                handleTodoComplete={handleTodoComplete}
                handleTodoDelete={handleTodoDelete}
              />
            ))}
        </ul>
        <div className="bottom-nav">
          <button className="left-btn add-task-button" onClick={addItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
          </button>
          <div className="search">
            <button
              className="left-btn find-task-button"
              onClick={handleSearchClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
            <input
              type="text"
              className={`search-field ${searchState}`}
              value={searchQuery}
              onChange={handleSearchInput}
              placeholder="Search Tasks..."
            />
          </div>
          <span> | </span>
          <span className="task-counter">{remainingTasks} Items Left</span>
          <div className="status-buttons">
            <FilterBtn
              name="All"
              active={filter === "all"}
              handleClick={() => setFilter("all")}
            />
            <FilterBtn
              name="Active"
              active={filter === "active"}
              handleClick={() => setFilter("active")}
            />
            <FilterBtn
              name="Completed"
              active={filter === "completed"}
              handleClick={() => setFilter("completed")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
