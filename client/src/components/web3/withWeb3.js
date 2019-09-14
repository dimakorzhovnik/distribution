import React, { PureComponent } from 'react';
import waitForWeb3 from './waitForWeb3';
import { abi } from '../../utils/abi';
import AuctionUtils from '../../../../build/contracts/AuctionUtils.json';

const injectWeb3 = InnerComponent =>
  class extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        web3: null,
        contract: null,
        loading: true,
        accounts: null,
        contractAuctionUtils: null
      };
      this.getWeb3 = this.getWeb3.bind(this);
      this.smart = '0x6C9c39D896B51e6736DBd3dA710163903A3B091B';
      this.smartAuctionUtils = '0x303Fb6bA398F2039b3AE56AB472D80839463E7dF';

    }

    componentDidMount() {
      window.ethereum.enable();
      this.getWeb3().then(() => this.setState({ loading: false }));
    }

    async getWeb3() {
      try {
        const web3 = await waitForWeb3();
        const contract = await new web3.eth.Contract(abi, this.smart);
        const contractAuctionUtils = await new web3.eth.Contract(
          AuctionUtils.abi,
          this.smartAuctionUtils
        );
        // console.log(contract);
        const accounts = await web3.eth.getAccounts();
        this.setState({
          web3,
          contract,
          contractAuctionUtils,
          accounts: accounts[0]
        });
      } catch (e) {
        this.setState({ loading: false });
      }
    }

    render() {
      const {
        web3,
        contract,
        loading,
        accounts,
        contractAuctionUtils
      } = this.state;
      if (loading) {
        return <p>...</p>;
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
