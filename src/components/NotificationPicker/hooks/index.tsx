import { useState, useEffect } from 'react';
import IProjectMember from 'src/common/interfaces/IProjectMember';
import * as apiUtils from 'src/utils/apiUtils';

const useNotificationPicker = (projectId: string) => {
  const [popUpState, setpopUpState] = useState(false);
  const [memberList, setMemberList] = useState<IProjectMember[]>([] as IProjectMember[]);
  const [selectedList, setSelectedList] = useState<IProjectMember[]>([] as IProjectMember[]);

  const fetchProjectMemberList = async () => {
    const resp = await apiUtils.fetchProjectMemberList(projectId);
    if (resp.status === 200) {
      setMemberList(resp.data);
    }
  };

  useEffect(() => {
    fetchProjectMemberList();
  }, [projectId]);

  const getUserIdResult = localStorage.getItem('userId');

  const userId = getUserIdResult === null ? '' : getUserIdResult;

  const selectableMemberList = memberList.filter((x) => parseInt(x.id, 10) !== parseInt(userId, 10));

  const togglePopUp = () => {
    setpopUpState(!popUpState);
  };

  return { popUpState, selectedList, setSelectedList, togglePopUp, selectableMemberList };
};

export default useNotificationPicker;
