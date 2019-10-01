import React, { Component } from 'react';
import { formatNumber } from '../../utils/utils';
import { Tooltip } from '../../components/index';

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      statePin: true
    };
  }

  open = () => {
    this.setState({
      open: !this.state.open
    });
  };

  funcPin = item => {
    let allPin = JSON.parse(localStorage.getItem('allpin'));
    if (allPin == null) allPin = [];
    const { group } = item;
    const value = item;
    const pin = {
      group,
      value
    };
    localStorage.setItem(`item_pin`, JSON.stringify(pin));
    allPin.push(pin);
    localStorage.setItem('allpin', JSON.stringify(allPin));
    this.setState({
      statePin: false
    });
  };

  funcUnPin = item => {
    const allPin = JSON.parse(localStorage.getItem('allpin'));
    console.log(allPin);
  };

  render() {
    const { open, statePin } = this.state;
    const { item, children, pin } = this.props;
    return (
      <div>
        {statePin && (
        <button onClick={e => this.funcPin(pin)}>pin</button>
        )}
        {!statePin && (
        <button onClick={e => this.funcUnPin(pin)}>unpin</button>
          
        )}
        <div onClick={this.open} className="table-rows-box">
          {children}
        </div>
        <div className={`box ${open ? 'open' : 'close'}`}>{item}</div>
      </div>
    );
  }
}

export class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: false,
      dataPinTable: [],
      loader: true
    };
  }

  componentDidMount() {
    const dataPin = [];
    const jsonStr = localStorage.getItem('allpin');
    dataPin.push(JSON.parse(jsonStr));
    if (dataPin[0] != null) {
      this.setState({
        pin: true
      });
    }
    this.setState({
      dataPinTable: dataPin,
      loader: false
    });
  }

  render() {
    const { data } = this.props;
    const { pin, dataPinTable, loader } = this.state;

    console.log(dataPinTable);

    // const tableRowPin =

    const tableRow = data.map((itemGroup, index) => (
      <Row
        pin={itemGroup}
        key={index}
        item={itemGroup.address.map((item, index) => (
          <div className="table-rows-child" key={index}>
            <div className="number hash">
              <a href={`https://cyberd.ai/transactions/${item.txhash}`}>
                {item.txhash}
              </a>
            </div>
            <div className="number">{item.height}</div>
            <div className="number">{formatNumber(item.amount)}</div>
            <Tooltip
              placement="bottom"
              tooltip={`${formatNumber(Math.floor(item.cybEstimation))} CYBs`}
            >
              <div className="number">
                {formatNumber(
                  Math.floor((item.cybEstimation / Math.pow(10, 9)) * 1000) /
                    1000
                )}
              </div>
            </Tooltip>
          </div>
        ))}
      >
        <div className="number address">{itemGroup.group}</div>
        <div className="number">{formatNumber(itemGroup.amountСolumn)}</div>
        <Tooltip
          placement="bottom"
          tooltip={`${formatNumber(Math.floor(itemGroup.cyb))} CYBs`}
        >
          <div className="number">
            {formatNumber(
              Math.floor((itemGroup.cyb / Math.pow(10, 9)) * 1000) / 1000
            )}
          </div>
        </Tooltip>
      </Row>
    ));
    if (loader) {
      return <div>...</div>;
    }
    return (
      <div>
        {pin && (
          <div style={{ marginBottom: '50px' }}>
            <div>pin</div>
            <div className="table">
              <div className="table-header-rows">
                <div className="number address">Address (TX id)</div>
                <div className="number">Height</div>
                <div className="number">ATOMs</div>
                <div className="number">GCYB estimation</div>
              </div>

              <div className="table-body">
                {dataPinTable[0].map(itemGroup => (
                  <div className="number address">{itemGroup.group}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div>table</div>
        <div className="table">
          <div className="table-header-rows">
            <div className="number address">Address (TX id)</div>
            <div className="number">Height</div>
            <div className="number">ATOMs</div>
            <div className="number">GCYB estimation</div>
          </div>

          <div className="table-body">{tableRow}</div>
        </div>
      </div>
    );
  }
}
