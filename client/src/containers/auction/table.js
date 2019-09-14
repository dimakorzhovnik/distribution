import React, { Component } from 'react';

export class Table extends Component {
  render() {
    const { data, TOKEN_NAME } = this.props;
    const tableRow = data.map(item => (
      <div className="table-rows" key={item.period}>
        <div className="number">#{item.period}</div>
        <div className="number">{item.dist} {TOKEN_NAME}</div>
        <div className="number">{item.total} ETH</div>
        <div className="number">{item.price} ETH/{TOKEN_NAME}</div>
        <div className="number">in {item.closing} days</div>
        <div className="number">{item.youETH} ETH</div>
        <div className="number">{item.youCYB} {TOKEN_NAME}</div>
      </div>
    ));
    return (
      <div className="table">
        <div className="table-header-rows">
          <div className="number">Round</div>
          <div className="number">{TOKEN_NAME} Destributed</div>
          <div className="number">Total</div>
          <div className="number">Effective price</div>
          <div className="number">Closing</div>
          <div className="number">You ETH</div>
          <div className="number">You {TOKEN_NAME}</div>
        </div>
        <div className="table-body">{tableRow}</div>
      </div>
    );
  }
}
