/* eslint-disable */
const jsonServer = require('json-server');
const fs = require('fs');

const server = jsonServer.create();
const router = jsonServer.router('./src/mockApi/db.json');
const userdb = JSON.parse(fs.readFileSync('./src/mockApi/users.json', 'UTF-8'));
const companyInfodb = JSON.parse(fs.readFileSync('./src/mockApi/companyInfo.json', 'UTF-8'));
const singleToDoInfodb = JSON.parse(fs.readFileSync('./src/mockApi/singleTodoListItem.json', 'UTF-8'));
const singleToDoItemdb = JSON.parse(fs.readFileSync('./src/mockApi/singleTodoItem.json', 'UTF-8'));
const toDoInfodb = JSON.parse(fs.readFileSync('./src/mockApi/todoInfo.json', 'UTF-8'));
const projectListdb = JSON.parse(fs.readFileSync('./src/mockApi/projectListInfo.json', 'UTF-8'));
const messagesdb = JSON.parse(fs.readFileSync('./src/mockApi/messagesInfo.json', 'UTF-8'));
const messageCategorydb = JSON.parse(fs.readFileSync('./src/mockApi/messageCategoriesInfo.json', 'UTF-8'));
const projectMemberListdb = JSON.parse(fs.readFileSync('./src/mockApi/projectMemberList.json', 'UTF-8'));
const singleMessagedb = JSON.parse(fs.readFileSync('./src/mockApi/singleMessageInfo.json', 'UTF-8'));
const projectInfodb = JSON.parse(fs.readFileSync('./src/mockApi/projectInfo.json', 'UTF-8'));
const availableEmployeesListdb = JSON.parse(fs.readFileSync('./src/mockApi/availableEmployeesList.json', 'UTF-8'));
const middlewares = jsonServer.defaults();
server.use(middlewares);

function isAuthenticated({ email, password }) {
 return userdb.users.findIndex((user) => user.email === email && user.password === password) !== -1;
}

router.render = (req, res) => {
 const url = req.originalUrl;
 // signup
 if (url === '/api/v1/signup' && req.method === 'POST') {
  res.sendStatus(200);
  const { email, password, name } = req.body;
  const last_item_id = userdb.users[userdb.users.length - 1].id;
  userdb.users.push({ id: last_item_id + 1, email, name, password });
  fs.writeFileSync('./src/mockApi/users.json', JSON.stringify(userdb));
 }
 // login
 if (url === '/api/v1/login' && req.method === 'POST') {
  const { email, password } = req.body;
  const index = userdb.users.findIndex((user) => user.email === email);
  if (isAuthenticated({ email, password }) === true) {
   res.status(200).jsonp({ 
    name: userdb.users[index].name,
    id: userdb.users[index].id,
    accessToken: userdb.users[index].accessToken,
  });
  } else {
   res.sendStatus(400);
  }
 }
 if (url === '/api/v1/invitations/register' && req.method === 'POST') {
  res.sendStatus(200);
  const { email, password, name } = req.body;
  const last_item_id = userdb.users[userdb.users.length - 1].id;
  userdb.users.push({ id: last_item_id + 1, email, name, password });
  fs.writeFileSync('./src/mockApi/users.json', JSON.stringify(userdb));
 }

 // createOneProject
 if (url === '/api/v1/projects' && req.method === 'POST') {
  const { name } = req.body;
  console.log(name);
  const last_project_id = projectListdb[projectListdb.length - 1].id;
  projectListdb.push({ id: last_project_id + 1, name, projectUserNames: ['Steven Wang'] });
  fs.writeFileSync('./src/mockApi/projectListInfo.json', JSON.stringify(projectListdb));
  res.status(200).jsonp(projectListdb[projectListdb.length - 1].id + 1);
 }
};

function hasSignup({ email }) {
 return userdb.users.findIndex((user) => user.email === email) !== -1;
}

