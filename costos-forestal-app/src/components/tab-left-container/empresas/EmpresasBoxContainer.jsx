import React, { useContext, useEffect, useState } from 'react'
import EmpresasItem from './EmpresasItem';
import { DataGlobalContext, PresentGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';

const EmpresasBoxContainer = ({ empresas }) => {

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
        statusComprador, setStatusComprador } = useContext(StatusGlobalContext);

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
    const [idEmpresa, setIdEmpresa] = useState();


    const createItemsTabsEmpresas = () => {

        let items_ = [];


        if(empresasPresent.length > 0){

            let items_aux = [];
        
            empresasPresent.forEach(mat_pres => {

                empresasData.forEach(value => {


                    if(value.idempresa == mat_pres.idempresa){

                        /*items_.push(<MaterialesItem material={value.maktx} idmaterial={value.matnr}
                            key={value.matnr} is_present={true} is_active={false}></MaterialesItem>);*/

                            items_aux.push(value);
                    }

                });
            });

         
            items_aux.forEach(value => {

                items_.push(<EmpresasItem name_empresa={value.nombre}
                    idempresa={value.idempresa}
                    key={value.idempresa}
                    idEmpresa={idEmpresa}
                    setIdEmpresa={setIdEmpresa}
                    is_present={true}
                />);

            });


        } else {

            Object.entries(empresasDinamicData).forEach(([key, value]) => {

                //tengo que crear los items aca
                let item = <EmpresasItem name_empresa={value.nombre}
                    idempresa={value.idempresa}
                    key={value.idempresa}
                    idEmpresa={idEmpresa}
                    setIdEmpresa={setIdEmpresa}
                    is_present={false}
                />
                items_.push(item);
    
            });
    

        }

        
        setListItems(items_);
        setListItemsDinamic(items_);
        //setReloadEmpresa(reloadEmpresa ? false : true);

    }

    useEffect(() => {

        if (empresasData != null && empresasData.length > 0) {
           
            createItemsTabsEmpresas(empresasData);

        } else {
            setListItems(null);
            setListItemsDinamic(null);
        }

      

    }, [statusEmpresas])

    return (
        <>
            {listItems}
        </>
    )
}

export default EmpresasBoxContainer