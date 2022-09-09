// Logic Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const expenseMap = expenses.map((e) => {
      const { value, exchangeRates, currency } = e;
      const { ask } = exchangeRates[currency];
      return ask * value;
    });

    const totalExpenses = expenses.length > 0
      ? Math.round(expenseMap.reduce((a, b) => a + b) * 100) / 100
      : 0;

    return (
      <div className="header-content">
        <div className="logo-text-nav">
          <img src="https://i.imgur.com/NKyU2kr.png" alt="logo" className="logo-nav" />
          TrybeWallet
        </div>
        <div>
          <h1 className="title is-4">CONTROLE DE DESPESAS</h1>
        </div>
        <div className="login-expenses">
          <div className="email-login">
            <span>Usuário: </span>
            <span data-testid="email-field" className="strong">
              {email}
            </span>
          </div>
          <div className="expenses">
            <span>
              { 'Despesa Total: ' }
            </span>
            <span data-testid="total-field" className="strong">
              {totalExpenses.toLocaleString('pt-Br')}
            </span>
            <span data-testid="header-currency-field" className="strong">
              { ' ' }
              BRL
            </span>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, null)(Header);
