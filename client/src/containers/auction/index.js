import React, { PureComponent } from 'react';
import withWeb3 from '../../components/web3/withWeb3';


// import {
//   Nums,
//   WhatWhereWhen,
//   Ticket,
//   ApplyForm,
//   Shares,
//   TalksAgenda,
//   BuyButton,
//   ConfirmButton,
//   Dots,
//   Dinamics,
//   Statistics,
//   Table,
//   ActionBar,
//   Timer
// } from './components';

import { Statistics } from './statistics';
import { ActionBar } from './actionBar';
import { Dinamics } from './dinamics';
import { Table } from './table';


// const getDateString = uint256 => {
//   const date = new Date(uint256 * 1000);
//   return `${date.toLocaleString('en-us', {
//     month: 'long'
//   })} ${date.getDate()}, ${date.getFullYear()}`;
// };

// const getInfoBlock = (methods, methodsArray) =>
//   Promise.all(methods.map(methodName => methodsArray[methodName]().call()));

const run = async func => {
  try {
    await func();
  } catch (error) {
    setTimeout(run, 1000, func);
  }
};

class Auction extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shares: {},
      tickets: {},
      data: {},
      deposit: '',
      warning: '',
      schedule: null,
      talks: {},
      purchasedTickets: null,
      userHasTicket: false,
      ticket: null,
      dataTable: [],
      roundThis: '4   ',
      rounds: 60
    };
  }

  async componentDidMount() {
    // if (this.props.web3) {
    // run(this.getInfo);
    // run(this.getTicketsInfo);
    // run(this.getShares);
    // run(this.getDeposit);
    // run(this.getSchedule);
      run(this.statistics);
      // run(this.dataTable);
    // console.log(this.props.contract);
    // console.log(this.props.accounts);
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

  // getInfo = async () => {
  //   try {
  //     const {contract: { methods: methodsArray }} = this.props;
  //     const methods = ['getPlace', 'getEventStartTime'];
  //     const [place, rawStartTime] = await getInfoBlock(methods, methodsArray);
  //     const startTime = getDateString(rawStartTime);
  //     if (!place || !rawStartTime) {
  //       throw new TypeError('invalid value');
  //     }
  //     const data = {
  //       place,
  //       startTime
  //     };
  //     return this.setState({ data });
  //   } catch (error) {
  //     throw new Error();
  //   }
  // };

  // getTicketsInfo = async () => {
  //   try {
  //     const {contract: { methods: methodsArray }} = this.props;
  //     const methods = ['getCurrentPrice', 'getTicketsAmount'];
  //     const [rawPrice, amount] = await getInfoBlock(methods, methodsArray);
  //     const price = this.props.web3.utils.fromWei(rawPrice);
  //     if (!rawPrice || !amount) {
  //       throw new TypeError('invalid value');
  //     }
  //     const tickets = {
  //       price,
  //       amount
  //     };
  //     return this.setState({ tickets });
  //   } catch (error) {
  //     throw new Error();
  //   }
  // };

  // getTicketsIDArray = () => {
  //   const { tickets } = this.state;
  //   if (tickets.amount) {
  //     const N = 146 - tickets.amount;
  //     return Array.from(Array(N), (_, x) => x);
  //   }
  // };

  // getTicketsArray = async () => {
  //   const ids = this.getTicketsIDArray();
  //   const {contract: { methods }} = this.props;
  //   try {
  //     const tickets = await Promise.all(
  //       ids.map(ticketId => methods.getTicket(ticketId).call())
  //     );
  //     return this.setState({ purchasedTickets: tickets });
  //   } catch (e) {
  //     throw new Error();
  //   }
  // };

  // setTicket = account => {
  //   const { purchasedTickets } = this.state;
  //   const isPur = purchasedTickets.findIndex(
  //     ticket => ticket[1].toLowerCase() === account.toLowerCase()
  //   );
  //   // eslint-disable-next-line
  //   if (~isPur) {
  //     this.setState({
  //       userHasTicket: true,
  //       ticket: { id: isPur, buyer: account }
  //     });
  //   }
  // };

  // checkUserTicket = async () => {
  //   const { web3 } = this.props;
  //   if (window.ethereum) {
  //     try {
  //       const accounts = await window.ethereum.enable();
  //       if (accounts.length) {
  //         this.setTicket(accounts[0]);
  //       }
  //     } catch (error) {
  //       this.getWarning('You declined transaction', error);
  //     }
  //   } else if (window.web3) {
  //     const accounts = await web3.eth.getAccounts();
  //     if (accounts.length) {
  //       this.setTicket(accounts[0]);
  //     }
  //   } else this.setState({ userHasTicket: false, ticket: null });
  // };

  // getShares = async () => {
  //   try {
  //     const {contract: {methods: methodsArray}} = this.props;
  //     const methods = [
  //       'getSpeakersShares',
  //       'getOrganizersShares',
  //       'getTicketsFunds'
  //     ];
  //     const [speakers, organizers, rawFunds] = getInfoBlock(
  //       methods,
  //       methodsArray
  //     );
  //     const funds = this.props.web3.utils.fromWei(rawFunds);

  //     if (!speakers || !organizers || !rawFunds) {
  //       throw new TypeError('invalid value');
  //     }
  //     const shares = {
  //       speakers,
  //       organizers,
  //       funds
  //     };
  //     return this.setState({ shares });
  //   } catch (e) {
  //     throw new Error();
  //   }
  // };

  // getDeposit = async () => {
  //   try {
  //     const {contract: { methods }} = this.props;
  //     const weiDeposit = await methods.getMinimalSpeakerDeposit().call();
  //     const deposit = this.props.web3.utils.fromWei(weiDeposit);
  //     return this.setState({ deposit });
  //   } catch (e) {
  //     throw new Error();
  //   }
  // };

  // getSchedule = async () => {
  //   try {
  //     const {contract: { methods }} = this.props;
  //     const schedule = await methods.getTalksGrid().call();
  //     if (!schedule) {
  //       throw new TypeError('invalid value');
  //     }
  //     return this.setState({ schedule });
  //   } catch (e) {
  //     throw new Error();
  //   }
  // };

  // getTalks = async () => {
  //   const {contract: { methods }} = this.props;
  //   const { schedule } = this.state;
  //   const scheduleArray = schedule.split(',');
  //   try {
  //     const talksRaw = await Promise.all(
  //       scheduleArray.map(talkId => methods.getTalkById(talkId).call())
  //     );
  //     if (!talksRaw) throw new TypeError('invalid value');
  //     const talks = talksRaw.map(t => ({
  //       speakerNickname: t[0],
  //       speakerName: t[1],
  //       topic: t[2],
  //       duration: t[3]
  //     }));
  //     this.setState({ talks });
  //   } catch (e) {
  //     throw new Error();
  //   }
  // };

  statistics = async () => {
    const {
      contract: { methods }
    } = this.props;
    const roundThis = await methods.today().call();
    return this.setState({
      roundThis
    });
  };

  // userBuysEth = async i => {
  //   try {
  //     const {
  //       contract: { methods },
  //       accounts
  //     } = this.props;
  //     const userBuysEth = await methods.userBuys(i, accounts).call();
  //     if (!userBuysEth) {
  //       throw new TypeError('invalid value');
  //     }
  //     return userBuysEth;
  //   } catch (e) {
  //     throw new Error();
  //   }
  //   // const {
  //   //   contract: { methods },
  //   //   accounts
  //   // } = this.props;
  //   // const userBuysEth = await methods.userBuys(i, accounts).call();
  //   // return userBuysEth;
  // };

  // dataTable = async () => {
  //   // const { dataTable } = this.state;
  //   // try {
  //   const {
  //     contract: { methods },
  //     accounts
  //   } = this.props;

  //   const arr = [];

  //   // const data = await methods.dailyTotals()().call();

  //   // debugger;
  //   for (let i = 0; i < 60; i++) {
  //     const obj = {};
  //     obj.round = i;
  //     obj.result = i;
  //     obj.priceEth = i;
  //     obj.dailyTotals = methods.dailyTotals(i).call();
  //     obj.userBuysEth =  this.userBuysEth(i);

  //     arr.push(obj);
  //   }
  //   this.setState({
  //     dataTable: arr
  //   });
  //   console.log(arr);
  //   // const today = await methods.today().call();
  //   // const userBuys = await methods.userBuys(today, accounts).call();
  //   // const dailyTotals = await methods.dailyTotals(today).call();

  //   // const userBuysEth = userBuys / Math.pow(10, 18);
  //   // if (!data) {
  //   //   throw new TypeError('invalid value');
  //   // }
  //   // const round = '';
  //   const priceEth = '';
  //   // const result = '';
  //   const userBuysEth = '';
  //   // result: '',
  //   // priceEth: '',
  //   // userBuysEth: ''
  //   // const dataTable = {
  //   //   round,
  //   //   priceEth,
  //   //   dailyTotals,
  //   //   result,
  //   //   userBuysEth
  //   // };

  //   // return this.setState({
  //   //   dataTable
  //   // });
  //   // } catch (e) {
  //   //   throw new Error();
  //   // }
  // };

  getWarning = warning => this.setState({ warning });

  render() {
    const {
      data,
      tickets,
      shares,
      warning,
      deposit,
      talks,
      userHasTicket,
      purchasedTickets,
      thisRound,
      // dataTable,
      roundThis,
      rounds
    } = this.state;

    const dataTable = [
      {
      round: '1',
      result: '23.000000',
      priceEth: '4',
      userBuysEth: '0',
    },
    {
      round: '2',
      result: '23.000000',
      priceEth: '4',
      userBuysEth: '0',
    },
    {
      round: '3',
      result: '23.000000',
      priceEth: '4',
      userBuysEth: '0',
    },
    {
      round: '4',
      result: '23.000000',
      priceEth: '4',
      userBuysEth: '0',
    },
  ]

    // this.dataTable();
    // console.log(dataTable);
    return (
      <span>
        <main className="block-body">
          {/* <span className="caption">Game of Links</span> */}
          <Statistics round={roundThis} roundAll={rounds} />
          <Dinamics />
          <Table data={dataTable} />
        </main>
        <ActionBar />
      </span>
    );
  }
}

export default Auction;
