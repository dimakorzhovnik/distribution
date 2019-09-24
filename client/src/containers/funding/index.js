import React, { PureComponent } from 'react';
import { Dinamics } from './dinamics';
import { Statistics } from './statistics';
import { Table } from './table';
import { ActionBar } from './actionBar';
import { asyncForEach, formatNumber, run } from '../../utils/utils';

const url =
  'https://herzner1.cybernode.ai/cyber12psudf4rpaw4jwhuyx3y8sejhsynae7ggvzvy8';

// const getDateString = uint256 => {
//   const date = new Date(uint256 * 1000);
//   return `${date.toLocaleString('en-us', {
//     month: 'long'
//   })} ${date.getDate()}, ${date.getFullYear()}`;
// };

// const getInfoBlock = (methods, methodsArray) =>
//   Promise.all(methods.map(methodName => methodsArray[methodName]().call()));

class Funding extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shares: {},
      tickets: {},
      data: [],
      table: [],
      groups: [],
      deposit: '',
      warning: '',
      schedule: null,
      amount: 0,
      talks: {},
      purchasedTickets: null,
      userHasTicket: false,
      ticket: null
    };
  }

  async componentDidMount() {
    // if (this.props.web3) {
    run(this.getPost);
    run(this.getStatistics);
    run(this.getTableData);

    // Make a request for a user with a given ID
    // run(this.getInfo);
    // run(this.getTicketsInfo);
    // run(this.getShares);
    // run(this.getDeposit);
    // run(this.getSchedule);
    // }
  }

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

  getStatistics = async () => {
    // const { data } = this.state;
    const response = await fetch(url);
    const data = await response.json();
    let amount = 0;

    await asyncForEach(Array.from(Array(data.length).keys()), async item => {
      amount += Number.parseInt(
        data[item].tx.value.msg[0].value.amount[0].amount
      );
    });
    this.setState({
      amount
    });
  };

  getTableData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const table = [];
      await asyncForEach(Array.from(Array(data.length).keys()), async item => {
        table.push({
          // address: ,
          txhash: data[item].txhash,
          height: data[item].height,
          from: data[item].tx.value.msg[0].value.from_address,
          amount: Number.parseInt(
            data[item].tx.value.msg[0].value.amount[0].amount
          )
        });
      });
      const groupsV = table.reduce((obj, item) => {
        obj[item.from] = obj[item.from] || [];
        obj[item.from].push({
          // from: item.from,
          amount: item.amount,
          txhash: item.txhash,
          height: item.height
        });
        return obj;
      }, {});
    
      const groups = Object.keys(groupsV)
        .map(key => ({
          group: key,
          address: groupsV[key],
          amountСolumn: null
      }));
      for (let i = 0; i < groups.length; i++) {
        let sum = 0;
        for (let j = 0; j < groups[i].address.length; j++) {
          sum += groups[i].address[j].amount;
        }
        groups[i].amountСolumn = sum;
      }
      return this.setState({
        groups
      });
    } catch (error) {
      throw new Error();
    }
  };

  getWarning = warning => this.setState({ warning });

  render() {
    const {
      amount,
      groups,
    } = this.state;
    // console.log(groups);
    // console.log(amount);
    return (
      <span>
        <main className="block-body">
          {/* <span className="caption">Game of Links</span> */}
          <Statistics atomLeff={formatNumber(amount)} />
          <Dinamics />
          <Table data={groups} />
        </main>
        <ActionBar />
      </span>
    );
  }
}

export default Funding;
