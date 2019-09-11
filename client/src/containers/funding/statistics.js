import React, { Component } from 'react';
import { Indicators, Card, ContainerCard } from '../../components/index';

export class Statistics extends Component {
  render() {
    return (
      <ContainerCard col='5'>
        <Indicators tooltipValue='info' positionTooltip='bottom' title='70 days' value='Funding ends (?)' />
        <Indicators title='15.01%' value='Current discount' />
        <Card title='600 000' value='ATOMs left' />
        <Indicators title='12 TCYB' value='Won' />
        <Indicators title='0.01 ETH/GCYB' value='Current price' />
      </ContainerCard>
    );
  }
}
