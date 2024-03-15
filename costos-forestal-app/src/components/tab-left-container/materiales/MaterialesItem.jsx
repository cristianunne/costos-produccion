import React, { useContext, useEffect, useState } from 'react'
import MaterialesIcon from '../../../icons/MaterialesIcon'
import { DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';
import { getChoferesPresentQuery, getCompradorPresentQuery, getDaysPresentQuery, getElaboradorPresentQuery, getMonthsPresentQuery, getRodalesPresentQuery, getTransportistasPresentQuery, getYearsPresentQuery } from '../../../utility/Procesamiento';

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
        textStatusQuery, setTextStatusQuery,
        levels, setLevels
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

        if (!active) {
            setActive(true);

            //hago el filtro, pero ahora utilizando el material
            //cargo el material selec
            let mat_selects = [...materialesSelected, idmaterial];
            setMaterialesSelected(mat_selects);

            if (statusQuery) {

                if (textStatusQuery == ORIGIN_QUERY.RODALES) {

                    alert('entro por aca');
                    console.log('levelsfghfghfgh');
                    console.log(levels);

                    //cargo el lvl
                    if(!isMaterialInLevels()){

                        //traigo el level
                        let keys = Object.keys(levels);
                        let length = keys.length + 1;
                        let obj = {...levels};
                        obj[length] = ORIGIN_QUERY.MATERIALES;
                        setLevels(obj);

                    }



                    loadYearsPresent(mat_selects);
                    loadMonthsPresent(mat_selects);
                    loadDaysPresent(mat_selects);
              

                    //actualizo los years

                } else if (textStatusQuery == ORIGIN_QUERY.ELABORADOR) {
                    //actualizo todos menos el elaborador
                    loadYearsPresent(mat_selects);
                    loadMonthsPresent(mat_selects);
                    loadDaysPresent(mat_selects);
                    //creo que tengo que pasar todos menos elaborador
                    verifiedVariablesSelected(mat_selects);


                } else if (textStatusQuery == ORIGIN_QUERY.MATERIALES){

                    //creo que volviendo a cargar a ya selimpianlos present

                    //aca estoy en el levl 1

                    setRodalesSelected([]);
                    setChoferesSelected([]);
                    setElaboradorSelected([]);
                    setTransportistaSelected([]);
                    setCompradorSelected([]);
                    setElaboradorPresent([]);
                 
                    loadYearsPresent(mat_selects, true);
                    loadMonthsPresent(mat_selects, true);
                    loadDaysPresent(mat_selects, true);
                   
                    //tengo que carhar mas rodales y limpiar los demas
                    loadRodalesPresent(mat_selects, true);
                    //tengo que limpiar los demas porque seleccione unnuevo material los SELCTE
                    loadElaboradorPresent(mat_selects, true);
                    loadChoferesPresent(mat_selects, true);
                    loadTransportistasPresent(mat_selects, true);
                    loadCompradorPresent(mat_selects, true);
                    
                }


            } else {

                //seteo a Materiales como item
                //no habia query selected, entonces seteo a ELaborador como el iniciador
                setStatusQuery(true);
                setTextStatusQuery(ORIGIN_QUERY.MATERIALES);

                //Aca deberia setear el lvl tmb

                loadYearsPresent(mat_selects);
                loadMonthsPresent(mat_selects);
                loadDaysPresent(mat_selects);


                loadRodalesPresent(mat_selects);
                loadChoferesPresent(mat_selects);
                loadElaboradorPresent(mat_selects);
                loadTransportistasPresent(mat_selects);
                loadCompradorPresent(mat_selects);


            }

        } else {

            setActive(false);

            //elimino el material de los selected
            let mat_selects = _removeMaterialSelected();

            //vuelvo a hacer las consultas de todos los demas
            //SI quito la seleccion taigo de nuevo todo

            //debo comprobar si no estoy en el ultimo, si estoy limpio todos los elementos

            if (statusQuery) {

                if(textStatusQuery == ORIGIN_QUERY.MATERIALES){

                    if(materialesSelected.length == 1){

                        alert('Restaurando todos')

                        //llegue al ultimo, entonces cargo todo y limpio el query
                        setStatusQuery(false);
                        setTextStatusQuery(null);
     
                        //restauro todos como en el inicio
                        setRodalesData(rodalesDinamicData);
                        setRodalesPresent(rodalesDinamicData);
                        setStatusRodales(!statusRodales);
     
                        setYearsData(yearsDinamicData);
                        setYearsPresent([]);
                        setStatusYears(!statusYears);
     
                        //reseteo los meses y dias, inicialmente estan apagados
                        setMonthsPresent([]);
                        setMonthsSelected([]);
                        setStatusMonths(!statusMonths);
     
                        setDaysPresent([]);
                        setDaysSelected([]);
                        setStatusDays(!statusDays); 
                        setMaterialesData(materialesDinamicData);
                        setMaterialesPresent([]);
                        setMaterialesSelected([])
                        setStatusMateriales(!statusMateriales);

                        //restauro los elaboradores
                        setElaboradorData(elaboradorDinamicData);
                        setElaboradorPresent([]);
                        setElaboradorSelected([]);
                        setStatusElaborador(!statusElaborador);
     
                         //restauro los choferes
                        setChoferesData(choferesDinamicData);
                        setChoferesPresent([]);
                        setChoferesSelected([]);
                        setStatusChoferes(!statusChoferes);
     
                        setTransportistaData(transportistaDinamicData);
                        setTransportistaSelected([]);
                        setTransportistaPresent([]);
                        setStatusTransportista(!statusTransportista);
     
                        setCompradorData(compradorDinamicData);
                        setCompradorPresent([]);
                        setCompradorSelected([]);
                        setStatusComprador(!statusComprador);
    
                    } else {
    
                        if (textStatusQuery == ORIGIN_QUERY.MATERIALES) {

                             //si quito la seleccion vuelvo a traer todos pero sin reset
                             //porque todavia quedan arriba de 2 materiales
                             loadYearsPresent(mat_selects);
                             loadMonthsPresent(mat_selects);
                             loadDaysPresent(mat_selects);
                             loadRodalesPresent(mat_selects);
                             loadElaboradorPresent(mat_selects);
                             loadChoferesPresent(mat_selects);
                             loadTransportistasPresent(mat_selects);
                             loadCompradorPresent(mat_selects);
                       
                        
        
                        } else if (textStatusQuery == ORIGIN_QUERY.RODALES){
    
                           

                        }
                        
    
                    }

                } else if (statusQuery == ORIGIN_QUERY.RODALES){
                    
                    //quito el level solo si deseleccione todo
                    if(materialesSelected.length == 1){

                        let key = Object.keys(levels).filter(function(key) {return levels[key] === 
                            ORIGIN_QUERY.MATERIALES})[0];

                        _deleteItemFromLevels(key);

                    }


                }

                

            }



        }
    }

    const isMaterialInLevels = () => {

        let is_present = false;

        Object.entries(levels).forEach(([key, value]) => {

            if(value == ORIGIN_QUERY.MATERIALES){
                is_present = true;
            }
         

        });

        console.log('resultado de present: ' + is_present);

        return is_present;

    }

    const _deleteItemFromLevels = (key_) => {

        let new_obj = {};

        Object.entries(levels).forEach(([key, value]) => {

            if(key != key_){
                new_obj[key] = value;
            }
         
        });

        console.log('new_obj');
        console.log(new_obj);

        setLevels(new_obj);

    }


    const verifiedVariablesSelected = (mat_selects, origen) => {

        //SI ES 0, SIGNIFICA QUE PUEDO REPITAR LOS ITEMS EN LOS OTROS, SINO SO
        //deberia recibir el query activo para traer

        if (elaboradorSelected.length == 0) {

            loadElaboradorPresent(mat_selects);
        }

        if (choferesSelected.length == 0) {

            //filtro los choferes
            loadChoferesPresent(mat_selects);

        }

        if (transportistaSelected.length == 0) {

            loadTransportistasPresent(mat_selects);

        }


        if (compradorSelected.length == 0) {

            loadCompradorPresent(mat_selects);

        }





    }

    const loadYearsPresent = async (mat_selects, is_reset) => {



        let years_pres = null;

        if (is_reset) {
            years_pres = await getYearsPresentQuery([], mat_selects, [], [], [],
                []);
        } else {
            //llamo al metodo que carga los years
            years_pres = await getYearsPresentQuery(rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                compradorSelected);

        }



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


    const loadMonthsPresent = async (mat_selects, is_reset) => {

        let months_data = null;

        if (is_reset) {

            //para traer los meses uso los rodales como filtro
            months_data = await getMonthsPresentQuery([], mat_selects, [], [], [],
                []);

        } else {
            //para traer los meses uso los rodales como filtro
            months_data = await getMonthsPresentQuery(rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                compradorSelected);

        }



        if (months_data) {

            setMonthsPresent(months_data);

        }

        setStatusMonths(!statusMonths);


    }

    const loadDaysPresent = async (mat_selects, is_reset) => {

        let days_data = null;

        if(is_reset){

            days_data = await getDaysPresentQuery([], mat_selects, [], [], [],
                []);
    

        } else {

            days_data = await getDaysPresentQuery(rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                compradorSelected);

        }

       

        if (days_data) {

            setDaysPresent(days_data);

        }

        setStatusDays(!statusDays);

    }


    const loadElaboradorPresent = async (mat_selects, is_reset) => {

        let ela_present = null;

        if (is_reset) {
            ela_present = await getElaboradorPresentQuery([], mat_selects, [], [], [],
                []);

        } else {
            ela_present = await getElaboradorPresentQuery(rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                compradorSelected);
        }



        if (ela_present) {

            setElaboradorPresent(ela_present);

        }
        setStatusElaborador(!statusElaborador);

    }

    const loadChoferesPresent = async (mat_selects, is_reset) => {

        let choferes_data = null;

        if (is_reset) {
           
            choferes_data = await getChoferesPresentQuery([], mat_selects, [], [], [],
                []);

        } else {
            choferes_data = await getChoferesPresentQuery(rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                compradorSelected);

        }



        if (choferes_data) {
            setChoferesPresent(choferes_data);

        }

        setStatusChoferes(!statusChoferes);
    }

    const loadTransportistasPresent = async (mat_selects, is_reset) => {

        let transportista_data = null;

        if (is_reset) {
            transportista_data = await getTransportistasPresentQuery([], mat_selects, [], [], [],
                []);
        } else {

            transportista_data = await getTransportistasPresentQuery(rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                compradorSelected);

        }



        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setStatusTransportista(!statusTransportista);

    }



    const loadCompradorPresent = async (mat_selects, is_reset) => {

        let comprador_data = null;
        if (is_reset) {
            comprador_data = await getCompradorPresentQuery(null, mat_selects, null, null, null,
                null);

        } else {

            comprador_data = await getCompradorPresentQuery(rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                compradorSelected);

        }



        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setStatusComprador(!statusComprador);

    }

    const loadRodalesPresent = async (mat_selects) => {


        const rod_present = await getRodalesPresentQuery(mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
            compradorSelected);

        if (rod_present) {

            let rodales = [];

            rod_present.forEach(rod_pres => {
                //recorro los rodalesDInamic quetiene todos
                rodalesDinamicData.forEach(rodal => {

                    if (rod_pres.rodal == rodal.rodal) {

                        rodales.push(rodal);

                    }

                });

            });

            setRodalesData(rodales);
            setRodalesPresent(rodales);
            setStatusRodales(!statusRodales);

        }

        //setStatusMateriales(!statusMateriales);

    }










    const _removeMaterialSelected = () => {

        let new_material = [];

        materialesSelected.forEach(mat => {

            if (idmaterial != mat) {

                new_material.push(mat);
            }

        });

        setMaterialesSelected(new_material);

        console.log(new_material);

        return new_material;
    }



    useEffect(() => {

        if (materialesSelected.length == 0) {
            setActive(false);

        }

        console.log('levelsdsfsgsggadsgghfdjdfgjdghkkkkkk');
        console.log(levels);


    }, [active, statusMateriales]);


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