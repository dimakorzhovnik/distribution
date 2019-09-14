import React, { Component } from 'react';
import Plotly from 'react-plotly.js';
// import { x, y } from './list';

// const arr = [];
// for (let i = 0, l = 250; i < 300; ++i) {
//   arr.push(Math.floor(Math.random() * (l - 80)) + 80);
// }
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

export class Dinamics extends Component {
  render() {
    const { x } = this.props.data;
    const { y } = this.props.data;
    const { x1 } = this.props.data;
    const { y1 } = this.props.data;

  
    /* let x; */
    let _yaxis = y.max() / 0.3;

    const trace1 = {
      type: 'scatter',
      mode: 'line',
      x: y1,
      y: x1,
      line: {
        color: '#36d6ae'
      },
      hovertemplate: '1 THC <br>' + 'price: %{y: .6f}<br>' + '<extra></extra>'
    };

    const trace2 = {
      opacity: 0.6,
      type: 'bar',
      x,
      y,
      yaxis: 'y2',
      hovertemplate: 'volume:  %{y: .2f} <br>' + '<extra></extra>',
      marker: {
        color: '#36d6ae'
      },
      mode: 'lines'
    };

    // var trace1 = {
    //     x: x,
    //     y: y,
    //     // mode: 'lines',
    //     type: 'bar',
    //     name: '2000'
    // };

    const data = [trace1, trace2];

    const layout = {
      bargap: 0,
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
        title: 'Price',
        type: 'linear',
        spikemode: 'across',
        showspikes: true,
        side: 'right',
        spikecolor: '#fff',
        spikethickness: 1,
        spikedash: 'solid',
        gridwidth: 1,
        zeroline: false,
        zerolinecolor: '#fff',
        zerolinewidth: 1,
        // bargap:0,
        gridcolor: '#ffffff42',
        titlefont: { color: '#fff' },

        tickfont: {
          color: '#fff',
          size: 9
        }
      },
      yaxis2: {
        // title: 'Price',
        titlefont: { color: '#fff' },
        tickfont: { color: '#fff', size: 9 },
        overlaying: 'y',
        // autorange: true,
        showgrid: false,
        zeroline: false,
        showline: false,
        // autotick: true,
        ticks: '',
        showticklabels: false,
        range: [0, _yaxis]
        // scaleratio: 0.2,
        // scaleanchor: "x",
        // side: 'right'
      },
      xaxis: {
        // type: 'date',
        // tickmode: "linear",
        title: 'Round',
        range: x,
        tick0: x[0],
        // dtick: 24*60*60*1000, // 7 days
        spikemode: 'across',
        showspikes: true,
        spikecolor: '#fff',
        spikethickness: 1,
        spikedash: 'solid',
        gridwidth: 1,
        zeroline: false,
        zerolinecolor: '#fff',
        zerolinewidth: 1,
        // zeroline: false,
        gridcolor: '#ffffff42',
        titlefont: { color: '#fff' },
        tickfont: {
          color: '#fff',
          size: 9
        }
      }

      // }
      // width: 550,
      // height: 500,
    };
    const config = {
      displayModeBar: false,
      // scrollZoom: false,
      responsive: true
    };

    return <Plotly data={data} layout={layout} config={config} />;
  }
}
