import { waitFor, screen } from '@testing-library/react';
import fetchMock from 'fetch-mock-jest';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouterAndRedux from './renderWith';
import App from '../../App';
import mockData from './mockData';
import {
  URL,
  VALUE_INPUT,
  METHOD_INPUT,
  CURRENCY_ARRAY,
  CURRENCY_INPUT,
  TAG_INPUT,
  DESCRIPTION_INPUT,
  EMAIL_INPUT,
  PASS_INPUT,
  USER_EMAIL,
  USER_PASS,
  EMAIL_FIELD,
  TOTAL_FIELD,
} from './testIds';

const INITIAL_STATE = {
  user: {
    email: USER_EMAIL,
  },
  wallet: {
    currencies: CURRENCY_ARRAY,
    expenses: [],
    editor: false,
    idToEdit: 0,
    isFetching: false,
  },
};

delete mockData.USDT;

const obj1 = {
  id: 0,
  value: '1',
  description: 'Sushi',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: mockData,
};

const obj2 = {
  id: 1,
  value: '2',
  description: 'Sushi',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: mockData,
};

const expectExpenses = [obj1, obj2];

fetchMock.mock(URL, mockData);

afterEach(() => fetchMock.resetHistory());

describe('📝 Teste da página de Login', () => {
  it('Testa o caminho da página é o /', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toEqual('/');
  });

  it('Testa se os componentes esperados são exibidos', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASS_INPUT);
    const button = screen.getByRole('button', { name: /entrar/i });
    const logo = screen.getByRole('img');
    const logoText = screen.getByText('TrybeWallet');
    const login = screen.getByText('Login');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(logoText).toBeInTheDocument();
    expect(login).toBeInTheDocument();
  });

  it('Testa se o botão permanece desabilitado, enquanto não forem preenchidos os dados', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASS_INPUT);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'ale');
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'xandre@gmail.com');
    expect(button).toBeDisabled();

    userEvent.type(passwordInput, '123');
    expect(button).toBeDisabled();

    userEvent.type(passwordInput, '456');
    expect(button).not.toBeDisabled();
  });

  it('Testa se após clicar no botão, os dados são salvos no estado e se o usuário é redirecionado à página /carteira', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);

    const expected = {
      email: USER_EMAIL,
    };

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASS_INPUT);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, USER_EMAIL);
    userEvent.type(passwordInput, USER_PASS);
    userEvent.click(button);

    const actualStore = store.getState();

    expect(actualStore.user).toEqual(expected);
    expect(history.location.pathname).toEqual('/carteira');
  });
});

