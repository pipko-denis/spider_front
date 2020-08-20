import React, {Component} from 'react';
import Header from '../header';
import StationsSidebar from '../stations-sidebar';
import StationsCard from '../station-card';
import MapCtrl from '../mapctrl';
import './app.css'
import CdcService from '../../services/cdc-service';
import ContentToggle from '../content-toggle';

export default class App extends Component{

  cdcService = new CdcService();

  state = {
    currentStation: null,
    currentContentType: 'mapctrl',
    stations: [],
  }


  componentDidMount() {
    const { getStations } = this.cdcService;

    getStations()
      .then((stations) => {
        console.log(stations)
        this.setState({
          stations
        });
      });

  }

  setCurrentStationAndContentToggle = (currentStation, currentContentType) =>{
    this.setState({ 
      currentContentType,
      currentStation
    });
  }

  setCurrentStation = (currentStation) => {
    this.setState({ currentStation });
  };

  onContentToggle = (currentContentType) => {
    //console.log(currentContentType);
    this.setState({ currentContentType: currentContentType });
    console.log('currentContentType', this.state.currentContentType);
  }

  render(){

    const { getStations } = this.cdcService;

    const { currentStation, currentContentType, stations} = this.state;

    return (
      <div>
        <Header />
        <div className="container-fluid ">
          <div className="row high-component">
          <div className="p-3 col-sm-5 col-md-4 col-lg-3">
              <StationsSidebar 
                getStations={getStations} 
                stations={stations}
                setCurrentStation={this.setCurrentStation}
              />
          </div>
            <div className="p-2 col-sm-7 col-md-8 col-lg-9">
              <ContentToggle 
                currentContentType={currentContentType}
                onContentToggle={this.onContentToggle}                 
              />
              {(currentContentType === 'details') ? <StationsCard currentStation={currentStation} /> : null}
              {(currentContentType === 'mapctrl') ? <MapCtrl currentStation={currentStation} stations={stations} setCurrentStationAndContentToggle={this.setCurrentStationAndContentToggle} /> : null}
            </div>
            
        </div>
        </div>
      </div>
    )
  }
}