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

class Got extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wins: '',
      ATOMsRaised: 0,
      ETHRaised: 0
    };
  }

  async componentDidMount() {
    // if (this.props.web3) {
    run(this.getStatisticsAtom);
    run(this.getStatisticsETH);
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

    // await asyncForEach(
    //   Array.from(Array(dailyTotalsUtils.length).keys()),
    //   async item => {
    //     const dt = dailyTotalsUtils[item];
    //     raised += parseFloat(dt) / Math.pow(10, 18);
    //   });
    this.setState({
      ETHRaised: Math.floor((dailyTotals / Math.pow(10, 18)) * 1000) / 1000
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
    const { wins, ATOMsRaised, ETHRaised } = this.state;
    return (
      <span>
        <button onClick={this.onClikWinAtom}>atom</button>
        <button onClick={this.onClikWinEth}>eth</button>
        <main className="block-body">
          {/* <span className="caption">Game of Thrones</span> */}
          <Statistics
            win={wins}
            ATOMsRaised={formatNumber(ATOMsRaised)}
            ETHRaised={formatNumber(ETHRaised)}
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
