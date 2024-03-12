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


    const [active, setActive] = useState(is_active);


    const onclick = async () => {

        //consulto si esta activo o no
        if (!active) {

            //activo el boton
            setActive(true);

            //consulto si el query esta seleccionado
            if (statusQuery) {

                //selecciono el rodal y lo guardo en rodalesSelect
                let rodales_sel_ = [...rodalesSelected, name_rodal];
                setRodalesSelected(rodales_sel_);


                _clearSelectedsAndPresents();

                //cargo los present
                loadYearsPresent(rodales_sel_);
                loadMonthsPresent(rodales_sel_);
                loadDaysPresent(rodales_sel_);

                loadMaterialesPresent(rodales_sel_);
                loadElaboradorPresent(rodales_sel_);
                loadChoferesPresent(rodales_sel_);
                loadTransportistasPresent(rodales_sel_);
                loadCompradorPresent(rodales_sel_);

                setYearsSelected([]);
                setMonthsSelected([]);
                setDaysSelected([]);

                //setStatusYears(!statusYears);
                //setStatusMateriales(!statusMateriales);
                //setStatusElaborador(!statusElaborador);


            } else {
                //si no esta activo, seteo e query y el texto

                setStatusQuery(true);
                setTextStatusQuery(ORIGIN_QUERY.RODALES);

                //selecciono el rodal y lo guardo en rodalesSelect
                let rodales_sel_ = [name_rodal];
                setRodalesSelected(rodales_sel_);

                //cargo los present

                loadYearsPresent(rodales_sel_);
                loadMonthsPresent(rodales_sel_);
                loadDaysPresent(rodales_sel_);

                loadMaterialesPresent(rodales_sel_);
                loadElaboradorPresent(rodales_sel_);
                loadChoferesPresent(rodales_sel_);
                loadTransportistasPresent(rodales_sel_);
                loadCompradorPresent(rodales_sel_);

                 //limpio los selected
                 setYearsSelected([]);
                 setMonthsSelected([]);
                 setDaysSelected([]);

                //setStatusYears(!statusYears);
                //setStatusMateriales(!statusMateriales);
                //setStatusElaborador(!statusElaborador);

                //proceso el query, tengo que traer todos los datos para el rodal actual

            }


        } else {
            setActive(false);

            //si era el ultimo rodal seleccionado, limpio el query y el textquery
            if (rodalesSelected.length == 1) {
                setStatusQuery(false);
                setTextStatusQuery(null);

                //reseteo todos los 
                setYearsPresent([]);
                setMonthsPresent([]);
                setDaysPresent([]);
                setMaterialesPresent([]);
                setElaboradorPresent([]);
                setChoferesPresent([]);
                setTransportistaPresent([]);
                setCompradorPresent([]);

                setStatusYears(!statusYears);
                setStatusMonths(!statusMonths);
                setStatusDays(!statusDays);
                setStatusMateriales(!statusMateriales);
                setStatusElaborador(!statusElaborador);
                setStatusChoferes(!statusChoferes);
                setStatusTransportista(!statusTransportista);
                setStatusComprador(!statusComprador);

                 //limpio los selected
                 setYearsSelected([]);
                 setMonthsSelected([]);
                 setDaysSelected([]);

            } else {

                //Seguro estaremos en una query
                //consulto el tipo de query donde estoy

                if (textStatusQuery == ORIGIN_QUERY.RODALES) {

                    //estoy dentro del marco del query rodal

                    let new_rod_sel = _deleteRodalFromSelected(name_rodal);

                    //limpio todos los selected y presents

                    _clearSelectedsAndPresents();



                    //empiezo a procesar todo nuevamente
                    loadYearsPresent(new_rod_sel);

                    loadMonthsPresent(new_rod_sel);
                    loadDaysPresent(new_rod_sel);
    
                    loadMaterialesPresent(new_rod_sel);
                    loadElaboradorPresent(new_rod_sel);
                    loadChoferesPresent(new_rod_sel);
                    loadTransportistasPresent(new_rod_sel);
                    loadCompradorPresent(new_rod_sel);

                     //reseteo todos los 
                    setYearsPresent([]);
                    setMonthsPresent([]);
                    setDaysPresent([]);
                    setMaterialesPresent([]);
                    setElaboradorPresent([]);
                    setChoferesPresent([]);
                    setTransportistaPresent([]);
                    setCompradorPresent([]);

                    //limpio los selected
                    setYearsSelected([]);
                    setMonthsSelected([]);
                    setDaysSelected([]);



                }


            }



            //elimino el rodal 

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

    const loadYearsPresent = async (rodales_sel_) => {

        setYearsPresent([]);
        //llamo al metodo que carga los years
        const years_pres = await getYearsPresentQuery(rodales_sel_);


        if (years_pres) {

            //pase lo que pase siempre traigo de nuevo los years
            let arr_ = [];

            years_pres.forEach(year_query => {
                arr_.push(parseInt(year_query));

            });

            setYearsPresent(arr_);



            /*if(yearsPresent.length == 0){

                alert('sdfjoasdfjosadfjosadfoasdsfdgsdf');

                let arr_ = [];

                years_pres.forEach(year_query => {

                    arr_.push(parseInt(year_query));

                });

                setYearsPresent(arr_);
 
            } else {

            
                let arr_ = [];
                years_pres.forEach(year_query => {

                    let is_present = false;

                 
                    yearsPresent.forEach(year => {

                        let year_q = parseInt(year_query);

                        if(year_q == year){
                            is_present = true;

                        }

                    });
                    
                    if(!is_present){
                        arr_.push(parseInt(year_query));
                    }

                });

                if(arr_.length > 0){

                    //aca hay un problema porque debo elminiar un elemento
                   
                    setYearsPresent([...yearsPresent, ...arr_])

                }


            }*/

        }

        setStatusYears(!statusYears);

    }




    const loadMonthsPresent = async (rodales_sel_) => {

        //para traer los meses uso los rodales como filtro
        const months_data = await getMonthsPresentQuery(rodales_sel_);

        if (months_data) {

            setMonthsPresent(months_data);

        }

        setStatusMonths(!statusMonths);


    }

    const loadDaysPresent = async (rodales_sel_) => {

        const days_data = await getDaysPresentQuery(rodales_sel_);

        if (days_data) {

            setDaysPresent(days_data);

        }

        setStatusDays(!statusDays);

    }

    const loadMaterialesPresent = async (rodales_sel_) => {

        const mat_present = await getMaterialesPresentQuery(rodales_sel_);

        if (mat_present) {

            setMaterialesPresent(mat_present);

        }

        setStatusMateriales(!statusMateriales);

    }

    const loadElaboradorPresent = async (rodales_sel_) => {

        const ela_present = await getElaboradorPresentQuery(rodales_sel_);

        if (ela_present) {

            setElaboradorPresent(ela_present);

        }
        setStatusElaborador(!statusElaborador);

    }

    const loadChoferesPresent = async (rodales_sel_) => {

        const choferes_data = await getChoferesPresentQuery(rodales_sel_);

        if (choferes_data) {
            setChoferesPresent(choferes_data);

        }

        setStatusChoferes(!statusChoferes);
    }

    const loadTransportistasPresent = async (rodales_sel_) => {

        const transportista_data = await getTransportistasPresentQuery(rodales_sel_);

        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setStatusTransportista(!statusTransportista);

    }

    const loadCompradorPresent = async (rodales_sel_) => {

        const comprador_data = await getCompradorPresentQuery(rodales_sel_);

        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setStatusComprador(!statusComprador);

    }




    useEffect(() => {


    }, [active])



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