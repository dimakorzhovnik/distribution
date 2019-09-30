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
import { wsURL, ATOMsALL } from '../../utils/config';
import {
  cybWon,
  funcDiscount,
  getEstimation,
  getShares,
  getDataPlot
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
    this.state = {
      groups: [],
      amount: 0,
      atomLeff: 0,
      won: 0,
      currentPrice: 0,
      currentDiscount: 0,
      dataPlot: []
    };
  }

 

  async componentDidMount() {
    // console.log(dataTableJson);
    run(this.getDataWS);
    // console.log(dataJson);

    // this.getTableData(dataJson);
    // this.getStatistics(dataJson);

    // if (this.props.web3) {
    // run(this.getPost);
    // run(this.getStatistics);
    // run(this.getTableData);

    // Make a request for a user with a given ID
    // run(this.getInfo);
    // run(this.getTicketsInfo);
    // run(this.getShares);
    // run(this.getDeposit);
    // run(this.getSchedule);
    // }
  }

  getDataWS = () => {
    this.ws.onopen = () => {
      console.log('connected');
    };
    this.ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data);
      console.log(message);
      this.getTableData(message);
      this.getStatistics(message);
      this.getData(message);
    };

    this.ws.onclose = () => {
      console.log('disconnected');
      // automatically try to reconnect on connection loss
    };
  };

  // async componentDidUpdate(prevProps, prevState) {
  //   if (prevState.schedule !== this.state.schedule) {
  //     run(this.getTalks);
  //   }
  //   if (prevState.tickets !== this.state.tickets) {
  //     run(this.getTicketsArray);
  //   }
  //   if (prevState.purchasedTickets !== this.state.purchasedTickets) {
  //     this.checkUserTicket();
  //   }
  // }
  getPost = async () => {
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      data
    });
  };

  getStatistics = async data => {
    // const { data } = this.state;
    // const response = await fetch(url);
    // const data = await response.json();
    let amount = 0;

    await asyncForEach(Array.from(Array(data.length).keys()), async item => {
      amount +=
        Number.parseInt(data[item].tx.value.msg[0].value.amount[0].amount) /
        Math.pow(10, 6);
    });
    const atomLeff = ATOMsALL - amount;
    const won = cybWon(amount);
    const currentPrice = won / amount;
    const currentDiscount = funcDiscount(amount);
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
      currentDiscount: currentDiscount * 100
    });
    return statistics;
  };

  getTableData = async data => {
    try {
      // const response = await fetch(url);
      // const data = await response.json();
      // console.log(data);

      const table = [];
      await asyncForEach(Array.from(Array(data.length).keys()), async item => {
        table.push({
          // address: ,
          txhash: data[item].txhash,
          height: data[item].height,
          from: data[item].tx.value.msg[0].value.from_address,
          amount:
            Number.parseInt(data[item].tx.value.msg[0].value.amount[0].amount) /
            Math.pow(10, 6)
        });
      });
      const groupsV = table.reduce((obj, item) => {
        obj[item.from] = obj[item.from] || [];
        obj[item.from].push({
          // from: item.from,
          amount: item.amount,
          txhash: item.txhash,
          height: item.height,
          cybEstimation: null
        });
        return obj;
      }, {});

      const groups = Object.keys(groupsV).map(key => ({
        group: key,
        address: groupsV[key],
        amountСolumn: null,
        cyb: null
      }));
      let temp = 0;
      for (let i = 0; i < groups.length; i++) {
        let sum = 0;
        let estimation = 0;
        let sumEstimation = 0;
        for (let j = 0; j <= groups[i].address.length - 1; j++) {
          const val = groups[i].address[j].amount;
          const tempVal = temp + val;
          sum += groups[i].address[j].amount;
          await this.getStatistics(data).then(statistics => {
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
          sumEstimation += estimation;
          groups[i].address[j].cybEstimation = estimation;
        }
        groups[i].amountСolumn = sum;
        groups[i].cyb = sumEstimation;
      }
      console.log(groups);
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
        Number.parseInt(data[item].tx.value.msg[0].value.amount[0].amount) /
        Math.pow(10, 6);
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
      dataPlot
    } = this.state;
    // console.log(groups);
    console.log(dataPlot);
    return (
      <span>
        <main className="block-body">
          {/* <span className="caption">Game of Links</span> */}
          <Statistics
            atomLeff={formatNumber(atomLeff)}
            won={formatNumber(won)}
            price={formatNumber(currentPrice)}
            discount={currentDiscount}
          />
          <Dinamics data3d={dataPlot} />
          <Table data={groups} />
        </main>
        <ActionBar />
      </span>
    );
  }
}

export default Funding;
