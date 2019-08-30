import React, { Component } from 'react';
import Plotly from 'react-plotly.js';
import { x, y, z } from './list';

export class Dinamics extends Component {
  render() {
    const layout = {
      paper_bgcolor: '#000',
      plot_bgcolor: '#000',
      hoverlabel: { bgcolor: '#fff' },
      scene: {
        yaxis: {
          gridcolor: '#fff',
          color: '#fff',
          tickfont: {
            color: '#36d6ae'
          }
        },
        xaxis: {
          gridcolor: '#fff',
          color: '#fff',
          tickfont: {
            color: '#36d6ae'
          },
          zeroline: false
        },
        zaxis: {
          gridcolor: '#fff',
          color: '#fff',
          tickfont: {
            color: '#36d6ae'
          },
          zeroline: false
        },
        aspectratio: {
          x: 2,
          y: 1,
          z: 1
        },
        camera: {
          center: {
            x: 0,
            y: 0,
            z: 0
          },
          eye: {
            x: 1.5,
            y: 1.25,
            z: 2
          },
          up: {
            x: 0,
            y: 1,
            z: 0
          }
        }
      },
      // width: 550,
      // height: 500,
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        pad: 4
      }
    };
    return (
      <Plotly
        data={[
          {
            type: 'scatter3d',
            mode: 'lines',
            x,
            y,
            z,
            line: {
              width: 6,
              color: '#36d6ae'
            },
            hovertemplate:
              'TCYB allocated: %{x: .2f}%<br>' +
              'ATOMs contributed: %{y}<br>' +
              'Personal discount: %{z:.2f%}%<br>' +
              '<extra></extra>'
            //   marker: {
            //     size: 5,
            //     color: '#fff',
            //     colorscale: "#fff",
            //     // cmin: -20,
            //     // cmax: 50
            //   }
          }
        ]}
        layout={layout}
      />
    );
  }
}
