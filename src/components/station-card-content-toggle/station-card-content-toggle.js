import React, {Component} from 'react';
import './station-card-content-toggle.css';

export default class StationCardContentToggle extends Component{

  render(){

    const { currentContentType, onContentToggle } = this.props;

    const buttonsArray = [
      { label: 'Основное', statusName: 'main', id: 1, imagesrc: "./img/stationcard/station"},
      { label: 'Статистика', statusName: 'statistics', id: 2, imagesrc: "./img/stationcard/table" },        
      { label: 'Составы', statusName: 'trains', id: 3, imagesrc: "./img/stationcard/train" },
      { label: 'Дефекты', statusName: 'defects', id: 4, imagesrc: "./img/stationcard/tire" },
      { label: 'СКАТ', statusName: 'scat', id: 5, imagesrc: "./img/stationcard/stingray" },
      { label: 'Диаграммы', statusName: 'diag', id: 5, imagesrc: "./img/stationcard/statistics" },
      
    ];

    //console.log('currentContentType='+currentContentType);

    const buttons = buttonsArray.map( (el) => {
      console.log(el.imagesrc + `${(currentContentType === el.statusName) ? "_white" : "_black"}.png`);
      return (<button type="button" 
                      className={`btn btn${(currentContentType === el.statusName) ? "-primary" : "-outline-secondary"}`} 
                      onClick={ () => onContentToggle( el.statusName ) } 
                      key={el.id}
              >
                < img className="img-card-menu mb-1 mr-1" alt="person" 
                      src={el.imagesrc+`${(currentContentType === el.statusName) ? "_white" : "_black"}.png`}
                /> 
                {el.label}
              </button>);
    })

    return (
      <div className="btn-toolbar">
        {buttons}
      </div>
    );
  }


}



