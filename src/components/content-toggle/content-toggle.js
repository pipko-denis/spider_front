import React, {Component} from 'react';
import './content-toggle.css';

export default class ContentToggle extends Component{

  render(){

    const { currentContentType, onContentToggle } = this.props;

    const buttonsArray = [
        { label: 'Карта', statusName: 'mapctrl', id: 1 },
        { label: 'Детальная информация', statusName: 'details', id: 2 }
        
    ];

    //console.log('currentContentType='+currentContentType);

    const buttons = buttonsArray.map( (el) => {
        //console.log(el.statusName);
        return (<button type="button" 
          className={`btn btn${(currentContentType === el.statusName) ? "-secondary" : "-outline-second"}`} 
                        onClick={ () => onContentToggle( el.statusName ) } 
                        key={el.id}
                >
                  {el.label}
                </button>);
    })

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }


}



