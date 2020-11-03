import React, {Component} from 'react';
import Header from '../header';
import './app.css'
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from '../main-page';
import ConsolidateReport from '../consolidate-report';

export default class App extends Component{
  //basename={'/spidercdc'}
  //basename={'/spider'}

  render(){

    return (
      <div>
        <BrowserRouter >
          <Header />
          <Route path='/' component={MainPage} exact={true}/>
          <Route path='/reports/consolidate' component={ConsolidateReport} />
        </BrowserRouter>        
      </div>
    )
  }
}