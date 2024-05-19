import React, { useContext, useEffect, useState } from 'react'
import { DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import YearsItem from './YearsItem';
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';

import HeadersYearsPlaceholder from '../../placeholders/HeadersYearsPlaceholder'

const YearsBoxContainer = () => {

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
        isLoading, setIsLoading
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




    const [listItems, setListItems] = useState();
    const [listItemsDinamic, setListItemsDinamic] = useState();

    const [yearState, setYearState] = useState(false);


    const createItems = (years) => {

        setYearState(false);
        setIsLoading(true);

        let has_rodales_select = false;
        //ordenar lista
        if (statusQuery && textStatusQuery != ORIGIN_QUERY.YEARS) {
            has_rodales_select = true;
        }

        let items_ = [];
        Object.entries(years).forEach(([key, value]) => {

            //tengo que recorrer rodales selected para ver si estamos presentes
            let is_present = false;
            yearsPresent.forEach(year => {
                if (parseInt(value) == year) {
                    is_present = true;
                }
            })

            //tengo que crear los items aca
            let item = <YearsItem year={value} isPresent={is_present}
                has_rodales_select={has_rodales_select} key={key + value}></YearsItem>
            items_.push(item);

        });



        setListItems(items_);
        setListItemsDinamic(items_);

        setYearState(true);
        setIsLoading(false);

    }




    useEffect(() => {

        if (yearsData != null && yearsData.length > 0) {
            createItems(yearsData);


        } else {
            setListItems(null);
            setListItemsDinamic(null);
        }



    }, [statusYears])



    return (


        <>
            {!yearState ? <HeadersYearsPlaceholder></HeadersYearsPlaceholder> : 
            <div className="col-xxl-6 col-xl-6 col-lg-12 pt-3 pb-2">

                <div className='d-flex gap-1 years-container justify-content-start'>
                    {listItems}
                </div>


            </div>
            }
        </>



    )
}

export default YearsBoxContainer