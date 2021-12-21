import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DateRangePicker from '../components/DateRangePicker';
import { fetchDataSet } from '../services/apiService';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

export default function GraphOverlay() {
  const [span, setSpan] = useState('');
  const [isDatePicking, setIsDatePicking] = useState(false);
  const [dataset, setDataset] = useState([]);
  let data = {};
  useEffect(() => {
    if (!span) return;
    setDataset([]);
    fetchDataSet(span, setDataset);
  }, [span]);

  const setSpanFromNow = (daySpan) => {
    const date = new Date();
    date.setDate(date.getDate() - daySpan);
    console.log(date.toISOString());
    setSpan(
      `from=${date.toISOString()}&to=${new Date().toISOString()}`
    );
  };

  if (dataset[0]) {
    data = dataset.map((country) => {
      return {
        name: country[0].Country,
        innerData: {
          labels: country.map((val) =>
            val.Province ? val.Province : val.Date
          ),
          datasets: [
            {
              label: 'Death',
              fill: false,
              lineTension: 0.5,
              backgroundColor: '#ff0000',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: country.map((val) => val.Deaths),
            },
            {
              label: 'Active',
              fill: false,
              lineTension: 0.5,
              backgroundColor: '#3c00ff',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: country.map((val) => val.Active),
            },
            {
              label: 'Recovered',
              fill: false,
              lineTension: 0.5,
              backgroundColor: '#ffe600',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: country.map((val) => val.Recovered),
            },
          ],
        },
      };
    });
  }
  return (
    <div className='container'>
      <div className='control-panel'>
        <Stack spacing={2} direction='row'>
          <Button
            variant='contained'
            onClick={() => setSpanFromNow(1)}
          >
            Yesterday
          </Button>
          <Button
            variant='contained'
            onClick={() => setSpanFromNow(7)}
          >
            Last Week
          </Button>
          <Button
            variant='contained'
            onClick={() => setSpanFromNow(31)}
          >
            Last Month
          </Button>
          <Button
            variant='contained'
            onClick={() => setIsDatePicking(true)}
          >
            Specifc Span
          </Button>
        </Stack>
        {isDatePicking && (
          <DateRangePicker
            setSpan={setSpan}
            setIsDatePicking={setIsDatePicking}
          />
        )}
        {dataset[0] &&
          data.map((val) => (
            <div className='chart-disp'>
              <h1>{val.name}</h1>
              <Line
                data={val.innerData}
                options={{
                  title: {
                    display: true,
                    text: 'Average Rainfall per month',
                    fontSize: 20,
                  },
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
