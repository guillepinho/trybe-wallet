// Logic Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Action Imports
import { requestCurrencies, saveExpense, fetchApi } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: 0,
  };

  componentDidMount() {
    const { createCurrencies } = this.props;
    createCurrencies();
  }

  handleInput = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  async submitExpense() {
    const { dispatchExpense } = this.props;
    const api = await fetchApi();
    this.setState({
      exchangeRates: api,
    }, () => {
      dispatchExpense(this.state);
      this.setState((prevS) => ({
        id: prevS.id + 1,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: 0,
      }));
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    const currencyOptionCreator = currencies
      .map((each, index) => (<option key={ index } value={ each }>{ each }</option>));

    return (
      <div className="wallet-form-content">
        <div className="field">
          Valor
          <div className="control input-header">
            <input
              className="input"
              type="number"
              placeholder="Valor"
              data-testid="value-input"
              name="value"
              min={ 0 }
              value={ value }
              onChange={ this.handleInput }
            />
          </div>
        </div>

        <div className="field">
          Descrição
          <div className="control input-header">
            <input
              className="input"
              type="text"
              placeholder="Descrição"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleInput }
            />
          </div>
        </div>

        <div className="field">
          Moeda
          <div className="select input-header">
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleInput }
            >
              { currencyOptionCreator }
            </select>
          </div>
        </div>

        <div className="field">
          Método
          <div className="select input-header">
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleInput }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </div>
        </div>

        <div className="field">
          Tag
          <div className="select input-header">
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleInput }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button
              type="button"
              className="button is-warning but-header"
              onClick={ () => this.submitExpense() }
            >
              Adicionar Despesa
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createCurrencies: async () => {
    dispatch(requestCurrencies());
  },
  dispatchExpense: (value) => dispatch(saveExpense(value)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  createCurrencies: PropTypes.func.isRequired,
  dispatchExpense: PropTypes.func.isRequired,
  currencies: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
