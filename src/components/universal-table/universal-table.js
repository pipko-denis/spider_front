
import React, {Component} from 'react';
import './universal-table.css';

export default class UniversalTable extends Component{


  renderTableHead(arr) {

    if (!arr) {
      return null
    }

    return arr.map((item) => {
      const { id, caption } = item;

      return (
        <th scope="col" key={id}>{caption}</th>
      );
    });
  }  



  renderItems(items,columns) {

    if (!items) {
      return (
        <tr key={1}>
          <th scope="row"></th>
          <td></td><td></td><td></td><td></td>
        </tr>
      );
    }


    return items.map((item) => {
      return (
        <tr key={"row"+item.id}>
          {this.renderItem(item,columns)}
        </tr>
      );
    });
  }  

  renderItem(item,columns){
    return columns.map((column) => {
      return (
        <th key={'cell-' + item.id+'-'+column.id}>{item[column.field]}</th>
      );
    });
  }

  getColumns() {
    if (this.props.currentContentType === 'trains') {
      return  [
          { caption: 'ID', field: 'id', id: 1 },
          { caption: 'Дата', field: 'dateTime', id: 2 },
          { caption: 'Кол. вагонов', field: 'wagonCount', id: 3 },
          { caption: 'Кол. осей', field: 'wheelCount', id: 4 },
          { caption: 'Кол. осей локомотива', field: 'locomotionWheelCount', id: 5 },
          { caption: 'Скорость', field: 'speed', id: 6 },
        ]
    }

    if (this.props.currentContentType === 'slice') {
      return [
        { caption: 'Дата среза данных', field: 'onDate', id: 1 },
        { caption: 'Всего составов', field: 'trainsPassedCount', id: 2 },
        { caption: 'Составов без вагонов', field: 'trainsWoWagons', id: 3 },
        { caption: 'Всего вагонов', field: 'carsPassedCount', id: 4 },
        { caption: 'Всего осей', field: 'wheelsPassedCount', id: 5 },
        { caption: 'Т1', field: 'warnWheelsCount', id: 6 },
        { caption: 'Т2', field: 'alarmWheelsCount', id: 7 },
        { caption: 'СКАТ (передано)', field: 'trainsCountSendToScat', id: 8 },
        { caption: 'СКАТ (ошибки)', field: 'trainsCountScatFail', id: 9 },
      ]
    }

    if (this.props.currentContentType === 'impulse') {
      return [
        { caption: 'ID', field: 'id', id: 1 },
        { caption: 'Дата', field: 'date', id: 2 },
        { caption: 'Время', field: 'time', id: 3 },
        { caption: 'Вагон', field: 'carNumber', id: 4 },
        { caption: 'Ось вагона', field: 'axleNumberInCar', id: 5 },
        { caption: 'Ось состава', field: 'axleInTrain', id: 6 }, 
        { caption: 'Сторона', field: 'side', id: 7 },
        { caption: 'Скорость', field: 'speed', id: 8 },
        { caption: 'Тревога модель', field: 'trevogaModelMax', id: 9 },
        { caption: 'Тревога порог', field: 'trevogaPorogiMax', id: 10 },
      ]
    }    
    if (this.props.currentContentType === 'scat') {
      return [
        { caption: 'ID', field: 'id', id: 1 },
        { caption: 'Дата', field: 'dtBeg', id: 2 },
        { caption: 'Код ответа', field: 'resultCode', id: 3 },
        { caption: 'Сообщение ответа', field: 'resultMessage', id: 4 },
        { caption: 'ID состава', field: 'trainId', id: 5 },
        { caption: 'Отправленное сообщение', field: 'trainData', id: 6 },
      ]
    }

    if (this.props.currentContentType === 'tables') {
      return [
        { caption: 'ID', field: 'id', id: 1 },
        { caption: 'Дата', field: 'kdcTableName', id: 2 },
        { caption: 'Код ответа', field: 'remoteTableName', id: 3 },
        { caption: 'Кол. репл. записей', field: 'replRecCount', id: 4 },
        { caption: 'Репликация Вкл/выкл ', field: 'replicate', id: 5 },
        { caption: 'Состояние в данный момент', field: 'replState', id: 6 },
        { caption: 'Дата начала посл. репликации', field: 'lastReplStart', id: 7 },
        { caption: 'Дата окончания посл. репликации', field: 'lastReplDate', id: 8 },
        { caption: 'ошибки посл. репликации', field: 'lastReplError', id: 9 },
        
        
      ]
    }       

  }

  formatDate(curDate) {
    const resDate = new Date(Date.UTC(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), 0, 0, 0))
    //console.log(curDate, curDate.getFullYear() + '-' + curDate.getMonth() + '-' + curDate.getDate())
    //console.log(resDate.toISOString().substr(0, 10))
    return resDate.toISOString().substr(0, 10);//curDate.getFullYear()+'-'+curDate.getMonth()+'-'+curDate.getDate();    
  }  

  setImpulseParentState = (event) => {
    this.props.setStateByPropName('dtBeg', event.target.value);
    this.props.setStateByPropName('dtEnd', event.target.value);
  };

  setParentStateByPropName = (event) => {
    //console.log(event.target.value)
    this.props.setStateByPropName(event.target.id, event.target.value)
  };

  onChanged(){

  }

  sideFilterOnlyOneSideDefects(){

  }

  getTableToolbar(){
    const { dtBeg, dtEnd, loadingState, currentContentType } = this.props;

    const spinner = (loadingState) ? <span className="spinner-border spinner-border-sm mr-1" id="spinerLogs" role="status" aria-hidden="false" ></span> : null;

    if (currentContentType === 'impulse') {
      return ( 
        <div className="row">
          <div className="col-4">
            <input className="form-control" type="date" value={dtBeg} id="dtBeg" onChange={this.setImpulseParentState} />
          </div>
          <div className="custom-control custom-switch">
            <input type="checkbox" className="custom-control-input" id="sideFilterOnlyOneSideDefects"
              checked={this.sideFilterOnlyOneSideDefects} onChange={this.onChanged} />
            <label className="custom-control-label" htmlFor="sideFilterOnlyOneSideDefects">Все дефекты</label>
          </div>          
          <div className="col-4">
            <button type="button" className="btn btn-primary" onClick={this.props.loadData}>
              {spinner}
                Загрузить
              </button>
          </div>
        </div> 
       )
    } else {
      return (      
        <div className="row">
          <div className="col-4">
            <input className="form-control" type="date" value={dtBeg} id="dtBeg" onChange={this.setParentStateByPropName} />
          </div>
          <div className="col-4">
            <input className="form-control" type="date" value={dtEnd} id="dtEnd" onChange={this.setParentStateByPropName} />
          </div>
          <div className="col-4">
            <button type="button" className="btn btn-primary" onClick={this.props.loadData}>
              {spinner}
                Загрузить
              </button>
          </div>
        </div>     
      )
    }
  }

  render(){    


    const { tableName, tableData} = this.props;

    const columns = this.getColumns();

    const tableHeader = this.renderTableHead(columns);

    const items = this.renderItems(tableData, columns);

    const toolbar = this.getTableToolbar();



    return (
      <div className="p-2 border rounded">
        <div className="row"><div className="col-sm-3"><h5>{tableName}</h5></div></div>
        {toolbar}       
        <table className="table table-hover mt-1">
          <thead>            
            <tr className="table-primary">
              {tableHeader}              
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