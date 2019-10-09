import React, { PureComponent } from 'react';
import { Dinamics } from './dinamics';
import { Statistics } from './statistics';
import { Table } from './table';
import { ActionBar } from './actionBar';
import {
  asyncForEach,
  formatNumber,
  run,
  roundNumber
} from '../../utils/utils';
import { Loading } from '../../components/index';
import { wsURL, ATOMsALL } from '../../utils/config';
import {
  cybWon,
  funcDiscount,
  getEstimation,
  getShares,
  getDataPlot,
  getRewards
} from '../../utils/fundingMath';
import { dataJson } from './dataConst';

const thisAtom = 300000;

const url =
  'https://herzner1.cybernode.ai/cyber12psudf4rpaw4jwhuyx3y8sejhsynae7ggvzvy8';

// const ATOMsALL = 600000;
// const a = 0.000740464;
// const b = -666.418;
// const c = 2.3328 * Math.pow(10, 8);
// const d = 0.000343014;

// const getDateString = uint256 => {
//   const date = new Date(uint256 * 1000);
//   return `${date.toLocaleString('en-us', {
//     month: 'long'
//   })} ${date.getDate()}, ${date.getFullYear()}`;
// };

// const getInfoBlock = (methods, methodsArray) =>
//   Promise.all(methods.map(methodName => methodsArray[methodName]().call()));

class Funding extends PureComponent {
  ws = new WebSocket(wsURL);

  constructor(props) {
    super(props);
    const tempArr = localStorage.getItem('allpin');
    const allPin = JSON.parse(tempArr);
    this.state = {
      groups: [],
      amount: 0,
      allPin,
      atomLeff: 0,
      won: 0,
      currentPrice: 0,
      currentDiscount: 0,
      dataPlot: [],
      dataRewards: [],
      dataAxisRewards: []
    };
  }

  async componentDidMount() {
    run(this.getDataWS);
  }

