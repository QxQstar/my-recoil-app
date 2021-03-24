import React from 'react';
import { useRecoilState } from 'recoil'

import { todoListState } from '../../atom/index'

function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }
  
  function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }

export default function TodoItem(props) {
    const [todoList, setTodoList] = useRecoilState(todoListState);

    const onDel = () => {
        const result = removeItemAtIndex(todoList, props.index)
        setTodoList(result);
    }

    const onFinish = () => {
        const result = replaceItemAtIndex(todoList, props.index, {
            text: props.text,
            id: props.id,
            isComplete: true
        })
        setTodoList(result);
    }

    return (
        <div>
            {!props.isComplete && <button onClick={onFinish}>完成</button>}
            {props.text}
            <button onClick={onDel}>删除</button>
        </div>
    )
}