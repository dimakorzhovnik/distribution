import React, { Component } from 'react';

export const Container = ({ children }) => <div className='container-statistics'>{children}</div>;

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
