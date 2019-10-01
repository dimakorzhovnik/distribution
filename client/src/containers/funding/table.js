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

  componentDidMount() {
    const { pin } = this.props;
    const allPin = JSON.parse(localStorage.getItem('allpin'));
    // console.log(allPin);
    // console.log(pin.group);
    if (allPin != null) {
      for (let i = 0; i < allPin.length; i++) {
        if (allPin[i].group.indexOf(`${pin.group}`) !== -1) {
          this.setState({
            statePin: false
          });
        }
      }
    }
  }

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
    this.props.updateList(allPin);
    this.setState({
      statePin: false
    });
  };

  funcUnPin = item => {
    const tempArr = localStorage.getItem('allpin');
    const allPin = JSON.parse(tempArr);
    if (allPin != null) {
      for (let i = 0; i < allPin.length; i++) {
        const tempindexItem = allPin[i].group.indexOf(`${item.group}`) !== -1;
        if (tempindexItem) {
          allPin.splice(i, 1);
          localStorage.setItem('allpin', JSON.stringify(allPin));
          this.props.updateList(allPin);
        }
      }
      this.setState({
        statePin: true
      });
    }
  };

  render() {
    const { open, statePin } = this.state;
    const { item, children, pin, unPin } = this.props;
    const allPin = JSON.parse(localStorage.getItem('allpin'));
    // console.log(pin.group);

    //   allPin.map(item => {
    //   const index = item.group.indexOf('cyber1hmkqhy8ygl6tnl5g8tc503rwrmmrkjcq4878e0');
    //   console.log(index);
    // });
    return (
      <div>
        {statePin && <button onClick={e => this.funcPin(pin)}>pin</button>}
        {!statePin && unPin && <button onClick={e => this.funcUnPin(pin)}>unpin</button>}
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
    const data = [];
    const jsonStr = localStorage.getItem('allpin');
    data.push(JSON.parse(jsonStr));

    this.state = {
      pin: false,
      dataPinTable: data,
      loader: false
    };
  }

  updateList = data => {
    // console.log(data);
    const tempArr = [];
    let pin = false;
    tempArr.push(data);
    if (tempArr[0] != null) {
      if (tempArr[0].length) {
        pin = true;
      }
    }
    this.setState({
      dataPinTable: tempArr,
      pin
    });
  };

  componentDidMount() {
    const dataPin = [];
    const jsonStr = localStorage.getItem('allpin');
    dataPin.push(JSON.parse(jsonStr));
    if (dataPin[0] != null) {
      if (dataPin[0].length) {
        this.setState({
          pin: true
        });
      }
    }
    this.setState({
      loader: false
    });
  }

  render() {
    const { data } = this.props;
    const { pin, dataPinTable, loader } = this.state;
    const tableRowPin = dataPinTable[0].map((itemGroup, index) => (
      // console.log(itemGroup.value)
      <Row
        pin={itemGroup}
        updateList={this.updateList}
        key={itemGroup.value.group}
        item={itemGroup.value.address.map((item, index) => (
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
        <div className="number address">{itemGroup.value.group}</div>
        <div className="number">{formatNumber(itemGroup.value.amountСolumn)}</div>
        <Tooltip
          placement="bottom"
          tooltip={`${formatNumber(Math.floor(itemGroup.value.cyb))} CYBs`}
        >
          <div className="number">
            {formatNumber(
              Math.floor((itemGroup.value.cyb / Math.pow(10, 9)) * 1000) / 1000
            )}
          </div>
        </Tooltip>
      </Row>
    ));

    const tableRow = data.map((itemGroup, index) => (
      <Row
        pin={itemGroup}
        unPin
        updateList={this.updateList}
        key={itemGroup.group}
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

              <div className="table-body">{tableRowPin}</div>
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
