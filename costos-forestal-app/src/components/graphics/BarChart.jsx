import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const BarChart = ({ title, labels, data_graphic, name_serie, border_color, background_color, reload }) => {

  const [data, setData] = useState(null);
  const [isReload, setIsReload] = useState(false);


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        font: { weight: 'bold', size: 16 },
      },
    },
  };

  const createDataset = () => {

    if (!isReload) {
      setData({

        datasets: [
          {
            label: name_serie,
            data: data_graphic,
            borderColor: border_color,
            backgroundColor: background_color,
          }
        ],

      });
      setIsReload(true);

    }

  }



  useEffect(() => {

    console.log('data_graphic');
    console.log(data_graphic);

    if (data_graphic != null && data_graphic != undefined) {

      createDataset();

    }
  }, [data_graphic, isReload])

  return (
    <>
      {data != null ? <Bar options={options} data={data} /> : null}

    </>
  )
}

export default BarChart