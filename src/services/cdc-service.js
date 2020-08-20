export default class SwapiService {

  //_apiBase = 'http://172.25.78.88:8080/spider/';
  _apiBase = 'http://172.25.78.109:8080/';
  _headers = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              }

  getStations = async () => {
    const res = await fetch(`${this._apiBase}api/stations`, {
      headers: this._headers
    });

    if (!res.ok) {
      const body = await res.json();
      console.log(body);
      throw new Error(`Не удалось загрузить список станций, статус: ${res.status}`)
    }
    const body = await res.json();
    return body;
  }

  getDaySliceByPeriodStation = async (stationId,dtBeg,dtEnd) => {
    const res = await fetch(`${this._apiBase}api/slice/${stationId}/${dtBeg}/${dtEnd}`, {
      headers: this._headers
    });

    if (!res.ok) {
      const body = await res.json();
      console.log(body);
      throw new Error(`Не удалось загрузить список суммарных данных по дефектам, статус: ${res.status}`)
    }
    const body = await res.json();
    return body;
  }


  getStation = async (id) => {
    const res = await fetch(`${this._apiBase}api/stations/${id}`, {
      headers: this._headers
    });

    if (!res.ok) {
      const body = await res.json();
      console.log(body);
      throw new Error(`Не удалось загрузить станцию по id, статус: ${res.status}`)
    }
    const body = await res.json();
    return body;
  }

  updateStationInfo = async (id, station) => {
    console.log(station);

    const res = await fetch(`${this._apiBase}api/stations/${id}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(station)
    });

    if (!res.ok) {
      const body = await res.json();
      console.log(body);
      throw new Error(`Не удалось обновить информацию по станци, статус: ${res.status}`)      
    }

    const body = await res.json();
    console.log(body)
    return body;
  }

}