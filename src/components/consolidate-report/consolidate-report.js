import React, { Component } from 'react';
import './consolidate-report.css';
import CdcService from '../../services/cdc-service';

export default class ConsolidateReport extends Component {

  cdcService = new CdcService();

  state = {
    dtBeg: this.formatDate(new Date((new Date()).getTime() - 7 * 24 * 3600000)),
    dtEnd: this.formatDate(new Date()), 
    loadingState: false,
  }

  formatDate(curDate) {
    const resDate = new Date(Date.UTC(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), 0, 0, 0))
    //console.log(curDate, curDate.getFullYear() + '-' + curDate.getMonth() + '-' + curDate.getDate())
    //console.log(resDate.toISOString().substr(0, 10))
    return resDate.toISOString().substr(0, 10);//curDate.getFullYear()+'-'+curDate.getMonth()+'-'+curDate.getDate();    
  }  

  renderItems() {
    const list = [
        { "id": 1, "displayName": "Веймарн", "defects": 
          [
            { "id": 2304, "stationId": 1, "onDate": "2020-10-10", "trainsPassedCount": 68, "carsPassedCount": 4339, "wheelsPassedCount": 17990, "warnWheelsCount": 0, "alarmWheelsCount": 0, "trainsCountSendToScat": 63, "wheelsDefectedCount": 0, "trainsCountScatFail": 0, "trainsWoWagons": 5 }
            , { "id": 2303, "stationId": 1, "onDate": "2020-10-09", "trainsPassedCount": 58, "carsPassedCount": 3642, "wheelsPassedCount": 15370, "warnWheelsCount": 0, "alarmWheelsCount": 0, "trainsCountSendToScat": 53, "wheelsDefectedCount": 0, "trainsCountScatFail": 0, "trainsWoWagons": 5 }
          ]
        }
        ,{
        "id": 2, "displayName": "Агрыз", "defects": 
          [
            { "id": 2319, "stationId": 2, "onDate": "2020-10-10", "trainsPassedCount": 0, "carsPassedCount": 0, "wheelsPassedCount": 0, "warnWheelsCount": 0, "alarmWheelsCount": 0, "trainsCountSendToScat": 0, "wheelsDefectedCount": 0, "trainsCountScatFail": 0, "trainsWoWagons": 0 }
            , { "id": 2318, "stationId": 2, "onDate": "2020-10-09", "trainsPassedCount": 0, "carsPassedCount": 0, "wheelsPassedCount": 0, "warnWheelsCount": 0, "alarmWheelsCount": 0, "trainsCountSendToScat": 0, "wheelsDefectedCount": 0, "trainsCountScatFail": 0, "trainsWoWagons": 0 }
            , { "id": 2317, "stationId": 2, "onDate": "2020-10-08", "trainsPassedCount": 0, "carsPassedCount": 0, "wheelsPassedCount": 0, "warnWheelsCount": 0, "alarmWheelsCount": 0, "trainsCountSendToScat": 0, "wheelsDefectedCount": 0, "trainsCountScatFail": 0, "trainsWoWagons": 0 }
          ]
        }
    ];

    return list.map((item, index) => {
      const { id, displayName, defects } = item;

      return (
        <tr className=""
          key={id}>
          {displayName}
        </tr>
      );
    });
    
  }



  render() {
    
      const tableItems = this.renderItems();

      return (
        <div className=" h-100 d-flex justify-content-center align-items-center">
          <h4>Сводный отчёт </h4>
          <table>
            <tbody>
              {tableItems}
            </tbody>
          </table>
        </div>
      )
  }

}