// verifyCompany
server.get('/api/v1/company', (req, res) => {
 // 'user0001@test.com' user already has company
 if (req.query.email === 'user0001@test.com') {
  res.status(200).jsonp(companyInfodb.id);
 } else {
  res.sendStatus(204);
 }
});

// login
server.get('/api/v1/login', (req, res) => {
 // 'user0002@test.com' user is unverfied
 if (req.query.email === 'user0002@test.com') {
  res.sendStatus(203);
 } else {
  res.sendStatus(200);
 }
});

// verifyEmailExists
server.get('/api/v1/signup', (req, res) => {
 const { email } = req.query;
 if (hasSignup({ email }) === true) {
  res.sendStatus(409);
 } else {
  res.sendStatus(200);
  // res.sendStatus(500)
 }
});

// getCompanyInfoColleagues
server.get('/api/v1/companies/company-info', (req, res) => {
 res.status(200).jsonp({
  companyId: companyInfodb.companyId,
  name: companyInfodb.companyName,
  description: companyInfodb.description,
  colleague: companyInfodb.colleague,
 });
});

// getCompanyInfo
server.get('/api/v1/companies/:companyId', (req, res) => {
 res.status(200).jsonp({
  name: companyInfodb.companyName,
  description: companyInfodb.description,
 });
});

const toEmployeeList = (employee) => ({
 name: employee.name,
 email: employee.email,
 title: employee.title,
});

// getEmployeeInfo
server.get('/api/v1/companies/:companyId/employees', (req, res) => {
 const mappedEmployeeList = companyInfodb.employeeList.map(toEmployeeList);
 res.status(200).jsonp(mappedEmployeeList);
});

// resendActivationLink
server.post('/api/v1/resend', (req, res) => {
 res.sendStatus(200);
});

// createCompany
server.post('/api/v1/companies', (req, res) => {
 res.status(200).jsonp(companyInfodb.id);
});

// fetchCompanyProfile
server.get('/api/v1/companies/:companyId/profile', (req, res) => {
 res.status(200).jsonp({
  name: companyInfodb.companyName,
  description: companyInfodb.description,
 });
});

// updateCompanyProfile
server.put('/api/v1/companies/:companyId/profile', (req, res) => {
 res.sendStatus(200);
});

// getInvitationLink
server.get('/api/v1/invitations/companies', (req, res) => {
 const invitationLink = `localhost:3000/${companyInfodb.name}&${companyInfodb.email}&${companyInfodb.title}&${companyInfodb.companyId}`;
 res.status(200).jsonp(invitationLink);
});

const toProjectSummary = (projectList) => ({
 id: projectList.id,
 name: projectList.name,
 description: projectList.description,
 projectUserNames: projectList.projectUserNames,
});

// getProjectList
server.get('/api/v1/projects/:companyId', (req, res) => {
 const mappedProjectListData = projectListdb.map(toProjectSummary);
 res.status(200).jsonp(mappedProjectListData);
});

// getProjectInfo
server.get('/api/v1/projects/:projectId/project-info', (req, res) => {
 res.status(200).jsonp({
  name: projectListdb[req.params.projectId - 1].name,
  description: projectListdb[req.params.projectId - 1].description,
  projectUserNames: projectListdb[req.params.projectId - 1].projectUserNames,
 });
});

// updateProjectProfile
server.put('/api/v1/projects/:projectId/project-info', (req, res) => {
 res.sendStatus(200);
});

// getAvailableEmployees
const toAvailableEmployeesList = (availableEmployees) => ({
 name: availableEmployees.name,
 email: availableEmployees.email,
 title: availableEmployees.title,
});

server.get('/api/v1/companies/:companyId/available-employees', (req, res) => {
  const mappedAvailableEmployeesList = availableEmployeesListdb.availableEmployeesNames.map(toAvailableEmployeesList);
  res.sendStatus(200).jsonp(mappedAvailableEmployeesList);
});

// addProjectMmembers
server.post('/api/v1/projects/:projectId/members', (req, res) => {
  res.sendStatus(200);
});

