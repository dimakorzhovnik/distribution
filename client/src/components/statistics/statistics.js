import React, { Component } from 'react';
import { Indicators, Card, ContainerCard, CardArrow } from './item';

export class Statistics extends Component {
  render() {
    return (
      <ContainerCard col='5'>
        <Indicators title='0.01' value='ETH/CYB' />
        <Indicators title='11 ETH' value='Raised' />
        <CardArrow win={this.props.win} title="70%" value="Opportunity" />
        <Indicators title='15 ATOMs' value='Raised' />
        <Indicators title='0.01' value='ATOM/CYB' />
      </ContainerCard>
    );
  }
}
