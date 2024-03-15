import React, { useContext, useEffect, useState } from 'react'
import { DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import CompradoresItem from './CompradoresItem';

const CompradoresBoxContainer = () => {

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

    const createItems = (compradores) => {

        let items_ = [];

        if(statusQuery){
            if (compradorPresent.length > 0) {

                compradorPresent.forEach(comp_pres => {
                    Object.entries(compradores).forEach(([key, value]) => {
    
                        if (comp_pres.comprador == value.comprador) {
    
                            //tengo que crear los items aca
                            let item = <CompradoresItem name_comprador={value.comprador} id_comprador={value.comprador}
                                transportista={value} key={value.comprador} is_present={true}></CompradoresItem>
                            items_.push(item);
                        }
    
                    });
    
                });
    
            }

        } else {

            if (compradorPresent.length > 0) {

                compradorPresent.forEach(comp_pres => {
                    Object.entries(compradores).forEach(([key, value]) => {
    
                        if (comp_pres.comprador == value.comprador) {
    
                            //tengo que crear los items aca
                            let item = <CompradoresItem name_comprador={value.comprador} id_comprador={value.comprador}
                                transportista={value} key={value.comprador} is_present={true}></CompradoresItem>
                            items_.push(item);
                        }
    
                    });
    
                });
    
            } else {
    
                Object.entries(compradores).forEach(([key, value]) => {
    
                    //tengo que crear los items aca
                    let item = <CompradoresItem name_comprador={value.comprador} id_comprador={value.comprador}
                        transportista={value} key={value.comprador} is_present={false}></CompradoresItem>
                    items_.push(item);
    
                });
    
            }

        }


     


        setListItems(items_);
        setListItemsDinamic(items_);

    }

    useEffect(() => {

        if(statusQuery){
            createItems(compradorData);

        } else {
            if (compradorData != null && compradorData.length > 0) {
                createItems(compradorData);
    
            } else {
                setListItems(null);
                setListItemsDinamic(null);
            }

        }


    
    }, [statusComprador])

    return (
        <>
            {listItems}

        </>
    )
}

export default CompradoresBoxContainer