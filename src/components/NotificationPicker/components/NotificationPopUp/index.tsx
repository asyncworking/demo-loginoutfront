import React from 'react';
import { Button } from '@material-ui/core';
import IProjectMember from 'src/common/interfaces/IProjectMember';
import SelectablePerson from './components/SelectablePerson';
import useStyles from './NotificationPopUp.style';

interface PropsType {
  togglePopUp: any,
  selectableMemberList: IProjectMember[],
  setSelectedList: Function,
  selectedList: IProjectMember[],
  popUpState: boolean,
  setFinalSelectedList: Function,
  finalSelectedList: any,
}

const NotificationPopUp = (props : PropsType) => {
  const classes = useStyles();
  const { togglePopUp, selectableMemberList, setSelectedList, selectedList, popUpState, setFinalSelectedList, finalSelectedList } = props;

  const memberListSelector = selectableMemberList.map((member: IProjectMember) => (
    <SelectablePerson
      key={member.id}
      member={member}
      selectedList={selectedList}
      setSelectedList={setSelectedList}
    />
  ));

  const save = () => {
    togglePopUp();
    setFinalSelectedList(selectedList);
  };

  const close = () => {
    togglePopUp();
    setSelectedList(finalSelectedList);
  };

  return (
    <div data-testid="popupDisplay" className={`${popUpState ? `${classes.modal__display}` : `${classes.modal__hidden}`}`}>
      <div className={classes.modal_sheet}>
        <div className={classes.modal_sheet__scroller}>
          <h2 className={classes.modal_sheet__title}> Who should be notified?</h2>

          <div className={classes.group_selector}>
            <button
              data-testid="selectAllButton"
              type="button"
              className={classes.group_selector_btn}
              onClick={() => { setSelectedList(selectableMemberList); }}
            >
              Select everyone
            </button>
            {' • '}
            <button
              data-testid="selectNoneButton"
              type="button"
              className={classes.group_selector_btn}
              onClick={() => { setSelectedList([]); }}
            >
              Select no one
            </button>
          </div>

          <div>
            <h3 className={classes.list_header}>Project Members</h3>
            {memberListSelector}
          </div>
        </div>

        <footer className={classes.modal_sheet__footer}>
          <Button
            data-testid="saveButton"
            type="button"
            variant="contained"
            color="primary"
            className={classes.btn__save}
            onClick={save}
          >
            Save changes
          </Button>

          <Button
            data-testid="closeButton"
            type="button"
            variant="outlined"
            className={classes.btn__cancel}
            onClick={close}
          >
            Never mind
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default NotificationPopUp;
