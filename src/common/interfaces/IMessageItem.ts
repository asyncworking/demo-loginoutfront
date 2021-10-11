export default interface IMessageItem {
  id: string;
  messageTitle: string;
  posterUser: string;
  postTime: string;
  messageCategoryId: string | null;
  messageCategoryName: string | null;
  messageCategoryEmoji: string | null;
  content: string | null;
}
