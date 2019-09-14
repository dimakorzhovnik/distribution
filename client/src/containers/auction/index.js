import React, { PureComponent } from 'react';
import withWeb3 from '../../components/web3/withWeb3';
import { Statistics } from './statistics';
import { ActionBar } from './actionBar';
import { Dinamics } from './dinamics';
import { Table } from './table';
import { Loading } from '../../components/index';

const formatNumber = (number, toFixed) => {
  let formatted = +number;

  if (toFixed) {
    formatted = +formatted.toFixed(toFixed);
  }

  return formatted.toLocaleString('en').replace(/,/g, ' ');
};

const run = async func => {
  try {
    await func();
  } catch (error) {
    setTimeout(run, 1000, func);
  }
};

const timer = func => {
  setInterval(func, 1000);
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const roundNumber = (num, scale) => {
  if (!`${num}`.includes('e')) {
    return +`${Math.round(`${num}e+${scale}`)}e-${scale}`;
  }
  const arr = `${num}`.split('e');
  let sig = '';
  if (+arr[1] + scale > 0) {
    sig = '+';
  }
  const i = `${+arr[0]}e${sig}${+arr[1] + scale}`;
  const j = Math.round(i);
  const k = +`${j}e-${scale}`;
  return k;
};

Date.prototype.toShortFormat = function() {
  const day = this.getDate();
  const month_index = this.getMonth();
  const year = this.getFullYear();

  // return "" + day + "-" + month_names[month_index] + "-" + year;
  return `${year}-${month_index + 1}-${day}`;
};

class Auction extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
      roundThis: '',
      timeLeft: 0,
      currentPrice: 0,
      raised: 0,
      loading: true,
      numberOfDays: 0,
      dynamics: {
        x: [],
        y: [],
        x1: [],
        y1: []
      }
    };
  }

  async componentDidMount() {
    run(this.statistics);
    run(this.dinamics);
    // timer(this.endRound);
    timer(this.getTimeEndRound);
    const {
      contract: { methods },
      accounts
    } = this.props;

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
    const time = await methods.time().call();
    const startTime = await methods.startTime().call();
    const openTime = await methods.openTime().call();
    const roundThis = await methods.today().call();
    const numberOfDays = await methods.numberOfDays().call();
    const today = parseInt(await methods.today().call());
    const createOnDay = await methods.createOnDay(today).call();
    const dailyTotals = await methods.dailyTotals(today).call();
    const currentPrice = roundNumber(
      dailyTotals / (createOnDay * Math.pow(10, 9)),
      6
    );

    // const timeLeft =
    //   (await Math.round(
    //     parseFloat(
    //       (today * 23 * 60 * 60 - (parseFloat(time) - parseFloat(startTime))) /
    //         60 /
    //         60
    //     ) * 1000
    //   )) / 1000;
    // console.log(timeLeft);

    return this.setState({
      roundThis,
      currentPrice,
      numberOfDays
      // timeLeft
    });
  };

  dinamics = async () => {
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

    console.log({
      youCYB
    });

    let raised = 0;
    const table = [];
    const dynamics = {
      x: [],
      y: [],
      x1: [],
      y1: [],
      time: []
    };
    const today = parseInt(await methods.today().call());
    const startTime = await methods.startTime().call();
    const openTime = await methods.openTime().call();
    const createPerDay = await methods.createPerDay().call();
    const createFirstDay = await methods.createFirstDay().call();

    const dailyTotalsUtils = await contractAuctionUtils.methods
      .dailyTotals()
      .call();
    const dailyTotals = dailyTotalsUtils;
    await asyncForEach(
      Array.from(Array(dailyTotalsUtils.length).keys()),
      async item => {
        let createOnDay;
        if (item === 0) {
          createOnDay = createFirstDay;
        } else {
          createOnDay = createPerDay;
        }

        const _dailyTotals = dailyTotals[item];
        const currentPrice = roundNumber(
          _dailyTotals / (createOnDay * Math.pow(10, 9)),
          6
        );
        // TODO
        if (item <= today) {
          const dt = await methods.dailyTotals(item).call();
          raised += parseFloat(dt) / Math.pow(10, 18);

          const _userBuys = await methods.userBuys(item, accounts).call();

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

          //
          // console.log({_raised})

          const _youCYB = youCYB.filter(i => +i.returnValues.window === +item);

          table.push({
            period: item,
            dist: Math.floor((createOnDay / Math.pow(10, 9)) * 100) / 100,
            total:
              Math.floor((_dailyTotals / Math.pow(10, 18)) * 10000) / 10000,
            price: currentPrice,
            closing:
              item === 0
                ? Math.floor(((startTime - openTime) / 60 / 60 / 24) * 10000) /
                  10000
                : Math.floor(((23 * item) / 24) * 10000) / 10000,
            youETH: _userBuys / Math.pow(10, 18),
            youCYB: _youCYB.length ? _youCYB[0].returnValues.amount : '0'
          });

          // console.log('CR', {_createOnDay, _dailyTotals, today}, (_createOnDay/Math.pow(10,18)  +  _dailyTotals/2) /_dailyTotals);
        }
      }
    );
    console.log(table, dynamics);
    this.setState({ table, dynamics, loading: false });
    this.setState({ raised });
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
      loading
    } = this.state;
    const thc = 70 * Math.pow(10, 13);
    // if (loading) {
    //   return <p>...</p>;
    // }
    return (
      <span>
        <main className="block-body auction">
          <Statistics
            round={roundThis}
            roundAll={numberOfDays}
            timeLeft={timeLeft}
            currentPrice={currentPrice}
            raised={Math.round(raised * 10000) / 10000}
            cap={formatNumber(thc * currentPrice)}
          />
          {loading && (
            <div className="container-loading">
              <Loading />
            </div>
          )}
          {!loading && <Dinamics data={dynamics} />}
          {!loading && (
            <div style={{ marginTop: '0', width: '100%' }}>
              <Table data={table} />
            </div>
          )}
        </main>
        <ActionBar />
      </span>
    );
  }
}

export default withWeb3(Auction);
