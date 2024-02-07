import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Progress from "../../components/Progress";
import Container from "../../components/Container";
import TaskList from "../../components/TaskList";
import axiosInstance from "../../service/api";
import { TodosType } from "types";
import Dropdown from "../../components/Dropdown";
import AddTodos from "../../components/AddTodos";
import useDropdown from "../../hook/useDropdown";
import { optionFilterList } from "../../common/option";
import { ReactComponent as Icon } from "../../media/chevDown.svg";
import useClickOutside from "../../hook/useClickOutside";

function Landing() {
  const [todos, setTodos] = useState<TodosType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const {
    isOpen: isFilterOptionOpen,
    toggleDropdown: toggleFilterDropdown,
    selectedOption: selectedFilterOption,
    handleOptionClick: handleFilterOptionClick,
    handleClose,
  } = useDropdown({
    options: optionFilterList,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, handleClose);

  const filterTodos = useMemo(() => {
    const label = selectedFilterOption?.title;
    if (label === "All") {
      return todos;
    } else if (label === "Undone") {
      return todos.filter((todo) => !todo.completed);
    } else if (label === "Done") {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }, [todos, selectedFilterOption]);

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get("/todos/")
        .then((response) => {
          setTodos(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  const progress: number = useMemo(() => {
    const totalTasks = todos.length;
    const completedTasks = todos.filter((task) => task.completed).length;
    const completionPercentage =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    return completionPercentage;
  }, [todos]);

  const progressCompleted: number = useMemo(() => {
    const completedTasks = todos.filter((task) => task.completed).length;
    return completedTasks;
  }, [todos]);

  const handleAddTodos = () => {
    const newTodo: TodosType = {
      id: todos.length.toString(),
      title: "",
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTask = (id: string) => {
    const updateTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodos);
  };

  const handleUpdateTask = (id: string, checked: boolean) => {
    const updateTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: checked } : todo
    );
    setTodos(updateTodos);
  };

  const handleChangeTitle = (id: string, title: string) => {
    const updateTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: title } : todo
    );
    setTodos(updateTodos);
  };

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <Container
          styles={{
            padding: "0px 10vw",
            backgroundColor: "#F5F5F5",
          }}
        >
          <Container
            styles={{
              padding: "50px 0px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Container
              styles={{
                backgroundColor: "#E07C7C",
                width: "100%",
              }}
            >
              <div className={styles.progress}>
                <div className={styles.title}>Process</div>
                <Progress percentage={progress} />
                <div className={styles.countProcess}>
                  {progressCompleted} completed
                </div>
              </div>
            </Container>
            <div className={styles.headRow} ref={containerRef}>
              <div className={styles.tasks}>Tasks</div>
              <div className={styles.dropdownWrapper}>
                <div
                  className={styles.dropdownSelect}
                  onClick={toggleFilterDropdown}
                >
                  <div>{selectedFilterOption?.title || "All"}</div>
                  <div>
                    <Icon />
                  </div>
                </div>
                <div className={styles.dropdownOption}>
                  <Dropdown
                    options={optionFilterList}
                    onOptionClick={handleFilterOptionClick}
                    isOpen={isFilterOptionOpen}
                    isHover
                  />
                </div>
              </div>
            </div>
            <div className={styles.todoListWrapper}>
              {filterTodos.map((todo) => (
                <TaskList
                  selectedFilterOption={selectedFilterOption}
                  id={todo.id}
                  title={todo.title}
                  completed={todo.completed}
                  onDeleteTask={handleDeleteTask}
                  onUpdateTask={handleUpdateTask}
                  onChangeTitle={handleChangeTitle}
                />
              ))}
              <div className={styles.addTodos}>
                <AddTodos onAddTodo={handleAddTodos} />
              </div>
            </div>
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default Landing;
