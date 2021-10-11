/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as apiUtils from 'src/utils/apiUtils';
import IMessageItem from 'src/common/interfaces/IMessageItem';
import MessageHeader from './components/MessageHeader/MessageHeader';
import MessageDisplay from './components/MessageDisplay/MessageDisplay';

interface IProjectId {
  projectId: string,
}

const MessageList = ({ projectId }: IProjectId) => {
  const [messageList, setMessageList] = useState<IMessageItem[]>([] as IMessageItem[]);
  const history = useHistory();
  useEffect(() => {
    let isSubscribed = true;
    const fetchMessageList = async () => {
      if (projectId !== null) {
        const resp = await apiUtils.fetchMessageList(projectId);
        if (resp.status === 200) {
          if (isSubscribed && resp.data.length > 0) {
            setMessageList(resp.data);
          } else {
            history.push(`/project/${projectId}/new-message`);
          }
        }
      }
    };
    fetchMessageList();
    return () => { isSubscribed = false; };
  }, [projectId]);

  return (
    <div>
      <MessageHeader projectId={projectId} />
      <MessageDisplay
        projectId={projectId}
        messageList={messageList}
      />
    </div>
  );
};

export default MessageList;
