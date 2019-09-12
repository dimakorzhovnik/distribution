import React, { Component } from 'react';

export class Table extends Component {
  render() {
    const { data } = this.props;
    const tableRow = data.map(item => (
      <div className="table-rows" key={item.period}>
        <div className="number">{item.period}</div>
        <div className="number">{item.dist}</div>
        <div className="number">{item.total}</div>
        <div className="number">{item.price}</div>
        <div className="number">{item.closing}</div>
        <div className="number">{item.youETH}</div>
        <div className="number">{item.youCYB}</div>
      </div>
    ));
    return (
      <div className="table">
        <div className="table-header-rows">
          <div className="number">Round №</div>
          <div className="number">destributed</div>
          <div className="number">total ETH</div>
          <div className="number">Effective price</div>
          <div className="number">closing</div>
          <div className="number">youETH</div>
          <div className="number">youCYB</div>
        </div>
        <div className="table-body">{tableRow}</div>
      </div>
    );
  }
}
