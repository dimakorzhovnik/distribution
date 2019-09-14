import React from 'react';
import { Indicators, Card, ContainerCard } from '../../components/index';

export const Statistics = ({
  round,
  roundAll,
  timeLeft,
  currentPrice,
  raised,
  cap,
  TOKEN_NAME
}) => (
  <ContainerCard col="5">
    <Indicators title={`${round} of ${roundAll}`} value="Round" />
    <Indicators title={`${raised} ETH`} value="Raised" />
    <Card title={`${currentPrice} ETH/${TOKEN_NAME}`} value="Current price" />
    <Indicators title={`${timeLeft} hour`} value="Left in round" />
    <Indicators title={`${cap} ETH`} value={`${TOKEN_NAME} CAP`} />
  </ContainerCard>
);
