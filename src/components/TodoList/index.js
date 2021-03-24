import React from "react";
import { useRecoilValue } from "recoil";
import TodoItem from "./todoItem";
import TodoListInput from "./todoListInput";
import TodoFilter from "./todoFilter";

import { filteredTodoListState } from "./../../atom/index";

export default function TodoList() {
    const todoList = useRecoilValue(filteredTodoListState);
    return (
        <>
        <TodoFilter/>
        <TodoListInput/>
        {todoList.map((todoItem, index) => (
            <TodoItem key={todoItem.id} {...todoItem} index={index}/>
        ))}
        </>
    )
}