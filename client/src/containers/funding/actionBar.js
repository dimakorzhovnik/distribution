import React, { Component } from 'react';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import { Loading } from '../../components/index';
import { CosmosDelegateTool } from '../../utils/ledger';
import { ContributeATOMs } from './stateActionBar';

const HDPATH = [44, 118, 0, 0, 0];
const TIMEOUT = 5000;
export const DIVISOR = 1000000;
const DEFAULT_GAS = 150000;
const DEFAULT_GAS_PRICE = 0.01;
const DENOM = 'uatom';
const MEMO = 'Stake online with Chorus One at https://chorus.one';
const OPERATOR_ADDR = 'cyber12psudf4rpaw4jwhuyx3y8sejhsynae7ggvzvy8';
const CHAIN_ID = 'cosmoshub-2';

const STAGE_INIT = 0;
const STAGE_COMMSOPEN = 1;
// const STAGE_UNLOCKED = 2;
const STAGE_READY = 3;
const STAGE_WAIT = 4;
const STAGE_GENERATED = 5;
const STAGE_SUBMITTED = 6;
const STAGE_CONFIRMING = 7;
const STAGE_CONFIRMED = 8;
const STAGE_ERROR = 15;

const API_ROOT = 'https://moon.cybernode.ai';
// const API_ROOT = 'https://api.chorus.one/';

export const TXTYPE_DELEGATE = 0;
export const TXTYPE_REDELEGATE = 1;
export const TXTYPE_WITHDRAW = 2;
export const TXTYPE_GOVERNANCE_VOTE = 3;
export const TXTYPE_GOVERNANCE_VOTE_TX = 4;

const LEDGER_OK = 36864;
const LEDGER_NOAPP = 28160;

const LEDGER_VERSION_REQ = [1, 1, 1];

const ActionBarContainer = ({ height, children }) => (
  <div className={`container-action ${height ? 'height50' : ''} `}>
    {children}
  </div>
);

function formatAtom(amount, dp) {
  console.log(amount);
  console.log(dp);
  return amount;
  // return formatDenomination(amount, dp, "ATOM", "ATOMs");
}

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

