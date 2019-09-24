import React, { Component } from 'react';

function lament(error) {
  if (error) {
    document.querySelector('.before-error').outerHTML += `
      <div class="error pane">
        <h3>${error.message}</h3>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
}

const hopefully = $ => (error, result) => {
  if (error) {
    lament(error);
  } else {
    $(result);
  }
};

const ping = tx =>
  new Promise((resolve, reject) => {
    loop();
    function loop() {
      window.web3.eth.getTransactionReceipt(tx, async (error, receipt) => {
        if (receipt == null) {
          resolve(receipt);
        } else {
          setTimeout(loop, 1000);
        }

        if (receipt) {
          resolve(receipt);
        } else {
          setTimeout(loop, 1000);
        }
      });
    }
  });

const Input = ({
  value,
  onChange,
  placeholder,
  valid,
  messageError,
  ...props
}) => (
  <div {...props} className="input-box-valid">
    <input
      style={{ textAlign: 'end' }}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    {valid && <span className="errorMessage">{messageError}</span>}
  </div>
);

const StartState = ({ onClickBtn, valueSelect, onChangeSelect }) => (
  <div className="container-action">
    <div className="container-action-content">
      <div className="action-text">
        <span className="actionBar-text">
          Contribute ETH using MetaMask, push button
        </span>
        {/* <select value={valueSelect} onChange={onChangeSelect}>
          <option value="address">Any ETH wallet</option>
          <option value="ledger">Ledger</option>
        </select> */}
      </div>
      <button className="btn" onClick={onClickBtn}>
        Fuck Google
      </button>
    </div>
  </div>
);

const ContributeETH = ({
  onClickBtn,
  valueRound,
  valueAmount,
  onChangeAmount,
  onChangeRound,
  disabledBtnConfirm,
  validRound,
  validAmount,
  messageRound,
  messageAmount
}) => (
  <div className="container-action">
    <div className="container-action-content">
      <div className="action-text">
        <div className="actionBar-text">
          I want to contribute
          <Input
            value={valueAmount}
            onChange={onChangeAmount}
            // placeholder={`сhoose round ${minValueRound} to ${maxValueRound}`}
            valid={validAmount}
            messageError={messageAmount}
            style={{
              width: '15%',
              margin: '0 5px 0 15px'
            }}
          />
          <span>ETH in</span>
          <Input
            value={valueRound}
            onChange={onChangeRound}
            // placeholder={`сhoose round ${minValueRound} to ${maxValueRound}`}
            valid={validRound}
            messageError={messageRound}
            style={{
              width: '10%',
              margin: '0 10px 0 15px'
            }}
          />
          <span>round</span>
        </div>
      </div>
      <button
        className="btn"
        disabled={disabledBtnConfirm}
        onClick={onClickBtn}
      >
        Confirm
      </button>
    </div>
  </div>
);

const Succesfuuly = ({ onClickBtn, hash }) => (
  <div className="container-action">
    <div className="container-action-content">
      <div className="action-text">
        <div className="actionBar-text flex-column ">
          <div className="text-default">
            Your TX has been broadcast to the network. It is waiting to be mined
            & confirned.
          </div>
          <div className="text-default">
              Check TX status:{' '}
            <a
              className="hash"
              href={`https://rinkeby.etherscan.io/tx/${hash}`}
            >
              0x54ecdad68b55d3e15452cd801287434194d329e0725ee1f2cc230fb0d9dd4221
            </a>
          </div>
        </div>
      </div>
      <button className="btn" onClick={onClickBtn}>
        OK
      </button>
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
      step: 'start',
      round: '',
      amount: '',
      tx: null,
      messageRound: '',
      messageAmount: '',
      validInputRound: false,
      validInputAmount: false
    };
    this.smart = '0x6C9c39D896B51e6736DBd3dA710163903A3B091B';
  }

  onChangeRound = e => {
    const { minRound, maxRound } = this.props;

    if (e.target.value < minRound || e.target.value > maxRound - 1) {
      this.setState({
        validInputRound: true,
        messageRound: `enter round ${minRound} to ${maxRound}`
      });
    } else {
      this.setState({
        validInputRound: false,
        messageRound: ''
      });
    }
    this.setState({
      round: e.target.value
    });
  };

  onChangeAmount = e =>
    this.setState({
      amount: e.target.value
    });

  onClickFuckGoogle = () => {
    const { minRound } = this.props;
    this.setState({
      step: 'contributeETH',
      round: minRound
    });
  };

  onClickTrackContribution = () =>
    this.setState({
      step: 'contributeETH'
    });

  onClickSaveAddress = () =>
    this.setState({
      step: 'start',
      round: '',
      amount: ''
    });

  buyTOKEN = account => {
    const { web3, contract } = this.props;
    const { round, amount } = this.state;
    console.log(round);
    console.log(amount);

    const priceInWei = web3.utils.toWei(amount, 'ether');
    web3.eth.sendTransaction(
      {
        from: account,
        to: this.smart,
        value: priceInWei,
        data: contract.methods.buyWithLimit(round, 0).encodeABI()
      },
      hopefully(result =>
        ping(result).then(() => {
          this.setState({
            step: 'succesfuuly',
            tx: result
          });
        })
      )
    );
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
  };

  onClickTransactionCost = () =>
    this.setState({
      step: 'succesfuuly'
    });

  render() {
    const {
      step,
      round,
      amount,
      tx,
      messageRound,
      messageAmount,
      validInputRound,
      validInputAmount
    } = this.state;
    const { minRound, maxRound } = this.props;
    const btnConfirm = round >= minRound && round <= maxRound - 1 && amount > 0;

    if (step === 'start') {
      return <StartState onClickBtn={this.onClickFuckGoogle} />;
    }

    if (step === 'contributeETH') {
      return (
        <ContributeETH
          valueRound={round}
          valueAmount={amount}
          validRound={validInputRound}
          validAmount={validInputAmount}
          messageRound={messageRound}
          messageAmount={messageAmount}
          onChangeAmount={this.onChangeAmount}
          onChangeRound={this.onChangeRound}
          minValueRound={minRound}
          maxValueRound={maxRound - 1}
          onClickBtn={this.onClickContributeATOMs}
          disabledBtnConfirm={!btnConfirm}
        />
      );
    }

    if (step === 'succesfuuly') {
      return <Succesfuuly hash={tx} onClickBtn={this.onClickSaveAddress} />;
    }

    return null;
  }
}
