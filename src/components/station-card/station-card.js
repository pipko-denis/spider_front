
import React, {Component} from 'react';
import ReactDOM from 'react';
import './station-card.css';
import CdcService from '../../services/cdc-service';
import StationMainInfo from '../station-main-info'
import StationDefectsSlice from '../station-defects-slice';
import StationCardContentToggle from '../station-card-content-toggle';

export default class StationsCard extends Component{

  cdcService = new CdcService();

  state = {
    station: null,
    propName: null,
    propValue: null,
    readOnly: false,
    defects: [],
    dtBeg: (new Date((new Date()).getTime() - 7 * 24 * 3600000)).toISOString().substr(0, 10),
    dtEnd: new Date().toISOString().substr(0, 10), //'2020-08-13',
    loadingDefects: false,
    currentContentType: 'main',
  }

  constructor(){
    super();
    const curDate = new Date();
    //console.log(curDate.toISOString().substr(0,10));
    const prevDate = new Date(curDate.getTime() - 7 * 24 * 3600000);
    //console.log(prevDate.toISOString().substr(0, 10));

    // this.setStateByPropName('dtEnd', curDate.toISOString().substr(0, 10));
    // this.setStateByPropName('dtBeg', prevDate.toISOString().substr(0, 10));
  }


  setStateReadOnly(readOnly) {
    this.setState(() => {return { readOnly }})
  }




  updateStationInfo = () => {
    this.setStateReadOnly(true);

    const { station } = this.state;

    console.log(station);

    if (!station.id) { return };
    this.cdcService.updateStationInfo(station.id, station)
      .then((res) => {
        console.log(res);
        this.setStateReadOnly(false);
        // this.setState(() => {
        //   return { station }
        // })
      })
      .catch((err) => {
        this.setStateReadOnly(false);
        console.log(err)
      });
  }

  setStateByPropName = (propName, value) => {
    this.setState((state) => { return { [propName]: value } })
  }

  
  setStationPropByName = (propName, value) => {    
    this.setState((state) => {
      const station = { ...state.station, [propName]: value }
      return { station }
    });

  }

  loadStationMainInfo() {
    const { currentStation } = this.props;
    if (!currentStation) { return };
    this.cdcService.getStation(currentStation)
      .then((station) => {
//        console.log(station)
        this.setState(() => {
          return { station }
        })
      })
      .catch((err) => {
        console.log(err)
      });
  }

  loadDefects = () => {
    this.setState(() => { return { loadingDefects: false } })
    // const { station } = this.props;
    // const { dtBeg, dtEnd } = this.state;

    const { currentStation } = this.props;

    if  (!currentStation) { return };

    const { dtBeg, dtEnd } = this.state;
    console.log('loadDefects', currentStation, dtBeg, dtEnd)
    this.cdcService.getDaySliceByPeriodStation(currentStation, dtBeg, dtEnd)
      .then((defects) => {
        //console.log(defects);
        this.setState(() => {
          return { defects, loadingDefects: false }
        })
      })
      .catch((err) => {
        this.setState(() => { return { loadingDefects: false }  })
        console.log(err)
      });
  }  

  componentDidMount() {
    console.log('componentDidMount', this.props);
    this.loadStationMainInfo();
    this.loadDefects();
  }

  // componentWillReceiveProps(){
  //   console.log('componentWillReceiveProps', this.props);
  // }

  componentDidUpdate(prevProps, prevState) {
    //console.log('componentDidUpdate', prevProps);
    if (prevProps.currentStation != this.props.currentStation) {
      this.loadStationMainInfo();
      this.loadDefects();
    }

  }


  onContentToggle = (currentContentType) => {
    //console.log(currentContentType);
    this.setState({ currentContentType: currentContentType });
    console.log('currentContentType', this.state.currentContentType);
  }


  render(){
    if (!this.state.station) {
      return (
        <div className=" h-100 d-flex justify-content-center align-items-center">
            <h4>Выберите станцию из списка</h4>
        </div>
      )
    } else {

      //const { currentStation } = this.props;      
      //const { station: { displayName } = {} } = this.state;
      const { station, readOnly, defects, loadingDefects, dtBeg, dtEnd, currentContentType } = this.state;      

      return (
        <div className="p-2 mt-2 border rounded">          
          <div>
            <div className="p-2 mt-2 d-flex">
              <div className="mr-auto">
                <h3>ст.{station.displayName}</h3>
              </div>
              <StationCardContentToggle 
                currentContentType={currentContentType}
                onContentToggle={this.onContentToggle}
              />
            </div>
            
            {(currentContentType === 'main') ? 
              <StationMainInfo 
                setStationPropByName={this.setStationPropByName}
                updateStationInfo={this.updateStationInfo}
                station={station}
                readOnly={readOnly}
              />  
            : null}

            {(currentContentType === 'statistics') ? 
              <StationDefectsSlice 
                defects={defects}
                loadingDefects={loadingDefects}
                dtBeg={dtBeg}
                dtEnd={dtEnd}
                setStateByPropName={this.setStateByPropName}
                loadDefects={this.loadDefects}
              />
            : null}  
          </div>  
        </div>
      );
    }
  }
}