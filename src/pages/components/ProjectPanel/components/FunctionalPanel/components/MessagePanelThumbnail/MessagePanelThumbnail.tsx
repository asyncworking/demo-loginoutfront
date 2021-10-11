import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import IMessageItem from 'src/common/interfaces/IMessageItem';
import styles from './MessagePanelThumbnail.module.scss';
import MessagePanelContent from './MessagePanelContent/MessagePanelContent';

interface PropsTypes {
  messageList: IMessageItem[];
  isLoading: any;
}

const MessagePanelThumbnail = (props : PropsTypes) => {
  const { messageList, isLoading } = props;
  return (
    <>
      {isLoading ? (
        <span className={styles.loading}><CircularProgress color="primary" /></span>
      ) : (
        <MessagePanelContent messageList={messageList} />
      )}
    </>
  );
};

export default MessagePanelThumbnail;
