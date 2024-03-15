import React, { useContext, useEffect, useState } from 'react'
import { DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import ElaboradorItem from './ElaboradorItem';

const ElaboradorBoxContainer = () => {

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
        compradorDinamicData, setCompradorDinamicData
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



    const createItems = (elaboradores_) => {


        let elaboradores = _ordenarData(elaboradores_);
        let items_ = [];

        //tengo que verificar los selecteds


        if (statusQuery) {
            if (elaboradorPresent.length > 0) {

                let ites_aux = [];


                elaboradorPresent.forEach(ela_pres => {

                    Object.entries(elaboradores).forEach(([key, value]) => {

                        if (ela_pres.idelaborador == value.idelaborador) {

                            ites_aux.push(value);

                        }

                    });

                });

                   //ordeno ies_aux

                   let items_aux_ord = _ordenarData(ites_aux);

                   Object.entries(items_aux_ord).forEach(([key, value]) => {
   
                       //tengo que crear los items aca
                       let item = <ElaboradorItem name_elaborador={value.txtelaborador} idelaborador={value.idelaborador}
                           elaborador={value} key={key + value.idelaborador} is_present={true}></ElaboradorItem>
                       items_.push(item);
   
   
                   });
   
            }

        } else {


            if (elaboradorPresent.length > 0) {

                let ites_aux = [];


                elaboradorPresent.forEach(ela_pres => {

                    Object.entries(elaboradores).forEach(([key, value]) => {

                        if (ela_pres.idelaborador == value.idelaborador) {

                            ites_aux.push(value);

                        }

                    });

                });

                //ordeno ies_aux

                let items_aux_ord = _ordenarData(ites_aux);

                Object.entries(items_aux_ord).forEach(([key, value]) => {

                    //tengo que crear los items aca
                    let item = <ElaboradorItem name_elaborador={value.txtelaborador} idelaborador={value.idelaborador}
                        elaborador={value} key={key + value.idelaborador} is_present={true}></ElaboradorItem>
                    items_.push(item);


                });



            } else {

                Object.entries(elaboradores).forEach(([key, value]) => {

                    //tengo que crear los items aca
                    let item = <ElaboradorItem name_elaborador={value.txtelaborador} idelaborador={value.idelaborador}
                        elaborador={value} key={key + value.idelaborador}></ElaboradorItem>
                    items_.push(item);

                });

            }

        }





        setListItems(items_);
        setListItemsDinamic(items_);


    }



    const _ordenarData = (data_trans) => {

        data_trans.sort(function (a, b) {
            if (a.txtelaborador > b.txtelaborador) {
                return 1;
            }
            if (a.txtelaborador < b.txtelaborador) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        return data_trans;

    }




    useEffect(() => {

        //Si el status esta activo debo pintar cuando sea null

        if (statusQuery) {
          
            createItems(elaboradorData);
        } else {
        
            if (elaboradorData != null && elaboradorData.length > 0) {
                createItems(elaboradorData);

            } else {
                setListItems(null);
                setListItemsDinamic(null);
            }

        }



    }, [statusElaborador])

    return (
        <>
            {listItems}

        </>
    )
}

export default ElaboradorBoxContainer