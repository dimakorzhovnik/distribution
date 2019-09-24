import React, { PureComponent } from 'react';
import withWeb3 from '../../components/web3/withWeb3';
import { Statistics } from './statistics';
import { ActionBar } from './actionBar';
import { Dinamics } from './dinamics';
import { Table } from './table';
import { Loading } from '../../components/index';
import {
  run,
  formatNumber,
  roundNumber,
  asyncForEach,
  timer
} from '../../utils/utils';

const TOKEN_NAME = 'GOL';

class Auction extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
      roundThis: '',
      timeLeft: 0,
      currentPrice: 0,
      dailyTotals: 0,
      raised: 0,
      loading: true,
      numberOfDays: 0,
      claimed: false,
      createOnDay: 0,
      popupsBuy: false,
      dynamics: {
        x: [],
        y: [],
        x1: [],
        y1: []
      }
    };
  }

  async componentDidMount() {
    const {
      contract: { methods },
      accounts,
      web3
    } = this.props;

    timer(this.getTimeEndRound);
    run(this.statistics);
    run(this.dinamics);
    run(this.getDataTable);

    const subscription = web3.eth.subscribe(
      'logs',
      {
        address: '0x6c9c39d896b51e6736dbd3da710163903a3b091b',
        topics: [
          '0xe054057d0479c6218d6ec87be73f88230a7e4e1f064cee6e7504e2c4cd9d6150'
        ]
      },
      (error, result) => {
        if (!error) {
          console.log(result);
          run(this.statistics);
          run(this.dinamics);
          run(this.getDataTable);
        }
      }
    );

    // unsubscribes the subscription
    subscription.unsubscribe((error, success) => {
      if (success) console.log('Successfully unsubscribed!');
    });

    const subscriptionClaim = web3.eth.subscribe(
      'logs',
      {
        address: '0x6c9c39d896b51e6736dbd3da710163903a3b091b',
        topics: [
          '0x51223fdc0a25891366fb358b4af9fe3c381b1566e287c61a29d01c8a173fe4f4'
        ]
      },
      (error, result) => {
        if (!error) {
          console.log(result);
          run(this.statistics);
          run(this.dinamics);
          run(this.getDataTable);
        }
      }
    );

    // unsubscribes the subscription
    subscriptionClaim.unsubscribe((error, success) => {
      if (success) console.log('Successfully unsubscribed!');
    });

    const { contract } = this.props;
    const youCYB = (await contract.getPastEvents('LogClaim', {
      fromBlock: 0,
      toBlock: 'latest'
    })).filter(i => i.returnValues.user === accounts);

    console.log({
      youCYB
    });
  }

  getTimeEndRound = async () => {
    const {
      contract: { methods }
    } = this.props;
    const today = parseInt(await methods.today().call());
    const time = await methods.time().call();
    const startTime = await methods.startTime().call();
    const times = parseFloat(
      today * 23 * 60 * 60 - (parseFloat(time) - parseFloat(startTime))
    );
    const hours = Math.floor((times / (60 * 60)) % 24);
    const minutes = Math.floor((times / 60) % 60);

    const h = `0${hours}`.slice(-2);
    const m = `0${minutes}`.slice(-2);
    const timeLeft = `${h} : ${m}`;
    this.setState({
      timeLeft
    });
  };

  statistics = async () => {
    const {
      contract: { methods }
    } = this.props;
    const roundThis = parseInt(await methods.today().call());
    const numberOfDays = await methods.numberOfDays().call();
    const today = roundThis;
    const createOnDay = await methods.createOnDay(today).call();
    const dailyTotals = await methods.dailyTotals(today).call();
    const currentPrice = roundNumber(
      dailyTotals / (createOnDay * Math.pow(10, 9)),
      6
    );

    return this.setState({
      roundThis,
      currentPrice,
      numberOfDays,
      dailyTotals: Math.floor((dailyTotals / Math.pow(10, 18)) * 10000) / 10000
    });
  };

  dinamics = async () => {
    const {
      contract: { methods },
      contractAuctionUtils
    } = this.props;
    const { roundThis } = this.state;
    let raised = 0;
    const dynamics = {
      x: [],
      y: [],
      x1: [],
      y1: [],
      time: []
    };

    const startTime = await methods.startTime().call();
    const createPerDay = await methods.createPerDay().call();
    const createFirstDay = await methods.createFirstDay().call();

    const dailyTotalsUtils = await contractAuctionUtils.methods
      .dailyTotals()
      .call();

    if (roundThis === 0) {
      this.setState({
        createOnDay: createFirstDay
      });
    } else {
      this.setState({
        createOnDay: createPerDay
      });
    }
    await asyncForEach(
      Array.from(Array(dailyTotalsUtils.length).keys()),
      async item => {
        let createOnDay;
        if (item === 0) {
          createOnDay = createFirstDay;
        } else {
          createOnDay = createPerDay;
        }

        const currentPrice = roundNumber(
          dailyTotalsUtils[item] / (createOnDay * Math.pow(10, 9)),
          6
        );
        // TODO
        // if (item <= today) {
        const dt = dailyTotalsUtils[item];
        raised += parseFloat(dt) / Math.pow(10, 18);

        const _raised = parseFloat(dt) / Math.pow(10, 18);

        if (item === 0) {
          dynamics.x.push(
            item
            // new Date(startTime * 1000 + 1000 * 60 * 60).toShortFormat()
          );
          dynamics.y.push(_raised);
          dynamics.time.push(startTime * 1000 + 1000 * 60 * 60);

          dynamics.y1.push(
            item
            // new Date(startTime * 1000 + 1000 * 60 * 60).toShortFormat()
          );
          dynamics.x1.push(currentPrice);
        } else {
          const nextTime = dynamics.time[dynamics.time.length - 1];

          dynamics.x.push(
            item
            // new Date(nextTime + 1000 * 23 * 60 * 60).toShortFormat()
          );
          dynamics.y.push(_raised);

          dynamics.y1.push(
            item
            // new Date(nextTime + 1000 * 23 * 60 * 60).toShortFormat()
          );
          dynamics.x1.push(currentPrice);
        }
      }
    );

    this.setState({ dynamics, loading: false });
    this.setState({ raised });
  };

  getDataTable = async () => {
    const {
      contract: { methods },
      contractAuctionUtils,
      accounts
    } = this.props;
    const { contract } = this.props;

    const youCYB = (await contract.getPastEvents('LogClaim', {
      fromBlock: 0,
      toBlock: 'latest'
    })).filter(i => i.returnValues.user === accounts);

    // console.log({
    //   youCYB
    // });

    const table = [];
    const roundThis = parseInt(await methods.today().call());
    const startTime = await methods.startTime().call();
    const openTime = await methods.openTime().call();
    const createPerDay = await methods.createPerDay().call();
    const createFirstDay = await methods.createFirstDay().call();
    const userClaims = await contractAuctionUtils.methods
      .userClaims(accounts)
      .call();
    const dailyTotalsUtils = await contractAuctionUtils.methods
      .dailyTotals()
      .call();

    const _userBuys = await contractAuctionUtils.methods
      .userBuys(accounts)
      .call();

    await asyncForEach(
      Array.from(Array(dailyTotalsUtils.length).keys()),
      async item => {
        let createOnDay;
        if (item === 0) {
          createOnDay = createFirstDay;
          this.setState({
            createOnDay
          });
        } else {
          createOnDay = createPerDay;
          this.setState({
            createOnDay
          });
        }
        // if (item <= roundThis) {
        const currentPrice = roundNumber(
          dailyTotalsUtils[item] / (createOnDay * Math.pow(10, 9)),
          6
        );

        const distValue =
          Math.floor((createOnDay / Math.pow(10, 9)) * 100) / 100;
        const dailyValue =
          Math.floor((dailyTotalsUtils[item] / Math.pow(10, 18)) * 10000) /
          10000;
        const userBuy = _userBuys[item] / Math.pow(10, 18);
        const _youCYB = youCYB.filter(i => +i.returnValues.window === +item);
        let cyb;
        if (_userBuys[item] === '0' || userClaims[item] === true) {
          cyb = 0;
        } else {
          cyb = (distValue / dailyValue) * userBuy;
        }
        let claimedItem;
        if (cyb === 0 || item >= roundThis) {
          claimedItem = false;
        } else {
          claimedItem = item;
          this.setState({ claimed: true });
        }

        table.push({
          period: item,
          dist: Math.floor((createOnDay / Math.pow(10, 9)) * 100) / 100,
          total:
            Math.floor((dailyTotalsUtils[item] / Math.pow(10, 18)) * 10000) /
            10000,
          price: currentPrice,
          closing: (23 * (roundThis - item)) / 23,
          youETH: _userBuys[item] / Math.pow(10, 18),
          youCYB: Math.floor(cyb * 100) / 100,
          claimed: claimedItem
          // _youCYB.length ? _youCYB[0].returnValues.amount : '0'
        });
        // console.log('CR', {_createOnDay, _dailyTotals, today}, (_createOnDay/Math.pow(10,18)  +  _dailyTotals/2) /_dailyTotals);
        // }
      }
    );
    this.setState({ table });
  };

  render() {
    const {
      roundThis,
      table,
      numberOfDays,
      timeLeft,
      currentPrice,
      raised,
      dynamics,
      loading,
      claimed,
      dailyTotals,
      createOnDay,
      popupsBuy
    } = this.state;

    const thc = 700 * Math.pow(10, 3);
    return (
      <div>
        <main className="block-body auction">
          <span className="caption">Cyber~Auction</span>
          <Statistics
            round={roundThis}
            roundAll={numberOfDays}
            timeLeft={timeLeft}
            currentPrice={currentPrice}
            raised={Math.round(raised * 10000) / 10000}
            cap={formatNumber(thc * currentPrice)}
            TOKEN_NAME={TOKEN_NAME}
          />
          {loading && (
            <div className="container-loading">
              <Loading />
            </div>
          )}
          {!loading && (
            <Dinamics
              data={dynamics}
              price={currentPrice}
              volume={dailyTotals}
              round={roundThis}
              distribution={
                Math.floor((createOnDay / Math.pow(10, 9)) * 100) / 100
              }
            />
          )}
          {!loading && (
            <div style={{ marginTop: '0px', width: '100%' }}>
              <Table
                data={table}
                TOKEN_NAME={TOKEN_NAME}
                claimed={claimed}
                web3={this.props.web3}
                contract={this.props.contract}
                round={roundThis}
              />
            </div>
          )}
        </main>
        <ActionBar
          web3={this.props.web3}
          contract={this.props.contract}
          minRound={roundThis}
          maxRound={numberOfDays}
        />
      </div>
    );
  }
}

export default withWeb3(Auction);
