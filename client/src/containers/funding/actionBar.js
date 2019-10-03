import React, { Component } from 'react';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import CosmosApp from 'ledger-cosmos-js';
import { Loading } from '../../components/index';
import { CosmosDelegateTool } from '../../utils/ledger';

const ActionBarContainer = ({ height, children }) => (
  <div className={`container-action ${height ? 'height50' : ''} `}>
    {children}
  </div>
);

const StartState = ({ onClickBtn, valueSelect, onChangeSelect }) => (
  <ActionBarContainer>
    <div className="container-action-content">
      <div className="action-text">
        <span className="actionBar-text">Contribute ATOMs</span>
        {/* <select value={valueSelect} onChange={onChangeSelect}>
          <option value="address">Any cosmos wallet</option>
          <option value="ledger">Ledger</option>
        </select> */}
      </div>
      <button className="btn" onClick={onClickBtn}>
        Fuck Google
      </button>
    </div>
  </ActionBarContainer>
);

const SendAmount = ({ onClickBtn, address }) => (
  <div className="container-action height50 box-shadow-1px">
    <div className="container-action-content height100">
      <div className="container-send">
        <div>
          <div>
            <span className="font-size-20 display-inline-block margin-bottom-10px">
              Send any amount of ATOMs directly to cyber~Congress multisig by
              your using Cosmos wallet
            </span>
            <div className="display-flex align-items-center">
              <span className="font-size-16">{address}</span>
              <button
                className="copy-address"
                onClick={() => {
                  navigator.clipboard.writeText(address);
                }}
              />
            </div>
          </div>
        </div>
        <div className="line-action-bar" />
        <div className="display-flex flex-direction-column align-items-center">
          <div className="display-flex flex-direction-column">
            {/* <span className="display-inline-block font-size-20 margin-bottom-10px">
              Ledger
            </span> */}
            <button className="btn max-width-200px" onClick={onClickBtn}>
              Send with Ledger
            </button>
          </div>
        </div>
      </div>
      {/* <span className="actionBar-text">
          You can send any amount of ATOMs to cyber•Congress multisig
          cosmos287fhhlgflsef
        </span>
      </div>
      <button className="btn" onClick={onClickBtn}>
        Track Contribution
      </button> */}
    </div>
  </div>
);

const SendAmounLadger = ({ onClickBtn, status }) => (
  <div className="container-action height50 box-shadow-1px">
    <div className="container-action-content height100">
      <div className="display-flex flex-direction-column">
        <span className="font-size-20 display-inline-block margin-bottom-10px">
          Let's get started
        </span>

        <div className="display-flex flex-direction-column">
          <div>
            {status.pin && <div>1</div>}
            <span className="font-size-20 display-inline-block margin-bottom-10px">
              Connect
            </span>
          </div>
          <div>
            {/* <input type="checkbox" checked="checked" /> */}
            {status.app && <div>2</div>}
            <span className="font-size-20 display-inline-block margin-bottom-10px">
              Open app
            </span>
          </div>
        </div>
        {/* <Loading /> */}
        <button onClick={onClickBtn}>1</button>
      </div>
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
      step: 'SendAmounLadger',
      height50: false,
      sendAddress: 'cyber12psudf4rpaw4jwhuyx3y8sejhsynae7ggvzvy8',
      connect: {
        pin: false,
        app: false
      }
    };
  }

  async tryConnect() {
    let transport = null;
    try {
      transport = await TransportU2F.create(10000);
    } catch (e) {
      console.log(e);
      return;
    }
    const ledger = new CosmosDelegateTool(transport);
    const connect = await ledger.connect();
    return connect;
  }

  onChangeSelect = e =>
    this.setState({
      valueSelect: e.target.value
    });

  onClickFuckGoogle = () => {
    this.setState({
      step: 'sendAmount',
      height50: true
    });
  };

  onClickTrackContribution = () => {
    this.setState({
      step: 'SendAmounLadger'
    });

    this.tryConnect().then(connect => {
      console.log('connect status', connect);
      this.setState({
        connect
      });
      // if (connect === undefined) {
      //   this.onClickTrackContribution();
      // }
    });
  };

  onClickSaveAddress = () => {
    this.tryConnect().then(connect => {
      // console.log('connect status', connect);
      this.setState({
        connect
      });
      if (connect === undefined) {
        this.onClickSaveAddress();
      }
    });
  };

  onClickContributeATOMs = () =>
    this.setState({
      step: 'transactionCost'
    });

  onClickTransactionCost = () =>
    this.setState({
      step: 'succesfuuly'
    });

  render() {
    const { valueSelect, step, height50, sendAddress, connect } = this.state;
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
      return (
        <SendAmount
          height={height50}
          onClickBtn={this.onClickTrackContribution}
          address={sendAddress}
        />
      );
    }

    if (step === 'SendAmounLadger') {
      return (
        <SendAmounLadger
          onClickBtn={this.onClickSaveAddress}
          status={connect}
          address={sendAddress}
        />
      );
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
