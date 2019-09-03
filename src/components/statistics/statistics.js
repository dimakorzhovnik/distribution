import React, { Component } from 'react';
import { Indicators, Card, Container } from './item';

export class Statistics extends Component {
  render() {
    return (
      <Container>
        <Indicators title='1 of 90' value='Raund' />
        <Indicators title='10%' value='Faund left' />
        <Card title='0.01 GCYB' value='Current price' />
        <Indicators title='15 ETH' value='Current discount' />
        <Indicators title='120 THC' value='CAP' />
      </Container>
    );
  }
}
