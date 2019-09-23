import React, { Component } from 'react';
import {Speedometer} from '../../containers/got/speedometer';

const vitalik = require('../../image/vitalik.png');
const jae = require('../../image/jae.png');

const Crown = () => <div className="crown" />;

const CrownJae = () => <div className="crown-jae" />;

export class Container extends Component {
  render() {
    const { win, arow, diff } = this.props;
    return (
      <div className="container">
        <div className={`vitalik ${win === 'eth' ? 'win-opacity' : ''}`}>
          {win === 'eth' && <Crown />}
          <img src={vitalik} />
        </div>
        {/* <div>{diff}</div> */}
        <Speedometer arow={arow} />
        <div className={`jae ${win ==='atom' ? 'win-opacity' : ''}`}>
          {win === 'atom' && <CrownJae />}
          <img src={jae} />
        </div>
      </div>
    );
  }
}
