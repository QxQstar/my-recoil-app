import {
    atom,
    selector
  } from 'recoil';

export  const textState = atom({
    key: 'textState1', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

export const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
});

export const todoListState = atom({
  key: 'todoListState',
  default: [],
});

export const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'Show All',
});

export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({get}) => {
    const list = get(todoListState)
    const filter = get(todoListFilterState)

    switch(filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
        case 'Show Uncompleted':
          return list.filter((item) => !item.isComplete);
        default:
          return list;
    }
  }
})