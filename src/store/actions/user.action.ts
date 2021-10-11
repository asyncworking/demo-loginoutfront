import {
  RECEIVE_USER_NAME,
} from './actionTypes';

export interface IUser {
  name: string;
  password: string;
  remember: boolean;
}

export interface IReceiveCurrentUserAction {
  type: typeof RECEIVE_USER_NAME;
  payload: IUser;
}

export const getCurrentUser = (name: IUser): IReceiveCurrentUserAction => ({
  type: RECEIVE_USER_NAME,
  payload: name,
});

export type CurrentUserActionTypes = IReceiveCurrentUserAction;
