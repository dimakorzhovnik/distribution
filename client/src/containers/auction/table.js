import React, { Component } from 'react';
import { ClaimedRound } from './claimed';
import { ClaimedAll } from './claimedAll';

export class Table extends Component {
  render() {
    const { data, TOKEN_NAME, claimed, web3, contract } = this.props;
    const tableRow = data.map(item => (
      <div className="table-rows" key={item.period}>
        <div className="number">#{item.period}</div>
        <div className="number">{item.dist}</div>
        <div className="number">{item.total}</div>
        <div className="number">{item.price}</div>
        <div className="number">in {item.closing} days</div>
        <div className="number">{item.youETH}</div>
        <div className="number">{item.youCYB}</div>
        {item.claimed && (
          <div className="number">
            <ClaimedRound day={item.claimed} contract={contract} web3={web3}>
              Claimed
            </ClaimedRound>
          </div>
        )}
      </div>
    ));
    return (
      <div className={`table ${claimed ? 'claimed' : ''}`}>
        <div className="table-header-rows">
          <div className="number">Round</div>
          <div className="number">
            {TOKEN_NAME} Destributed, G{TOKEN_NAME}
          </div>
          <div className="number">Total, ETH</div>
          <div className="number">Effective price, ETH/G{TOKEN_NAME}</div>
          <div className="number">Closing</div>
          <div className="number">You ETH</div>
          <div className="number">
            You {TOKEN_NAME}, G{TOKEN_NAME}
          </div>
          {claimed && (
            <div className="number">
              <ClaimedAll
                contract={contract}
                web3={web3}
                className="bnt-claime"
              >
                ClaimedAll
              </ClaimedAll>
            </div>
          )}
        </div>
        <div className="table-body">{tableRow}</div>
      </div>
    );
  }
}
