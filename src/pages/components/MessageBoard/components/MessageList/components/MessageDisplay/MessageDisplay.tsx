import React from 'react';
import { Link } from 'react-router-dom';
import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IMessageItem from 'src/common/interfaces/IMessageItem';
import MessageItem from './MessageItem/MessageItem';

interface PropsType {
  projectId: string;
  messageList: IMessageItem[];
}

const uesStyles = makeStyles(() => createStyles({
  messageList: {
    padding: '0 40px',
  },
}));

const MessageDisplay = ({ projectId, messageList }: PropsType) => {
  const styles = uesStyles();
  messageList.sort((a, b) => b.postTime.localeCompare(a.postTime));
  const messageListDisplay = messageList ? messageList.map((e: IMessageItem) => (
    <Link key={e.id} to={`/project/${projectId}/messages/${e.id}`}>
      <MessageItem key={e.id} message={e} />
    </Link>
  )) : <div />;
  return (
    <>
      <ul className={styles.messageList}>
        {messageListDisplay}
      </ul>
    </>
  );
};

export default MessageDisplay;
