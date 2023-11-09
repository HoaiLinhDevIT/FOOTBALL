export enum UserModels {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  USER = 'USER'
}
export interface ChatModel {
  user: number;
  message: string;
  dateTime: string;
  mine: boolean;
}