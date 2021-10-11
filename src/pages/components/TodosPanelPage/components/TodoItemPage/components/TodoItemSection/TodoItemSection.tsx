import React, { useEffect, useState } from 'react';
import MyRichEditor from 'src/components/RichEditor/MyRichEditor';
import { Button } from '@material-ui/core';
import ITodoContent from 'src/common/interfaces/Dto/Todo/TodoList/ITodoContent';
import ITodoItemPage from 'src/common/interfaces/Dto/Todo/TodoItem/ITodoItemPage';
import * as apiUtils from 'src/utils/apiUtils';
import useEditBtnStyles from './useEditBtnStyles';
import './TodoItemSection.scss';

interface PropsType{
  modify:boolean,
  setModify:any,
  todoItem:ITodoItemPage,
  setTodoItem:any,
  projectId:string,
}

const TodoItemSection = ({ modify, setModify, todoItem, setTodoItem, projectId }:PropsType) => {
  const classes = useEditBtnStyles('118px', '138px');
  const [hideRichEditor, setHideRichEditor] = useState(true);
  const [mdBody, setMdBody] = useState<ITodoContent>({
    text: '',
    delta: '',
    html: '',
  });

  useEffect(() => {
    setMdBody({
      text: todoItem.notes,
      delta: '',
      html: todoItem.originNotes,
    });
  }, [todoItem.notes, todoItem.originNotes]);

  const addNotes = () => {
    setHideRichEditor(false);
    setModify(true);
  };
  const handleDiscardChanges = () => {
    setHideRichEditor(true);
    setModify(false);
  };

  const updateTodoItem = async () => {
    const { todoItemId, description, dueDate } = todoItem;
    const { text, html } = mdBody;
    const resp = await apiUtils.updateTodoItem({ todoItemId, projectId, description, notes: text, originNotes: html, dueDate });
    if (resp.status === 200) {
      handleDiscardChanges();
    }
  };
  const handleSaveChanges = () => {
    const newTodoItem = todoItem;
    newTodoItem.originNotes = mdBody.html;
    newTodoItem.notes = mdBody.text;
    setTodoItem(newTodoItem);
    updateTodoItem();
  };

  return (
    <section className="todoitem__details">
      <div className="todoitem__field">
        <div className="todoitem__field--label">Assigned to</div>
        <div className="todoitem__field--content">
          <input className="content__input" placeholder="Type names to assign…" />
        </div>
      </div>
      <div className="todoitem__field">
        <div className="todoitem__field--label">When done, notify</div>
        <div className="todoitem__field--content">
          <input className="content__input" placeholder="Type names to notify…" />
        </div>
      </div>
      <div className="todoitem__field">
        <div className="todoitem__field--label">Due on</div>
        <div className="todoitem__field--content">
          <span className="content__block">Select a date…</span>
        </div>
      </div>
      {hideRichEditor && !modify ? (
        <div className="todoitem__field">
          <div className="todoitem__field--label">Notes</div>
          <div className="todoitem__field--content">
            {todoItem.notes !== null && todoItem.notes.length > 0
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              ? <span className="content__show" onClick={addNotes} onKeyDown={addNotes}>{todoItem.notes}</span>
              : (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <span className="content__block" onClick={addNotes} onKeyDown={addNotes}>
                  Add extra details or attach a file…
                </span>
              )}
          </div>
        </div>
      ) : (<MyRichEditor mdBody={mdBody} setMdBody={setMdBody} />)}
      <div className={modify ? 'button__area' : 'button__area--hide'}>
        <div className="button--save">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.add}
            onClick={handleSaveChanges}
          >
            Save changes
          </Button>
        </div>
        <div className="button--discard">
          <Button
            variant="outlined"
            className={classes.cancel}
            onClick={handleDiscardChanges}
          >
            Discard changes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TodoItemSection;
