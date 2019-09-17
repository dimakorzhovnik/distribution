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
    <Indicators
      title={`${round} of ${roundAll}`}
      value="Round"
      tooltipValue="The current round of total number in the Auction"
      positionTooltip="bottom"
    />
    <Indicators
      title={`${raised} ETH`}
      value="Raised"
      tooltipValue="The number of total ETH raised currently"
      positionTooltip="bottom"
    />
    <Card
      title={`${currentPrice} ETH/G${TOKEN_NAME}`}
      value="Current price"
      tooltipValue="The current price ETH/GOL calculated according to the current round"
      positionTooltip="bottom"
    />
    <Indicators
      title={`${timeLeft} hour`}
      value="Left in round"
      tooltipValue="Time left in the current round closing"
      positionTooltip="bottom"
    />
    <Indicators
      title={`${cap} ETH`}
      value={`${TOKEN_NAME} CAP`}
      tooltipValue="GOL market cap in ETH"
      positionTooltip="bottom"
    />
  </ContainerCard>
);
