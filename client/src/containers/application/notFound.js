import React, { PureComponent } from 'react';

export const NotFound = ({ text }) => (
  <div className="container-notFound">
    <div className="clontainer-vitalik">
      <div className="vitalik-oval-1" />
      <div className="vitalik-oval-2" />
    </div>
    <span className="text-notFound">{text}</span>
  </div>
);
