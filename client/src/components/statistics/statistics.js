import React, { Component } from 'react';
import { Indicators, Card, ContainerCard, CardArrow } from './item';

export class Statistics extends Component {
  render() {
    const { ATOMsRaised, ETHRaised } = this.props;
    return (
      <ContainerCard col='5'>
        <Indicators title='0.01' value='ETH/CYB' />
        <Indicators title={ETHRaised} value='Raised, ETH' />
        <CardArrow win={this.props.win} title="70%" value="Opportunity" />
        <Indicators title={ATOMsRaised} value='Raised, ATOMs' />
        <Indicators title='0.01' value='ATOM/CYB' />
      </ContainerCard>
    );
  }
}
