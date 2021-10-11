import axios from 'axios';
import ILogin from '../common/interfaces/ILogin';
import ISignUp from '../common/interfaces/ISignUp';
import IResendEmail from '../common/interfaces/IResendEmail';
import IInvatedSignUp from '../common/interfaces/IInvatedSignUp';
import ICreateCompany from '../common/interfaces/ICreateCompany';
import ICompanyProfile from '../common/interfaces/ICompanyProfile';
import IProjectProfile from '../common/interfaces/IProjectProfile';
import IVerifyEmailExists from '../common/interfaces/IVerifyEmailExists';
import IGetInvitationLink from '../common/interfaces/IGetInvitationLink';
import ICreateProject from '../common/interfaces/ICreateProject';
import ICreateTodoList from '../common/interfaces/ICreateTodoList';
import ICreateTodoItem from '../common/interfaces/Dto/Todo/TodoItem/ICreateTodoItem';
import IFetchSingleTodoList from '../common/interfaces/Dto/Todo/TodoList/IFetchSingleTodoList';
import IFetchTodoItem from '../common/interfaces/IFetchTodoItem';
import ICreateMessage from '../common/interfaces/ICreateMessage';
import IUpdateTodoItem from '../common/interfaces/Dto/Todo/TodoItem/IUpdateTodoItem';
import IUpdateTodoItemCompleted from '../common/interfaces/IUpdateTodoItemCompleted';

const baseUrl = process.env.REACT_APP_ASYNC_WORK_API;

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

// Start SignUpForm
export const verifyEmailExists = ({ email }: IVerifyEmailExists) => axios({
  method: 'get',
  url: `${baseUrl}/signup`,
  params: {
    email,
  },
});

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

export const invitationsRegister = ({ name, email, password, companyId, title }: IInvatedSignUp) => axios({
  method: 'post',
  url: `${baseUrl}/invitations/register`,
  data: {
    name,
    email,
    password,
    companyId,
    title,
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

// Start FirstLoginForm
export const createCompany = ({ email, company, title }: ICreateCompany) => axios({
  method: 'post',
  url: `${baseUrl}/companies`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  data: {
    adminEmail: email,
    name: company,
    userTitle: title,
  },
});
// End FirstLoginForm

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

// Start update company profile
export const updateCompanyProfile = ({ companyId, name, description }: ICompanyProfile) => axios({
  method: 'put',
  url: `${baseUrl}/companies/${companyId}/profile`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  data: {
    companyId,
    name,
    description,
  },
});
// End update company profile

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

// Start InvitationForm
export const getInvitationLink = ({ name, email, title, companyId }: IGetInvitationLink) => axios({
  method: 'get',
  url: `${baseUrl}/invitations/companies`,
  params: {
    name,
    email,
    title,
    companyId,
  },
});
// End InvitationForm

// Start CreateProject//
export const createProject = ({ name, ownerId, companyId }: ICreateProject) => axios({
  method: 'post',
  url: `${baseUrl}/projects`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  data: {
    name,
    ownerId,
    companyId,
  },
});
// End CreateProject//

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

// Start UpdateProjectProfile//
export const updateProjectProfile = ({ projectId, name, description }: IProjectProfile) => axios({
  method: 'put',
  url: `${baseUrl}/projects/${projectId}/project-info`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  data: {
    projectId,
    name,
    description,
  },
});
// End UpdateProjectProfile//

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

// Start fetch todoList by id
export const fetchSingleTodoList = ({ projectId, todolistId }: IFetchSingleTodoList) => axios({
  method: 'get',
  url: `${baseUrl}/projects/${projectId}/todolists/${todolistId}`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});
// End fetch todoList by id

// Start create todoList
export const createTodoList = ({ projectId, todoListTitle, text, html }: ICreateTodoList) => axios({
  method: 'post',
  url: `${baseUrl}/projects/${projectId}/todolists`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  data: {
    projectId,
    todoListTitle,
    details: text,
    originDetails: html,
  },
});
// End create todoList

// Start TodoItemForm
export const createTodoItem = ({ projectId, todolistId, createdUserId, text, desc, html, dueDate }: ICreateTodoItem) => axios({
  method: 'post',
  url: `${baseUrl}/projects/${projectId}/todolists/${todolistId}/todoitems`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  data: {
    todolistId,
    createdUserId,
    notes: text,
    originNotes: html,
    description: desc,
    dueDate,
  },
});
// End TodoItemForm

// Start fetch todoItem by id
export const fetchTodoItem = ({ projectId, todoItemId }: IFetchTodoItem) => axios({
  method: 'get',
  url: `${baseUrl}/projects/${projectId}/todoitems/${todoItemId}`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});
// End fetch todoItem by id

// Start update todoItem
export const updateTodoItem = ({ todoItemId, projectId, description, notes, originNotes, dueDate }: IUpdateTodoItem) => axios({
  method: 'put',
  url: `${baseUrl}/projects/${projectId}/todoitems/${todoItemId}`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  data: {
    description,
    notes,
    originNotes,
    dueDate,
  },
});
// End update todoItem

// Start change todoItem completed status
export const changeTodoItemCompletedStatus = ({ projectId, todoItemId }: IUpdateTodoItemCompleted) => axios({
  method: 'put',
  url: `${baseUrl}/projects/${projectId}/todoitems/${todoItemId}/completed`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});
// End change todoItem completed status

// Start fetch message list
export const fetchMessageList = (projectId: string) => axios({
  method: 'get',
  url: `${baseUrl}/projects/${projectId}/messages`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});
// End fetch message list

// Start create message
export const createMessage = ({ projectId, companyId, messageCategoryId, messageTitle, posterUserId, text, html, subscribersIds }:ICreateMessage) => axios({
  method: 'post',
  url: `${baseUrl}/projects/${projectId}/messages`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  data: {
    projectId,
    companyId,
    messageCategoryId,
    messageTitle,
    posterUserId,
    content: text,
    originNotes: html,
    subscribersIds,
  },
});
// End create message

// Start fetch single message
export const fetchMessage = (projectId: string, messageId: string) => axios({
  method: 'get',
  url: `${baseUrl}/projects/${projectId}/messages/${messageId}`,
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});
// End fetch single message
