import Container from "../../components/Container";
import React from "react";
import style from "./styles.module.scss";

type AddToDosType = {
  onAddTodo?: () => void;
};

const AddTodos: React.FC<AddToDosType> = ({ onAddTodo }) => {
  return (
    <div onClick={onAddTodo}>
      <Container
        styles={{
          backgroundColor: "white",
          padding: "15px",
          color: "#BCBCBC",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          borderRadius: "9999px",
        }}
      >
        Add your todo...
      </Container>
    </div>
  );
};

export default AddTodos;
