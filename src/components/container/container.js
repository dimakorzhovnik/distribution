import React, { Component } from 'react';
const vitalik = require('../../img/vitalik.png');
const jae = require('../../img/jae.png');

const Crown = () => (
  <div className="crown">
</div>
)

const CrownJae = () => (
  <div className="crown crown-jae">
    <div className="point"></div>
    <div className="point"></div>
    <div className="point"></div>
    <div className="point"></div>
    <div className="point"></div>
</div>
)

export class Container extends Component {
  render() {
    return (
      <div className="container">
        <div className='vitalik'>
        <Crown />
          <img src={vitalik} />
        </div>
        <div className='jae'>
        {/* <CrownJae /> */}
          <img src={jae} />
        </div>
      </div>
    );
  }
}
