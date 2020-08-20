
import React, {Component} from 'react';
import ReactDOM, { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
import './mapctrl.css';

export default class MapCtrl extends Component{

  onPopupChooseStation(id) {
    console.log(id);
    this.props.setCurrentStationAndContentToggle(id, 'details');
  }

  

  render(){
    const { currentStation } = this.props;
    const { stations } = this.props;
    //          icon="./img/spider/spider_48.png"

    const icoBlack = new Icon({
      iconUrl: './img/spider/spider_black_48.png',
      iconSize: [20, 20], 
    });

    const icoRed = new Icon({
      iconUrl: './img/spider/spider_red_48.png',
      iconSize: [20, 20],
    });    

    const markers = stations.map( (station) => {
      if ( (!station.lat) || (!station.lat) ) return null;
      return (                
        <Marker key={station.id}
          position={[station.lat, station.lon]}
          icon={(station.replError) ? icoRed : icoBlack}
          >
          <Popup>
            <div className="d-flex flex-column">
              <h5><a href="" onClick={(e) => { e.preventDefault(); this.onPopupChooseStation(station.id) }}>{station.displayName}</a></h5>
              Посл.репликация: {station.lastReplDate}
            </div>
          </Popup>
        </Marker>
      )
    })

    const position = [54.9646539856494, 83.1201339945816];
    let center = [54.550301, 87.802674];
    let zoom = 4;
    const centerStation = stations.find( (el) => { return el.id === currentStation} );

    if (centerStation ){
      center = [centerStation.lat, centerStation.lon] ;
      zoom = 13;
    }
    
    const map = (
      <Map center={center} zoom={zoom} style={{ height: 'calc(100vh - 200px)'}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {markers}
      </Map>
    )

    return (
      <div>
        <h1>{(centerStation) ? "ст." + centerStation.displayName : "Карта родины"}</h1>
        {map}  
      </div>

    );



    
  }
}

/*
class PopupLink extends Component {

  render(){
    return (
      <div>
        <button className="btn btn-link">Детальная информация</button>
      </div>
    )
  }
}
*/