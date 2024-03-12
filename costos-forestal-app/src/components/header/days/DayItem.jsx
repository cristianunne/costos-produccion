import React, { useContext, useEffect, useState } from 'react'
import { DataGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import DayIcon from '../../../icons/DayIcon'

const DayItem = ({ number_day, isPresent }) => {

    const {
        rodalesData, setRodalesData,
        rodalesDinamicData, setRodalesDinamicData,
        empresasData, setEmpresasData,
        empresasDinamicData, setEmpresasDinamicData,
        materialesData, setMaterialesData,
        materialesDinamicData, setMaterialesDinamicData,
        elaboradorData, setElaboradorData,
        elaboradorDinamicData, setElaboradorDinamicData,
        choferesData, setChoferesData,
        choferesDinamicData, setChoferesDinamicData,
        transportistaData, setTransportistaData,
        transportistaDinamicData, setTransportistaDinamicData,
        compradorData, setCompradorData,
        compradorDinamicData, setCompradorDinamicData,
        yearsData, setYearsData,
        yearsDinamicData, setYearsDinamicData,
        monthsData, setMonthsData,
        monthsDinamicData, setMonthsDinamicData,
        daysData, setDaysData,
        daysDinamicData, setDaysDinamicData
    } = useContext(DataGlobalContext);

    //traigo los reloads de los estados globales

    const {
        statusRodales, setStatusRodales,
          statusEmpresas, setStatusEmpresas,
          statusMateriales, setStatusMateriales,
          statusElaborador, setStatusElaborador,
          statusChoferes, setStatusChoferes,
          statusTransportista, setStatusTransportista,
          statusComprador, setStatusComprador,
          statusYears, setStatusYears,
          statusMonths, setStatusMonths,
          statusDays, setStatusDays 
        } = useContext(StatusGlobalContext);


    const {
        rodalesSelected, setRodalesSelected,
        empresasSelected, setEmpresasSelected,
        materialesSelected, setMaterialesSelected,
        elaboradorSelected, setElaboradorSelected,
        choferesSelected, setChoferesSelected,
        transportistaSelected, setTransportistaSelected,
        compradorSelected, setCompradorSelected,
        yearsSelected, setYearsSelected,
        monthsSelected, setMonthsSelected,
        daysSelected, setDaysSelected
    } = useContext(SelectedGlobalContext);

    const [active, setActive] = useState();


    const onClickHandler = () => {

        if(!active){
            setActive(true);
            setDaysSelected([...daysSelected, number_day]);
        } else {

            setActive(false);
        }

    }

    
    useEffect(() => {

        //console.log(dataCostos);
        if(daysSelected.length == 0){

            setActive(false);

        }
      

    }, [active, daysSelected]);



    return (
        <>
            {isPresent ? <button className="btn is_present btn-square btn-h-35 ps-1 pe-1 align-items-end btn-hover"
                onClick={onClickHandler}
                style={!active ? null : styles.active}>
                <DayIcon></DayIcon>
                
                {number_day}
            </button> :
                <button className="btn btn-outline-light btn-square btn-h-35 ps-1 pe-1 align-items-end btn-hover"

                    disabled

                    style={!active ? null : styles.active}

                >
                    <DayIcon></DayIcon>
                    {number_day}
                </button>
            }
        </>
    )
}

export default DayItem


const styles = {
    active: {
        backgroundColor: '#206bc4',
        color: '#e3e3e3'
    }
};