// fetchSingleTodoList
server.get('/api/v1/projects/:projectid/todolists/:todolistid', (req, res) => {
  res.status(200).jsonp({
    id: singleToDoInfodb.id,
    projectId: singleToDoInfodb.projectId,
    todoListTitle: singleToDoInfodb.todoListTitle,
    details: singleToDoInfodb.details,
    docURL: singleToDoInfodb.docURL,
    todoItemGetDtos: singleToDoInfodb.todoItemGetDtos
 });
});

// fetchTodoLists
const toTodoListDto = (todoDtoList) => ({
  id: todoDtoList.id,
  todoListTitle: todoDtoList.todoListTitle,
  details: todoDtoList.details,
  todoItemGetDtos: todoDtoList.todoItemGetDtos,
});

server.get('/api/v1/projects/:projectId/todolists', (req, res) => {
  const mappedTodoListData = toDoInfodb.map(toTodoListDto);
 res.status(200).jsonp(mappedTodoListData);
});

// fetchOneTodoItem
server.get('/api/v1/projects/:projectId/todoitems/:todoitemId', (req, res) => {
  res.status(200).jsonp({
    todoListId: singleToDoItemdb.todoListId,
    todoListTitle: singleToDoItemdb.todoListTitle,
    projectId: singleToDoItemdb.projectId,
    projectName: singleToDoItemdb.projectName,
    todoItemGetDto: singleToDoItemdb.todoItemGetDto,
 });
});

const toMessagesDto = (message) => ({
  id: message.id,
  messageTitle: message.messageTitle,
  posterUserId: message.posterUserId,
  posterUser: message.posterUser,
  content: message.content,
  messageCategoryId: message.messageCategoryId,
  messageCategoryName: message.messageCategoryName,
  messageCategoryEmoji: message.messageCategoryEmoji,
  docURL: message.docURL,
  postTime: message.postTime,
  originNotes: message.originNotes,
  subscribersIds: message.subscribersIds,
 });

server.get('/api/v1/projects/:projectId/messages', (req, res) => {
  const mappedMessagesData = messagesdb.map(toMessagesDto);
  res.status(200).jsonp(mappedMessagesData);
});

server.get('/api/v1/projects/:projectId/messages/:messageId', (req, res) => {
  res.status(200).jsonp({
    id: singleMessagedb.id,
    messageTitle: singleMessagedb.messageTitle,
    posterUserId: singleMessagedb.posterUserId,
    posterUser: singleMessagedb.posterUser,
    content: singleMessagedb.content,
    messageCategoryId: singleMessagedb.messageCategoryId,
    messageCategoryName: singleMessagedb.messageCategoryName,
    messageCategoryEmoji: singleMessagedb.messageCategoryEmoji,
    docURL: singleMessagedb.docURL,
    postTime: singleMessagedb.postTime,
    originNotes: singleMessagedb.originNotes,
    subscribersIds: singleMessagedb.subscribersIds,
  });
});

const toMessageCategories = (messageCategory) => ({
  messageCategoryId: messageCategory.messageCategoryId,
  projectId: messageCategory.projectId,
  categoryName: messageCategory.categoryName,
  emoji: messageCategory.emoji,
})

server.get('/api/v1/projects/:projectId/message-categories', (req, res) => {
  const mappedMessageCategoriesData = messageCategorydb.map(toMessageCategories);
 res.status(200).jsonp(mappedMessageCategoriesData);
});

const toProjectMemberList = (member) => ({
  id: member.id,
  name: member.name,
  title: member.title,
  email: member.email,
})

server.get('/api/v1/projects/:projectId/members', (req, res) => {
  const mappedprojectMembersData = projectMemberListdb.map(toProjectMemberList);
 res.status(200).jsonp(mappedprojectMembersData);
});

server.use(router);
const port = 8080;
server.listen(port, () => {
 // eslint-disable-next-line no-console
 console.log('JSON Server is running');
});
