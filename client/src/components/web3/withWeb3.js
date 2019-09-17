import React, { PureComponent } from 'react';
import waitForWeb3 from './waitForWeb3';
import { abi } from '../../utils/abi';
import Auction from '../../../../build/contracts/Auction.json';
import AuctionUtils from '../../../../build/contracts/AuctionUtils.json';
import { Loading } from '../index';
import { NotFound } from '../../containers/application/notFound';

const networksIds = {
  42: 'kovan',
  1: 'main',
  5777: 'TestNet',
  4: 'rinkeby'
};

const injectWeb3 = InnerComponent =>
  class extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        web3: null,
        contract: null,
        loading: true,
        accounts: null,
        networkId: null,
        isCorrectNetwork: true,
        contractAuctionUtils: null
      };
      this.getWeb3 = this.getWeb3.bind(this);
      this.smart = '0x6C9c39D896B51e6736DBd3dA710163903A3B091B';
      this.smartAuctionUtils = '0x303Fb6bA398F2039b3AE56AB472D80839463E7dF';
    }

    componentDidMount() {
      this.getWeb3().then(() => this.setState({ loading: false }));
    }

    async getWeb3() {
      await window.ethereum.enable();
      try {
        const web3 = await waitForWeb3();
        const contract = await new web3.eth.Contract(abi, this.smart);
        const contractAuctionUtils = await new web3.eth.Contract(
          AuctionUtils.abi,
          this.smartAuctionUtils
        );
        const networkContract = Object.keys(Auction.networks);
        const networkId = await web3.eth.net.getId();
        const accounts = await web3.eth.getAccounts();
        this.setState({
          web3,
          contract,
          contractAuctionUtils,
          accounts: accounts[0],
          networkId,
          isCorrectNetwork: networkContract.indexOf(`${networkId}`) !== -1
        });
      } catch (e) {
        this.setState({ loading: false });
      }
    }

    // checkNetwork = () =>
    //   new Promise(resolve => {
    //     this.getWeb3.then(({ web3 }) => {
    //       web3.version.getNetwork((err, netId) => {
    //         console.log(netId);

    //         resolve({
    //           networkId: netId
    //         });
    //       });
    //     });
    //   });

    render() {
      const {
        web3,
        contract,
        loading,
        accounts,
        contractAuctionUtils,
        isCorrectNetwork
      } = this.state;

      if (!isCorrectNetwork) {
        return (
          <NotFound text="Please connect to the Ethereum Rinkeby Network" />
        );
      }
      if (loading) {
        return (
          <div
            style={{
              width: '100%',
              height: '50vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Loading />
          </div>
        );
      }

      return (
        <InnerComponent
          web3={web3}
          contract={contract}
          accounts={accounts}
          contractAuctionUtils={contractAuctionUtils}
          {...this.props}
        />
      );
    }
  };

export default injectWeb3;
