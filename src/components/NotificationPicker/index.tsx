import React from 'react';
import UserProfileIcon from 'src/components/NavBar/components/UserProfileIcon';
import IProjectMember from 'src/common/interfaces/IProjectMember';
import NotificationPopUp from './components/NotificationPopUp';
import useStyles from './NotificationPicker.style';
import useNotificationPicker from './hooks';

interface PropsType {
  projectId: string,
  finalSelectedList: any,
  setFinalSelectedList: Function,
}

const NotificationPicker = (props: PropsType) => {
  const { projectId, finalSelectedList, setFinalSelectedList } = props;
  const classes = useStyles();
  const { popUpState, selectedList, setSelectedList, togglePopUp, selectableMemberList } = useNotificationPicker(projectId);

  const selectedMembers = finalSelectedList.map((member: IProjectMember) => (
    <span key={member.id} className={classes.user_profile_icon}>
      <UserProfileIcon
        key={member.id}
        name={member.name}
        size="35"
        textSizeRatio={1.5}
      />
    </span>
  ));

  const subscriberNumMapper = () => {
    if (finalSelectedList.length === 0) {
      return 'nobody will be notified';
    }

    if (finalSelectedList.length === 1) {
      return '1 people will be notified';
    }

    return `these ${finalSelectedList.length} people will be notified`;
  };

  return (
    <>
      <div>
        When I post this,
        {' '}
        {subscriberNumMapper()}

        <button
          type="button"
          className={classes.selector_btn}
          onClick={togglePopUp}
        >
          Change...
        </button>
      </div>

      <div className={classes.notification__display}>
        {selectedMembers}
      </div>
      <>
        <NotificationPopUp
          togglePopUp={togglePopUp}
          selectableMemberList={selectableMemberList}
          setSelectedList={setSelectedList}
          selectedList={selectedList}
          popUpState={popUpState}
          finalSelectedList={finalSelectedList}
          setFinalSelectedList={setFinalSelectedList}
        />
      </>
    </>
  );
};
export default NotificationPicker;
