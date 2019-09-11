import React, { Component } from 'react';
import { Indicators, Card, ContainerCard } from '../../components/index';

export class Statistics extends Component {
  render() {
    const {round, roundAll} = this.props;
    return (
      <ContainerCard col='5'>
        <Indicators title={`${round} of ${roundAll}`} value='Round' />
        <Indicators title='15 ETH' value='Raised' />
        <Card title='0.01 ETH/GCYB' value='Current price' />
        <Indicators title='1 hour' value='Left in round' />
        <Indicators title='120 ETH' value='THC CAP' />
      </ContainerCard>
    );
  }
}
