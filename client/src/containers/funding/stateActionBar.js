import React from 'react';
import { ContainetLedger } from '../../components/index';

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
          <button className="btn" onClick={onClickBtn} style={{ height: 30 }}>
            Confirm
          </button>
        </div>
        <h6 style={{ margin: 20 }}>
          The fees you will be charged by the network on this transaction will
          {gasUAtom} uatom ( {gasAtom} ATOMs ).
        </h6>
        <div className="text-align-center">
          <button
            type="button"
            className="btn"
            // onClick={() => this.generateTx()}
          >
            Generate my transaction
          </button>
        </div>
      </div>
    )}
  </ContainetLedger>
);
