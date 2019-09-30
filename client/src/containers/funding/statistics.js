import React, { Component } from 'react';
import { Indicators, Card, ContainerCard } from '../../components/index';

export const Statistics = ({ atomLeff, won, price, discount }) => (
  <ContainerCard styles={{ alignItems: 'center' }} col="5">
    <Indicators
      tooltipValue="info"
      positionTooltip="bottom"
      title="70 days"
      value="Funding ends (?)"
    />
    <Indicators title="Current discount, %" value={discount} />
    <Card title="ATOMs left" value={atomLeff} />
    <Indicators title="Won, GCYBs" value={won} />
    <Indicators title="Current price, GCYBs/ATOM" value={price} />
  </ContainerCard>
);
