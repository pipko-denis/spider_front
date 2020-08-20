
import React, {Component} from 'react';
import './station-defects-slice.css';
import CdcService from '../../services/cdc-service';
import Spinner from "../spinner/spinner";

export default class StationDefectsSlice extends Component{

  cdcService = new CdcService();


  renderItems(arr) {
    return arr.map((item) => {
      const { id, onDate, trainsPassedCount, carsPassedCount, warnWheelsCount, alarmWheelsCount, trainsCountSendToScat } = item;

      return (
        <tr key={id}>
          <th scope="row">{onDate}</th>
          <td>{trainsPassedCount}</td>
          <td>{carsPassedCount}</td>
          <td>{warnWheelsCount}</td>
          <td>{alarmWheelsCount}</td>
          <td>{trainsCountSendToScat}</td>          
        </tr>
      );
    });
  }  


  setParentStateByPropName = (event) => {
    this.props.setStateByPropName(event.target.id, event.target.value)
  };

  render(){    

    if (!this.props.defects) {
      return (
        null
      )
    } 

    // const spinner = (readOnly) ? <span className="spinner-border spinner-border-sm mr-1" id="spinerLogs" role="status" aria-hidden="false" ></span> : null;

    const { defects, loadingDefects, dtBeg, dtEnd} = this.props;

    // if (loadingDefects) {
    //   return <Spinner />;
    // }

    const spinner = (loadingDefects) ? <span className="spinner-border spinner-border-sm mr-1" id="spinerLogs" role="status" aria-hidden="false" ></span> : null;

    const items = this.renderItems(defects);



    return (
      <div className="p-2 border rounded">
        <div className="row"><div className="col-sm-3"><h5>Статистические показатели</h5></div></div>
        <div className="row">          
          <div className="col-4">
            <input className="form-control" type="date" value={dtBeg} id="dtBeg" onChange={this.setParentStateByPropName}/>
          </div>
          <div className="col-4">
            <input className="form-control" type="date" value={dtEnd} id="dtEnd" onChange={this.setParentStateByPropName}/>
          </div>          
          <div className="col-4">
            <button type="button" className="btn btn-primary" onClick={this.props.loadDefects}>
              {spinner}
              Загрузить
            </button>
          </div>
        </div>        
        <table className="table table-hover mt-1">
          <thead>
            <tr className="table-primary">
              <th scope="col">Дата</th>
              <th scope="col">Кол. составов</th>
              <th scope="col">Кол. вагонов</th>
              <th scope="col">Т0</th>
              <th scope="col">Т1</th>
              <th scope="col">Составы в СКАТ</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>  
      </div>
    );
  }
}