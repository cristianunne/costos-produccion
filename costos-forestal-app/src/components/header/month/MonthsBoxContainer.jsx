import React, { useContext, useEffect, useState } from 'react'
import MonthsItem from './MonthsItem';
import { DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';

const MonthsBoxContainer = () => {

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

    const months = [
        {
            text_month: 'Ene',
            number_month: 1,
            base_month: '01'
        },
        {
            text_month: 'Feb',
            number_month: 2,
            base_month: '02'
        },
        {
            text_month: 'Mar',
            number_month: 3,
            base_month: '03'
        },
        {
            text_month: 'Abr',
            number_month: 4,
            base_month: '04'
        },
        {
            text_month: 'May',
            number_month: 5,
            base_month: '05'
        },
        {
            text_month: 'Jun',
            number_month: 6,
            base_month: '06'
        },
        {
            text_month: 'Jul',
            number_month: 7,
            base_month: '07'
        },
        {
            text_month: 'Ago',
            number_month: 8,
            base_month: '08'
        },
        {
            text_month: 'Sep',
            number_month: 9,
            base_month: '09'
        },
        {
            text_month: 'Oct',
            number_month: 10,
            base_month: '10'
        },
        {
            text_month: 'Nov',
            number_month: 11,
            base_month: '11'
        },
        {
            text_month: 'Dic',
            number_month: 12,
            base_month: '12'
        },

    ]

    const [items, setItems] = useState([]);


    const createItems = () => {

        let it_ = []

        if (monthsPresent.length > 0) {

            months.forEach((element, index) => {

                //consultar por si el mes esta presente
                let is_present = false;
                monthsPresent.forEach(m_present => {

                    if(m_present.month == element.base_month){

                        is_present = true;

                    }
                });

                it_.push(<MonthsItem text_month={element.text_month}
                    number_month={element.number_month} base_month={element.base_month} key={index}
                    isPresent={is_present}></MonthsItem>);


            });


        } else {

            months.forEach((element, index) => {

                it_.push(<MonthsItem text_month={element.text_month}
                    number_month={element.number_month} base_month={element.base_month} key={index}
                    isPresent={false}></MonthsItem>);
            });

        }



        setItems(it_);
    }




    useEffect(() => {
        setItems(null);
        createItems();

    }, [statusMonths]);

    return (
        <div className="col-xl-6 d-flex gap-1 month-container justify-content-center pt-3" >

            {items}

        </div>
    )
}

export default MonthsBoxContainer