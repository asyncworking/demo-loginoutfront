import React from 'react';
import IProjectMember from 'src/common/interfaces/IProjectMember';
import UserProfileIcon from 'src/components/NavBar/components/UserProfileIcon';
import useStyles from './SelectablePerson.style';
import useCheckedState from './hooks';

interface PropsType {
  member: IProjectMember,
  selectedList:any,
  setSelectedList: Function,
}

const SelectablePerson = (props: PropsType) => {
  const { member, selectedList, setSelectedList } = props;
  const classes = useStyles();
  const { handleClick } = useCheckedState(member, selectedList, setSelectedList);

  return (
    <div className={classes.selectable_person}>
      <div>
        <UserProfileIcon
          name={member.name}
          size="35"
          textSizeRatio={1.5}
        />
        <label htmlFor={member.id} className={classes.member_info}>
          {member.name}
          <span className={classes.member_title}>{member.title === null ? '' : `, ${member.title}`}</span>
        </label>
      </div>
      <input
        type="checkbox"
        className={classes.checkbox_button}
        name={member.id}
        value={member.id}
        checked={selectedList.includes(member)}
        onChange={handleClick}
      />
    </div>
  );
};

export default SelectablePerson;
