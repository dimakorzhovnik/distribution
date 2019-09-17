import React, { Component } from 'react';
import { Tooltip } from '../index';

export const ContainerCard = ({ children, col }) => <div style={{gridTemplateColumns: `repeat(${col}, 1fr)`}} className='container-statistics'>{children}</div>;

export const Indicators = ({ title, value, tooltipValue, positionTooltip }) => (
  <Tooltip placement={positionTooltip} tooltip={tooltipValue}>
    <div className="contaiter-indicator">
      <span className="indicator-title">{title}</span>
      <span className="indicator-value">{value}</span>
      {/* <div className='dots' /> */}
    </div>
  </Tooltip>
);

export const Card = ({ title, value, tooltipValue, positionTooltip }) => (
  <Tooltip placement={positionTooltip} tooltip={tooltipValue}>
    <div className='container-card'>
      <span className='card-title'>{title}</span>
      <span className='card-value'>{value}</span>
    </div>
  </Tooltip>
);

export const CardArrow = ({ title, value, win }) => (
  <div className='container-card-arrow'>
    <div className={`card-title ${win === 'eth' ? 'eth' : 'atom'}`}>
      {title}
      <div className={`card-arrow ${win === 'eth' ? 'card-arrow-transfonm-eth' : 'card-arrow-transfonm-atom'}`} />
    </div>
    <div className='card-value'>{value}</div>
  </div>
);
