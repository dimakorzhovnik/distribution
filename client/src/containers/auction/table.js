import React, { Component } from 'react';

export class Table extends Component {
  componentDidMount() {
    // const { data } = this.props;
  }

  render() {
    const { data } = this.props;
    const row = data.map(item => (
      <div key={item.round} className="table-rows">
        <div className="number">{item.round}</div>
        <div className="number">{item.result}</div>
        <div className="number">{item.priceEth}</div>
        <div className="number">{item.userBuysEth}</div>
      </div>
    ));

    return (
      <div className="table">
        <div className="table-header-rows">
          <div className="number">Round №</div>
          <div className="number">ETH</div>
          <div className="number">Price ETH</div>
          <div className="number">Your contribution</div>
        </div>
        <div className="table-body">{row}</div>
      </div>
    );
  }
}
