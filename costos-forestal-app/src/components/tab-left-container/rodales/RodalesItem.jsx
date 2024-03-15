import React, { useContext, useEffect, useState } from 'react'
import RodalesIcon from '../../../icons/RodalesIcon'
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';
import { DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import { getChoferesPresentQuery, getCompradorPresentQuery, getDaysPresentQuery, getElaboradorPresentQuery, getMaterialesPresentQuery, getMonthsPresentQuery, getTransportistasPresentQuery, getYearsPresentQuery } from '../../../utility/Procesamiento';

const RodalesItem = ({ name_rodal, idrodal, rodal, is_active }) => {

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


    const [active, setActive] = useState(is_active);


    const onclick = async () => {

        //consulto si esta activo o no
        if (!active) {

            //activo el boton
            setActive(true);

            let rodales_sel_ = [...rodalesSelected, name_rodal];
            setRodalesSelected(rodales_sel_);

            //consulto si el query esta seleccionado
            if (statusQuery) {

                //selecciono el rodal y lo guardo en rodalesSelect
              
                //debo consultar quien hizo el query porque dependiendo de eso puedo hacer el load o no

                if(textStatusQuery == ORIGIN_QUERY.RODALES){
                 
                    alert('estoy en rodales, tengo que traer todo nuevametne sin nada selecccionado');

                    loadYearsPresent(rodales_sel_, true);
                    loadMonthsPresent(rodales_sel_, true);
                    loadDaysPresent(rodales_sel_, true);

                    loadMaterialesPresent(rodales_sel_, true);
                    loadElaboradorPresent(rodales_sel_, true);
                    loadChoferesPresent(rodales_sel_, true);
                    loadTransportistasPresent(rodales_sel_, true);
                    loadCompradorPresent(rodales_sel_, true);
    
                  
                } 



            } else {
                //si no esta activo, seteo e query y el texto

                setStatusQuery(true);
                setTextStatusQuery(ORIGIN_QUERY.RODALES);

                //seteo ellvl
                setLevels({1: ORIGIN_QUERY.RODALES});

                /*let elem = {1 : ORIGIN_QUERY.RODALES};
                let keys = Object.keys(elem);
                let length = keys.length;

                console.log('Tamano del elemento: ' + length);*/



                alert('activo el query de Rodales');

                //cargo los present

                loadYearsPresent(rodales_sel_, true);
                loadMonthsPresent(rodales_sel_, true);
                loadDaysPresent(rodales_sel_, true);

                loadMaterialesPresent(rodales_sel_, true);
                loadElaboradorPresent(rodales_sel_, true);
                loadChoferesPresent(rodales_sel_, true);
                loadTransportistasPresent(rodales_sel_, true);
                loadCompradorPresent(rodales_sel_, true);

            

            }


        } else {
            setActive(false);

            let rodales_sel_ = _deleteRodalFromSelected(name_rodal);

            if(statusQuery){

                if (rodalesSelected.length == 1) {

                    alert('queda 1 rodal');
                    setStatusQuery(false);
                    setTextStatusQuery(null);

                    //REseteo ellvl
                    setLevels({});

 
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
 
                     //ME FALTA ELABORADOR
                    setElaboradorData(elaboradorDinamicData);
                    setElaboradorPresent([]);
                    setElaboradorSelected([]);
                    setStatusElaborador(!statusElaborador);
 
                     //CHOFERES
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

                    
                    //estoy dentro del marco del query rodal
                    if(textStatusQuery == ORIGIN_QUERY.RODALES){

                        alert('Quedabn mas de 1 rODAL seleccionado');

                        loadYearsPresent(rodales_sel_, true);
                        loadMonthsPresent(rodales_sel_, true);
                        loadDaysPresent(rodales_sel_, true);
        
                        loadMaterialesPresent(rodales_sel_, true);
                        loadElaboradorPresent(rodales_sel_, true);
                        loadChoferesPresent(rodales_sel_, true);
                        loadTransportistasPresent(rodales_sel_, true);
                        loadCompradorPresent(rodales_sel_, true);

                    }

                 
            
                }

            } else {

            }

         

        }


    }

    const _clearSelectedsAndPresents = () => {

        setMaterialesSelected([]);
        setMaterialesPresent([]);

        setYearsSelected([]);
        setYearsPresent([]);

        setMonthsSelected([]);
        setMonthsPresent([]);


    }

  



    const _deleteRodalFromSelected = (rodal_sel) => {

        let new_selecteds = [];

        rodalesSelected.forEach(rod_sel => {

            if (rod_sel != rodal_sel) {

                new_selecteds.push(rod_sel);

            }

        });

        setRodalesSelected(new_selecteds);

        return new_selecteds;

    }



    const processQuery = () => {

    }

    //al seleccionar un rodal tengo que cargar los a;os

    const loadYearsPresent = async (rodales_sel_, is_reset) => {

        let years_pres = null;

        if(is_reset){

            years_pres = await getYearsPresentQuery(rodales_sel_, [], [], [], 
                [], []);

        } else {

            years_pres = await getYearsPresentQuery(rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                transportistaSelected, compradorSelected);

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


    const loadMonthsPresent = async (rodales_sel_, is_reset) => {

        let months_data = null;

        if(is_reset){

            months_data = await getMonthsPresentQuery(rodales_sel_, [], [], [], 
            [], []);

        } else {


            months_data = await getMonthsPresentQuery(rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
            transportistaSelected, compradorSelected);

        }

        if (months_data) {

            setMonthsPresent(months_data);

        }

        setStatusMonths(!statusMonths);


    }

    const loadDaysPresent = async (rodales_sel_, is_reset) => {

        let days_data = null;

        if(is_reset){

            days_data = await getDaysPresentQuery(rodales_sel_, [], [], [], 
                [], []);

        } else {

            days_data = await getDaysPresentQuery(rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                transportistaSelected, compradorSelected);

        }

    
        if (days_data) {

            setDaysPresent(days_data);

        }

        setStatusDays(!statusDays);

    }

    const loadMaterialesPresent = async (rodales_sel_, is_reset) => {

        let mat_present = null;

        if(is_reset){

            mat_present = await getMaterialesPresentQuery(rodales_sel_, [], [], [], 
                [], []);

        } else {

            mat_present = await getMaterialesPresentQuery(rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                transportistaSelected, compradorSelected);

        }

        if (mat_present) {

            setMaterialesPresent(mat_present);

        }

        setStatusMateriales(!statusMateriales);

    }

    const loadElaboradorPresent = async (rodales_sel_, is_reset) => {

        let ela_present = null;

        if(is_reset){

            ela_present = await getElaboradorPresentQuery(rodales_sel_, [], [], [], 
                [], []);

        } else {

            ela_present = await getElaboradorPresentQuery(rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                transportistaSelected, compradorSelected);

        }

       

        if (ela_present) {

            setElaboradorPresent(ela_present);

        }
        setStatusElaborador(!statusElaborador);

    }

    const loadChoferesPresent = async (rodales_sel_, is_reset) => {

        let choferes_data = null;

        if(is_reset){

            choferes_data = await getChoferesPresentQuery(rodales_sel_, [], [], [], 
                [], []);

        } else {

            choferes_data = await getChoferesPresentQuery(rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                transportistaSelected, compradorSelected);

        }


       

        if (choferes_data) {
            setChoferesPresent(choferes_data);

        }

        setStatusChoferes(!statusChoferes);
    }

    const loadTransportistasPresent = async (rodales_sel_, is_reset) => {

        let transportista_data = null;

        if(is_reset){

            transportista_data = await getTransportistasPresentQuery(rodales_sel_, [], [], [], 
                [], []);
        } else {
            transportista_data = await getTransportistasPresentQuery(rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                transportistaSelected, compradorSelected);
        }

     

        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setStatusTransportista(!statusTransportista);

    }

    const loadCompradorPresent = async (rodales_sel_, is_reset) => {

        let comprador_data = null;

        if(is_reset){

            comprador_data = await getCompradorPresentQuery(rodales_sel_, [], [], [], 
                [], []);

        } else {

            comprador_data = await getCompradorPresentQuery(rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                transportistaSelected, compradorSelected);

        }


       

        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setStatusComprador(!statusComprador);

    }




    useEffect(() => {

        if(rodalesSelected.length == 0){

            setActive(false);

        }


    }, [active, rodalesSelected])



    return (
        <>
            {!active ?
                <a className="list-group-item list-group-item-action item-layer bg-dark" aria-current="true"
                    attr="XOP-5632" rodal_id={idrodal} onClick={onclick}
                >
                    <RodalesIcon></RodalesIcon>

                    {name_rodal}
                </a>
                :

                <a className="list-group-item list-group-item-action item-layer " aria-current="true"
                    attr="XOP-5632" rodal_id={idrodal} onClick={onclick}
                    style={styles.active}
                >
                    <RodalesIcon></RodalesIcon>

                    {name_rodal}
                </a>
            }

        </>
    )
}

export default RodalesItem

const styles = {
    active: {
        backgroundColor: '#206bc4',
        color: '#e3e3e3'
    }
};