  getDataWS = () => {
    this.ws.onopen = () => {
      console.log('connected');
    };
    this.ws.onmessage = async evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data);
      console.log('txs', message);
      this.getTableData(message);
      this.getStatistics(message);
      this.getData(message);
      this.getPlot(message);
    };

    this.ws.onclose = () => {
      console.log('disconnected');
      // automatically try to reconnect on connection loss
    };
  };

  getStatistics = async data => {
    // const { data } = this.state;
    // const response = await fetch(url);
    // const data = await response.json();
    let amount = 0;

    await asyncForEach(Array.from(Array(data.length).keys()), async item => {
      amount +=
        Number.parseInt(data[item].tx.value.msg[0].value.amount[0].amount) *
        10 ** -1;
    });
    const atomLeff = ATOMsALL - amount;
    const won = cybWon(amount);
    const currentPrice = won / amount;
    const currentDiscount = funcDiscount(amount);
    // console.log('won', won);
    const statistics = {
      amount,
      atomLeff,
      won,
      currentPrice,
      currentDiscount
    };
    // console.log(currentPrice);
    this.setState({
      amount,
      atomLeff,
      won: Math.floor((won / Math.pow(10, 9)) * 1000) / 1000,
      currentPrice: Math.floor((currentPrice / Math.pow(10, 9)) * 1000) / 1000,
      currentDiscount: Math.floor(currentDiscount * 100 * 1000) / 1000
    });
    return statistics;
  };

  getPlot = async data => {
    const { allPin } = this.state;
    console.log('allPin', allPin);
    const Plot = [];
    const dataAxisRewards = {
      type: 'scatter',
      x: 0,
      y: 0,
      line: {
        width: 2,
        color: '#36d6ae'
      }
    };
  
    await this.getStatistics(data).then(statistics => {
      const { currentPrice, currentDiscount, amount } = statistics;
      const rewards = getRewards(currentPrice, currentDiscount, amount, amount);
      const rewards0 = getRewards(currentPrice, currentDiscount, amount, 0);
      dataAxisRewards.y = [rewards0, rewards];
      dataAxisRewards.x = [0, amount];
      this.setState({
        dataAxisRewards
      });
      Plot.push(dataAxisRewards);
      if (allPin !== null) {
        if (allPin[0] === undefined) {
          this.setState({
            dataRewards: Plot
          });
        }
        let amountAtom = 0;
        allPin.map(itemsG => {
          const { group } = itemsG;

          asyncForEach(Array.from(Array(data.length).keys()), async item => {
            const colorPlot = group.replace(/[^0-9]/g, '').substr(0, 6);
            const tempArrPlot = {
              x: 0,
              y: 0,
              fill: 'tozeroy',
              type: 'scatter',
              line: {
                width: 2,
                color: `#${colorPlot}`
              }
            };
            const address = data[item].tx.value.msg[0].value.from_address;
            const amou =
              Number.parseInt(
                data[item].tx.value.msg[0].value.amount[0].amount
              ) *
              10 ** -1;
            if (address === group) {
              const x0 = amountAtom;
              const y0 = getRewards(currentPrice, currentDiscount, amount, x0);
              amountAtom += amou;
              const x = amountAtom;
              const y = getRewards(
                currentPrice,
                currentDiscount,
                amount,
                amountAtom
              );
              tempArrPlot.x = [x0, x];
              tempArrPlot.y = [y0, y];
              // console.log('dataRewards', tempArr);
              Plot.push(tempArrPlot);
            } else {
              amountAtom +=
                Number.parseInt(
                  data[item].tx.value.msg[0].value.amount[0].amount
                ) *
                10 ** -6;
            }
          });
        });
        this.setState({
          dataRewards: Plot
        });
      } else {
        this.setState({
          dataRewards: Plot
        });
      }
    });
  };

  getTableData = async data => {
    try {
      // const response = await fetch(url);
      // const data = await response.json();

      const table = [];
      let temp = 0;
      let sumtx = 0;
      await asyncForEach(Array.from(Array(data.length).keys()), async item => {
        let estimation = 0;
        const val =
          Number.parseInt(data[item].tx.value.msg[0].value.amount[0].amount) *
          10 ** -1;
        const tempVal = temp + val;
        await this.getStatistics(data).then(statistics => {
          // console.log('statistics.currentPrice', statistics.currentPrice);
          // console.log('statistics.currentDiscount', statistics.currentDiscount);
          // console.log('statistics.amount', statistics.amount);
          // console.log('tempVal', tempVal);
          // console.log('temp', temp);

          estimation =
            getEstimation(
              statistics.currentPrice,
              statistics.currentDiscount,
              statistics.amount,
              tempVal
            ) -
            getEstimation(
              statistics.currentPrice,
              statistics.currentDiscount,
              statistics.amount,
              temp
            );
        });
        temp += val;
        sumtx += estimation;
        table.push({
          txhash: data[item].txhash,
          height: data[item].height,
          from: data[item].tx.value.msg[0].value.from_address,
          amount:
            Number.parseInt(data[item].tx.value.msg[0].value.amount[0].amount) *
            10 ** -1,
          estimation
        });
      });
      // console.log('sumtx', sumtx);
      // console.log(table);
      const groupsV = table.reverse().reduce((obj, item) => {
        obj[item.from] = obj[item.from] || [];
        obj[item.from].push({
          // from: item.from,
          amount: item.amount,
          txhash: item.txhash,
          height: item.height,
          cybEstimation: item.estimation
        });
        return obj;
      }, {});

      const groups = Object.keys(groupsV).map(key => ({
        group: key,
        address: groupsV[key],
        amountСolumn: null,
        cyb: null
      }));
      for (let i = 0; i < groups.length; i++) {
        let sum = 0;
        let sumEstimation = 0;
        for (let j = 0; j <= groups[i].address.length - 1; j++) {
          sum += groups[i].address[j].amount;
          sumEstimation += groups[i].address[j].cybEstimation;
        }
        groups[i].amountСolumn = sum;
        groups[i].cyb = sumEstimation;
      }
      // console.log(groups);
      return this.setState({
        groups
      });
    } catch (error) {
      throw new Error();
    }
  };

  getData = async data => {
    let amount = 0;

    await asyncForEach(Array.from(Array(data.length).keys()), async item => {
      amount +=
        Number.parseInt(data[item].tx.value.msg[0].value.amount[0].amount) *
        10 ** -1;
    });
    const dataPlot = await getDataPlot(amount);
    this.setState({
      dataPlot
    });
  };

  render() {
    const {
      groups,
      atomLeff,
      won,
      currentPrice,
      currentDiscount,
      dataPlot,
      dataAxisRewards,
      dataRewards
    } = this.state;
    // console.log('dataRewards', dataRewards);

    // if (dataRewards[0] === undefined) {
    //   return <Loading />;
    // }
    // console.log(dataPlot);
    return (
      <span>
        <main className="block-body">
          <span className="caption">Cyber~Funding</span>
          <Statistics
            atomLeff={formatNumber(atomLeff)}
            won={formatNumber(won)}
            price={formatNumber(currentPrice)}
            discount={currentDiscount}
          />
          <Dinamics data3d={dataPlot} dataRewards={dataRewards} />
          <Table data={groups} />
        </main>
        <ActionBar />
      </span>
    );
  }
}

export default Funding;
