import ITodoItem from '../TodoItem/ITodoItem';

export default interface ITodoLists {
  id: string;
  todoListTitle: string;
  details: string;
  todoItemGetDtos: ITodoItem[];
}
