import axios from 'axios';
import baseUrl from './apiUrls';

// Start PostProjectsMembersInfo//
export const addProjectsMembers = (projectId: string | null, userIds: string) => axios({
  method: 'post',
  url: `${baseUrl}/projects/${projectId}/members`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  params: {
    userIds,
  },
});
// End PostProjectsMembersInfo//

// Start ProjectsEmployeesInvitations//
export const getAvailableEmployees = (companyId: string | null, projectId: string | null) => axios({
  method: 'get',
  url: `${baseUrl}/companies/${companyId}/available-employees`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  params: {
    projectId,
  },
});
// End ProjectsEmployeesInvitations//
