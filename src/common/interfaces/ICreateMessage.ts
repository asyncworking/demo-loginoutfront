export default interface ICreateMessage {
  companyId: string | null;
  projectId: string;
  messageCategoryId: string | null;
  messageTitle: string;
  posterUserId: string | null;
  text: string;
  html: string;
  subscribersIds: string | null;
}
