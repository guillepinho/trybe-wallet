/* eslint-disable react/jsx-max-depth */
// Logic Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Action Imports
import { updateExpense, identifyExpense } from '../redux/actions/index';

class Table extends Component {
  generateRows = (expenses) => {
    const { idTheId } = this.props;
    const tableRows = expenses.map((each) => {
      const { id, currency, description, method, tag, value, exchangeRates } = each;
      const { ask } = exchangeRates[currency];
      const show = (
        <div>
          { `${currency} / BRL` }
        </div>);
      return (
        <tr key={ id }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>
            {Number(value).toLocaleString('pt-Br', { style: 'currency', currency })}
          </td>
          <td>{show}</td>
          <td>
            {Number(ask).toLocaleString('pt-Br', { style: 'currency', currency: 'BRL' })}
          </td>
          <td>
            {Number(value * ask)
              .toLocaleString('pt-Br', { style: 'currency', currency: 'BRL' })}
          </td>
          <td>Real</td>
          <td>
            <button
              type="button"
              className="button is-info is-small"
              data-testid="edit-btn"
              onClick={ () => idTheId(id) }

            >
              Editar
            </button>
            <button
              type="button"
              className="button is-danger is-small"
              data-testid="delete-btn"
              onClick={ () => this.deleteExpenseFunction(id) }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });
    return tableRows;
  };

  deleteExpenseFunction = (deletedId) => {
    const { expenses, deleteExpense } = this.props;
    const newExpenseArray = expenses.filter((each) => {
      const { id } = each;
      return id !== deletedId;
    });
    deleteExpense(newExpenseArray);
  };

  render() {
    const { expenses } = this.props;
    const rowData = this.generateRows(expenses);
    return (
      <div className="table-content">
        <table className="table is-hoverable is-fullwidth has-text-centered">
          <thead>
            <tr className="has-text-centered">
              <th className="center-table desc-td" title="Descrição">
                Descrição
              </th>
              <th className="center-table" title="Tag">
                Tag
              </th>
              <th className="center-table" title="Método de Pagamento">
                Mét.
              </th>
              <th className="center-table" title="Valor">
                Valor
              </th>
              <th className="center-table" title="Moeda">
                Moeda
              </th>
              <th className="center-table" title="Câmbio utilizado">
                Câmbio
              </th>
              <th className="center-table" title="Valor convertido">
                V. Cvt.
              </th>
              <th className="center-table" title="Moeda de conversão">
                M. Cvt.
              </th>
              <th className="center-table" title="Editar/Exlcuir">Edit./Exc.</th>
            </tr>
          </thead>
          <tbody>
            {rowData}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  idTheId: (numb) => (dispatch(identifyExpense(numb))),
  deleteExpense: (array) => (dispatch(updateExpense(array))),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  idTheId: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
