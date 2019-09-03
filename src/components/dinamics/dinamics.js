import React, { Component } from 'react';
import Plotly from 'react-plotly.js';
import { x, y, z } from './list';

export class Dinamics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        x: 0,
        y: 0,
        z: 0
      },
      eye: {
        x: 0.57,
        y: 0,
        z: -5.53
      },
      up: {
        x: 0,
        y: 0,
        z: 1
      }
    };
  }

  state1 = () =>
    this.setState({
      center: {
        x: 0,
        y: 0,
        z: 0
      },
      eye: {
        x: 0.57,
        y: 0,
        z: -5.53
      },
      up: {
        x: 0,
        y: 0,
        z: 1
      }
    });

  state2 = () =>
    this.setState({
      center: {
        x: 0,
        y: 0,
        z: 0
      },
      eye: {
        x: 0,
        y: 3,
        z: 0
      },
      up: {
        x: 0,
        y: 0,
        z: -5
      }
    });

  state3 = () =>
    this.setState({
      center: {
        x: 0,
        y: 0,
        z: 0
      },
      eye: {
        x: 3,
        y: 0,
        z: 0
      },
      up: {
        x: 0,
        y: 0,
        z: -5
      }
    });

  render() {
    const { center, eye, up } = this.state;

    const data = {
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
    };

    const layout = {
      paper_bgcolor: '#000',
      plot_bgcolor: '#000',
      hoverlabel: {
        bgcolor: '#000',
        font: {
          color: '#fff'
        }
      },
      scene: {
        yaxis: {
          title: {
            text: 'ATOM'
          },
          gridcolor: '#dedede',
          color: '#fff',
          tickfont: {
            color: '#36d6ae'
          }
        },
        xaxis: {
          title: {
            text: '%'
          },
          gridcolor: '#dedede',
          color: '#fff',
          tickfont: {
            color: '#36d6ae'
          },
          zeroline: false
        },
        zaxis: {
          title: {
            text: 'Discont'
          },
          gridcolor: '#dedede',
          color: '#fff',
          tickfont: {
            color: '#36d6ae'
          },
          zeroline: false
        },
        aspectratio: {
          x: 2,
          y: 6,
          z: 2
        },
        camera: {
          center,
          up,
          eye
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
    const config = {
      displayModeBar: false,
      scrollZoom: false,
      responsive: true
    };

    return (
      <div>
        <div>
          <button onClick={this.state1}>1</button>
          <button onClick={this.state2}>2</button>
          <button onClick={this.state3}>3</button>
        </div>
        <Plotly data={[data]} layout={layout} config={config} />
      </div>
    );
  }
}
