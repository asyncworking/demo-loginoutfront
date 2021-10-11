import * as React from 'react';
import message from 'src/assets/svgs/message.svg';
import IMessageItem from 'src/common/interfaces/IMessageItem';
import UserProfileIcon from 'src/components/NavBar/components/UserProfileIcon';
import InitialPanelThumbnail from '../../InitialPanelThumbnail/InitialPanelThumbnail';
import styles from './MessagePanelContent.module.scss';

interface PropsTypes {
  messageList: IMessageItem[];
}

const MessagePanelContent = (props: PropsTypes) => {
  const { messageList } = props;
  const description = 'Post announcements, pitch ideas, progress updates, etc. and keep feedback on-topic.';

  if (messageList.length === 0) {
    return <InitialPanelThumbnail svg={message} description={description} />;
  }
  messageList.sort((a, b) => b.postTime.localeCompare(a.postTime));
  const displayList = messageList.slice(0, 5);

  const ouputMessageInfo = (messageItem: IMessageItem) => {
    if (!(messageItem.messageCategoryName === null || messageItem.messageCategoryEmoji === null)) {
      if (!messageItem.content) {
        return messageItem.messageCategoryName.length > 14
          ? messageItem.messageCategoryEmoji.concat(' ').concat(messageItem.messageCategoryName.slice(0, 14)).concat('...')
          : messageItem.messageCategoryEmoji.concat(' ').concat(messageItem.messageCategoryName);
      }
      return messageItem.messageCategoryName.length > 14
        ? messageItem.messageCategoryEmoji.concat(' ').concat(messageItem.messageCategoryName.slice(0, 14)).concat('...')
        : messageItem.messageCategoryEmoji.concat(' ').concat(messageItem.messageCategoryName).concat(' - ');
    }
    return '';
  };

  return (
    <ul className={styles.message_list}>
      {displayList.map((messageItem: IMessageItem) => (
        <li key={messageItem.id}>
          <div className={styles.cardWrapper}>
            <div className={styles.icon}>
              <UserProfileIcon name={messageItem.posterUser} size="32" textSizeRatio={2.5} />
            </div>
            <div>
              <div className={styles.title}>
                {messageItem.messageTitle.length > 16
                  ? messageItem.messageTitle.slice(0, 16).concat('...')
                  : messageItem.messageTitle}
              </div>
              <div className={styles.content}>
                <span className={styles.messageCategory}>
                  {ouputMessageInfo(messageItem)}
                </span>
                <span className={styles.description}>
                  { messageItem.content }
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MessagePanelContent;
