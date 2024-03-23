import React, { useContext, useEffect, useState } from 'react'
import CompradorIcon from '../../../icons/CompradorIcon';
import { DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';
import { getChoferesPresentQuery, getDaysPresentQuery, getElaboradorPresentQuery, getMaterialesPresentQuery, getMonthsPresentQuery, getRodalesPresentQuery, getTransportistasPresentQuery, getYearsPresentQuery } from '../../../utility/Procesamiento';

const CompradoresItem = ({ name_comprador, id_comprador, is_present, comprador }) => {

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
            let compra_selects = [...compradorSelected, id_comprador];
            setCompradorSelected(compra_selects);

            if (statusQuery) {

                if (textStatusQuery == ORIGIN_QUERY.COMPRADOR) {

                    loadYearsPresent(compra_selects, true);
                    loadMonthsPresent(compra_selects, true);
                    loadDaysPresent(compra_selects, true);
                    loadRodalesPresent(compra_selects, true);
                    loadMaterialesPresent(compra_selects, true);
                    loadElaboradorPresent(compra_selects, true);
                    loadChoferesPresent(compra_selects, true);
                    loadTransportistasPresent(compra_selects, true);


                } else {


                    if (!isCompradorInLevels()) {

                        //traigo el level
                        let keys = Object.keys(levels);
                        let length = keys.length + 1;
                        let obj = { ...levels };
                        obj[length] = ORIGIN_QUERY.COMPRADOR;
                        setLevels(obj);


                        loadDataByLevels(obj, length, compra_selects)

                    } else {
                        //consulto el lvl en el que staba seleccionado y actualizo los de abajo
                        loadDataByLevels(levels, getCompradorLevel(), compra_selects);
                    }



                }

            } else {

                setStatusQuery(true);
                setTextStatusQuery(ORIGIN_QUERY.COMPRADOR);

                //CARGO TODOS LAS PESTA;AS
                alert('activo el query de Comprador');

                setLevels({ 1: ORIGIN_QUERY.COMPRADOR });

                loadYearsPresent(compra_selects, true);
                loadMonthsPresent(compra_selects, true);
                loadDaysPresent(compra_selects, true);
                loadRodalesPresent(compra_selects, true);
                loadMaterialesPresent(compra_selects, true);
                loadElaboradorPresent(compra_selects, true);
                loadChoferesPresent(compra_selects, true);
                loadTransportistasPresent(compra_selects, true);


            }


        } else {
            setActive(false);

            //tengo que eliminar el chofer de la lista
            let compra_selects = _deleteItemSelected();

            if (statusQuery) {

                if (textStatusQuery == ORIGIN_QUERY.COMPRADOR) {

                    if (compradorSelected.length == 1) {

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
                        setTransportistaPresent([]);
                        setTransportistaPresent([]);
                        setStatusTransportista(!statusTransportista);


                    } else {

                        if (textStatusQuery == ORIGIN_QUERY.COMPRADOR) {

                            loadYearsPresent(compra_selects, true);
                            loadMonthsPresent(compra_selects, true);
                            loadDaysPresent(compra_selects, true);
                            loadRodalesPresent(compra_selects, true);
                            loadMaterialesPresent(compra_selects, true);
                            loadElaboradorPresent(compra_selects, true);
                            loadChoferesPresent(compra_selects, true);
                            loadTransportistasPresent(compra_selects, true);

                        }
                    }

                } else {
                    if (compradorSelected.length == 1) {

                        let key = Object.keys(levels).filter(function (key) {
                            return levels[key] ===
                                ORIGIN_QUERY.COMPRADOR
                        })[0];

                        _deleteItemFromLevels(key);

                        //restauro todos sin contar el nivel actual
                        //no hay materiales seleccionados
                        loadDataByLevels(levels, key, compra_selects);

                    } else {

                        let key = Object.keys(levels).filter(function (key) {
                            return levels[key] ===
                                ORIGIN_QUERY.COMPRADOR
                        })[0];

                        loadDataByLevels(levels, key, compra_selects);

                    }
                }

            } else {


            }
        }
    }


    const verifiedVariablesSelected = (compra_selects) => {


        if (materialesSelected.length == 0) {

            loadMaterialesPresent(compra_selects);
        }

        if (elaboradorSelected.length == 0) {

            loadElaboradorPresent(compra_selects);
        }

        if (choferesSelected.length == 0) {

            loadChoferesPresent(compra_selects);
        }

        if (transportistaSelected.length == 0) {

            loadTransportistasPresent(compra_selects);
        }





    }

    const _deleteItemSelected = () => {

        let items = [];

        compradorSelected.forEach(comp => {

            if (id_comprador != comp) {

                items.push(comp);

            }

        });

        setCompradorSelected(items);

        return items;

    }

    const loadYearsPresent = async (compra_selects, is_reset) => {


        let years_pres = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {
                years_pres = await getYearsPresentQuery([], [], [], [],
                    [], [], compra_selects);
            } else {
                //llamo al metodo que carga los years
                years_pres = await getYearsPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected,
                    choferesSelected, transportistaSelected,
                    compra_selects);
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

    }

    const loadMonthsPresent = async (compra_selects, is_reset) => {

        //ACA PUEDO UTILIZAR UN FLAGS PARA SAER SI LIMPIO LOS SELECT
        let months_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {
                months_data = await getMonthsPresentQuery([], [], [], [],
                    [], [], compra_selects);

            } else {

                //para traer los meses uso los rodales como filtro
                months_data = await getMonthsPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected,
                    choferesSelected, transportistaSelected,
                    compra_selects);


            }


            if (months_data) {

                setMonthsPresent(months_data);

            }

            setStatusMonths(!statusMonths);

        }

    }

    const loadDaysPresent = async (compra_selects, is_reset) => {

        //ACA PUEDO UTILIZAR UN FLAGS PARA SAER SI LIMPIO LOS SELECT
        let days_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {

                days_data = await getDaysPresentQuery([], [], [], [],
                    [], [], compra_selects);

            } else {
                days_data = await getDaysPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected,
                    choferesSelected, transportistaSelected,
                    compra_selects);

            }

            if (days_data) {

                setDaysPresent(days_data);

            }

            setStatusDays(!statusDays);


        }



    }


    const loadRodalesPresent = async (compra_selects, is_reset) => {


        let rod_present = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {
                rod_present = await getRodalesPresentQuery([], [], [],
                    [], [], compra_selects);
            } else {

                rod_present = await getRodalesPresentQuery(empresasSelected, materialesSelected, elaboradorSelected,
                    choferesSelected, transportistaSelected,
                    compra_selects);
            }


        } else {

            rod_present = await getRodalesPresentQuery(empresasSelected, materialesSelected, elaboradorSelected,
                choferesSelected, transportistaSelected,
                compra_selects, yearsSelected);

        }



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

    const loadMaterialesPresent = async (compra_selects, is_reset) => {

        let mat_present = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {

                mat_present = await getMaterialesPresentQuery([], [], [], [],
                    [], [],
                    compra_selects);

            } else {

                mat_present = await getMaterialesPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected,
                    choferesSelected, transportistaSelected,
                    compra_selects);

            }


        } else {

            mat_present = await getMaterialesPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected,
                choferesSelected, transportistaSelected,
                compra_selects, yearsSelected);

        }


        if (mat_present) {

            setMaterialesPresent(mat_present);

        }

        setStatusMateriales(!statusMateriales);

    }


    const loadChoferesPresent = async (compra_selects, is_reset) => {

        let choferes_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {

                choferes_data = await getChoferesPresentQuery([], [], [], [],
                    [], [],
                    compra_selects);

            } else {

                choferes_data = await getChoferesPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected,
                    choferesSelected, transportistaSelected,
                    compra_selects);

            }


        } else {

            choferes_data = await getChoferesPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected,
                choferesSelected, transportistaSelected,
                compra_selects, yearsSelected);

        }




        if (choferes_data) {
            setChoferesPresent(choferes_data);

        }

        setStatusChoferes(!statusChoferes);
    }


    const loadElaboradorPresent = async (compra_selects, is_reset) => {

        let ela_present = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {

                ela_present = await getElaboradorPresentQuery([], [], [], [],
                    [], [],
                    compra_selects);

            } else {

                ela_present = await getElaboradorPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected,
                    choferesSelected, transportistaSelected,
                    compra_selects);

            }


        } else {

            ela_present = await getElaboradorPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected,
                choferesSelected, transportistaSelected,
                compra_selects, yearsSelected);

        }


        if (ela_present) {

            setElaboradorPresent(ela_present);

        }
        setStatusElaborador(!statusElaborador);

    }

    const loadTransportistasPresent = async (compra_selects, is_reset) => {

        let transportista_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {

                transportista_data = await getTransportistasPresentQuery([], [], [], [],
                    [], [],
                    compra_selects);

            } else {

                transportista_data = await getTransportistasPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected,
                    choferesSelected, transportistaSelected,
                    compra_selects);

            }

        } else {

            transportista_data = await getTransportistasPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected,
                choferesSelected, transportistaSelected,
                compra_selects, yearsSelected);

        }


        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setStatusTransportista(!statusTransportista);

    }


    const loadYearsPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {


        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            let years_pres = await getYearsPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects);


            if (years_pres) {

                //pase lo que pase siempre traigo de nuevo los years
                let arr_ = [];

                years_pres.forEach(year_query => {
                    arr_.push(parseInt(year_query));

                });

                setYearsPresent(arr_);


            }
            setYearsSelected([]);
            setStatusYears(!statusYears);

        }

    }

    const loadMonthsPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {


            let months_data = await getMonthsPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects);



            if (months_data) {

                setMonthsPresent(months_data);

            }

            setMonthsSelected([]);
            setStatusMonths(!statusMonths);


        }


    }

    const loadDaysPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            let days_data = await getDaysPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects);



            if (days_data) {

                setDaysPresent(days_data);

            }

            setDaysSelected([]);
            setStatusDays(!statusDays);

        }

    }



    const loadRodalesPresentLevels = async (empresas_sel, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

        let rod_present = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            rod_present = await getRodalesPresentQuery(empresas_sel, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects);

        } else {

            rod_present = await getRodalesPresentQuery(empresas_sel, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects, yearsSelected);

        }





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
            setRodalesSelected([]);
            setStatusRodales(!statusRodales);

        }

    }

    const loadMaterialesPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

        let mat_present = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            mat_present = await getMaterialesPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects);

        } else {

            mat_present = await getMaterialesPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects, yearsSelected);

        }


        if (mat_present) {

            setMaterialesPresent(mat_present);

        }

        setMaterialesSelected([]);
        setStatusMateriales(!statusMateriales);

    }

    const loadChoferesPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

            let choferes_data = null;

            if (textStatusQuery != ORIGIN_QUERY.YEARS) {
    
                choferes_data = await getChoferesPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                    transp_selects, comp_selects);
    
            } else {
    
                choferes_data = await getChoferesPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                    transp_selects, comp_selects, yearsSelected);
    
            }



        if (choferes_data) {
            setChoferesPresent(choferes_data);

        }

        setChoferesSelected([]);
        setStatusChoferes(!statusChoferes);
    }

    const loadElaboradorPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

            let ela_present = null;

            if (textStatusQuery != ORIGIN_QUERY.YEARS) {
    
                ela_present = await getElaboradorPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                    transp_selects, comp_selects);
    
            } else {
    
                ela_present = await getElaboradorPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                    transp_selects, comp_selects, yearsSelected);
    
            }


        if (ela_present) {

            setElaboradorPresent(ela_present);

        }

        setElaboradorSelected([]);
        setStatusElaborador(!statusElaborador);

    }


    const loadTransportistasPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

            let transportista_data = null;

            if (textStatusQuery != ORIGIN_QUERY.YEARS) {
    
                transportista_data = await getTransportistasPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                    transp_selects, comp_selects);
    
            } else {
    
                transportista_data = await getTransportistasPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                    transp_selects, comp_selects, yearsSelected);
    
            }


        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setTransportistaSelected([]);
        setStatusTransportista(!statusTransportista);

    }

    const isCompradorInLevels = () => {

        let is_present = false;

        Object.entries(levels).forEach(([key, value]) => {

            if (value == ORIGIN_QUERY.COMPRADOR) {
                is_present = true;
            }


        });


        return is_present;

    }

    const _deleteItemFromLevels = (key_current) => {

        //si el esl ultimo, elimino todos los hijos tmb

        let new_obj = {};

        Object.entries(levels).forEach(([key, value]) => {

            //ejemplo
            /*
                SI estoy en la POSICION 3, tengo que dejar todas las keys menores
            */
            if (key < key_current) {
                new_obj[key] = value;
            }

        });

        setLevels(new_obj);

    }

    const getCompradorLevel = () => {

        let lvl = false;

        Object.entries(levels).forEach(([key, value]) => {

            if (value == ORIGIN_QUERY.COMPRADOR) {
                lvl = key;
            }


        });


        return lvl;

    }

    const loadDataByLevels = (levels, lvl_current, comp_selects) => {

        console.log('Levles del Elaborador');

        //creo variables y si estanlas agrego
        let empresas_ = [];
        let rodales_ = [];
        let elaborador_ = [];
        let materiales_ = [];
        let choferes_ = [];
        let transportista_ = [];

        let is_emp = false;
        let is_rod = false;
        let is_elab = false;
        let is_mat = false;
        let is_chof = false;
        let is_trans = false;

        Object.entries(levels).forEach(([key, value]) => {

            //consulto sila key es menor dejo los selected
            if (key < lvl_current) {

                if (value == ORIGIN_QUERY.EMPRESAS) {
                    empresas_ = [...empresasSelected];
                    is_emp = true;
                }

                if (value == ORIGIN_QUERY.RODALES) {
                    rodales_ = [...rodalesSelected];
                    is_rod = true;
                }

                if (value == ORIGIN_QUERY.ELABORADOR) {
                    elaborador_ = [...elaboradorSelected];
                    is_elab = true;
                }

                if (value == ORIGIN_QUERY.MATERIALES) {
                    materiales_ = [...materialesSelected];
                    is_mat = true;
                }

                if (value == ORIGIN_QUERY.CHOFER) {
                    choferes_ = [...choferesSelected];
                    is_chof = true;
                }

                if (value == ORIGIN_QUERY.TRANSPORTISTA) {
                    transportista_ = [...transportistaSelected];
                    is_trans = true;
                }

            }

        });


        loadYearsPresentLevels(empresas_, rodales_, materiales_, elaborador_, choferes_, transportista_, comp_selects);
        loadMonthsPresentLevels(empresas_, rodales_, materiales_, elaborador_, choferes_, transportista_, comp_selects);
        loadDaysPresentLevels(empresas_, rodales_, materiales_, elaborador_, choferes_, transportista_, comp_selects);
        //recorro nuevamente los lvls y solo actualizo aquellos que no esten
        if (!is_rod) {
            loadRodalesPresentLevels(empresas_, materiales_, elaborador_, choferes_, transportista_, comp_selects);
        }

        if (!is_mat) {
            //con los datos disponibles cargo
            loadMaterialesPresentLevels(empresas_, rodales_, materiales_, elaborador_, choferes_, transportista_, comp_selects);
        }

        if (!is_elab) {
            loadElaboradorPresentLevels(empresas_, rodales_, materiales_, elaborador_, choferes_, transportista_, comp_selects);
        }

        if (!is_chof) {
            loadChoferesPresentLevels(empresas_, rodales_, materiales_, elaborador_, choferes_, transportista_, comp_selects);
        }

        if (!is_trans) {
            loadTransportistasPresentLevels(empresas_, rodales_, materiales_, elaborador_, choferes_, transportista_, comp_selects);
        }



    }


    useEffect(() => {

        if (compradorSelected.length == 0) {
            setActive(false);
        }



    }, [active, compradorSelected]);


    return (

        <>
            {is_present ? <a className="list-group-item list-group-item-action item-layer is_present" aria-current="true"
                comprador_id={name_comprador}
                onClick={onclickHandler} style={!active ? null : styles.active}>
                <CompradorIcon></CompradorIcon>
                {name_comprador}
            </a> :
                <a className="list-group-item list-group-item-action item-layer" aria-current="true"
                    comprador_id={name_comprador}
                    onClick={onclickHandler} style={!active ? null : styles.active}>
                    <CompradorIcon></CompradorIcon>
                    {name_comprador}
                </a>
            }
        </>

    )
}

export default CompradoresItem

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