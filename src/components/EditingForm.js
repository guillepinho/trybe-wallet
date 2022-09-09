/* eslint-disable react/jsx-max-depth */
// Logic Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Action Imports
import { editExpense } from '../redux/actions/index';

class EditingForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { idToEdit, expenses } = this.props;
    const thisExpense = expenses.find((e) => e.id === idToEdit);
    const { value, description, currency, method, tag } = thisExpense;
    this.setState({
      value,
      description,
      currency,
      method,
      tag,
    });
  }

  handleInput = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  editExpense = () => {
    const { idToEdit, expenses, editingExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;

    let expenseToEditIndex = Number;
    const expenseToEdit = expenses.find((e, index) => {
      expenseToEditIndex = index;
      return e.id === idToEdit;
    });

    const edited = {
      ...expenseToEdit,
      value,
      description,
      currency,
      method,
      tag,
    };

    const firstPart = expenses.slice(0, expenseToEditIndex);
    const lastPart = expenses.slice(expenseToEditIndex + 1);
    const finalArray = [...firstPart, edited, ...lastPart];

    editingExpense(finalArray);
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    const currencyOptionCreator = currencies
      .map((each, index) => (<option key={ index } value={ each }>{each}</option>));

    return (
      <div className="edit-form-content">
        <div className="form-bar">
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
            Moeda
            <div className="select input-header">
              <select
                data-testid="currency-input"
                name="currency"
                value={ currency }
                onChange={ this.handleInput }
              >
                {currencyOptionCreator}
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
            <div className="control">
              <button
                type="button"
                className="button is-warning but-editor"
                onClick={ () => this.editExpense() }
              >
                Editar Despesa
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  editingExpense: (obj) => (dispatch(editExpense(obj))),
});

EditingForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
  editingExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditingForm);