describe('📝 Teste da Página Wallet', () => {
  it('Testa o caminho da página', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );
    expect(history.location.pathname).toEqual('/carteira');
  });

  it('Testa se os componentes do Header são exibidos', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'],
        initialState: { user: { email: USER_EMAIL } },
      },
    );

    const logo = screen.getByRole('img', { name: 'logo' });
    const userLabel = screen.getByText('Usuário:');
    const username = screen.getByTestId(EMAIL_FIELD);
    const expenseLabel = screen.getByText('Despesa Total:');
    const expenseValue = screen.getByTestId(TOTAL_FIELD);

    expect(logo).toBeInTheDocument();
    expect(userLabel).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(expenseLabel).toBeInTheDocument();
    expect(expenseValue).toBeInTheDocument();
  });

  it('Testa se o Header exibe o nome do usuário logado e o valor zerado, das despesas, inicialmente, bem como dispara a API', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'],
        initialState: { user: { email: USER_EMAIL } },
      },
    );

    const username = screen.getByText(USER_EMAIL);
    const expenseValue = screen.getByTestId(TOTAL_FIELD);

    expect(username).toBeInTheDocument();
    expect(expenseValue).toBeInTheDocument();
  });

  it('Testa se os componentes do WalletForm são exibidos', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );

    const valor = screen.getByTestId(VALUE_INPUT);
    const moeda = screen.getByTestId(CURRENCY_INPUT);
    const metodo = screen.getByTestId(METHOD_INPUT);
    const tag = screen.getByTestId(TAG_INPUT);
    const descricao = screen.getByTestId(DESCRIPTION_INPUT);
    const adicionarDespesa = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(valor).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
    expect(metodo).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(descricao).toBeInTheDocument();
    expect(adicionarDespesa).toBeInTheDocument();
  });

  it('Testa se é possível manipular os dados dos inputs', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'],
        initialState: INITIAL_STATE },
    );

    const valor = screen.getByTestId(VALUE_INPUT);
    const moeda = screen.getByTestId(CURRENCY_INPUT);
    const metodo = screen.getByTestId(METHOD_INPUT);
    const tag = screen.getByTestId(TAG_INPUT);
    const descricao = screen.getByTestId(DESCRIPTION_INPUT);

    userEvent.type(valor, '10');
    userEvent.selectOptions(moeda, 'CAD');
    userEvent.selectOptions(metodo, 'Cartão de crédito');
    userEvent.selectOptions(tag, 'Lazer');
    userEvent.type(descricao, 'Jogo');

    expect(valor).toHaveValue(10);
    expect(moeda).toHaveValue('CAD');
    expect(metodo).toHaveValue('Cartão de crédito');
    expect(tag).toHaveValue('Lazer');
    expect(descricao).toHaveValue('Jogo');
  });

  it('Testa se é disparada a ação de gravar dados da despesa no redux, chamando API e atualizando valor do Header', async () => {
    const { store } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'],
        initialState: INITIAL_STATE },
    );

    const valor = screen.getByTestId(VALUE_INPUT);
    const descricao = screen.getByTestId(DESCRIPTION_INPUT);
    const adicionarDespesa = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valor, '1');
    userEvent.type(descricao, 'Sushi');
    userEvent.click(adicionarDespesa);

    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    const actualStore = store.getState();
    const expenseValue = screen.getByTestId(TOTAL_FIELD);

    expect(actualStore.wallet.expenses).toStrictEqual([obj1]);
    expect(expenseValue).toBeInTheDocument();
  });

  it('Testa se a o valor das despesas é somado no Header', async () => {
    const { store } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'],
        initialState: INITIAL_STATE },
    );

    const valor = screen.getByTestId(VALUE_INPUT);
    const descricao = screen.getByTestId(DESCRIPTION_INPUT);
    const adicionarDespesa = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valor, '1');
    userEvent.type(descricao, 'Sushi');
    userEvent.click(adicionarDespesa);
    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    userEvent.type(valor, '2');
    userEvent.type(descricao, 'Sushi');
    userEvent.click(adicionarDespesa);
    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    const actualStore = store.getState();
    const expenseValue = screen.getByText('14.26');

    console.log(expenseValue);

    expect(actualStore.wallet.expenses).toStrictEqual(expectExpenses);
    expect(expenseValue).toBeInTheDocument();
  });

  it('Testa se é exibida a tabela quando gerado um item e se é possível apagá-lo', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'],
        initialState: INITIAL_STATE },
    );

    const valor = screen.getByTestId(VALUE_INPUT);
    const descricao = screen.getByTestId(DESCRIPTION_INPUT);
    const adicionarDespesa = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valor, '1');
    userEvent.type(descricao, 'Sushi');
    userEvent.click(adicionarDespesa);
    await waitFor(() => expect(fetchMock.called()).toBeTruthy());

    const ths = screen.getByRole('row', { name: /Descrição Tag Método de pagamento Valor Moeda Câmbio utilizado Valor convertido Moeda de conversão/i });
    const cells = screen.getAllByRole('cell');

    expect(ths).toBeInTheDocument();
    expect(cells).toHaveLength(9);

    const deleteButton = screen.getByRole('button', { name: /excluir/i });
    userEvent.click(deleteButton);

    const cells2 = screen.queryAllByRole('cell');
    expect(cells2).toHaveLength(0);
  });

  it('Testa se é possível editar um item', async () => {
    renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'],
        initialState: INITIAL_STATE },
    );

    const valor = screen.getByTestId(VALUE_INPUT);
    const descricao = screen.getByTestId(DESCRIPTION_INPUT);
    const adicionarDespesa = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valor, '1');
    userEvent.type(descricao, 'Sushi');
    userEvent.click(adicionarDespesa);
    await waitFor(() => expect(fetchMock.calls()).toHaveLength(2));

    const editButton = screen.getByRole('button', { name: /editar/i });
    userEvent.click(editButton);

    const valorEdit = screen.getByTestId(VALUE_INPUT);
    const descricaoEdit = screen.getByTestId(DESCRIPTION_INPUT);
    const editarDespesaButton = screen.getByRole('button', { name: /editar despesa/i });

    userEvent.clear(valorEdit);
    userEvent.clear(descricaoEdit);
    userEvent.type(valorEdit, '2');
    expect(valorEdit.value).toBe('2');
    userEvent.type(descricaoEdit, 'Candy');
    expect(descricaoEdit.value).toBe('Candy');

    userEvent.click(editarDespesaButton);

    const result1 = screen.getByRole('cell', { name: '2.00' });
    const result2 = screen.getByRole('cell', { name: 'Candy' });

    expect(result1).toBeInTheDocument();
    expect(result2).toBeInTheDocument();
  });
});
