import React, { Component } from 'react';
import './consolidate-report.css';
import CdcService from '../../services/cdc-service';

export default class ConsolidateReport extends Component {

  cdcService = new CdcService();

  state = {
    dtBeg: this.formatDate(new Date((new Date()).getTime() - 7 * 24 * 3600000)),
    dtEnd: this.formatDate(new Date()), 
    loadingState: false,
    daySliceData: [],
  }

  formatDate(curDate) {
    const resDate = new Date(Date.UTC(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), 0, 0, 0))    
    return resDate.toISOString().substr(0, 10);
  }  

  onDaySliceDataLoaded = (daySliceData) => {
    console.log(daySliceData)
    this.setState({
      daySliceData,
      loadingState: false,
      error: false,
    });
  };

  onError = (error) => {
    console.log(error);
    this.setState({
      daySliceData: [],
      loadingState: false,
      error: true,
    });
  };

  loadDaySliceData = () => {
    const { getConsolidateReport } = this.cdcService;
    getConsolidateReport(this.state.dtBeg,this.state.dtEnd)
      .then(this.onDaySliceDataLoaded)
      .catch(this.onError);
  };

  componentDidMount() {
    this.loadDaySliceData();

    this.intervalId = setInterval(this.loadDaySliceData, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  

  renderItems(list) {

    return list.map((item, index) => {
      const { id, displayName, defects } = item;

      const tablerows = this.renderSubitems(defects);

      return (
        <tr
          key={id}>
          <th className="p-5">{displayName}</th>
          <th>  
            <table className="table table-hover table-striped m-0 table-sm">
              <thead>
                <tr className="table-primary">
                  <th scope="col">Дата среза данных</th>
                  <th scope="col">Всего составов</th>
                  <th scope="col">Составов без вагонов</th>
                  <th scope="col">Всего вагонов</th>
                  <th scope="col">Всего осей</th>
                  <th scope="col">Т1</th>
                  <th scope="col">Т2</th>
                  <th scope="col">СКАТ (передано)</th>
                  <th scope="col">СКАТ (ошибки)</th>
                </tr>
              </thead>
              <tbody>     
                {tablerows}
              </tbody>
            </table>
          </th>
        </tr>
      );
    });
    
  }

  renderSubitems(defects){
    return defects.map((item, index) => {
      const { id, onDate, trainsPassedCount, carsPassedCount, wheelsPassedCount, warnWheelsCount, alarmWheelsCount,
        trainsCountSendToScat, trainsCountScatFail, trainsWoWagons } = item; //wheelsDefectedCount,

      return (
        <tr className=""
          key={id}>
          <td>{onDate}</td>
          <td>{trainsPassedCount}</td>
          <td>{trainsWoWagons}</td>
          <td>{carsPassedCount}</td>
          <td>{wheelsPassedCount}</td>
          <td>{warnWheelsCount}</td>
          <td>{alarmWheelsCount}</td>
          <td>{trainsCountSendToScat}</td>
          <td>{trainsCountScatFail}</td>          
        </tr>
      );
    });

  }



  render() {
    
      const tableItems = this.renderItems(this.state.daySliceData);

      return (
        <div>
          <div className=" h-100 d-flex justify-content-center align-items-center">
            <h4>Сводный отчёт </h4>
          </div>
          <div className=" h-100 d-flex justify-content-center align-items-center scrollable-report">
            <table className="table-bordered">
              <thead>
                <tr className="table-primary">
                  <th className="p-2">Станция</th>
                  <th scope="col"></th>
                </tr>  
              </thead>
              <tbody>
                {tableItems}
              </tbody>
            </table>
          </div>
        </div>
      )
  }

}