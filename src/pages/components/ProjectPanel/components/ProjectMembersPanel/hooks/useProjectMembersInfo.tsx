import { useState } from 'react';

const useProjectMembersInfo = () => {
  const [membersInfo, setMembersInfo] = useState({
    membersList: [],
  });

  const [projectInfo, setProjectInfo] = useState({
    projectName: '',
    description: '',
    projectUserNames: [],
  });

  return { membersInfo, setMembersInfo, projectInfo, setProjectInfo };
};

export default useProjectMembersInfo;
