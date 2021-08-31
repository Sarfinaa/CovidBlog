import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import './LineGraph.css'

const options = {
  legend: {
    display: false,
    
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType='cases') => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };
function LineGraph({casesType='cases',darkMode,...props}) {
    const [data, setData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
          await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              let chartData = buildChartData(data, casesType);
              setData(chartData);
            
              // buildChart(chartData);
            });
        };
    
        fetchData();
      }, [casesType,data]);
    
    return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
        
          data={{
            datasets: [
              {
                backgroundColor: `${!darkMode&&((casesType==='cases'&&'rgb(255,225,230)')||(casesType==='recovered'&&'rgb(228,244,231)')||(casesType==='deaths'&&'rgb(221,222,225)')) 
               || darkMode&&((casesType==='cases'&&'rgb(49,19,37)')||(casesType==='recovered'&&'rgb(22,38,38)')||(casesType==='deaths'&&'rgb(25,25,40)'))}`,
                borderColor: `${casesType==='cases'&&'rgb(255,6,57)'||casesType==='recovered'&&'rgb(40,167,69)'||casesType==='deaths'&&'rgb(108,117,125)'}`,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph
