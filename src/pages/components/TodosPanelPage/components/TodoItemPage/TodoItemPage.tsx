/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Paper} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import NavBar from 'src/components/NavBar/NavBar';
import Breadcrumb from 'src/components/Breadcrumb/Breadcrumb';
import markAsDone from 'src/assets/svgs/markAsDone.svg';
import * as apiUtils from 'src/utils/apiUtils';
import './TodoItem.scss';
import ITodoItemPage from 'src/common/interfaces/Dto/Todo/TodoItem/ITodoItemPage';
import useCheckboxStyle from './hooks/useCheckboxStyle';
import TimeConverter from "./hooks/TimeConverter";
import TodoItemSection from "./components/TodoItemSection/TodoItemSection";

const TodoItem: React.FC = () => {
  const {projectId} = useParams<{ projectId: string }>();
  const {todoItemId} = useParams<{ todoItemId: string }>();
  const [projectName, setProjectName] = useState('');
  const [update, setUpdate] = useState(0);
  const [todoItem, setTodoItem] = useState<ITodoItemPage>({
    todoItemId:'',
    description: '',
    notes: '',
    originNotes: '',
    completed: false,
    createdTime: '',
    dueDate: '',
    createdUserName: '',
  });

  useEffect(() => {
    const loadData = async () => {
      const todoResp = await apiUtils.fetchTodoItem({projectId, todoItemId});
      if (todoResp.status === 200) {
        setProjectName(todoResp.data.projectName);
        setTodoItem({
          todoItemId:todoResp.data.todoItemGetDto.todoItemId,
          description: todoResp.data.todoItemGetDto.description,
          notes: todoResp.data.todoItemGetDto.notes,
          originNotes: todoResp.data.todoItemGetDto.originNotes,
          completed: todoResp.data.todoItemGetDto.completed,
          createdTime: todoResp.data.todoItemGetDto.createdTime,
          dueDate: todoResp.data.todoItemGetDto.dueDate,
          createdUserName: todoResp.data.createdUserName,
        });
        setTodoList({
          todoListId: todoResp.data.todoListId,
          todoListTitle: todoResp.data.todoListTitle,
        });
        refreshTime(todoResp.data.todoItemGetDto.createdTime);
      }
    };
    loadData();
  }, [update]);
  const {completed} = todoItem;
  const {mouseUp, mouseDown, checkboxStyle, hideImage } = useCheckboxStyle({
    completed,
    projectId,
    todoItemId,
    update,
    setUpdate
  });
  const {timeDiff, refreshTime} = TimeConverter();
  const [modify, setModify] = useState(false);

  const [todoList, setTodoList] = useState({
    todoListId: '',
    todoListTitle: '',
  });

  const {todoListId, todoListTitle} = todoList;
  const directories = [{
    url: `/dashboard/projectpanel/${projectId}`,
    name: projectName,
  }];
  directories.push({url: `/project/${projectId}/todolistset`, name: 'To-dos'});
  directories.push({url: `/project/${projectId}/todolists/${todoListId}`, name: todoListTitle});

  return (
    <div>
      <NavBar/>
      <Breadcrumb directories={directories}/>
      <Paper className="mainPaper" elevation={3}>
        <div className={modify ? 'outline--show' : undefined}>
          <header className="todoitem__header">
            <span
              onMouseDown={mouseDown}
              onMouseUp={mouseUp}
              className={checkboxStyle}
            >
              {hideImage ? <span className="checkbox__text">Mark this done!</span>
                : <img src={markAsDone} alt='' className='markAsDoneIcon'/>}
            </span>
            <h3>
              <span className="todoitem__description">{todoItem.description}</span>
            </h3>
            <h4 className="todoitem__createDetail">
              {`Added by ${todoItem.createdUserName} ${timeDiff}`}
            </h4>
          </header>
          <TodoItemSection modify={modify} setModify={setModify} todoItem={todoItem} setTodoItem={setTodoItem} projectId={projectId}/>
        </div>
      </Paper>
    </div>
  );
};

export default TodoItem;
