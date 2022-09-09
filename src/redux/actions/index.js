export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const CURRENCY_SUBMIT = 'CURRENCY_SUBMIT';
export const LOADING_API = 'LOADING_API';
export const EXPENSE_SUBMIT = 'EXPENSE_SUBMIT';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const IDENTIFY_EXPENSE = 'IDENTIFY_EXPENSE';

export const submitLogin = (value) => ({ type: LOGIN_SUBMIT, value });

export const loading = () => ({ type: LOADING_API });

export const submitCurrencies = (value) => {
  const valueToAdd = Object.values(value).map((e) => e.code);
  return ({ type: CURRENCY_SUBMIT, value: valueToAdd });
};

export const saveExpense = (value) => ({ type: EXPENSE_SUBMIT, value });

export const updateExpense = (value) => ({ type: UPDATE_EXPENSE, value });

export const editExpense = (value) => ({ type: EDIT_EXPENSE, value });

export const identifyExpense = (value) => ({ type: IDENTIFY_EXPENSE, value });

export function requestCurrencies() {
  return async (dispatch) => {
    dispatch(loading());
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await request.json();
    delete result.USDT;
    dispatch(submitCurrencies(result));
  };
}

export async function fetchApi() {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await request.json();
  delete result.USDT;
  return result;
}
