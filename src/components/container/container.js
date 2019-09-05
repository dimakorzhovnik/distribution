import React, { Component } from 'react';

const vitalik = require('../../img/vitalik.png');
const jae = require('../../img/jae.png');

const Crown = () => <div className="crown" />;

const CrownJae = () => <div className="crown-jae" />;

export class Container extends Component {
  render() {
    const { win } = this.props;
    return (
      <div className="container">
        <div className={`vitalik ${win === 'eth' ? 'win-opacity' : ''}`}>
          {win === 'eth' && <Crown />}
          <img src={vitalik} />
        </div>
        <div className={`jae ${win ==='atom' ? 'win-opacity' : ''}`}>
          {win === 'atom' && <CrownJae />}
          <img src={jae} />
        </div>
      </div>
    );
  }
}
