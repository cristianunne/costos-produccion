import React, { useEffect, useState } from 'react'
import BarChart from '../graphics/BarChart'
import { getResumenProduccionForestalByYearsAPI } from '../../utility/Querys';

const ProduccionYearsGraphic = () => {

    const [data, setData] = useState();
    const [reload, setReload] = useState(false);

    const getProduccionByYears = async () => {

        const data_produccion = await getResumenProduccionForestalByYearsAPI(null);
        console.log(data_produccion);

        let data_graphic = [];

        if(data_produccion != null && data_produccion.length > 0){
          
            data_produccion.forEach(element => {

                data_graphic.push({'x' : element.year, 'y' : parseFloat(element.produccion)});

                
            });
           
        } 

        setData(data_graphic);

        setReload(true);

    }


    useEffect(() => {

        if(!reload){

            getProduccionByYears();

        }
       

    }, [reload])

    return (
       <BarChart title={'Resumen de Producción por Año (t)'} data_graphic={data} 
       name_serie={'Toneladas por Año (t)' } border_color={'rgb(255, 99, 132)'} 
       background_color={'rgba(0, 170, 0, 0.6)'} reload={reload}></BarChart>
    )
}

export default ProduccionYearsGraphic