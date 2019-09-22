import React, { PureComponent } from 'react';
import withWeb3 from '../../components/web3/withWeb3';
import {
  Nums,
  WhatWhereWhen,
  Ticket,
  ApplyForm,
  Shares,
  TalksAgenda,
  BuyButton,
  ConfirmButton,
  Dots,
  Dinamics,
  Statistics,
  Table,
  ActionBar,
  SeeSaw,
  Container,
  Card,
  ContainerCard,
  Timer,
  CardArrow
} from '../../components';
import { asyncForEach, formatNumber, run } from '../../utils/utils';

const url =
  'https://herzner1.cybernode.ai/cyber12psudf4rpaw4jwhuyx3y8sejhsynae7ggvzvy8';

const currenciesUrl =
  'https://api.coingecko.com/api/v3/simple/price?ids=cosmos&vs_currencies=eth';

class Got extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wins: '',
      ATOMsRaised: 0,
      ETHRaised: 0,
      course: 0
    };
  }

  async componentDidMount() {
    // if (this.props.web3) {
    run(this.getStatisticsAtom);
    run(this.getStatisticsETH);
    run(this.getArbitrage);
    // }
  }

  getStatisticsAtom = async () => {
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
      ATOMsRaised: amount
    });
  };

  getStatisticsETH = async () => {
    const {
      contract: { methods }
    } = this.props;

    const dailyTotals = await methods.dailyTotals(59).call();
    this.setState({
      ETHRaised: Math.floor((dailyTotals / Math.pow(10, 18)) * 1000) / 1000
    });
  };

  getArbitrage = async () => {
    const {
      contract: { methods }
    } = this.props;

    const dailyTotals = await methods.dailyTotals(59).call();
    const currencies = await fetch(currenciesUrl);
    const course = await currencies.json();
    const response = await fetch(url);
    const dataAtom = await response.json();
    let amount = 0;

    await asyncForEach(
      Array.from(Array(dataAtom.length).keys()),
      async item => {
        amount += Number.parseInt(
          dataAtom[item].tx.value.msg[0].value.amount[0].amount
        );
      }
    );
    const atomETH =
      (Math.floor((amount / Math.pow(10, 12)) * 1000) / 1000) *
      course.cosmos.eth;
    const eth = Math.floor((dailyTotals / Math.pow(10, 18)) * 1000) / 1000;

    console.log(1 - (atomETH / eth));

    this.setState({
      course: course.cosmos.eth
    });
  };

  onClikWinAtom = () => {
    this.setState({
      wins: 'atom'
    });
  };

  onClikWinEth = () => {
    this.setState({
      wins: 'eth'
    });
  };

  getWarning = warning => this.setState({ warning });

  render() {
    const { wins, ATOMsRaised, ETHRaised, course } = this.state;
    console.log(course);
    const cyb = 100 * Math.pow(10, 12);
    return (
      <span>
        <button onClick={this.onClikWinAtom}>atom</button>
        <button onClick={this.onClikWinEth}>eth</button>
        <main className="block-body">
          {/* <span className="caption">Game of Thrones</span> */}
          <Statistics
            firstLeftTitle="ETH/CYB"
            firstLeftValue={formatNumber((ETHRaised * Math.pow(10, 18)) / cyb)}
            secondLeftTitle="Raised, ETH"
            secondLeftValue={formatNumber(ETHRaised)}
            // centerCardTitle=''
            // centerCardValue=''
            secondRightTitle="Raised, ATOMs"
            secondRightValue={formatNumber(
              Math.floor((ATOMsRaised / Math.pow(10, 12)) * 1000) / 1000
            )}
            firstRightTitle="ATOM/CYB"
            firstRightValue={formatNumber(ATOMsRaised / cyb)}
            // win={wins}
            // ATOMsRaised={formatNumber(ATOMsRaised)}
            // ETHRaised={formatNumber(ETHRaised)}
          />
          {/* <span className="chapter">
            <a>Ends in</a>
          </span> */}
          {/* <div className="container-timer">
            <Timer />
          </div> */}

          <Container win={wins} />
          <SeeSaw win={wins} />
          <ContainerCard>
            <div className="container-text">
              <div className="paragraph">
                Get <a>THC</a> and participate <br /> in foundation
              </div>
              <div className="paragraph">Get 10% of CYBs for ETH</div>
            </div>
            <div className="container-text">
              <div className="paragraph">
                Don't Get <a>THC</a>
              </div>
              <div className="paragraph">Get 10% of CYBs for ATOM</div>
            </div>
          </ContainerCard>
        </main>
        <ActionBar />
      </span>
    );
  }
}

export default withWeb3(Got);
