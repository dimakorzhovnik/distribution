import React, { Component } from 'react';

const StartState = ({ onClickBtn, valueSelect, onChangeSelect }) => (
  <div className="container-action">
    <div className="container-action-content">
      <div className="action-text">
        <span className="actionBar-text">Contribute ATOMs using</span>
        <select value={valueSelect} onChange={onChangeSelect}>
          <option value="address">Any cosmos wallet</option>
          <option value="ledger">Ledger</option>
        </select>
      </div>
      <button className="btn" onClick={onClickBtn}>
        Fuck Google
      </button>
    </div>
  </div>
);

const SendAmount = ({ onClickBtn }) => (
  <div className="container-action">
    <div className="container-action-content">
      <div className="action-text">
        <span className="actionBar-text">
          You can send any amount of ATOMs to cyber•Congress multisig
          cosmos287fhhlgflsef
        </span>
      </div>
      <button className="btn" onClick={onClickBtn}>
        Track Contribution
      </button>
    </div>
  </div>
);

const PutAddress = ({ onClickBtn }) => (
  <div className="container-action">
    <div className="container-action-content">
      <div className="action-text">
        <span className="actionBar-text">
          Put address of wrom which you contributed <input />
        </span>
      </div>
      <button className="btn" onClick={onClickBtn}>
        Save address
      </button>
    </div>
  </div>
);

const ContributeATOMs = ({ onClickBtn }) => (
  <div className="container-action">
    <div className="container-action-content">
      <div className="action-text">
        <span className="actionBar-text">
          I want contribute <input /> ATOMs
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

export class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSelect: 'address',
      step: 'start'
    };
  }

  onChangeSelect = e =>
    this.setState({
      valueSelect: e.target.value
    });

  onClickFuckGoogle = () => {
    const { valueSelect } = this.state;

    switch (valueSelect) {
      case 'address':
        this.setState({
          step: 'sendAmount'
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
      step: 'putAddress'
    });

  onClickSaveAddress = () =>
    this.setState({
      step: 'start'
    });

  onClickContributeATOMs = () =>
    this.setState({
      step: 'transactionCost'
    });

  onClickTransactionCost = () =>
    this.setState({
      step: 'succesfuuly'
    });

  render() {
    const { valueSelect, step } = this.state;

    if (step === 'start') {
      return (
        <StartState
          onClickBtn={this.onClickFuckGoogle}
          valueSelect={valueSelect}
          onChangeSelect={this.onChangeSelect}
        />
      );
    }

    if (step === 'sendAmount') {
      return <SendAmount onClickBtn={this.onClickTrackContribution} />;
    }

    if (step === 'putAddress') {
      return <PutAddress onClickBtn={this.onClickSaveAddress} />;
    }

    if (step === 'contributeATOMs') {
      return <ContributeATOMs onClickBtn={this.onClickContributeATOMs} />;
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
