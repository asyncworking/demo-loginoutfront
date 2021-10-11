export default interface ITodoItemPage {
  todoItemId: string;
  description: string;
  notes: string;
  originNotes: string;
  completed: boolean;
  createdTime: string;
  dueDate: string;
  createdUserName: string;
}
