import React, { useState, useEffect } from "react";
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import {Helmet} from 'react-helmet';
import LineGraph from './LineGraph';
import './Tracker.css';
import { sortData } from './util';
import 'leaflet/dist/leaflet.css'
import {prettyPrintStat} from './util';

import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  Button
} from "@material-ui/core";

function Tracker({darkMode,setDarkMode}) {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries,setMapCountries]=useState([]);
  const [casesType,setCasesType]=useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all").then(res => res.json()).then(data => {
      setCountryInfo(data);
    });
  }, [])
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then(res => res.json())
        .then(data => {
          const countries = data.map(country => ({

            name: country.country,
            value: country.countryInfo.iso2
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`
  
    const info = async () => {
      await fetch(url).then(res => res.json()).then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
        if(countryCode!=='worldwide'){
setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
setMapZoom(4);     
        }else{
          setMapZoom(2);
        }
});
    };
    info();
  };

  const onDark=()=>{
    setDarkMode((prevmode)=>!prevmode);
  }
  return (
    <div className={`app ${darkMode?'onDarkMode':'offDarkMode'}`}>
      {!darkMode?(
         <Helmet>
         <style>{'body { background-color: rgb(255,255,255); }'}</style>
     </Helmet>
      ):(
        <Helmet>
        <style>{'body { background-color: rgb(22,22,37); }'}</style>
    </Helmet>
      )}
      
      <div className="app__left">
        <div className="app__header">

          <h1>COVID-19 TRACKER</h1>
          <Button variant="outlined" className={`${!darkMode?'selectoff':'selecton'}`} onClick={onDark}>{darkMode?'Light Mode':'Dark Mode'}</Button>
          <FormControl className={` app__dropdown `}>
            <Select className={`${!darkMode?'selectoff':'selecton'}`} variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country,index )=> <MenuItem  key={index}value={country.value}>{country.name}</MenuItem>)
              }

            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox isRed darkMode={darkMode}
          active={casesType==='cases'} 
          onClick={e=>setCasesType('cases')}
          title="Confirmed Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}></InfoBox>
          <InfoBox isGreen darkMode={darkMode} active={casesType==='recovered'}
          onClick={e=>setCasesType('recovered')} 
          title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}></InfoBox>
          <InfoBox darkMode={darkMode} isGrey
           active={casesType==='deaths'}
          onClick={e=>setCasesType('deaths')}
          title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}></InfoBox>
        </div>
        <Map darkMode={darkMode} casesType={casesType} center={mapCenter}
          zoom={mapZoom} 
          countries={mapCountries}/>
      </div>
      <Card className={`app__right ${darkMode?'onDarkMode':'offDarkMode'}`} elevation={0}> 
        <CardContent>
          <h3 className="Tablehead">Live Cases By Country</h3>
          <Table darkMode={darkMode} countries={tableData} />
          <h3 className={`app__graphTitle ${!darkMode?'Graphhead':'Graphhead'}`}>Worldwide new {casesType==='recovered'?'recoveries':`${casesType}`}</h3>
          <LineGraph className="app__graph" casesType={casesType} darkMode={darkMode}/>
        </CardContent>
      </Card>

    </div>
  );
}

export default Tracker;
