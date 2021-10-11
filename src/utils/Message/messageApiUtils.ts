import axios from 'axios';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

// Start fetch message category list//
export const fetchMessageCategoryList = (projectId: string) => axios({
  method: 'get',
  url: `${baseUrl}/projects/${projectId}/message-categories`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});

export default fetchMessageCategoryList;
// End fetch message category list//
