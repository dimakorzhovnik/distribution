import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ContainetLedger, Loading } from '../../components/index';

const ActionBarContainer = ({ height, children }) => (
  <div className={`container-action ${height ? 'height50' : ''} `}>
    {children}
  </div>
);

export const ContributeATOMs = ({
  onClickBtn,
  address,
  availableStake,
  canStake,
  valueInput,
  gasUAtom,
  gasAtom,
  onChangeInput
}) => (
  <ContainetLedger>
    <div className="display-flex align-items-center">
      <span className="actionBar-text">{address}</span>
      <button
        className="copy-address"
        onClick={() => {
          navigator.clipboard.writeText(address);
        }}
      />
    </div>
    {availableStake > 0 && (
      <div>
        <h3 className="text-align-center">Send Details</h3>
        <p className="text-align-center">Your wallet contains:</p>
        <span className="actionBar-text">{availableStake}</span>
        <div style={{ marginTop: '25px', marginBottom: 10 }}>
          Enter the amount of ATOMs you wish to send to Cyber~Congress:
        </div>
        <div className="text-align-center">
          <input
            value={valueInput}
            style={{ marginRight: 10 }}
            onChange={onChangeInput}
          />
          <button className="btn" style={{ height: 30 }}>
            Confirm
          </button>
        </div>
        <h6 style={{ margin: 20 }}>
          The fees you will be charged by the network on this transaction will
          {gasUAtom} uatom ( {gasAtom} ATOMs ).
        </h6>
        <div className="text-align-center">
          <button type="button" className="btn" onClick={onClickBtn}>
            Generate my transaction
          </button>
        </div>
      </div>
    )}
  </ContainetLedger>
);

export const JsonTransaction = ({ txMsg }) => (
  <ContainetLedger>
    <div className="text-align-center">
      <h3 style={{ marginBottom: 20 }}>
        Please confirm the transaction data matches what is displayed on your
        device.
      </h3>
    </div>

    <div className="container-json">
      <SyntaxHighlighter language="json" style={docco}>
        {JSON.stringify(txMsg, null, 2)}
      </SyntaxHighlighter>
    </div>
  </ContainetLedger>
);

export const TransactionSubmitted = () => (
  <ContainetLedger>
    <span className="font-size-20 display-inline-block text-align-center">
      Transaction submitted
    </span>
    <div
      style={{
        marginTop: '35px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <span
        style={{
          marginBottom: '20px',
          maxWidth: '70%',
          fontSize: '16px'
        }}
      >
        Please wait while we confirm the transaction on the blockchain. This
        might take a few moments depending on the transaction fees used.
      </span>
      <Loading />
    </div>
  </ContainetLedger>
);

export const Confirmed = ({ txHash, txHeight, onClickBtn }) => (
  <ContainetLedger>
    <span className="font-size-20 display-inline-block text-align-center">
      Transaction Confirmed!
    </span>
    <div
      style={{ marginTop: '25px' }}
      className="display-flex flex-direction-column"
    >
      <p style={{ marginBottom: 20, textAlign: 'center' }}>
        Your transaction was included in the block at height:{' '}
        <span
          style={{
            color: '#3ab793',
            marginLeft: '5px'
          }}
        >
          {txHeight}
        </span>
      </p>

      <a
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto'
        }}
        href={`https://www.mintscan.io/txs/${txHash}`}
      >
        View transaction
      </a>
      <div style={{ marginTop: '25px' }}>
        <span>Transaction Hash:</span>
        <span
          style={{
            fontSize: '12px',
            color: '#3ab793',
            marginLeft: '5px'
          }}
        >
          {txHash}
        </span>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <button type="button" className="btn" onClick={onClickBtn}>
          Continue
        </button>
      </div>
    </div>
  </ContainetLedger>
);

export const StartState = ({ onClickBtn, valueSelect, onChangeSelect }) => (
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

export const SendAmount = ({ onClickBtn, address }) => (
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

export const SendAmounLadger = ({ onClickBtn, status, pin, app, version }) => (
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

export const PutAddress = ({ onClickBtn }) => (
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

export const TransactionCost = ({ onClickBtn }) => (
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

export const Succesfuuly = ({ onClickBtn }) => (
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
