import {
  CURRENCY_SUBMIT,
  LOADING_API,
  EXPENSE_SUBMIT,
  UPDATE_EXPENSE,
  EDIT_EXPENSE,
  IDENTIFY_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0,
  isFetching: false, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_SUBMIT:
    return {
      ...state,
      currencies: [...action.value],
      isFetching: false,
    };
  case EXPENSE_SUBMIT:
    return {
      ...state,
      expenses: [...state.expenses, action.value],
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      expenses: [...action.value],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: false,
      idToEdit: '',
      expenses: [
        ...action.value,
      ],
    };
  case IDENTIFY_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.value,
    };
  case LOADING_API:
    return {
      ...state,
      isFetching: true,
    };
  default: return state;
  }
};

export default wallet;
