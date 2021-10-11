import { useState } from 'react';
import IProjectMember from 'src/common/interfaces/IProjectMember';

const useCheckedState = (member: IProjectMember, selectedList: any, setSelectedList: Function) => {
  const [checkedState, setCheckedState] = useState(false);

  const handleClick = () => {
    if (!selectedList.includes(member)) {
      setSelectedList(selectedList.concat(member));
    } else {
      setSelectedList(selectedList.filter((x: any) => x !== member));
    }
    setCheckedState(!checkedState);
  };

  return { handleClick, selectedList };
};

export default useCheckedState;
