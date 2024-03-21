import React, { useContext, useEffect, useState } from 'react'
import { getRodalesAPI } from '../../../utility/Querys'
import { DataGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import RodalesItem from './RodalesItem';
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';

const RodalesBoxContainer = () => {


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


    const [listItems, setListItems] = useState();
    const [listItemsDinamic, setListItemsDinamic] = useState();



    const createItems = (rodales_) => {

        setListItems([]);

        let rodales = _ordenarData(rodales_);

        let items_ = [];

        //ACA PUEDE HABER RODALES SELECCIONADOS, DEBO MANTENERLOS

        if (rodalesSelected.length == 0) {

            Object.entries(rodales).forEach(([key, value]) => {

                //tengo que crear los items aca
                let item = <RodalesItem name_rodal={value.rodal} idrodal={value.objnr}
                    rodal={value} key={value.objnr} is_active={false}></RodalesItem>
                items_.push(item);

            });

        } else {

            //aca esta el problema

            Object.entries(rodales).forEach(([key, value]) => {

                let exist = false;

                rodalesSelected.forEach(rod_sel => {

                    if (rod_sel == value.rodal) {

                        exist = true;

                    }

                });

                if(exist){
                     //tengo que crear los items aca
                     let item = <RodalesItem name_rodal={value.rodal} idrodal={value.objnr}
                     rodal={value} key={value.objnr} is_active={true}></RodalesItem>
                 items_.push(item);

                } else {
                     //tengo que crear los items aca
                     let item = <RodalesItem name_rodal={value.rodal} idrodal={value.objnr}
                     rodal={value} key={value.objnr} is_active={false}></RodalesItem>
                 items_.push(item);

                }

            });


        }

        setListItems(items_);
        setListItemsDinamic(items_);
    }


    const _ordenarData = (data_rod) => {

        data_rod.sort(function (a, b) {
            if (a.rodal > b.rodal) {
                return 1;
            }
            if (a.rodal < b.rodal) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        return data_rod;

    }




    useEffect(() => {


        console.log('reinicio de ROdales box');

       
        if (rodalesData != null && rodalesData.length > 0) {

    
            setListItems(null);
            createItems(rodalesData);

        } else {
            setListItems(null);
            setListItemsDinamic(null);
        }



    }, [statusRodales])


    return (
        <>
            {listItems}

        </>
    )
}

export default RodalesBoxContainer