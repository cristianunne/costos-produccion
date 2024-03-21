import React, { useContext, useEffect, useState } from 'react'
import { DataGlobalContext, PresentGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import MaterialesItem from './MaterialesItem';

const MaterialesBoxContainer = () => {

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


    const createItems = () => {

     
        let items_ = [];
        //deberia filtrar segun el materialesPresent
        if (materialesPresent.length > 0) {

            let items_aux = [];
        
            materialesPresent.forEach(mat_pres => {

                materialesData.forEach(value => {


                    if(value.matnr == mat_pres.material){

                        /*items_.push(<MaterialesItem material={value.maktx} idmaterial={value.matnr}
                            key={value.matnr} is_present={true} is_active={false}></MaterialesItem>);*/

                            items_aux.push(value);
                    }

                });
            });

            let items_ord = _ordenarData(items_aux);

            items_ord.forEach(value => {

                items_.push(<MaterialesItem material={value.maktx} idmaterial={value.matnr}
                            key={value.matnr} is_present={true} is_active={false}></MaterialesItem>);

            });



        } else {

            materialesData.forEach(value => {

                items_.push(<MaterialesItem material={value.maktx} idmaterial={value.matnr}
                    key={value.matnr} is_present={false} is_active={false}></MaterialesItem>);

            });

        }

        //aca puedo ordenar antes de llenar



        setListItems(items_);

    }


    const _ordenarData = (data_mat) => {

        data_mat.sort(function (a, b) {
            if (a.maktx > b.maktx) {
                return 1;
            }
            if (a.maktx < b.maktx) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        return data_mat;

    }

 

    useEffect(() => {

      
        if (materialesData != null && materialesData.length > 0) {
            createItems(materialesData);

        } else {
            setListItems(null);
            setListItemsDinamic(null);
        }

    }, [statusMateriales])

    return (
        <>
            {listItems}

        </>
    )
}

export default MaterialesBoxContainer