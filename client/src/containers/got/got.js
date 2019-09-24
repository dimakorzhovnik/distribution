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
import {
  asyncForEach,
  formatNumber,
  roundNumber,
  run
} from '../../utils/utils';

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
      difference: {},
      arow: 0
    };
  }

  async componentDidMount() {
    const {
      contract: { methods },
      accounts,
      web3
    } = this.props;
    run(this.getEthAtomCourse);
    run(this.getStatistics);
    run(this.getArbitrage);

    const subscription = web3.eth.subscribe(
      'logs',
      {
        address: '0x6c9c39d896b51e6736dbd3da710163903a3b091b',
        topics: [
          '0xe054057d0479c6218d6ec87be73f88230a7e4e1f064cee6e7504e2c4cd9d6150'
        ]
      },
      (error, result) => {
        if (!error) console.log(result);
        if (
          result.data.indexOf(
            accounts[0].toLowerCase().substr(2, accounts[0].length)
          ) !== -1
        ) {
          run(this.getEthAtomCourse);
          run(this.getStatistics);
          run(this.getArbitrage);
        }
      }
    );
    // unsubscribes the subscription
    subscription.unsubscribe((error, success) => {
      if (success) console.log('Successfully unsubscribed!');
    });
  }

  getEthAtomCourse = async () => {
    const {
      contract: { methods }
    } = this.props;
    const dailyTotals = await methods.dailyTotals(59).call();
    let ETHRaised = 0;
    let ATOMsRaised = 0;

    ETHRaised = Math.floor((dailyTotals / Math.pow(10, 18)) * 1000) / 1000;
    const response = await fetch(url);
    const data = await response.json();
    asyncForEach(Array.from(Array(data.length).keys()), async item => {
      ATOMsRaised += Number.parseInt(
        data[item].tx.value.msg[0].value.amount[0].amount
      );
    });
    const currencies = await fetch(currenciesUrl);
    const course = await currencies.json();
    const raised = {
      ATOMsRaised,
      ETHRaised,
      course
    };
    return raised;
  };

  getStatistics = async () => {
    const cyb = 10 * Math.pow(10, 4);
    let AtomEthRaised = 0;
    let ethRaised = 0;
    this.getEthAtomCourse().then(result => {
      this.setState({
        ETHRaised: result.ETHRaised,
        ATOMsRaised: result.ATOMsRaised
      });
      AtomEthRaised = roundNumber(
        (result.ATOMsRaised / Math.pow(10, 12) / cyb) *
          result.course.cosmos.eth,
        7
      );
      ethRaised = roundNumber(result.ETHRaised / cyb, 7);
      if (ethRaised > AtomEthRaised) {
        this.setState({
          difference: {
            win: 'atom',
            diff: ethRaised / AtomEthRaised
          }
        });
      } else {
        this.setState({
          difference: {
            win: 'eth',
            diff: AtomEthRaised / ethRaised
          }
        });
      }
    });
  };

  getArbitrage = () => {
    let ethRaised = 0;
    let AtomRaised = 0;
    let arow = 0;
    let win = '';
    this.getEthAtomCourse().then(result => {
      ethRaised = roundNumber(result.ETHRaised, 7);
      AtomRaised = roundNumber(
        (result.ATOMsRaised / Math.pow(10, 12)) * result.course.cosmos.eth,
        7
      );
      if (ethRaised > AtomRaised) {
        arow = -1 * (1 - AtomRaised / ethRaised) * 90;
        win = 'eth';
      } else {
        arow = (1 - ethRaised / AtomRaised) * 90;
        win = 'atom';
      }
      this.setState({
        arow,
        win
      });
    });
  };

  render() {
    const { ATOMsRaised, ETHRaised, difference, arow, win } = this.state;
    const cyb = 10 * Math.pow(10, 4);
    return (
      <span>
        <main className="block-body">
          {/* <span className="caption">Game of Thrones</span> */}
          <Statistics
            firstLeftTitle="ETH/CYB"
            firstLeftValue={roundNumber(ETHRaised / cyb, 6)}
            secondLeftTitle="Raised, ETH"
            secondLeftValue={formatNumber(ETHRaised)}
            // centerCardTitle=''
            // centerCardValue=''
            secondRightTitle="Raised, ATOMs"
            secondRightValue={formatNumber(
              Math.floor((ATOMsRaised / Math.pow(10, 12)) * 1000) / 1000
            )}
            firstRightTitle="ATOM/CYB"
            firstRightValue={roundNumber(
              ATOMsRaised / Math.pow(10, 12) / cyb,
              6
            )}
          />
          <Container
            win={win}
            diff={roundNumber(difference.diff, 2)}
            arow={arow}
          />
          <ContainerCard>
            <div className="container-text">
              {/* <div className="paragraph">
                Get <a>THC</a> and participate <br /> in foundation
              </div>
              <div className="paragraph">Get 10% of CYBs for ETH</div> */}
              {difference.win === 'eth' && (
                <div className="difference-container">
                  <div className="difference-container-value">
                    {roundNumber(difference.diff, 2)} x
                  </div>
                  <span className="difference-container-text">
                    more profitable now
                  </span>
                </div>
              )}
            </div>
            <div className="container-text">
              {/* <div className="paragraph">
                Don't Get <a>THC</a>
              </div>
              <div className="paragraph">Get 10% of CYBs for ATOM</div> */}
              {difference.win === 'atom' && (
                <div className="difference-container">
                  <div className="difference-container-value">
                    {roundNumber(difference.diff, 2)} x
                  </div>
                  <span className="difference-container-text">
                    more profitable now
                  </span>
                </div>
              )}
            </div>
          </ContainerCard>
        </main>
        <ActionBar />
      </span>
    );
  }
}

export default withWeb3(Got);
