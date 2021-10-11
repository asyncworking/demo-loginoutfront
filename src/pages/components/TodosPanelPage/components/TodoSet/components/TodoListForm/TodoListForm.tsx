import React, { ChangeEvent, useState } from 'react';
import { Button, createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import MyRichEditor from 'src/components/RichEditor/MyRichEditor';
import * as apiUtils from 'src/utils/apiUtils';
import ITodoLists from 'src/common/interfaces/Dto/Todo/TodoList/ITodoLists';
import ITodoContent from 'src/common/interfaces/Dto/Todo/TodoList/ITodoContent';
import styles from './TodoListForm.module.scss';

const useStyles = makeStyles(() => createStyles({
  add: {
    width: '112px',
    color: '#fff',
    fontSize: '0.8rem',
    borderRadius: '30px',
    textTransform: 'capitalize',
  },
  cancel: {
    width: '100px',
    fontSize: '0.8rem',
    color: 'RGB(44, 165, 98)',
    borderRadius: '30px',
    textTransform: 'none',
    borderColor: 'RGB(44, 165, 98)',
  },
}));

interface PropsType {
  projectId: string;
  setIsAdded: any;
  todoLists: ITodoLists[];
}

const TodoListForm = (props : PropsType) => {
  const todoListForm = useStyles();
  const history = useHistory();
  const [titleErr, setTitleErr] = useState(false);
  const [hideRichEditor, setHideRichEditor] = useState(true);
  const [shake, setShake] = useState(false);
  const [title, setTitle] = useState('');
  const [detailsErr, setDetailsErr] = useState(false);
  const { projectId, setIsAdded, todoLists } = props;

  const [mdBody, setMdBody] = useState<ITodoContent>({
    text: '',
    delta: '',
    html: '',
  });

  const { html, text } = mdBody;
  const submitTodoList = async (todoListTitle:string) => {
    try {
      const resp = await apiUtils.createTodoList({ projectId, todoListTitle: todoListTitle.trim(), text, html });
      if (resp.status === 200) {
        history.push(`/project/${projectId}/todolists/${resp.data}`);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setDetailsErr(true);
      }
    }
  };

  const createTodoList = () => {
    if (title.length === 0) {
      setShake(true);
      setTimeout(() => (
        setShake(false)
      ), 500);
    } else {
      submitTodoList(title);
    }
  };

  const displayRE = () => {
    setHideRichEditor(false);
  };

  const handleTitleChange = (event:ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val.length <= 255) {
      setTitle(val);
      setTitleErr(false);
    } else {
      setTitleErr(true);
    }
  };

  const cancelAdd = () => {
    setIsAdded(false);
    setHideRichEditor(true);
    setDetailsErr(false);
  };

  return (
    <div className={styles.todolist_add}>
      {titleErr ? (
        <span className={styles.err}>Todo List Title can not be more than 255 characters! </span>) : null}
      <input
        className={styles.add_name}
        id={`${shake ? styles.shake_open : null}`}
        placeholder="Name this list..."
        onChange={(event) => {
          handleTitleChange(event);
        }}
        value={title}
      />
      <div className={styles.add_details}>
        { hideRichEditor ? (
          <input
            type="text"
            placeholder="Add extra details or attach a file..."
            className={styles.add_detailsBtn}
            onClick={displayRE}
          />
        ) : (
          <div>
            <MyRichEditor mdBody={mdBody} setMdBody={setMdBody} />
          </div>
        )}
        {detailsErr ? (<span className={styles.err}>Details can not be more than 2048 characters!</span>) : null}
      </div>
      <div className={styles.add_btnArea}>
        <div>
          <Button
            variant="contained"
            color="primary"
            className={todoListForm.add}
            onClick={() => {
              createTodoList();
            }}
          >
            Add this list
          </Button>
        </div>
        {todoLists.length === 0 ? null : (
          <div className={styles.cancel_btn}>
            <Button
              variant="outlined"
              className={todoListForm.cancel}
              onClick={() => {
                cancelAdd();
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoListForm;
