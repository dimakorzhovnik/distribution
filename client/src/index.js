import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppRouter from './router';

import './main.css';

const root = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <AppRouter />
    </AppContainer>,
    root
  );
};

render(AppRouter);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(AppRouter);
  });
}
