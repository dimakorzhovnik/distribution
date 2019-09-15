import React, { Component } from 'react';

export class ClaimedRound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false
    };
    this.smart = '0x6C9c39D896B51e6736DBd3dA710163903A3B091B';
  }

  claimedToken = account => {
    const { web3, contract, day } = this.props;
    console.log(account);
    try {
      web3.eth.sendTransaction({
        from: account,
        to: this.smart,
        data: contract.methods.claim(day).encodeABI()
      });
      this.setState({
        status: true
      });
    } catch (e) {
      console.log(e);
    }
  };

  getAccount = async () => {
    const { web3 } = this.props;
    if (web3.currentProvider.host)
      return console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.enable();
        if (accounts.length) {
          // console.log(accounts[0]);
          this.claimedToken(accounts[0]);
        }
      } catch (error) {
        console.log('You declined transaction', error);
      }
    } else if (window.web3) {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length) {
        this.claimedToken(accounts[0]);
      }
    } else return console.log('Your metamask is locked!');
  };

  render() {
    return (
      <button onClick={this.getAccount} disabled={this.state.status}>
        Claimed
      </button>
    );
  }
}
