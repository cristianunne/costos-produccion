import React, { useContext, useEffect, useState } from 'react'
import { DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';

import CalendarIcon from '../../../icons/CalendarIcon'
import { getDaysPresentQuery } from '../../../utility/Procesamiento';
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';

const MonthsItem = ({ text_month, number_month, isPresent, base_month }) => {


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
        textStatusQuery, setTextStatusQuery
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
        rodalesPresent, setRodalesPresent,
        empresasPresent, setEmpresasPresent,
        materialesPresent, setMaterialesPresent,
        elaboradorPresent, setElaboradorPresent,
        choferesPresent, setChoferesPresent,
        transportistaPresent, setTransportistaPresent,
        compradorPresent, setCompradorPresent,
        yearsPresent, setYearsPresent,
        monthsPresent, setMonthsPresent,
        daysPresent, setDaysPresent
    } = useContext(PresentGlobalContext);


    const [active, setActive] = useState();


    const onClickHandler = () => {

        if (!active) {
            setActive(true);

            //tengoque haceruna seleccion considerando
            setDaysSelected([]);

            //imporante, porque tendria que pasarle rodales a la funcion que trae los meses
            //traigo los meses pasando los rodales y elyear seleccionado
            //controlo que no exista ya elnumero
            let is_present = false;

            monthsSelected.forEach(mont => {

                if (mont == base_month) {

                    is_present = true;

                }

            });

            if (!is_present) {

                let month_select = [...monthsSelected, base_month];
                setMonthsSelected(month_select);
                loadDaysPresent(month_select);

            }



        } else {
            setActive(false);

            //elimino el mes de los seleccionados
            let month_select =  _deleteMonthSelected(base_month);
            loadDaysPresent(month_select);
            console.log('months_new');
            console.log(month_select);
        }

    }

    const loadDaysPresent = async (mont_sel) => {
        //rodales_sel, materiales_sel, elaborador_sel, chofer_sel, transportista_sel, comprador_sel, years_sel

        const days_data = await getDaysPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected,
            choferesSelected, transportistaSelected, compradorSelected, yearsSelected, mont_sel);

        if (days_data) {

            setDaysPresent(days_data);

        }

        setStatusDays(!statusDays);

    }


    const _deleteMonthSelected = (month) => {

        let mon = [];

        monthsSelected.forEach(mon_ => {

            if(month != mon_){
                mon.push(mon_);
            }

        });

        setMonthsSelected(mon);
        return mon;

    }


    useEffect(() => {

        if (monthsSelected.length == 0) {

            setActive(false);

        }


    }, [active, monthsSelected]);


    return (
        <>
            {isPresent ? <button className="btn is_present btn-square btn-h-35 ps-1 pe-1 align-items-end btn-hover"
                onClick={onClickHandler}
                style={!active ? null : styles.active}>
                <CalendarIcon></CalendarIcon>

                {text_month}
            </button> :
                <button className="btn btn-outline-light btn-square btn-h-35 ps-1 pe-1 align-items-end btn-hover"

                    disabled

                    style={!active ? null : styles.active}

                >
                    <CalendarIcon></CalendarIcon>
                    {text_month}
                </button>
            }
        </>
    )
}

export default MonthsItem


const styles = {
    active: {
        backgroundColor: '#206bc4',
        color: '#e3e3e3'
    }
};