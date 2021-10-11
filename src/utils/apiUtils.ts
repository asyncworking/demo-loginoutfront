import axios from 'axios';
import ILogin from '../common/interfaces/ILogin';
import ISignUp from '../common/interfaces/ISignUp';
import IResendEmail from '../common/interfaces/IResendEmail';
import IVerifyEmailExists from '../common/interfaces/IVerifyEmailExists';

// const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;
const baseUrl = 'http://localhost:8080/api/v1';

axios.interceptors.response.use(
  (res: any) => res,
  (error: any) => {
    const status = error.response ? error.response.status : null;
    if (status === 403) {
      localStorage.clear();
      window.location.replace('/login');
    }
    return Promise.reject(error);
  },
);

// Start LoginForm
export const login = ({ email, password }: ILogin) => axios({
  method: 'post',
  url: `${baseUrl}/login`,
  data: {
    email,
    password,
  },
});

export const verifyStatus = (email: string, token: string) => axios({
  method: 'get',
  url: `${baseUrl}/login`,
  headers: { Authorization: `Bearer ${token}` },
  params: {
    email,
  },
});

export const verifyCompany = (email: string) => axios({
  method: 'get',
  url: `${baseUrl}/company`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  params: {
    email,
  },
});
// End LoginForm

export const signup = ({ name, email, password }: ISignUp) => axios({
  method: 'post',
  url: `${baseUrl}/signup`,
  data: {
    name,
    email,
    password,
  },
});

export const getInvitationInfo = (code: string | null) => axios({
  method: 'get',
  url: `${baseUrl}/invitations/info`,
  params: {
    code,
  },
});

export const verifyActiveUser = (code: string | null) => axios({
  method: 'post',
  url: `${baseUrl}/verify`,
  params: {
    code,
  },
});

export const resendActivationLink = ({ email }: IResendEmail) => axios({
  method: 'post',
  url: `${baseUrl}/resend`,
  data: {
    email,
  },
});
// End SignUpForm

// Start GetCompanyInfo and Colleagues list
export const getCompanyInfoColleagues = (email: string | null) => axios({
  method: 'get',
  url: `${baseUrl}/companies/company-info`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  params: {
    email,
  },
});
// End GetCompanyInfo and Colleagues list

// Start pre-fill name and description of company
export const fetchCompanyProfile = (companyId: string | null) => axios({
  method: 'get',
  url: `${baseUrl}/companies/${companyId}/profile`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});
// End prefill name and description of company

// Start companyPanel
export const getCompanyInfo = (companyId: string | null) => axios({
  method: 'get',
  url: `${baseUrl}/companies/${companyId}`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});

export const getEmployeeInfo = (id: string | null) => axios({
  method: 'get',
  url: `${baseUrl}/companies/${id}/employees`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});
// End companyPanel

// Start GetProjectList//
export const getProjectList = (companyId: string) => axios({
  method: 'get',
  url: `${baseUrl}/projects/${companyId}`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});
// End GetProjectList//

// Start GetProjectInfo and ProjectUser list//
export const getProjectInfo = (projectId: string | null) => axios({
  method: 'get',
  url: `${baseUrl}/projects/${projectId}/project-info`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});

export const fetchProjectMemberList = (projectId: string) => axios({
  method: 'get',
  url: `${baseUrl}/projects/${projectId}/members`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});
// End GetProjectInfo and ProjectUser list//

// Start fetch todoLists
export const fetchTodoLists = (projectId: string, quantity: number) => axios({
  method: 'get',
  url: `${baseUrl}/projects/${projectId}/todolists`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  params: {
    quantity,
  },
});
// End fetch todoLists

// Start fetch message list
export const fetchMessageList = (projectId: string) => axios({
  method: 'get',
  url: `${baseUrl}/projects/${projectId}/messages`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});
// End fetch message list

// Start fetch single message
export const fetchMessage = (projectId: string, messageId: string) => axios({
  method: 'get',
  url: `${baseUrl}/projects/${projectId}/messages/${messageId}`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});
// End fetch single message

// Start SignUpForm
export const verifyEmailExists = ({ email }: IVerifyEmailExists) => axios({
  method: 'get',
  url: `${baseUrl}/signup`,
  params: {
    email,
  },
});
