
import React, {Component} from 'react';
import './station-card.css';
import CdcService from '../../services/cdc-service';
import StationMainInfo from '../station-main-info';
import StationCardContentToggle from '../station-card-content-toggle';
import UniversalTable from '../universal-table';

export default class StationsCard extends Component{

  cdcService = new CdcService();

  state = {
    station: null,
    propName: null,
    propValue: null,
    readOnly: false,
    tableData: [],
    dtBeg: this.formatDate(new Date((new Date()).getTime() - 7 * 24 * 3600000)),//(new Date((new Date()).getTime() - 7 * 24 * 3600000 + 3 * 3600000)).toISOString().substr(0, 10),
    dtEnd: this.formatDate(new Date()), //(new Date((new Date()).getTime() - 7 * 24 * 3600000)).toISOString().substr(0, 10), //'2020-08-13',
    loadingState:false,
    currentContentType: 'main',
  }

/*  
  constructor(){
    super();
    //const curDate = new Date();
    //console.log(curDate.toISOString().substr(0,10));
    //const prevDate = new Date(curDate.getTime() - 7 * 24 * 3600000);
    //console.log(prevDate.toISOString().substr(0, 10));

    // this.setStateByPropName('dtEnd', curDate.toISOString().substr(0, 10));
    // this.setStateByPropName('dtBeg', prevDate.toISOString().substr(0, 10));
  }
*/

  formatDate(curDate){
    const resDate = new Date(Date.UTC(curDate.getFullYear(),curDate.getMonth(),curDate.getDate(),0,0,0))
    //console.log(curDate, curDate.getFullYear() + '-' + curDate.getMonth() + '-' + curDate.getDate())
    //console.log(resDate.toISOString().substr(0, 10))
    return resDate.toISOString().substr(0, 10);//curDate.getFullYear()+'-'+curDate.getMonth()+'-'+curDate.getDate();    
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
    //console.log(propName,value)
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

  loadData = () => {
    this.setState(() => { return { loadingState: true , tableData:[]} })
    // const { station } = this.props;
    // const { dtBeg, dtEnd } = this.state;

    const { currentStation } = this.props;

    if (!currentStation) { return };

    const { dtBeg, dtEnd, currentContentType } = this.state;
    console.log('loadData', currentStation, dtBeg, dtEnd, currentContentType)
    this.cdcService.getData(currentStation, dtBeg, dtEnd, currentContentType)
      .then((tableData) => {
        //console.log(tableData);
        this.setState(() => {
          return { tableData, loadingState: false }
        })
      })
      .catch((err) => {
        this.setState(() => { return { loadingState: false } })
        console.log(err)
      });
  }   

  componentDidMount() {
    //console.log('componentDidMount', this.props);
    this.loadStationMainInfo();
  }

  // componentWillReceiveProps(){
  //   console.log('componentWillReceiveProps', this.props);
  // }

  componentDidUpdate(prevProps, prevState) {
    //console.log('componentDidUpdate', prevProps);
    if (prevProps.currentStation !== this.props.currentStation) {
      this.loadStationMainInfo();
    }

    if ( (this.state.currentContentType !== 'diag') && (this.state.currentContentType !== 'main') ) {
      if ((this.state.currentContentType !== prevState.currentContentType) || (prevProps.currentStation !== this.props.currentStation) ){
        if (this.state.currentContentType === 'slice') {          
          // this.setState(() => { return { 
          //   dtBeg: (new Date((new Date()).getTime() - 7 * 24 * 3600000)).toISOString().substr(0, 10),
          //   dtEnd: new Date().toISOString().substr(0, 10)
          // } })
          this.setStateByPropName('dtBeg', this.formatDate(new Date((new Date()).getTime() - 7 * 24 * 3600000)));// (new Date((new Date()).getTime() - 7 * 24 * 3600000)).toISOString().substr(0, 10));
          this.setStateByPropName('dtEnd', this.formatDate(new Date()));// new Date().toISOString().substr(0, 10));
          setTimeout(this.loadData,200);
        } else {
          this.setState(() => {
            return {
              dtBeg: this.formatDate(new Date()),// new Date().toISOString().substr(0, 10),
              dtEnd: this.formatDate(new Date()),// new Date().toISOString().substr(0, 10)
            }
          })
          //this.loadData();
          setTimeout(this.loadData, 200);
          // this.setStateByPropName('dtBeg', new Date().toISOString().substr(0, 10));
          // this.setStateByPropName('dtEnd', new Date().toISOString().substr(0, 10));
        }
        
        //console.log(this.state.currentContentType);
        
//        this.setState(() => {return { tableData: [], loadingState: false }})



      }
    }

  }


  onContentToggle = (currentContentType) => {
    //console.log(currentContentType);
    this.setState({ currentContentType: currentContentType });
    //console.log('currentContentType', this.state.currentContentType);
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
      const { station, readOnly, tableData, dtBeg, dtEnd, currentContentType, loadingState } = this.state;      

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

            {(currentContentType === 'slice') ? 
              <UniversalTable 
                tableName={"Статистические данные"}
                tableData={tableData}
                loadingState={loadingState}
                dtBeg={dtBeg}
                dtEnd={dtEnd}
                setStateByPropName={this.setStateByPropName}
                loadData={this.loadData}
                currentContentType={currentContentType}
              />
            : null} 

            {(currentContentType === 'trains') ?
              <UniversalTable
                tableName={"Список составов"}
                tableData={tableData}
                loadingState={loadingState}
                dtBeg={dtBeg}
                dtEnd={dtEnd}
                setStateByPropName={this.setStateByPropName}
                loadData={this.loadData}
                currentContentType={currentContentType}
              />
              : null} 

            {(currentContentType === 'impulse') ?
              <UniversalTable
                tableName={"Список дефектов"}
                tableData={tableData}
                loadingState={loadingState}
                dtBeg={dtBeg}
                dtEnd={dtEnd}
                setStateByPropName={this.setStateByPropName}
                loadData={this.loadData}
                currentContentType={currentContentType}
              />
              : null} 

            {(currentContentType === 'scat') ?
              <UniversalTable
                tableName={"Данные переданные в СКАТ"}
                tableData={tableData}
                loadingState={loadingState}
                dtBeg={dtBeg}
                dtEnd={dtEnd}
                setStateByPropName={this.setStateByPropName}
                loadData={this.loadData}
                currentContentType={currentContentType}
              />
              : null}             

          </div>  
        </div>
      );
    }
  }
}