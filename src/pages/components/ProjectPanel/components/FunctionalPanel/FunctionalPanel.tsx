import React from 'react';
import ITodoLists from 'src/common/interfaces/Dto/Todo/TodoList/ITodoLists';
import FunctionalPanelItem from './components/FunctionalPanelItem/FunctionalPanelItem';
import MessagePanelThumbnail from './components/MessagePanelThumbnail/MessagePanelThumbnail';
import TodosPanelThumbnail from './components/TodosPanelThumbnail/TodosPanelThumbnail';
import SchedulePanelThumbnail from './components/SchedulePanelThumbnail/SchedulePanelThumbnail';
import DocFilePanelThumbnail from './components/DocFilePanelThumbnail/DocFilePanelThumbnail';
import IMessageItem from '../../../../../common/interfaces/IMessageItem';

interface PropsTypes {
  projectId: string;
  todoInfo: ITodoLists[];
  messageList: IMessageItem[];
  isLoading: any;
}
interface PanelTypes {
  title: string;
  link: string;
  display: any;
}

const FunctionPanel = (props: PropsTypes) => {
  const { projectId, todoInfo, messageList, isLoading } = props;
  const data = [
    {
      title: 'Message',
      link: `/project/${projectId}/messages`,
      display: <MessagePanelThumbnail messageList={messageList} isLoading={isLoading.message} />,
    },
    {
      title: 'To-dos',
      link: `/project/${projectId}/todolistset`,
      display: <TodosPanelThumbnail todoInfo={todoInfo} isLoading={isLoading.todos} />,
    },
    {
      title: 'Schedule',
      link: '/project/:projectId/people/users/edit',
      display: <SchedulePanelThumbnail isLoading={isLoading.schedule} />,
    },
    {
      title: 'Doc & Files',
      link: '/project/:projectId/people/users/edit',
      display: <DocFilePanelThumbnail isLoading={isLoading.docFile} />,
    },
  ];

  return (
    <>
      {data.map((panel: PanelTypes) => (
        <FunctionalPanelItem
          key={panel.title}
          title={panel.title}
          link={panel.link}
          display={panel.display}
        />
      ))}
    </>
  );
};

export default FunctionPanel;
