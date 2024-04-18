import React, { useContext, useEffect, useState } from 'react'
import { CostosGlobalContext, DataGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import DayIcon from '../../../icons/DayIcon'
import { getExtraccionDataFunction, getMetadataFunctionForestal } from '../../../utility/Procesamiento';

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
        statusDays, setStatusDays,
        statusQuery, setStatusQuery,
        textStatusQuery, setTextStatusQuery,
        levels, setLevels,
        isLoading, setIsLoading,
        statusLevels, setStatusLevels
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

    const {
        pagesExtraccion, setPagesExtraccion,
        numberDataExtraccion, setNumberDataExtraccion,
        dataExtraccion, setDataExtraccion,
        isLoadingTableExtraccion, setIsLoadingTableExtraccion,
        currentPageExtraccion, setCurrentPageExtraccion
    } = useContext(CostosGlobalContext);

    const [active, setActive] = useState();


    const onClickHandler = async () => {

        if (!active) {
            setActive(true);
            setDaysSelected([...daysSelected, number_day]);

            let days_select = [...daysSelected, number_day];

            //cargo la tabla extraccion
            setIsLoading(true);
            setIsLoadingTableExtraccion(false);
            await processQuery(days_select);
            setIsLoadingTableExtraccion(true);
            setIsLoading(false);


        } else {

            setActive(false);

            //elimino el mes de los seleccionados
            let days_select = _deleteDaysSelected(number_day);

            //cargo la tabla extraccion
            setIsLoading(true);
            setIsLoadingTableExtraccion(false);
            await processQuery(days_select);
            setIsLoadingTableExtraccion(true);
            setIsLoading(false);

        }

    }

    const _deleteDaysSelected = (day_select) => {

        let day = [];

        daysSelected.forEach(day_ => {

            if (day_select != day_) {
                day.push(day_);
            }

        });

        setDaysSelected(day);
        return day;

    }


    const processQuery = async (days_select) => {

        const metadata = await getMetadataFunctionForestal(empresasSelected, rodalesSelected, materialesSelected,
            elaboradorSelected, choferesSelected, transportistaSelected, compradorSelected, yearsSelected, monthsSelected,
            days_select);



        if (metadata) {

            //tengo que traer los datos de costos y luego setear los metadatos
            const data_extraccion = await getExtraccionDataFunction(empresasSelected, rodalesSelected, materialesSelected,
                elaboradorSelected, choferesSelected, transportistaSelected, compradorSelected, yearsSelected, monthsSelected,
                days_select, 1);

            if (data_extraccion) {

                setNumberDataExtraccion(metadata.cantidad);
                setPagesExtraccion(metadata.pages);
                setDataExtraccion(data_extraccion);

            }

        }

    }



    useEffect(() => {

        //console.log(dataCostos);
        if (daysSelected.length == 0) {

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