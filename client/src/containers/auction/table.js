import React, { Component } from 'react';

export class Table extends Component {
  render() {
    const { data } = this.props;
    const tableRow = data.map(item => (
      <div className="table-rows" key={item.period}>
        <div className="number">#{item.period}</div>
        <div className="number">{item.dist} GOT</div>
        <div className="number">{item.total} ETH</div>
        <div className="number">{item.price} ETH/GOT</div>
        <div className="number">in {item.closing} days</div>
        <div className="number">{item.youETH} ETH</div>
        <div className="number">{item.youCYB} GOT</div>
      </div>
    ));
    return (
      <div className="table">
        <div className="table-header-rows">
          <div className="number">Round</div>
          <div className="number">GOT Destributed</div>
          <div className="number">Total ETH</div>
          <div className="number">Effective price</div>
          <div className="number">Closing</div>
          <div className="number">You ETH</div>
          <div className="number">You GOT</div>
        </div>
        <div className="table-body">{tableRow}</div>
      </div>
    );
  }
}
