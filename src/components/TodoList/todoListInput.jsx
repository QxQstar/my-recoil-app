import React, { useState } from "react";
import { useSetRecoilState } from 'recoil'
import { todoListState } from '../../atom/index'

let id = 0;
function getId() {
  return id++;
}

export default function TodoListInput() {
    const [keyword, setkeyword] = useState('');
    const setTodoList = useSetRecoilState(todoListState);
    const onAdd = () => {
        setTodoList((oldTodoList) => {
            return [...oldTodoList,
                 {
                    id: getId(),
                    text: keyword,
                    isComplete: false,
                }
            ]
        })

        setkeyword('')
    }

    return (
        <div>
            <input value={keyword} onChange={(event) => setkeyword(event.target.value)}/>
            <button onClick={onAdd}> add </button>
        </div>
    )
}