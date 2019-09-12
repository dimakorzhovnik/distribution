import React, { PureComponent } from 'react';
import withWeb3 from '../../components/web3/withWeb3';
import { Statistics } from './statistics';
import { ActionBar } from './actionBar';
import { Dinamics } from './dinamics';
import { Table } from './table';

const run = async func => {
  try {
    await func();
  } catch (error) {
    setTimeout(run, 1000, func);
  }
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

    const {
      contract: { methods },
      accounts
    } = this.props;
    const time = await methods.time().call();
    const startTime = await methods.startTime().call();
    const openTime = await methods.openTime().call();
    const today = parseInt(await methods.today().call());

    // console.log({time, startTime, today}, new Date(parseFloat(time)*1000), new Date(parseFloat(startTime)*1000));

    const dailyTotals = await methods.dailyTotals(today).call();
    const createOnDay = await methods.createOnDay(today).call();
    const numberOfDays = await methods.numberOfDays().call();

    // console.log('LEFT', (today * 23*60*60 -  (parseFloat(time) - parseFloat(startTime) ) )/60/60);

    const { contract } = this.props;
    const youCYB = (await contract.getPastEvents('LogClaim', {
      fromBlock: 0,
      toBlock: 'latest'
    })).filter(i => i.returnValues.user === accounts);

    console.log({
      youCYB
    });

    const raised = 0;
    const table = [];

    const dynamics = {
      x: [],
      y: [],
      x1: [],
      y1: [],
      time: []
    };

    // await asyncForEach(Array.from(Array(today + 1).keys()), async item => {
    //   // TODO
    //   if (item <= today) {
    //     const dt = await methods.dailyTotals(item).call();
    //     raised += parseFloat(dt) / Math.pow(10, 18);

    //     const _createOnDay = await methods.createOnDay(item).call();
    //     const _dailyTotals = await methods.dailyTotals(item).call();
    //     // let _currentPrice = ((_createOnDay*Math.pow(10,18)  +  _dailyTotals/2) /_dailyTotals) / Math.pow(10,18);
    //     const _currentPrice = roundNumber(
    //       _dailyTotals / (_createOnDay * Math.pow(10, 9)),
    //       6
    //     ); // ((*Math.pow(10,18)  +  _dailyTotals/2) /) / Math.pow(10,18);
    //     // const _currentPriceRound =
    //     //   Math.round((_currentPrice / Math.pow(10, 5)) * 1000000) / 1000000;
    //     const _userBuys = await methods.userBuys(item, accounts).call();
    //     console.log(raised);

    //     const _raised = parseFloat(dt) / Math.pow(10, 18);
    //     // console.log(Math.round((_currentPrice / Math.pow(10, 18))*1000000)/1000000);
    //     this.setState({ currentPrice: _currentPrice });

    //     // alert()  + item*23*60*60

    //     if (item === 0) {
    //       dynamics.x.push(
    //         item
    //         // new Date(startTime * 1000 + 1000 * 60 * 60).toShortFormat()
    //       );
    //       dynamics.y.push(_raised);
    //       dynamics.time.push(startTime * 1000 + 1000 * 60 * 60);

    //       dynamics.y1.push(
    //         item
    //         // new Date(startTime * 1000 + 1000 * 60 * 60).toShortFormat()
    //       );
    //       dynamics.x1.push(_currentPrice);
    //     } else {
    //       const nextTime = dynamics.time[dynamics.time.length - 1];

    //       dynamics.x.push(
    //         item
    //         // new Date(nextTime + 1000 * 23 * 60 * 60).toShortFormat()
    //       );
    //       dynamics.y.push(_raised);

    //       dynamics.y1.push(
    //         item
    //         // new Date(nextTime + 1000 * 23 * 60 * 60).toShortFormat()
    //       );
    //       dynamics.x1.push(_currentPrice);
    //     }

    //     //
    //     // console.log({_raised})

    //     const _youCYB = youCYB.filter(i => +i.returnValues.window === +item);

    //     table.push({
    //       period: item,
    //       dist: _createOnDay,
    //       total: Math.round((_dailyTotals / Math.pow(10, 18)) * 10000) / 10000,
    //       price: _currentPrice,
    //       closing:
    //         item === 0
    //           ? Math.round(((startTime - openTime) / 60 / 60 / 24) * 10000) /
    //             10000
    //           : Math.round(((23 * item) / 24) * 10000) / 10000,
    //       youETH: _userBuys / Math.pow(10, 18),
    //       youCYB: _youCYB.length ? _youCYB[0].returnValues.amount : ''
    //     });

    //     // console.log('CR', {_createOnDay, _dailyTotals, today}, (_createOnDay/Math.pow(10,18)  +  _dailyTotals/2) /_dailyTotals);
    //   }
    // });

    // this.setState({ table, dynamics });

    // console.log({ numberOfDays, createOnDay });

    // this.setState({ raised });
    // this.setState({ numberOfDays });

    // this.setState({
    //   timeLeft:
    //     Math.round(
    //       parseFloat(
    //         (today * 23 * 60 * 60 - (parseFloat(time) - parseFloat(startTime))) /
    //           60 / 60 ) * 1000 ) / 1000
    // });
  }

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

    const timeLeft =
      (await Math.round(
        parseFloat(
          (today * 23 * 60 * 60 - (parseFloat(time) - parseFloat(startTime))) /
            60 /
            60
        ) * 1000
      )) / 1000;
    console.log(timeLeft);
    return this.setState({
      roundThis,
      currentPrice,
      numberOfDays,
      timeLeft
    });
  };

  dinamics = async () => {
    // const {currentPrice}= this.state;
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

    await asyncForEach(Array.from(Array(today + 1).keys()), async item => {
      const _createOnDay = await methods.createOnDay(item).call();
      const _dailyTotals = await methods.dailyTotals(item).call();
      const currentPrice = roundNumber(
        _dailyTotals / (_createOnDay * Math.pow(10, 9)),
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
          dist: _createOnDay,
          total: Math.round((_dailyTotals / Math.pow(10, 18)) * 10000) / 10000,
          price: currentPrice,
          closing:
            item === 0
              ? Math.round(((startTime - openTime) / 60 / 60 / 24) * 10000) /
                10000
              : Math.round(((23 * item) / 24) * 10000) / 10000,
          youETH: _userBuys / Math.pow(10, 18),
          youCYB: _youCYB.length ? _youCYB[0].returnValues.amount : ''
        });

        // console.log('CR', {_createOnDay, _dailyTotals, today}, (_createOnDay/Math.pow(10,18)  +  _dailyTotals/2) /_dailyTotals);
      }
    });

    this.setState({ table, dynamics });
  };

  render() {
    const {
      roundThis,
      table,
      numberOfDays,
      timeLeft,
      currentPrice,
      raised,
      dynamics
    } = this.state;
    // console.log(raised);
    const thc = 70 * Math.pow(10, 12);
    return (
      <span>
        <main className="block-body auction">
          <Statistics
            round={roundThis}
            roundAll={numberOfDays}
            timeLeft={timeLeft}
            currentPrice={currentPrice}
            raised={Math.round(raised * 10000) / 10000}
            cap={roundNumber(raised * currentPrice, 6)}
          />
          <Dinamics data={dynamics} />
          <div style={{ marginTop: '500px', width: '100%' }}>
            <Table data={table} />
          </div>
        </main>
        <ActionBar />
      </span>
    );
  }
}

export default withWeb3(Auction);
