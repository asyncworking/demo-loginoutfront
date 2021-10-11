/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import UserProfileIcon from 'src/components/NavBar/components/UserProfileIcon';
import IMessageItem from 'src/common/interfaces/IMessageItem';
import timeConvert from 'src/common/functions/timeCovert';
import useStyles from './MessageItem.style';

interface Props {
  message: IMessageItem
}

const MessageItem = ({ message }: Props) => {
  const styles = useStyles();
  const { messageTitle, postTime, posterUser, messageCategoryName, messageCategoryEmoji, content } = message;
  const [timeDiff, setTimeDiff] = useState('');
  const displayTitle = messageTitle.length > 32 ? messageTitle.slice(0, 32).concat('...') : messageTitle;
  let timeoutId: NodeJS.Timeout;
  const refreshTime = (createdTime: string) => {
    if (timeoutId) {
      // clear time
      clearTimeout(timeoutId);
    }
    const { timeDisplay, interval } = timeConvert(createdTime);
    setTimeDiff(timeDisplay);
    if (interval != null) {
      timeoutId = setTimeout(() => {
        // have set time
        refreshTime(createdTime);
      }, interval);
    }
  };

  const ouputMessageInfo = () => {
    if (messageCategoryName === null || messageCategoryEmoji === null) {
      if (!content) {
        return posterUser.concat(' • ').concat(timeDiff);
      }
      return posterUser.concat(' • ').concat(timeDiff).concat(' — ');
    }
    if (!content) {
      return messageCategoryEmoji.concat(' ')
        .concat(messageCategoryName)
        .concat(' by ')
        .concat(posterUser)
        .concat(' • ')
        .concat(timeDiff);
    }
    return messageCategoryEmoji.concat(' ')
      .concat(messageCategoryName)
      .concat(' by ')
      .concat(posterUser)
      .concat(' • ')
      .concat(timeDiff)
      .concat(' — ');
  };

  useEffect(() => {
    refreshTime(postTime);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.icon}>
        <UserProfileIcon name={posterUser} size="50" textSizeRatio={2} />
      </div>
      <div>
        <div className={styles.title}>{displayTitle}</div>
        <div className={styles.content}>
          <span className={styles.userName}>
            {ouputMessageInfo()}
          </span>
          {' '}
          {content != null && content.length > 128
            ? content.slice(0, 128).concat('...')
            : content}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
