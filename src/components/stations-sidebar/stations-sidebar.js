import React, { Component } from 'react';
import Spinner from "../spinner/spinner";

import './stations-sidebar.css';

export default class StationsSidebar extends Component {

  state = {
    filter: '',
    curHighLightedStation:-1,
    sideFilterNoConn: false,
    sideFilterNoDefectsForDay: false,
    sideFilterOnlyOneSideDefects: false,
    showFilters: false,
  }

  onBtnShowFiltersClick(){
    this.setState( (state) => {
      return { showFilters: ! state.showFilters}
    })
  }

  getFilteredRecords(){
    const { filter } = this.state;
    const { stations } = this.props;
    const visibleItems = this.filterStations(stations, filter);
    return visibleItems;
  }

  onFilterKeyup = (e) => {
//    console.log(e.keyCode);
    if (e.keyCode === 40)  {       
      const recCount = this.getFilteredRecords().length;
        if ( this.state.curHighLightedStation < recCount  ) {
        this.setState( (state) => {
          let { curHighLightedStation } = state;
          curHighLightedStation++;
          return { curHighLightedStation};
        });   
      }
    } else if(e.keyCode === 38)  { 
      if (this.state.curHighLightedStation < 0) { return};
      this.setState((state) => {
        let { curHighLightedStation } = state;
        curHighLightedStation--;
        return { curHighLightedStation };
      });   
    } else if (e.keyCode === 13) {
      const filteredStations = this.getFilteredRecords();     
      const station = filteredStations[this.state.curHighLightedStation];
      if (station)  {
        const { currentStation } = this.props;
        if (station.id === currentStation){
          this.props.onContentSwitch();
        }else {
          this.props.setCurrentStation(station.id)
        }
      }
      console.log();
     }
  }

  onFilterChange = (e) => {
    const filter = e.target.value;
    this.setState({ filter, curHighLightedStation: -1})    
  }

  filterStations(list, term){
    
    if ( ((!term) || (term.length === 0) ) &&  
      (!this.state.sideFilterNoConn) && (!this.state.sideFilterNoDefectsForDay) && (!this.state.sideFilterOnlyOneSideDefects)) {
      return list;
    }

    let result = [...list];

    if (this.state.sideFilterNoConn === true) {
      result = result.filter((el) => {
        return (el.noConnError === true) 
      })
    }

    if (this.state.sideFilterNoDefectsForDay === true) {
      result = result.filter((el) => {
        return (el.noDefectsError === true)
      })
    }

    if (this.state.sideFilterOnlyOneSideDefects === true) {
      result = result.filter((el) => {
        return (el.oneSideDefectsError === true)
      })
    }    


    if ((term) && (term.length > 0)) {
      term = term.toLowerCase();
      result = result.filter((el) => {
        return (el.displayName) && (el.displayName.toLowerCase().indexOf(term) > -1)
      })
    }    
    

    return result;

  }

  renderItems(list) {
    //const { permissions: { role = 'user' } = {} } = person;
/*
    const refs = list.reduce((acc, value) => {
      acc[value.id] = React.createRef();
      return acc;
    }, {});

    const handleClick = id =>
      refs[id].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
*/

    const { currentStation } = this.props;

    return list.map((item,index) => {
      const { id, displayName, noConnError, replEnab, oneSideDefectsError, noDefectsError } = item;

      return (
        <li className={"list-group-item d-flex justify-content-between align-items-center " 
          + ((id === currentStation) ? " bg-light font-weight-bold" : "")
          + ((index === this.state.curHighLightedStation) ? " border-warning border-top" : "")
      }
          key={id}
          onClick={() => this.props.setCurrentStation(id)}>
          {displayName}
          <div>
            < img className="img-status" alt="no defects error"
              src={`./img/spider/access_point_${this.getNoDefectsColor(oneSideDefectsError, noDefectsError)}.png`} />
            < img className="img-status ml-2" alt="no conn error" 
              src={`./img/spider/lan_connect_${this.getLanConnectColor(noConnError, replEnab)}.png`} />               
          </div>
        </li>
      );
    });
  }

  getNoDefectsColor(oneSideDefectsError, noDefectsError ){
    if (noDefectsError === true) {
      return 'off'
    }else{
      if (oneSideDefectsError === true){
        return 'oneside';
      }else{
        return 'on';
      }
    }
  }

  getLanConnectColor(noConnError, replEnab) {
    if (replEnab === false) {
      return 'gray';
    } else return (noConnError === true) ? 'red' : 'green';

  }

  onChanged = (event) => {    
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(() => { return { [target.id]: value } })
  }

  render() {

    const { filter, sideFilterNoConn, sideFilterNoDefectsForDay, sideFilterOnlyOneSideDefects } = this.state;

    const { stations, loadingStaionsState, onReloadStationsCall } = this.props;

    if (!stations) {
       return <Spinner />;
     }

    const visibleItems = this.filterStations(stations, filter);

    const items = this.renderItems(visibleItems);

    return (
      <div>
        <div className="form-group mb-2">
          <div className="d-flex">
            <input 
                  type="text" 
                  value={filter}
                  onChange={this.onFilterChange}
                  onKeyUp={this.onFilterKeyup}
                  className="form-control" 
                  placeholder="Поиск станции" 
                  />
            <button type="button"
              className="btn btn-primary btn-sm"
              disabled={loadingStaionsState}
              onClick={() => onReloadStationsCall()}>
              <img  alt="reload" src="./img/spider/refresh.png"/>
            </button>
            <button type="button"
              className="btn btn-primary btn-sm"
              disabled={loadingStaionsState}
              onClick={ () => this.onBtnShowFiltersClick()}>
              <img alt="reload" src={`./img/spider/filter-${(this.state.showFilters) ? 'off' : 'on' }.png`} />
            </button>
          </div>   
          <div hidden={(this.state.showFilters) ? '' : 'hidden' }>  
            <div className="custom-control custom-switch mt-2">
              <input type="checkbox" className="custom-control-input" id="sideFilterNoConn"
                checked={sideFilterNoConn} onChange={this.onChanged} />
              <label className="custom-control-label" htmlFor="sideFilterNoConn">Нет связи</label>
            </div>
            <div className="custom-control custom-switch">
              <input type="checkbox" className="custom-control-input" id="sideFilterNoDefectsForDay"
                checked={sideFilterNoDefectsForDay} onChange={this.onChanged} />
              <label className="custom-control-label" htmlFor="sideFilterNoDefectsForDay">Нет дефектов</label>
            </div>
            <div className="custom-control custom-switch">
              <input type="checkbox" className="custom-control-input" id="sideFilterOnlyOneSideDefects"
                checked={sideFilterOnlyOneSideDefects} onChange={this.onChanged} />
              <label className="custom-control-label" htmlFor="sideFilterOnlyOneSideDefects">Дефекты с одной стороны</label>
            </div>
          </div>  
        </div>
        <div className="scrollable" style={{ height: `calc(100vh - ${(this.state.showFilters) ? '226' : '151'}px)`}} >
          <ul className="list-group">
            {items}
          </ul>
        </div>
      </div>
    );
  }
}