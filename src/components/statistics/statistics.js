import React, { Component } from 'react';
import { Indicators, Card, Container } from './item';

export class Statistics extends Component {
  render() {
    return (
      <Container>
        <Indicators title='15%' value='Current discount' />
        <Card title='600 000' value='ATOMs left' />
        <Indicators title='12%' value='Cyb won' />
      </Container>
    );
  }
}
