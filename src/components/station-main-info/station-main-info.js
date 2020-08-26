import React, {Component} from 'react';
import './station-main-info.css';
import CdcService from '../../services/cdc-service';

export default class StationMainInfo extends Component{

  cdcService = new CdcService();

  
  onChanged = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.props.setStationPropByName(event.target.id, value);
  }


  render(){
    

    if (!this.props.station) {
      return (
        <div className=" h-100 d-flex justify-content-center align-items-center">
            <h4>Выберите станцию из списка</h4>
        </div>
      )
    } 


    // const { station: { 
    //                   id = 0, 
    //                   displayName = '-', 
    //                   fullName = '-', 
    //                   host = '127.0.0.1', 
    //                   lastReplDate = '', 
    //                   lat = 0.0, 
    //                   lon = 0.0, 
    //                   port = 3306, 
    //                   replEnab = false, 
    //                   replError = false, 
    //                   replFreqMs = 60000} = {} } = this.props;

    
    const { readOnly, station } = this.props;

    const { 
      id = 0,
      displayName = '-',
      fullName = '-',
      host = '127.0.0.1',
      lastReplDate = '123',
      lat = 0.0,
      lon = 0.0,
      port = 3306,
      replEnab = false,
      replError = false,
      replFreqMs = 60000 } = station;

    console.log(lastReplDate);

      const spinner = (readOnly) ? <span className="spinner-border spinner-border-sm mr-1" id="spinerLogs" role="status" aria-hidden="false" ></span> : null;

      return (

        <div className="form-group p-2 border rounded">   
          <div className="row"><div className="col-sm-3"><h5>Основная информация</h5></div></div>
          <div className="row">            
            <div className="col-sm-3">
              <label className="col-form-label" htmlFor="id">Код</label>
              <input readOnly type="text" className="form-control" placeholder="id" id="id" value={id} />
            </div>
            <div className="col-sm-9">
              <label className="col-form-label" htmlFor="displayName">Наименование сокращённое</label>
              <input disabled={false} type="text" className="form-control" placeholder="displayName" id="displayName" 
                value={displayName}
                onChange={this.onChanged}
                />
            </div>
          </div>

          <label className="col-form-label" htmlFor="fullName">Наименование полное</label>
          <input disabled={readOnly} type="text" className="form-control" placeholder="fullName" id="fullName" 
            value={fullName} onChange={this.onChanged}/>

          <div className="row">
            <div className="col-sm-6">
              <label className="col-form-label" htmlFor="host">IP-адрес</label>
              <input disabled={readOnly} type="text" className="form-control" placeholder="host" id="host" 
                value={host} onChange={this.onChanged}/>
            </div>
            <div className="col-sm-6">
              <label className="col-form-label" htmlFor="port">Порт</label>
              <input disabled={readOnly} type="number" className="form-control" placeholder="port" id="port" 
              value={port} onChange={this.onChanged}/>
            </div>
          </div>
          


          <div className="row h-100 d-flex justify-content-center align-items-center">
            <div className="col-sm-6">
              <div className="custom-control custom-switch">
                <input disabled={readOnly} type="checkbox" className="custom-control-input" id="replEnab" 
                checked={replEnab} onChange={this.onChanged}/>
                <label className="custom-control-label" htmlFor="replEnab">Репликация включена</label>
              </div>
            </div>

            <div className="col-sm-6">
              <label className="col-form-label" htmlFor="replFreqMs">Частота реплицирования (мс.)</label>
              <input disabled={readOnly} type="number" className="form-control" placeholder="replFreqMs" id="replFreqMs" 
              value={replFreqMs} onChange={this.onChanged}/>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label className="col-form-label" htmlFor="lastReplDate">Дата последней репликации</label>
              <input readOnly type="text" className="form-control" placeholder="lastReplDate" id="lastReplDate" 
              value={lastReplDate} />
            </div>
            <div className="col-sm-6">
              <label className="col-form-label" htmlFor="replError">Наличие ошибок при последней репликации</label>
              <input readOnly type="text" className="form-control" placeholder="replError" id="replError"
              value={(replError) ? 'есть' : 'отсутствуют'}/>
            </div>
          </div>              
          

          <div className="row">
            <div className="col-sm-6">
              <label className="col-form-label" htmlFor="lat">Широта</label>
              <input disabled={readOnly} type="number" className="form-control" placeholder="lat" id="lat" 
              value={lat} onChange={this.onChanged}/>
            </div>
            <div className="col-sm-6">
              <label className="col-form-label" htmlFor="lon">Долгота</label>
              <input disabled={readOnly} type="number" className="form-control" placeholder="lon" id="lon" 
              value={lon} onChange={this.onChanged}/>
            </div>
          </div>

          <div className="row pt-3">
            <div className="col-12 d-flex justify-content-end">
              <button type="button" className="btn btn-primary" onClick={this.props.updateStationInfo}>
                {spinner}
                  Сохранить
                </button>
            </div>
          </div>  

        </div>
      );
  }
}