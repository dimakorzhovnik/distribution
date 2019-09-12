import React, { Component } from 'react';
import Plotly from 'react-plotly.js';
// import { x, y } from './list';

// const arr = [];
// for (let i = 0, l = 250; i < 300; ++i) {
//   arr.push(Math.floor(Math.random() * (l - 80)) + 80);
// }

export class Dinamics extends Component {
  render() {
      let x = this.props.data.x;
      let y = this.props.data.y;
      let x1 = this.props.data.x1;
      let y1 = this.props.data.y1;


      console.log(x1,y1);

    const trace1 = {
      type: 'scatter',
      mode: 'line',
      x: y1,
      y: x1,
      yaxis: 'y2',
      line: {
        color: '#36d6ae'
      },
      hovertemplate: '1 THC <br>'+'price: %{y: .20f}<br>'+'<extra></extra>'
    };

    const trace2 = {
      opacity: 0.6,
      type: 'bar',
      x: x,
      y: y,
        bargap:0,
      hovertemplate: 'volume:  %{y: .2f} <br>'+'<extra></extra>',
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
        bargap:0,
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
          gridwidth: 2,
          zeroline: false,
          bargap:0,
        // title: {
        //   text: 'ATOM'
        // },
        gridcolor: '#ffffff42',
        // color: '#fff',
        tickfont: {
          color: '#fff'
        }
      },
      yaxis2: {
        title: 'yaxis2 title', 
        titlefont: {color: 'rgb(148, 103, 189)'}, 
        tickfont: {color: 'rgb(148, 103, 189)'}, 
        overlaying: 'y', 
        side: 'right'
      },
      xaxis: {
        // type: 'date',
        // tickmode: "linear",
        range: x,
          tick0: x[0],
          // dtick: 24*60*60*1000, // 7 days
        spikemode: 'across',
        showspikes: true,
        spikecolor: '#fff',
        spikethickness : 1,
        spikedash : 'solid',
          gridwidth: 2,
          zeroline: false,

        // title: {
        //   text: '%'
        // },
        gridcolor: '#ffffff42',
        // color: '#fff',
        tickfont: {
          color: '#fff'
        },
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

    return <Plotly data={data} layout={layout} config={config} />;
  }
}
