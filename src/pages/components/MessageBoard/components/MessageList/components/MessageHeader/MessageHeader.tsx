import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './MessageHeader.style';

interface IProjectId {
  projectId: string,
}

const MessageHeader = ({ projectId }: IProjectId) => {
  const styles = useStyles();
  const history = useHistory();

  const addNewMessage = () => {
    history.push(`/project/${projectId}/new-message`);
  };

  return (
    <div className={styles.header}>
      <div className={styles.head_title}>
        <h1>
          <span className={styles.head_name}>Message Board</span>
          <div className={styles.head_btnArea}>
            <Button
              className={styles.add}
              data-testid="new-message-button"
              variant="contained"
              color="primary"
              onClick={() => {
                addNewMessage();
              }}
            >
              + New Message
            </Button>
          </div>
        </h1>
      </div>
      <div className={styles.header__line} />
    </div>
  );
};

export default MessageHeader;
