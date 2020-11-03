import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

/*
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={'/spidercdc'}>
      <Route path='/' component={App} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={'/spidercdc'}>
      <Route path='/' component={App} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
*/
ReactDOM.render(
  <React.StrictMode>
    <App />    
  </React.StrictMode>,
  document.getElementById('root')
);