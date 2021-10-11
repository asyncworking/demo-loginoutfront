export default interface ITodoItem {
  todoItemId: string;
  description: string;
  notes: string;
  completed: boolean;
  projectId: string;
  createdTime: string;
  dueDate: string
}
