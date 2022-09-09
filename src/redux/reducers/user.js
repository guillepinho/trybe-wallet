import { LOGIN_SUBMIT } from '../actions';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_SUBMIT:
    return {
      ...state,
      email: action.value,
    };
  default: return state;
  }
};

export default user;
