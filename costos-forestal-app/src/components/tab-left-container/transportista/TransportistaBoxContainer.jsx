import React, { useContext, useEffect, useState } from 'react'
import { DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import TransportistaItem from './TransportistaItem';

const TransportistaBoxContainer = () => {

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




    const [listItems, setListItems] = useState();
    const [listItemsDinamic, setListItemsDinamic] = useState();

    const createItems = (transportistas_) => {

        //ordeno la data

        let transportistas = _ordenarData(transportistas_);
        let items_ = [];

        if(statusQuery){
            if (transportistaPresent.length > 0) {

                let ites_aux = [];
    
                transportistaPresent.forEach(tran_present => {
    
                    Object.entries(transportistas).forEach(([key, value]) => {
    
                        if (value.idtransporte == tran_present.idtransporte) {
    
                            ites_aux.push(value);
    
                        }
    
                    });
                });
    
                //ordeno ies_aux
    
                let items_aux_ord = _ordenarData(ites_aux);
    
                Object.entries(items_aux_ord).forEach(([key, value]) => {
    
                    let item = <TransportistaItem name_transportista={value.txttransporte} idtransportista={value.idtransporte}
                        transportista={value} key={key + value.idtransporte} is_present={true}></TransportistaItem>
                    items_.push(item);
    
                });
    
    
    
            } 

        } else {
            if (transportistaPresent.length > 0) {

                let ites_aux = [];
    
                transportistaPresent.forEach(tran_present => {
    
                    Object.entries(transportistas).forEach(([key, value]) => {
    
                        if (value.idtransporte == tran_present.idtransporte) {
    
                            ites_aux.push(value);
    
                        }
    
                    });
                });
    
                //ordeno ies_aux
    
                let items_aux_ord = _ordenarData(ites_aux);
    
                Object.entries(items_aux_ord).forEach(([key, value]) => {
    
                    let item = <TransportistaItem name_transportista={value.txttransporte} idtransportista={value.idtransporte}
                        transportista={value} key={key + value.idtransporte} is_present={true}></TransportistaItem>
                    items_.push(item);
    
                });
    
    
    
            } else {
    
                Object.entries(transportistas).forEach(([key, value]) => {
    
                    //tengo que crear los items aca
                    let item = <TransportistaItem name_transportista={value.txttransporte} idtransportista={value.idtransporte}
                        transportista={value} key={key + value.idtransporte} is_present={false}></TransportistaItem>
                    items_.push(item);
    
                });
    
            }

        }


      


        setListItems(items_);
        setListItemsDinamic(items_);


    }


    const _ordenarData = (data_trans) => {

        data_trans.sort(function (a, b) {
            if (a.txttransporte > b.txttransporte) {
                return 1;
            }
            if (a.txttransporte < b.txttransporte) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        return data_trans;

    }


    useEffect(() => {

        if(statusQuery){
            createItems(transportistaData);
        } else {

            if (transportistaData != null && transportistaData.length > 0) {
                createItems(transportistaData);
    
            } else {
                setListItems(null);
                setListItemsDinamic(null);
            }

        }


    

    }, [statusTransportista])


    return (
        <>
            {listItems}

        </>
    )
}

export default TransportistaBoxContainer