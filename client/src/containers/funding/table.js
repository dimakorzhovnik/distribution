import React, { Component } from 'react';
import { formatNumber } from '../../utils/utils';

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  open = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const { open } = this.state;
    const { item, children } = this.props;
    return (
      <div>
        <div onClick={this.open} className="table-rows-box">
          {children}
        </div>
        <div className={`box ${open ? 'open' : 'close'}`}>{item}</div>
      </div>
    );
  }
}

export class Table extends Component {
  render() {
    const { data } = this.props;
    const tableRow = data.map((itemGroup, index) => (
      <Row
        key={index}
        item={itemGroup.address.map((item, index) => (
          <div className="table-rows-child" key={index}>
            <div className="number hash">
              <a href={`https://cyberd.ai/transactions/${item.txhash}`}>
                {item.txhash}
              </a>
            </div>
            <div className="number">{formatNumber(item.amount)}</div>
            <div className="number">{item.height}</div>
          </div>
        ))}
      >
        <div className="number">{itemGroup.group}</div>
        <div className="number">{formatNumber(itemGroup.amountСolumn)}</div>
      </Row>
    ));
    return (
      <div className="table">
        <div className="table-header-rows">
          <div className="number">TX id</div>
          <div className="number">ATOMs</div>
          <div className="number">GCYB estimation</div>
        </div>

        <div className="table-body">{tableRow}</div>
      </div>
    );
  }
}
