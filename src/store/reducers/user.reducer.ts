import {
  RECEIVE_USER_NAME,
} from '../actions/actionTypes';
import { CurrentUserActionTypes } from '../actions/user.action';

export interface INameState{
  name: string;
}
const initialState: INameState = {
  name: '',
};

const reducer = (state = initialState, actions: CurrentUserActionTypes) => {
  switch (actions.type) {
    case RECEIVE_USER_NAME:
      return {
        ...state,
        name: actions.payload,
      };
    default:
      return state;
  }
};
export default reducer;
