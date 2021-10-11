/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import NavBar from 'src/components/NavBar/NavBar';
import Breadcrumb from 'src/components/Breadcrumb/Breadcrumb';
import * as apiUtils from 'src/utils/apiUtils';
import UserProfileIcon from 'src/components/NavBar/components/UserProfileIcon';
import timeConvert from 'src/common/functions/timeCovert';
import useStyles from './MessageDetails.style';

const MessageDetails = () => {
  const styles = useStyles();

  const { projectId } = useParams<{ projectId: string }>();
  const { messageId } = useParams<{ messageId: string }>();
  const [projectName, setProjectName] = useState('');
  const [message, setMessage] = useState({
    id: '',
    messageTitle: '',
    posterUser: '',
    createdTime: '',
    messageCategoryName: '',
    messageCategoryEmoji: '',
    originNotes: '',
    subscribersIds: '',
  });
  const { messageTitle, posterUser, createdTime, messageCategoryName, messageCategoryEmoji, originNotes, subscribersIds } = message;
  const directories = [{
    url: `/dashboard/projectpanel/${projectId}`,
    name: projectName,
  }];
  directories.push({ url: `/project/${projectId}/messages`, name: 'Message Board' });
  useEffect(() => {
    let isSubscribed = true;
    const loadData = async () => {
      const messageResp = await apiUtils.fetchMessage(projectId, messageId);
      const projectResp = await apiUtils.getProjectInfo(projectId);
      if (isSubscribed && messageResp.status === 200 && projectResp.status === 200) {
        setProjectName(projectResp.data.name);
        const { timeDisplay } = timeConvert(messageResp.data.postTime);
        setMessage({
          id: messageResp.data.id,
          messageTitle: messageResp.data.messageTitle,
          posterUser: messageResp.data.posterUser,
          createdTime: timeDisplay,
          messageCategoryName: messageResp.data.messageCategoryName,
          messageCategoryEmoji: messageResp.data.messageCategoryEmoji,
          originNotes: messageResp.data.originNotes,
          subscribersIds: messageResp.data.subscribersIds,
        });
      }
    };
    loadData();
    return () => { isSubscribed = false; };
  }, [projectId, messageId]);

  const outputMessageInfo = () => {
    if (messageCategoryName === null || messageCategoryEmoji === null) {
      return posterUser;
    }
    return messageCategoryEmoji?.concat(' ')
      .concat(messageCategoryName)
      .concat(' by ')
      .concat(posterUser);
  };

  const ouputNotificationInfo = () => {
    const subscribersIdsArray = subscribersIds === null ? null : subscribersIds.split(',');
    if (subscribersIdsArray === null || subscribersIdsArray.length === 0) {
      return 'No one was notified.';
    }
    return `Notified ${subscribersIdsArray.length} people`;
  };

  return (
    <div>
      <NavBar />
      <Breadcrumb directories={directories} />
      <Paper className={styles.mainPaper} elevation={3}>
        <header className={styles.message_header}>
          <div className={styles.message_title}>
            <h1 className={styles.title}>
              {messageTitle}
            </h1>
          </div>
          <div className={styles.message_notes}>
            <UserProfileIcon name={posterUser} size="50" textSizeRatio={2.5} />
            <div className={styles.postdetails}>
              <div data-testid="test-postInfo">
                {outputMessageInfo()}
              </div>
              <div>
                {createdTime}
                {' · '}
                {ouputNotificationInfo()}
              </div>
            </div>
          </div>
        </header>
        <div className={styles.content}>
          <p dangerouslySetInnerHTML={{ __html: originNotes }} />
        </div>
      </Paper>
    </div>
  );
};

export default MessageDetails;
