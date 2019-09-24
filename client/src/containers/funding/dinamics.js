import React, { Component } from 'react';
import Plotly from 'react-plotly.js';
import { x, y, z } from './list';
import { x2, y2, z2 } from './list2';

export class Dinamics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activebtn: 'general',
      data: [
        {
          type: 'scatter3d',
          mode: 'lines',
          opacity: 0.45,
          x,
          y,
          z,
          line: {
            width: 8,
            opacity: 1,
            color: '#fff'
          },
          hovertemplate:
            'TCYB allocated: %{x: .2f}%<br>' +
            'ATOMs contributed: %{y}<br>' +
            'Personal discount: %{z:.2f%}%<br>' +
            '<extra></extra>'
        },
        {
          type: 'scatter3d',
          mode: 'lines',
          x: x2,
          y: y2,
          z: z2,
          line: {
            width: 8,
            color: '#36d6ae'
          },
          ticks: '',
          showticklabels: false,
          hovertemplate:
            'TCYB allocated: %{x: .2f}%<br>' +
            'ATOMs contributed: %{y}<br>' +
            'Personal discount: %{z:.2f%}%<br>' +
            '<extra></extra>'
        }
      ],
      center: {
        x: 0,
        y: 0,
        z: 0
      },
      eye: {
        x: 1,
        y: 0,
        z: -5
      },
      up: {
        x: 0,
        y: 0,
        z: 1
      },
      textX: 'x',
      textY: 'y',
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        pad: 4
      }
    };
  }

  state1 = () => {
    const trace1 = {
      type: 'scatter3d',
      mode: 'lines',
      opacity: 0.45,
      x,
      y,
      z,
      line: {
        width: 8,
        opacity: 1,
        color: '#fff'
      },
      hovertemplate:
        'TCYB allocated: %{x: .2f}%<br>' +
        'ATOMs contributed: %{y}<br>' +
        'Personal discount: %{z:.2f%}%<br>' +
        '<extra></extra>'
    };
    const trace2 = {
      type: 'scatter3d',
      mode: 'lines',
      x: x2,
      y: y2,
      z: z2,
      line: {
        width: 8,
        color: '#36d6ae'
      },
      ticks: '',
      showticklabels: false,
      hovertemplate:
        'TCYB allocated: %{x: .2f}%<br>' +
        'ATOMs contributed: %{y}<br>' +
        'Personal discount: %{z:.2f%}%<br>' +
        '<extra></extra>'
    };
    const data = [trace1, trace2];
    this.setState({
      activebtn: 'general',
      data,
      center: {
        x: 0,
        y: 0,
        z: 0
      },
      eye: {
        x: 1,
        y: 0,
        z: -5
      },
      up: {
        x: 0,
        y: 0,
        z: 1
      },
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        pad: 4
      }
    });
  };

  state2 = () =>
    this.setState({
      activebtn: 'share',
      data: [
        {
          type: 'scatter',
          mode: 'lines+points',
          x: y,
          y: x,
          line: {
            width: 2,
            color: '#36d6ae'
          },
          hovertemplate:
            'ATOMs contributed: %{x}' +
            '<br>TCYB allocated: %{y: .2f}%' +
            '<extra></extra>'
        }
      ],
      textX: 'Donation, ATOMs',
      textY: 'Shares, %',
      margin: {
        l: 50,
        r: 50,
        b: 50,
        t: 50,
        pad: 4
      }
    });

  state3 = () =>
    this.setState({
      activebtn: 'discount',
      data: [
        {
          type: 'scatter',
          x: y,
          y: z,
          line: {
            width: 2,
            color: '#36d6ae'
          },
          hovertemplate:
            'ATOMs contributed: %{x}<br>' +
            'Personal discount: %{y:.2f%}%<br>' +
            '<extra></extra>'
        }
      ],
      textX: 'Donation, ATOMs',
      textY: 'Discount, %',
      margin: {
        l: 50,
        r: 50,
        b: 50,
        t: 50,
        pad: 4
      }
    });

  render() {
    const {
      center,
      eye,
      up,
      activebtn,
      data,
      textX,
      textY,
      margin
    } = this.state;

    const layout = {
      paper_bgcolor: '#000',
      plot_bgcolor: '#000',
      showlegend: false,
      hoverlabel: {
        bgcolor: '#000',
        font: {
          color: '#fff'
        }
      },
      yaxis: {
        autotick: true,
        autorange: true,
        rangemode: 'normal',
        title: {
          text: `${textY}`
        },
        gridcolor: '#000',
        color: '#fff',
        zerolinecolor: '#dedede'
      },
      xaxis: {
        autotick: true,
        title: {
          text: `${textX}`
        },
        gridcolor: '#000',
        color: '#fff',
        zerolinecolor: '#dedede'
      },
      scene: {
        yaxis: {
          autotick: false,
          dtick: 50000,
          title: {
            text: 'Donation, ATOMs'
          },
          gridcolor: '#dedede',
          color: '#fff',
          tickfont: {
            color: '#36d6ae'
          },
          zerolinecolor: '#000'
        },
        xaxis: {
          autotick: false,
          dtick: 1,
          tickcolor: '#000',
          title: {
            text: 'Shares, %'
          },
          gridcolor: '#dedede',
          color: '#fff',
          tickfont: {
            color: '#36d6ae'
          },
          zerolinecolor: '#000'
        },
        zaxis: {
          title: {
            text: 'Discont, %'
          },
          gridcolor: '#dedede',
          color: '#fff',
          tickfont: {
            color: '#36d6ae'
          },
          zerolinecolor: '#000'
        },
        aspectratio: {
          x: 2,
          y: 6,
          z: 2
        },
        font: {
          family: 'Play'
        },
        camera: {
          center,
          up,
          eye
        }
      },
      width: 890,
      height: 400,
      margin
    };
    const config = {
      displayModeBar: false,
      scrollZoom: false
    };

    const Btn = () => (
      <div className="cont-btn">
        <button
          className={`btn-view margin ${
            activebtn === 'general' ? 'activebtn' : ''
          }`}
          onClick={this.state1}
        >
          General
        </button>
        <button
          className={`btn-view margin ${
            activebtn === 'share' ? 'activebtn' : ''
          }`}
          onClick={this.state2}
        >
          Share
        </button>
        <button
          className={`btn-view margin ${
            activebtn === 'discount' ? 'activebtn' : ''
          }`}
          onClick={this.state3}
        >
          Discount
        </button>
      </div>
    );
    return (
      <div className="container-dinamics">
        <Plotly data={data} layout={layout} config={config} />
        <Btn />
      </div>
    );
  }
}