const SendAmounLadger = ({ onClickBtn, status, pin, app, version }) => (
  <div className="container-action height50 box-shadow-1px">
    <div className="container-action-content-ledger">
      <div className="display-flex flex-direction-column">
        <svg
          viewBox="0 0 1916.3 516.8"
          className="ledger-img"
          width="240"
          height="80"
        >
          <use xlinkHref="#ledger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1916.3 516.8"
              id="ledger"
            >
              <g id="ledger_squares_1_">
                <path
                  fill="#fff"
                  className="st0"
                  d="M578.2 392.7V24.3h25.6v344.1h175.3v24.3H578.2zm327.5 5.1c-39.7 0-70.4-12.8-93.4-37.1-21.7-24.3-33.3-58.8-33.3-103.6 0-43.5 10.2-79.3 32-104.9 21.7-26.9 49.9-39.7 87-39.7 32 0 57.6 11.5 76.8 33.3 19.2 23 28.1 53.7 28.1 92.1v20.5H804.6c0 37.1 9 66.5 26.9 85.7 16.6 20.5 42.2 29.4 74.2 29.4 15.3 0 29.4-1.3 40.9-3.8 11.5-2.6 26.9-6.4 44.8-14.1v24.3c-15.3 6.4-29.4 11.5-42.2 14.1-14.3 2.6-28.9 3.9-43.5 3.8zM898 135.6c-26.9 0-47.3 9-64 25.6-15.3 17.9-25.6 42.2-28.1 75.5h168.9c0-32-6.4-56.3-20.5-74.2-12.8-18-32-26.9-56.3-26.9zm238-21.8c19.2 0 37.1 3.8 51.2 10.2 14.1 7.7 26.9 19.2 38.4 37.1h1.3c-1.3-21.7-1.3-42.2-1.3-62.7V0h24.3v392.7h-16.6l-6.4-42.2c-20.5 30.7-51.2 47.3-89.6 47.3s-66.5-11.5-87-35.8c-20.5-23-29.4-57.6-29.4-102.3 0-47.3 10.2-83.2 29.4-108.7 19.2-25.6 48.6-37.2 85.7-37.2zm0 21.8c-29.4 0-52.4 10.2-67.8 32-15.3 20.5-23 51.2-23 92.1 0 78 30.7 116.4 90.8 116.4 30.7 0 53.7-9 67.8-26.9 14.1-17.9 21.7-47.3 21.7-89.6v-3.8c0-42.2-7.7-72.9-21.7-90.8-12.8-20.5-35.8-29.4-67.8-29.4zm379.9-16.6v17.9l-56.3 3.8c15.3 19.2 23 39.7 23 61.4 0 26.9-9 47.3-26.9 64-17.9 16.6-40.9 24.3-70.4 24.3-12.8 0-21.7 0-25.6-1.3-10.2 5.1-17.9 11.5-23 17.9-5.1 7.7-7.7 14.1-7.7 23s3.8 15.3 10.2 19.2c6.4 3.8 17.9 6.4 33.3 6.4h47.3c29.4 0 52.4 6.4 67.8 17.9s24.3 29.4 24.3 53.7c0 29.4-11.5 51.2-34.5 66.5-23 15.3-56.3 23-99.8 23-34.5 0-61.4-6.4-80.6-20.5-19.2-12.8-28.1-32-28.1-55 0-19.2 6.4-34.5 17.9-47.3s28.1-20.5 47.3-25.6c-7.7-3.8-15.3-9-19.2-15.3-5-6.2-7.7-13.8-7.7-21.7 0-17.9 11.5-34.5 34.5-48.6-15.3-6.4-28.1-16.6-37.1-30.7-9-14.1-12.8-30.7-12.8-48.6 0-26.9 9-49.9 25.6-66.5 17.9-16.6 40.9-24.3 70.4-24.3 17.9 0 32 1.3 42.2 5.1h85.7v1.3h.2zm-222.6 319.8c0 37.1 28.1 56.3 84.4 56.3 71.6 0 107.5-23 107.5-69.1 0-16.6-5.1-28.1-16.6-35.8-11.5-7.7-29.4-11.5-55-11.5h-44.8c-49.9 1.2-75.5 20.4-75.5 60.1zm21.8-235.4c0 21.7 6.4 37.1 19.2 49.9 12.8 11.5 29.4 17.9 51.2 17.9 23 0 40.9-6.4 52.4-17.9 12.8-11.5 17.9-28.1 17.9-49.9 0-23-6.4-40.9-19.2-52.4-12.8-11.5-29.4-17.9-52.4-17.9-21.7 0-39.7 6.4-51.2 19.2-12.8 11.4-17.9 29.3-17.9 51.1z"
                />
                <path
                  fill="#fff"
                  className="st0"
                  d="M1640 397.8c-39.7 0-70.4-12.8-93.4-37.1-21.7-24.3-33.3-58.8-33.3-103.6 0-43.5 10.2-79.3 32-104.9 21.7-26.9 49.9-39.7 87-39.7 32 0 57.6 11.5 76.8 33.3 19.2 23 28.1 53.7 28.1 92.1v20.5h-197c0 37.1 9 66.5 26.9 85.7 16.6 20.5 42.2 29.4 74.2 29.4 15.3 0 29.4-1.3 40.9-3.8 11.5-2.6 26.9-6.4 44.8-14.1v24.3c-15.3 6.4-29.4 11.5-42.2 14.1-14.1 2.6-28.2 3.8-44.8 3.8zm-6.4-262.2c-26.9 0-47.3 9-64 25.6-15.3 17.9-25.6 42.2-28.1 75.5h168.9c0-32-6.4-56.3-20.5-74.2-12.8-18-32-26.9-56.3-26.9zm245.6-21.8c11.5 0 24.3 1.3 37.1 3.8l-5.1 24.3c-11.8-2.6-23.8-3.9-35.8-3.8-23 0-42.2 10.2-57.6 29.4-15.3 20.5-23 44.8-23 75.5v149.7h-25.6V119h21.7l2.6 49.9h1.3c11.5-20.5 23-34.5 35.8-42.2 15.4-9 30.7-12.9 48.6-12.9zM333.9 12.8h-183v245.6h245.6V76.7c.1-34.5-28.1-63.9-62.6-63.9zm-239.2 0H64c-34.5 0-64 28.1-64 64v30.7h94.7V12.8zM0 165h94.7v94.7H0V165zm301.9 245.6h30.7c34.5 0 64-28.1 64-64V316h-94.7v94.6zm-151-94.6h94.7v94.7h-94.7V316zM0 316v30.7c0 34.5 28.1 64 64 64h30.7V316H0z"
                />
              </g>
            </svg>
          </use>
        </svg>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '25px'
          }}
        >
          <span className="display-inline-block margin-bottom-10px">
            Let's get started
          </span>
        </div>
        <div className="display-flex flex-direction-column margin-bottom-10px">
          <div className="display-flex align-items-center margin-bottom-10px">
            <div
              className={`checkbox ${pin ? 'checked' : ''} margin-right-5px`}
            />
            <span className="font-size-20 display-inline-block">
              Connect your Ledger Nano S to the computer and enter your PIN.
            </span>
          </div>

          <div className="display-flex align-items-center margin-bottom-10px">
            <div
              className={`checkbox ${app ? 'checked' : ''} margin-right-5px`}
            />
            <span className="font-size-20 display-inline-block">
              Open the Cosmos Ledger application.
            </span>
          </div>
          <div className="display-flex align-items-center margin-bottom-10px">
            <div
              className={`checkbox ${
                version ? 'checked' : ''
              } margin-right-5px`}
            />
            <span className="font-size-20 display-inline-block">
              At least version v1.1.1 of Cosmos Ledger app installed.
            </span>
          </div>
        </div>
        {app && version && (
          <div className="display-flex flex-direction-column align-items-center">
            <span className="font-size-20 display-inline-block margin-bottom-10px">
              We are just checking the blockchain for your account details
            </span>
            <Loading />
          </div>
        )}
        {/* <button onClick={onClickBtn}>1</button> */}
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

