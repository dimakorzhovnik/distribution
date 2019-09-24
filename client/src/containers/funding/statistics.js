import React, { Component } from 'react';
import { Indicators, Card, ContainerCard } from '../../components/index';

export const Statistics = ({ atomLeff }) => (
  <ContainerCard styles={{ alignItems: 'center' }} col="5">
    <Indicators
      tooltipValue="info"
      positionTooltip="bottom"
      title="70 days"
      value="Funding ends (?)"
    />
    <Indicators title="15.01%" value="Current discount" />
    <Card title={atomLeff} value="ATOMs left" />
    <Indicators title="12 TCYB" value="Won" />
    <Indicators title="0.01 ETH/GCYB" value="Current price" />
  </ContainerCard>
);
