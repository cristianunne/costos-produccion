import React, { useContext, useEffect, useState } from 'react'
import MaterialesIcon from '../../../icons/MaterialesIcon'
import { DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';
import { getChoferesPresentQuery, getCompradorPresentQuery, getDaysPresentQuery, getElaboradorPresentQuery, getMonthsPresentQuery, getTransportistasPresentQuery, getYearsPresentQuery } from '../../../utility/Procesamiento';

const MaterialesItem = ({ material, is_present, idmaterial, is_active }) => {

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
    

    const [active, setActive] = useState(false);


    const onclickHandler = () => {

        if(!active){
            setActive(true);

            if(statusQuery){

                if(textStatusQuery == ORIGIN_QUERY.RODALES){

                    //hago el filtro, pero ahora utilizando el material
                    //cargo el material selec
                    let mat_selects = [...materialesSelected, idmaterial];
                    setMaterialesSelected(mat_selects);

                    loadYearsPresent(mat_selects);
                    loadMonthsPresent(mat_selects);
                    loadDaysPresent(mat_selects);

                    verifiedVariablesSelected(mat_selects);
                

                    console.log('mat_selects');
                    console.log(mat_selects);


                    //actualizo los years

                }


            } else {

                //seteo a Materiales como item
            }

        } else {

            setActive(false);

            //elimino el material de los selected
            let mat_selects = _removeMaterialSelected();

            loadYearsPresent(mat_selects);
            loadMonthsPresent(mat_selects);
            loadDaysPresent(mat_selects);
            loadElaboradorPresent(mat_selects);
            loadChoferesPresent(mat_selects);
            loadTransportistasPresent(mat_selects);
            loadCompradorPresent(mat_selects);
          
        }
    }


    const verifiedVariablesSelected = (mat_selects) => {

        if(elaboradorSelected.length == 0){

            loadElaboradorPresent(mat_selects);
        }

        if(choferesSelected.length == 0){

            //filtro los choferes
            loadChoferesPresent(mat_selects);

        }

        if (transportistaSelected.length == 0){

            loadTransportistasPresent(mat_selects);

        }


        if (compradorSelected.length == 0){

            loadCompradorPresent(mat_selects);

        }


    }

    const loadYearsPresent = async (mat_selects) => {

        setYearsPresent([]);
        //llamo al metodo que carga los years
        const years_pres = await getYearsPresentQuery(rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected, 
            compradorSelected);


        if (years_pres) {

            //pase lo que pase siempre traigo de nuevo los years
            let arr_ = [];

            years_pres.forEach(year_query => {
                arr_.push(parseInt(year_query));

            });

            setYearsPresent(arr_);


        }

        setStatusYears(!statusYears);

    }


    const loadMonthsPresent = async (mat_selects) => {

        //para traer los meses uso los rodales como filtro
        const months_data = await getMonthsPresentQuery(rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected, 
            compradorSelected);

        if (months_data) {

            setMonthsPresent(months_data);

        }

        setStatusMonths(!statusMonths);


    }

    const loadDaysPresent = async (mat_selects) => {

        const days_data = await getDaysPresentQuery(rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected, 
            compradorSelected);

        if (days_data) {

            setDaysPresent(days_data);

        }

        setStatusDays(!statusDays);

    }


    const loadElaboradorPresent = async (mat_selects) => {

        const ela_present = await getElaboradorPresentQuery(rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected, 
            compradorSelected);

        if (ela_present) {

            setElaboradorPresent(ela_present);

        }
        setStatusElaborador(!statusElaborador);

    }

    const loadChoferesPresent = async (mat_selects) => {

        const choferes_data = await getChoferesPresentQuery(rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected, 
            compradorSelected);

        if (choferes_data) {
            setChoferesPresent(choferes_data);

        }

        setStatusChoferes(!statusChoferes);
    }

    const loadTransportistasPresent = async (mat_selects) => {

        const transportista_data = await getTransportistasPresentQuery(rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected, 
            compradorSelected);

        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setStatusTransportista(!statusTransportista);

    }



    const loadCompradorPresent = async (mat_selects) => {

        const comprador_data = await getCompradorPresentQuery(rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected, 
            compradorSelected);

        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setStatusComprador(!statusComprador);

    }
    



    const _removeMaterialSelected = () => {

        let new_material = [];

        materialesSelected.forEach(mat => {

            if(idmaterial != mat){

                new_material.push(mat);
            }

        });

        setMaterialesSelected(new_material);

        console.log(new_material);

        return new_material;
    }



    useEffect(() => {

        if(materialesSelected.length == 0){
            setActive(false);

        }


    }, [statusMateriales]);
    

    return (
        <>
        {is_present ? <a className="list-group-item list-group-item-action item-layer is_present" aria-current="true"
         onClick={onclickHandler} style={!active ? null : styles.active}>
            <MaterialesIcon></MaterialesIcon>
            {material}
        </a> :
            <a className="list-group-item list-group-item-action item-layer" aria-current="true"
                onClick={onclickHandler} style={!active ? null : styles.active}>
                <MaterialesIcon></MaterialesIcon>
                {material}
            </a>
        }
    </>
    )
}

export default MaterialesItem


const styles = {
    active: {
        backgroundColor: '#206bc4',
        color: '#FFFFFF'
    },
    no_active: {
        backgroundColor: '#182433',
        color: '#ffffff',
    }
};