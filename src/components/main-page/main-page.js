import React, { Component } from 'react';
import StationsSidebar from '../stations-sidebar';
import StationsCard from '../station-card';
import MapCtrl from '../mapctrl';
import './main-page.css'
import CdcService from '../../services/cdc-service';
import ContentToggle from '../content-toggle';

export default class App extends Component {

  cdcService = new CdcService();

  state = {
    currentStation: null,
    currentContentType: 'mapctrl',
    stations: [],
    loadingStaionsState: true,
    error: false,
  }

  onStationsLoaded = (stations) => {
    console.log(stations)
    this.setState({
      stations,
      loadingStaionsState: false,
      error: false,
    });
  };

  onError = (error) => {
    console.log(error);
    this.setState({
      stations: [],
      loadingStaionsState: false,
      error: true,
    });
  };

  loadStations = () => {
    const { getStations } = this.cdcService;
    getStations()
      .then(this.onStationsLoaded)
      .catch(this.onError);
  };

  componentDidMount() {
    this.loadStations();

    this.intervalId = setInterval(this.loadStations, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  setCurrentStationAndContentToggle = (currentStation, currentContentType) => {
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
    this.setState({ currentContentType });
    //console.log('currentContentType', this.state.currentContentType);
  }


  onContentSwitch = () => {
    const { currentContentType } = this.state;
    if (currentContentType === 'mapctrl') this.onContentToggle('details')
    else this.onContentToggle('mapctrl');
  }


  render() {

    const { getStations } = this.cdcService;

    const { currentStation, currentContentType, stations, loadingStaionsState } = this.state;

    return (
          <div className="container-fluid ">
            <div className="row high-component">
              <div className="p-3 col-sm-5 col-md-4 col-lg-3">
                <StationsSidebar
                  stations={stations}
                  loadingStaionsState={loadingStaionsState}
                  onReloadStationsCall={this.loadStations}
                  currentStation={currentStation}
                  getStations={getStations}
                  setCurrentStation={this.setCurrentStation}
                  onContentSwitch={this.onContentSwitch}
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
      );
  }

}