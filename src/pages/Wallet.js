// Logic Import
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Component Import
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import EditingForm from '../components/EditingForm';
// CSS Import
import './css/Wallet.css';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;
    return (
      <div className="wallet-content">
        <Header />
        <WalletForm />
        <Table />
        { editor ? <EditingForm /> : <span className="empty-edit" /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});

Wallet.propTypes = {
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
