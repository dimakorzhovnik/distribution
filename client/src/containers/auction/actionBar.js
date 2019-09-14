import React, { Component } from 'react';

const StartState = ({ onClickBtn, valueSelect, onChangeSelect }) => (
  <div className="container-action">
    <div className="container-action-content">
      <div className="action-text">
        <span className="actionBar-text">Contribute ETH using</span>
        <select value={valueSelect} onChange={onChangeSelect}>
          <option value="address">Any ETH wallet</option>
          <option value="ledger">Ledger</option>
        </select>
      </div>
      <button className="btn" onClick={onClickBtn}>
        Fuck Google
      </button>
    </div>
  </div>
);

const ContributeATOMs = ({
  onClickBtn,
  valueRound,
  valueAmount,
  onChangeAmount,
  onChangeRound,
  defaultValueRound,
  minValueRound,
  maxValueRound
}) => (
  <div className="container-action">
    <div className="container-action-content">
      <div className="action-text">
        <span className="actionBar-text">
          I want contribute
          <input
            value={valueRound}
            defaultValue={defaultValueRound}
            onChange={onChangeRound}
            placeholder={`сhoose round ${minValueRound} to ${maxValueRound}`}
          />
          <input value={valueAmount} onChange={onChangeAmount} />
        </span>
      </div>
      <button className="btn" onClick={onClickBtn}>
        Confirm
      </button>
    </div>
  </div>
);

const TransactionCost = ({ onClickBtn }) => (
  <div className="container-action">
    <div className="container-action-content">
      <div className="action-text">
        <span className="actionBar-text">Transaction cost is 0.1 uATOM</span>
      </div>
      <button className="btn" onClick={onClickBtn}>
        Sign
      </button>
    </div>
  </div>
);

const Succesfuuly = ({ onClickBtn }) => (
  <div className="container-action">
    <div className="container-action-content">
      <div className="action-text">
        <span className="actionBar-text">
          Tx <a>id</a> succesfuuly confirmed
        </span>
      </div>
      {/* <button className="btn" onClick={onClickBtn}>
                Confirm
            </button> */}
    </div>
  </div>
);

const timer = func => {
  setInterval(func, 1000);
};

export class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSelect: 'address',
      step: 'start',
      round: '',
      amount: ''
    };
    this.smart = '0x6C9c39D896B51e6736DBd3dA710163903A3B091B';
  }

  onChangeSelect = e =>
    this.setState({
      valueSelect: e.target.value
    });

  onChangeRound = e =>
    this.setState({
      round: e.target.value
    });

  onChangeAmount = e =>
    this.setState({
      amount: e.target.value
    });

  onClickFuckGoogle = () => {
    const { valueSelect } = this.state;

    switch (valueSelect) {
      case 'address':
        this.setState({
          step: 'contributeETH'
        });
        break;
      case 'ledger':
        this.setState({
          step: 'contributeATOMs'
        });
        break;
      default:
        this.setState({
          step: 'start'
        });
    }
  };

  onClickTrackContribution = () =>
    this.setState({
      step: 'contributeETH'
    });

  onClickSaveAddress = () =>
    this.setState({
      step: 'start'
    });

//   сhekStatus = txhash => {
//     const { web3 } = this.props;
//     let interval;
//     let startBlock;
//     let savedTxInfo;
//     const stateEnum = {
//       start: 1,
//       mined: 2,
//       awaited: 3,
//       confirmed: 4,
//       unconfirmed: 5
//     };
//     let pollState = stateEnum.start;
//     const poll = () => {
//       if (pollState === stateEnum.start) {
//         web3.eth.getTransaction(txhash, (e, txInfo) => {
//           if (e || txInfo == null) {
//             return; // XXX silently drop errors
//           }
//           if (txInfo.blockHash != null) {
//             startBlock = txInfo.blockNumber;
//             savedTxInfo = txInfo;
//             console.log('mined');
//             pollState = stateEnum.mined;
//           }
//         });
//       } else if (pollState == stateEnum.mined) {
//         web3.eth.getBlockNumber((e, blockNum) => {
//           if (e) {
//             return; // XXX silently drop errors
//           }
//           console.log('blockNum: ', blockNum);
//           if (blockNum >= blockCount + startBlock) {
//             pollState = stateEnum.awaited;
//           }
//         });
//       } else if (pollState == stateEnum.awaited) {
//         web3.eth.getTransactionReceipt(txhash, (e, receipt) => {
//           if (e || receipt == null) {
//             return; // XXX silently drop errors.  TBD callback error?
//           }
//           // confirm we didn't run out of gas
//           // XXX this is where we should be checking a plurality of nodes.  TBD
//           clearInterval(interval);
//           if (receipt.gasUsed >= savedTxInfo.gas) {
//             pollState = stateEnum.unconfirmed;
//             callback(new Error('we ran out of gas, not confirmed!'), null);
//           } else {
//             pollState = stateEnum.confirmed;
//             callback(null, receipt);
//           }
//         });
//       } else {
//         throw new Error(
//           `We should never get here, illegal state: ${pollState}`
//         );
//       }

//       // note assuming poll interval is 1 second
//       attempts++;
//       if (attempts > timeout) {
//         clearInterval(interval);
//         pollState = stateEnum.unconfirmed;
//         callback(new Error('Timed out, not confirmed'), null);
//       }
//     };

//     interval = setInterval(poll, 1000);
//     poll();
//   };

  buyTOKEN = account => {
    const { web3, contract } = this.props;
    const { round, amount } = this.state;
    // const contr = contract.methods.userBuys().encodeABI();
    console.log(round);
    console.log(amount);

    const priceInWei = web3.utils.toWei(amount, 'ether');
    web3.eth
      .sendTransaction({
        from: account,
        to: this.smart,
        value: priceInWei,
        data: contract.methods.buyWithLimit(round, 0).encodeABI()
      })
      .on('transactionHash', hash => {
        // console.log('transactionHash', hash);
        web3.eth.getTransaction(hash).then(console.log);
      })
      .on('error', console.error);
  };

  onClickContributeATOMs = async () => {
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
          this.buyTOKEN(accounts[0]);
        }
      } catch (error) {
        console.log('You declined transaction', error);
      }
    } else if (window.web3) {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length) {
        // console.log(accounts[0]);
        this.buyTOKEN(accounts[0]);
      }
    } else return console.log('Your metamask is locked!');
    // this.setState({
    //   step: 'transactionCost'
    // });
  };

  onClickTransactionCost = () =>
    this.setState({
      step: 'succesfuuly'
    });

  render() {
    const { valueSelect, step, round, amount } = this.state;
    const { web3, minRound, maxRound } = this.props;

    if (step === 'start') {
      return (
        <StartState
          onClickBtn={this.onClickFuckGoogle}
          valueSelect={valueSelect}
          onChangeSelect={this.onChangeSelect}
        />
      );
    }

    if (step === 'contributeETH') {
      return (
        <ContributeATOMs
          valueRound={round}
          valueAmount={amount}
          onChangeAmount={this.onChangeAmount}
          onChangeRound={this.onChangeRound}
          minValueRound={minRound}
          maxValueRound={maxRound}
          onClickBtn={this.onClickContributeATOMs}
        />
      );
    }

    if (step === 'transactionCost') {
      return <TransactionCost onClickBtn={this.onClickTransactionCost} />;
    }

    if (step === 'succesfuuly') {
      return <Succesfuuly />;
    }

    return null;
  }
}
