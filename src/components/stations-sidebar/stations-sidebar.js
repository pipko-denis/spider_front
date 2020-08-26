import React, { Component } from 'react';
import Spinner from "../spinner/spinner";

import './stations-sidebar.css';

export default class StationsSidebar extends Component {

  state = {
    filter: '',
  }


  onFilterChange = (e) => {
    const filter = e.target.value;
    this.setState( { filter })
  }

  filterStations(list,term){

    if ((!term) || (term.length === 0) ) {
      return list;
    }

    term = term.toLowerCase();
    console.log(term);
    const result = list.filter( (el) => { 
      return (el.displayName) && ( el.displayName.toLowerCase().indexOf(term) > -1)
    } )
    console.log(result);
    return result;

  }

  renderItems(arr) {
    return arr.map((item) => {
      const { id, displayName, replError } = item;

      return (
        <li className="list-group-item d-flex justify-content-between align-items-center"
          key={id}
          onClick={() => this.props.setCurrentStation(id)}>
          {displayName}
          < img className="person-image img-status" alt="person" 
            src={`./img/spider/email_${(replError) ? 'red' : 'green' }.png`} /> 
        </li>
      );
    });
  }


  render() {

    const { filter } = this.state;

    const { stations } = this.props;

    if (!stations) {
       return <Spinner />;
     }

    const visibleItems = this.filterStations(stations, filter);

    const items = this.renderItems(visibleItems);

    return (
      <div>
        <div className="form-group">
          <input 
                type="text" 
                value={filter}
                onChange={this.onFilterChange}
                className="form-control" 
                placeholder="Поиск станции" 
                />
        </div>
        <div className="scrollable">
          <ul className="list-group">
            {items}
          </ul>
        </div>
      </div>
    );
  }
}