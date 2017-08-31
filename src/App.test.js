import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);

  const div2 = document.createElement('div');
  ReactDOM.render(<Calculation />, div2);
});
