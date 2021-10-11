import React, { ChangeEvent, useState } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Selector from 'src/components/Selector';
import * as apiUtils from 'src/utils/apiUtils';
import RichEditor from 'src/components/RichEditor/MyRichEditor';
import NotificationPicker from 'src/components/NotificationPicker';
import IProjectMember from 'src/common/interfaces/IProjectMember';
import useStyles from './MessageForm.style';

interface PropsType {
  projectId: string;
}

const MessageForm = (props: PropsType) => {
  const styles = useStyles();
  const history = useHistory();
  const [titleErr, setTitleErr] = useState(false);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [mdBody, setMdBody] = useState({
    text: '',
    delta: '',
    html: '',
  });
  const [finalSelectedList, setFinalSelectedList] = useState<IProjectMember[]>([] as IProjectMember[]);
  const { text, html } = mdBody;
  const { projectId } = props;
  const companyId = localStorage.getItem('companyId');
  const posterUserId = localStorage.getItem('userId');
  const subscribersIdsArray = finalSelectedList.map((x: any) => x.id);
  const subscribersIds = subscribersIdsArray.length === 0 ? null : subscribersIdsArray.join();
  const submitMessage = async (messageTitle:string, messageCategoryId:string | null) => {
    const resp = await apiUtils.createMessage({ projectId, companyId, messageCategoryId, messageTitle, posterUserId, text, html, subscribersIds });
    if (resp.status === 200) {
      history.push(`/project/${projectId}/messages/${resp.data.id}`);
    }
  };

  const createMessage = () => {
    const titleInfo = title.trim().length === 0 ? 'Untitled' : title;
    const categoryIdInfo = categoryId === null ? null : categoryId;

    submitMessage(titleInfo, categoryIdInfo);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val.length <= 255) {
      setTitle(val);
      setTitleErr(false);
    } else {
      setTitleErr(true);
    }
  };

  return (
    <div className={styles.message_add}>
      <div className={styles.message__select}>
        <Selector
          projectId={projectId}
          setCategoryId={setCategoryId}
        />
      </div>
      {titleErr ? (
        <span className={styles.err} data-testid="warning">Message Title has reached the limit of 255 characters.</span>) : null}
      <input
        className={styles.add_name}
        data-testid="title"
        placeholder="Type a title..."
        onChange={(event) => {
          handleTitleChange(event);
        }}
        value={title}
      />
      <div className={styles.richEditor}>
        <RichEditor mdBody={mdBody} setMdBody={setMdBody} placeholder="write away..." />
      </div>

      <div className={styles.notification_picker}>
        <NotificationPicker
          projectId={projectId}
          finalSelectedList={finalSelectedList}
          setFinalSelectedList={setFinalSelectedList}
        />
      </div>

      <footer className={styles.message__footer}>
        <div className={styles.post_btnArea}>
          <div>
            <Button
              variant="outlined"
              color="primary"
              className={styles.add}
              data-testid="postButton"
              onClick={() => {
                createMessage();
              }}
            >
              Post this message
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MessageForm;