// const ContributeATOMs = ({ onClickBtn, address, availableStake, canStake }) => (
//   <div className="container-action">
//     <div className="container-action-content">
//       <div className="action-text">
//         <span className="actionBar-text">
//          {address}
//         </span>
//         <span className="actionBar-text">
//          {availableStake}
//         </span>
//         <span className="actionBar-text">
//          {canStake}
//         </span>
//       </div>
//       <button className="btn" onClick={onClickBtn}>
//         Confirm
//       </button>
//     </div>
//   </div>
// );

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
      stage: STAGE_INIT,
      ledger: null,
      ledgerVersion: [0, 0, 0],
      returnCode: null,
      addressInfo: null,
      address: null,
      availableStake: 0,
      time: 0,
      gas: DEFAULT_GAS,
      gasPrice: DEFAULT_GAS_PRICE,
      toSend: '',
      canStake: 0,
      atomerror: null,
      errorMessage: null,
      rewards: [],
      governance: [],
      txHash: null,
      txHeight: null,
      textAreaRef: React.createRef(),
      clipboardCopySuccess: false,
      height50: false,
      sendAddress: 'cyber12psudf4rpaw4jwhuyx3y8sejhsynae7ggvzvy8'
    };
    this.ledgerModal = React.createRef();
    this.atomField = React.createRef();
    this.gasField = React.createRef();
    this.gasPriceField = React.createRef();
    this.timeOut = null;
    this.haveDocument = typeof document !== 'undefined';
  }

  compareVersion = async () => {
    const test = this.state.ledgerVersion;
    const target = LEDGER_VERSION_REQ;
    const testInt = 10000 * test[0] + 100 * test[1] + test[2];
    const targetInt = 10000 * target[0] + 100 * target[1] + target[2];
    return testInt >= targetInt;
  };

  componentDidMount() {
    this.setState({ txType: this.props.txType });
    // eslint-disable-next-line
        console.warn('Looking for Ledger Nano');
    this.pollLedger();
  }

  componentWillUpdate() {
    if (this.state.ledger === null) {
      this.pollLedger();
    }
    if (this.state.ledger !== null) {
      switch (this.state.returnCode) {
        case LEDGER_OK:
          if (this.state.address === null) {
            this.getAddress();
          }
          if (this.state.address !== null && this.state.addressInfo === null) {
            this.getWallet();
          }
          break;
        default:
          // console.log('getVersion');
          this.getVersion();
          break;
      }
    } else {
      // eslint-disable-next-line
            console.warn('Still looking for a Ledger device.');
    }
  }

  pollLedger = async () => {
    const transport = await TransportU2F.create(TIMEOUT, true);
    this.setState({ ledger: new CosmosDelegateTool(transport) });
  };

  getVersion = async () => {
    try {
      const connect = await this.state.ledger.connect();
      console.log(connect);
      if (
        this.state.returnCode === null ||
        connect.return_code !== this.state.returnCode
      ) {
        this.setState({
          txMsg: null,
          address: null,
          requestMetaData: null,
          txBody: null,
          errorMessage: null,
          returnCode: connect.return_code,
          version_info: [connect.major, connect.minor, connect.patch]
        });
        // eslint-disable-next-line
                console.warn('Ledger app return_code', this.state.returnCode);
      } else {
        this.setState({ time: Date.now() }); // cause componentWillUpdate to call again.
      }
    } catch ({ message, statusCode }) {
      // eslint-disable-next-line
            // eslint-disable-next-line
            console.error(
                'Problem with Ledger communication',
                message,
                statusCode
            );
    }
  };

  getAddress = async () => {
    // try {
    const address = await this.state.ledger.retrieveAddress(0, 0);
    console.log('address', address);
    // eslint-disable-next-line
        // const pk = (await this.state.ledger.publicKey(HDPATH)).pk;
    this.setState({
      // eslint-disable-next-line
            // cpk: this.state.ledger.compressPublicKey(pk),
      address
    });
    // } catch (error) {
    //   const { message, statusCode } = error;
    //   if (message !== "Cannot read property 'length' of undefined") {
    //     // this just means we haven't found the device yet...
    //     // eslint-disable-next-line
    //     console.error("Problem reading address data", message, statusCode);
    //   }
    //   this.setState({ time: Date.now() }); // cause componentWillUpdate to call again.
    // }
  };

  getWallet = async () => {
    // const addressInfo = await this.state.ledger.getAccountInfo(
    //   this.state.address
    // );
    const addressInfo = await fetch(
      `${API_ROOT}/api/account?address="${this.state.address.bech32}"`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await addressInfo.json();
    // console.log('addressInfo', data);
    // console.log('data', data.result.account.coins[0].amount);
    switch (this.state.txType) {
      case TXTYPE_WITHDRAW:
        this.getRewards();
        break;
      case TXTYPE_GOVERNANCE_VOTE:
        this.getGovernanceProposals();
        break;
      default:
        break;
    }

    this.setState(prevState => ({
      addressInfo: data,
      availableStake: parseFloat(data.result.account.coins[0].amount),
      canStake:
        parseFloat(data.result.account.coins[0].amount) -
        prevState.gas * prevState.gasPrice,
      stage: STAGE_READY
    }));

    // console.log('addressInfo', addressInfo);
  };

  generateTx = async () => {
    const { ledger, address } = this.state;
    const validatorBech32 = OPERATOR_ADDR;
    const uatomAmount = this.state.toSend * DIVISOR;
    const getAccountInfo = await ledger.getAccountInfo(address.bech32);
    const txContext = {
      accountNumber: address.accountNumber,
      balanceuAtom: getAccountInfo.balanceuAtom,
      chainId: getAccountInfo.chainId,
      sequence: address.sequence,
      bech32: address.bech32,
      pk: address.pk,
      path: address.path
    };
    const tx = await ledger.txCreateSend(
      txContext,
      validatorBech32,
      uatomAmount,
      MEMO
    );
    console.log('tx', tx);

    const sing = await ledger.sign(tx, txContext);
    console.log('sing', sing);
    const txSubmit = await ledger.txSubmit(sing);
    console.log(txSubmit);
    // if (
    //   (this.state.gas > DEFAULT_GAS * 2 &&
    //     this.state.txType !== TXTYPE_WITHDRAW) ||
    //   (this.state.gasPrice > DEFAULT_GAS_PRICE * 2 && DEFAULT_GAS_PRICE > 0)
    // ) {
    //   // if gas > 2x default (unless it withdraw and we are withdrawing from multiple validators)
    //   // if gasPrice > 2x default (unless default is 0, bvecause 2*0 is still 0!)
    //   this.state.errorMessage =
    //     'You gas price seems excessive! Please adjust to more sane values.';
    //   return;
    // }

    // const defaultTx = {
    //   fee: {
    //     amount: [
    //       {
    //         denom: DENOM,
    //         amount: String(this.state.gas * this.state.gasPrice)
    //       }
    //     ],
    //     gas: String(this.state.gas)
    //   },
    //   signatures: null,
    //   memo: MEMO
    // };
    // const txMsg = defaultTx;
    // txMsg.msg = [
    //   {
    //     type: "cosmos-sdk/MsgSend",
    //     value: {
    //       delegator_address: this.state.address,
    //       validator_address: OPERATOR_ADDR,
    //       amount: { denom: DENOM, amount: String(this.state.toSend * DIVISOR)},
    //     },
    //   },
    // ];

    // await this.setState(prevState => ({
    //   txMsg,
    //   requestMetaData: {
    //     sequence: String(prevState.addressInfo.sequence),
    //     from: prevState.address,
    //     account_number: String(prevState.addressInfo.account_number),
    //     chain_id: CHAIN_ID,
    //     fees: String(prevState.gas * prevState.gasPrice),
    //     generate_only: false
    //   },
    //   txBody: null,
    //   error: null
    // }));
    // await this.signTx();
    // if (this.state.txBody !== null) {
    //   this.setState({ txMsg: null, stage: STAGE_SUBMITTED });
    //   await this.injectTx();
    // }
  };

  signTx = async () => {
    const sing = await this.state.ledger.sign(HDPATH, this.state.txMsg);
    console.log(sing);
    // const signMessage = wallet.createSignMessage(
    //   this.state.txMsg,
    //   this.state.requestMetaData,
    // );
    // try {
    //   this.setState({ stage: STAGE_WAIT });
    //   const pubKeyBuffer = Buffer.from(this.state.cpk, "hex");
    //   const ledgerSignature = await this.state.ledger.sign(HDPATH, signMessage);

    //   // eslint-disable-next-line
    //   console.log("ledger signature code", ledgerSignature.return_code);
    //   if (ledgerSignature.return_code === LEDGER_OK) {
    //     const signature = wallet.createSignature(
    //       signatureImport(ledgerSignature.signature),
    //       this.state.addressInfo.sequence,
    //       this.state.addressInfo.account_number,
    //       pubKeyBuffer,
    //     );
    //     const signedTx = wallet.createSignedTx(this.state.txMsg, signature);
    //     const body = wallet.createBroadcastBody(signedTx);
    //     this.setState({ txBody: body, stage: STAGE_GENERATED });
    //   } else {
    //     // eslint-disable-next-line
    //     console.error(ledgerSignature.error_message);
    //     this.setState({
    //       errorMessage: ledgerSignature.error_message,
    //       txBody: null,
    //     });
    //   }
    // } catch ({ message, statusCode }) {
    //   // eslint-disable-next-line
    //   console.error("Error signing transaction", message, statusCode);
    // }
  };

  tryConnect = async () => {
    const connect = await this.state.ledger.connect();
    return connect;
  };

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
      console.log('connect status', connect);
      if (connect === undefined) {
        this.onClickSaveAddress();
        return;
      }
      if (connect !== undefined) {
        this.setState({
          connect
        });
        if (connect.app === false) {
          this.onClickSaveAddress();
        }
      }
      this.setState({
        connect
      });
    });
  };

  onChangeInputContributeATOMs = async e => {
    this.setState({
      toSend: e.target.value
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

  hasKey() {
    return this.state.address !== null;
  }

  hasWallet() {
    return this.state.addressInfo !== null;
  }

  // copyToClipboard() {
  //   this.state.textAreaRef.current.select();
  //   document.execCommand("copy");
  //   this.setState({ clipboardCopySuccess: true });
  //   setTimeout(() => {
  //     this.setState({ clipboardCopySuccess: false });
  //   }, 2000);
  // }

  render() {
    const {
      valueSelect,
      step,
      height50,
      sendAddress,
      connect,
      ledger,
      returnCode,
      version_info,
      version,
      availableStake,
      canStake,
      address,
      gasPrice,
      gas,
      toSend,
      txMsg
    } = this.state;
    // console.log(
    //   'availableStake',
    //   formatAtom(
    //     this.state.availableStake / DIVISOR,
    //     this.state.availableStake > DIVISOR ? 6 : 3
    //   )
    // );
    // console.log('canStake', canStake);
    // console.log('address', address);
    // console.log('toSend', toSend);
    // console.log('returnCode', returnCode);
    // console.log('version_info', version_info);
    // console.log(JSON.stringify(txMsg, null, 2));

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

    if (this.state.stage === STAGE_INIT) {
      return (
        <SendAmounLadger
          onClickBtn={this.onClickSaveAddress}
          status={connect}
          pin={returnCode >= LEDGER_NOAPP}
          app={returnCode === LEDGER_OK}
          version={
            this.state.returnCode === LEDGER_OK &&
            this.compareVersion(version, LEDGER_VERSION_REQ)
          }
          address={sendAddress}
        />
      );
    }

    if (this.state.stage === STAGE_READY && this.hasKey() && this.hasWallet()) {
      // if (this.state.stage === STAGE_READY) {
      return (
        <ContributeATOMs
          onClickBtn={() => this.generateTx()}
          address={address.bech32}
          availableStake={Math.floor((availableStake / DIVISOR) * 1000) / 1000}
          canStake={Math.floor((canStake / DIVISOR) * 1000) / 1000}
          gasUAtom={gas * gasPrice}
          gasAtom={(gas * gasPrice) / DIVISOR}
          onChangeInput={e => this.onChangeInputContributeATOMs(e)}
          valueInput={toSend}
        />
        //   <ContributeATOMs
        //     onClickBtn={this.onClickContributeATOMs}
        //     address='cosmos1gw5kdey7fs9wdh05w66s0h4s24tjdvtcxlwll7'
        //     availableStake={Math.floor(0.05851 * 1000) / 1000}
        //     canStake={Math.floor(0.05701 * 1000) / 1000}
        //     valueInput={Math.floor(0.05701 * 1000) / 1000}
        //     gasUAtom={gas * gasPrice}
        //     gasAtom={(gas * gasPrice) / DIVISOR}
        // />
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
