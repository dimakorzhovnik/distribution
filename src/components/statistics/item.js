import React, { Component } from 'react';

export const ContainerCard = ({ children }) => <div className='container-statistics'>{children}</div>;

export const Indicators = ({ title, value }) => (
  <div className='contaiter-indicator'>
    <span className='indicator-title'>{title}</span>
    <span className='indicator-value'>{value}</span>
    {/* <div className='dots' /> */}
  </div>
);

export const Card = ({ title, value }) => (
  <div className='container-card'>
    <span className='card-title'>{title}</span>
    <span className='card-value'>{value}</span>
  </div>
);

export const CardArrow = ({ title, value, win }) => (
  <div className='container-card-arrow'>
    <div className='card-title'>{title}</div>
    <div className={`card-arrow ${win === 'eth' ? 'card-arrow-transfonm-eth' : win === 'atom' ? 'card-arrow-transfonm-atom': ''}`}></div>
    <div className='card-value'>{value}</div>
  </div>
);
