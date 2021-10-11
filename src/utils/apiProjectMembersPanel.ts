import axios from 'axios';
import baseUrl from './apiUrls';

// Start GetProjectsMembersInfo//
const getProjectMembersInfo = (projectId: string | null) => axios({
  method: 'get',
  url: `${baseUrl}/projects/${projectId}/members`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});
// End GetProjectsMembersInfo//

export default getProjectMembersInfo;
