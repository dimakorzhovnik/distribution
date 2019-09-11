import React, { Component } from 'react';
import Plotly from 'react-plotly.js';
import { x, y } from './list';


// const arr = [];
// for (let i = 0, l = 250; i < 300; ++i) {
//   arr.push(Math.floor(Math.random() * (l - 80)) + 80);
// }

export class Dinamics extends Component {
  render() {
    const trace1 = {
      type: 'scatter',
      opacity: 0.8,

      mode: 'line',
      x: y,
      y: x,
      line: {
        color: '#36d6ae'
      },
      hovertemplate: '1 THC <br>'+'price: %{y: .2f}<br>' + 'volume: <br>'+'<extra></extra>'
    };

    const trace2 = {
      opacity: 0.6,
      type: 'histogram',
      x: y,
      y: x,
      hoverinfo: 'skip',
      marker: {
        color: '#36d6ae'
      }
    };

    const data = [trace1, trace2];

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
      // scene: {
      yaxis: {
        type: 'linear',
        spikemode: 'across',
        showspikes: true,
        spikecolor: '#fff',
        spikethickness : 1,
        spikedash : 'solid',


        // title: {
        //   text: 'ATOM'
        // },
        gridcolor: '#ffffff42',
        // color: '#fff',
        tickfont: {
          color: '#fff'
        }
      },
      xaxis: {
        type: 'date',
        spikemode: 'across',
        showspikes: true,
        spikecolor: '#fff',
        spikethickness : 1,
        spikedash : 'solid',

        // title: {
        //   text: '%'
        // },
        gridcolor: '#ffffff42',
        // color: '#fff',
        tickfont: {
          color: '#fff'
        }
        // zeroline: false
      }

      // }
      // width: 550,
      // height: 500,
      // margin: {
      //   l: 0,
      //   r: 0,
      //   b: 0,
      //   t: 0,
      //   pad: 4
      // }
    };
    const config = {
      displayModeBar: false,
      // scrollZoom: false,
      responsive: true
    };
//  console.log(data);
    return <Plotly data={data} layout={layout} config={config} />;
  }
}
