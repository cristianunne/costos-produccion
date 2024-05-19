import React, { useContext, useEffect, useState } from 'react'
import RodalesIcon from '../../../icons/RodalesIcon'
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';
import { CostosGlobalContext, DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import { getChoferesPresentQuery, getCompradorPresentQuery, getDaysPresentQuery, getElaboradorPresentQuery, getEmpresasPresentQuery, getExtraccionDataFunction, getMaterialesPresentQuery, getMetadataFunctionForestal, getMonthsPresentQuery, getResumenRDMFunctionForestal, getTransportistasPresentQuery, getYearsPresentQuery } from '../../../utility/Procesamiento';
import { URL_APP_PINDO } from '../../../utility/URLS';

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
        levels, setLevels,
        isLoading, setIsLoading,
        statusLevels, setStatusLevels
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


    const {
        pagesExtraccion, setPagesExtraccion,
        numberDataExtraccion, setNumberDataExtraccion,
        dataExtraccion, setDataExtraccion,
        isLoadingTableExtraccion, setIsLoadingTableExtraccion,
        currentPageExtraccion, setCurrentPageExtraccion,
        dataRDM, setDataRDM,
        isLoadingTableRDM, setIsLoadingTableRDM,
        costoElab, setCostoElab,
        costoTrans, setCostoTrans,
        toneladas, setToneladas
    } = useContext(CostosGlobalContext);



    const [active, setActive] = useState(is_active);

    const buttons = {
        left: 0,
        middle: 1,
        right: 2,
    };


    const onclick = async (e) => {

        if (e.button === buttons.left) {

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


                        //como voy a resetar todo los lvls, entonces 

                        setMaterialesSelected([]);
                        setChoferesSelected([]);
                        setElaboradorSelected([]);
                        setTransportistaSelected([]);
                        setCompradorSelected([]);
                        setElaboradorPresent([]);
                        
                        setYearsSelected([]);
                        setMonthsSelected([]);
                        setDaysSelected([]);
                
                        loadYearsPresent(rodales_sel_, true);
                        loadMonthsPresent(rodales_sel_, true);
                        loadDaysPresent(rodales_sel_, true);

                        loadEmpresasPresent(rodales_sel_, true);
                        loadMaterialesPresent(rodales_sel_, true);
                        loadElaboradorPresent(rodales_sel_, true);
                        loadChoferesPresent(rodales_sel_, true);
                        loadTransportistasPresent(rodales_sel_, true);
                        loadCompradorPresent(rodales_sel_, true);

                        setIsLoading(true);
                        setIsLoadingTableExtraccion(false);
                        await processQuery(rodales_sel_);
                        setIsLoadingTableExtraccion(true);

                        setIsLoading(false);
                    
                    } else if(textStatusQuery == ORIGIN_QUERY.YEARS){

                        //DEBERIA CARGAR Y EMPEZAR LOS LEVELS

                        if(!isRodalesInLevels()){

                        

                            //traigo el level
                            let keys = Object.keys(levels);
                            let length = keys.length + 1;
                            let obj = {...levels};
                            obj[length] = ORIGIN_QUERY.RODALES;
                            setLevels(obj);
                            //cargo los elaboradores
                            loadDataByLevels(obj, length, rodales_sel_);

                            setIsLoadingTableExtraccion(false);
                            await processQuery(rodales_sel_);
                            setIsLoadingTableExtraccion(true);
        
                            setIsLoading(false);

                        } else {

                            loadDataByLevels(levels, getRodalesLevels(), rodales_sel_);

                            setIsLoadingTableExtraccion(false);
                            await processQuery(rodales_sel_);
                            setIsLoadingTableExtraccion(true);
        
                            setIsLoading(false);
                        }

                    

                    } else {

                        //agrego a ROdales en un lvl

                        //cargo el lvl
                        if(!isRodalesInLevels()){

                        
                            //traigo el level
                            let keys = Object.keys(levels);
                            let length = keys.length + 1;
                            let obj = {...levels};
                            obj[length] = ORIGIN_QUERY.RODALES;
                            setLevels(obj);

                            setStatusLevels(!statusLevels);
                            //cargo los elaboradores
                            loadDataByLevels(obj, length, rodales_sel_);

                            setIsLoadingTableExtraccion(false);
                            await processQuery(rodales_sel_);
                            setIsLoadingTableExtraccion(true);
        
                            setIsLoading(false);

                        

                        } else {
                            loadDataByLevels(levels, getRodalesLevels(), rodales_sel_);

                            setIsLoadingTableExtraccion(false);
                            await processQuery(rodales_sel_);
                            setIsLoadingTableExtraccion(true);
        
                            setIsLoading(false);
                        }

                    }

                } else {
                    //si no esta activo, seteo e query y el texto

                    setStatusQuery(true);
                    setTextStatusQuery(ORIGIN_QUERY.RODALES);

                    //seteo ellvl
                    setLevels({1: ORIGIN_QUERY.RODALES});
                    setStatusLevels(!statusLevels);


                    //cargo los present

                    loadYearsPresent(rodales_sel_, true);
                    loadMonthsPresent(rodales_sel_, true);
                    loadDaysPresent(rodales_sel_, true);

                    loadEmpresasPresent(rodales_sel_, true);
                    loadMaterialesPresent(rodales_sel_, true);
                    loadElaboradorPresent(rodales_sel_, true);
                    loadChoferesPresent(rodales_sel_, true);
                    loadTransportistasPresent(rodales_sel_, true);
                    loadCompradorPresent(rodales_sel_, true);


                    setIsLoading(true);
                    setIsLoadingTableExtraccion(false);
                    await processQuery(rodales_sel_);
                    setIsLoadingTableExtraccion(true);

                    setIsLoading(false);
                }

            


            } else {
                setActive(false);

                let rodales_sel_ = _deleteRodalFromSelected(name_rodal);

                if(statusQuery){

                    //aca tengo que consultar tmb por donde viene elquery
                    if(textStatusQuery == ORIGIN_QUERY.RODALES){

                        if (rodales_sel_.length == 0) {

                            setIsLoading(true);

                                setTimeout(() => {

                                    //quito el query
                                    setStatusQuery(false);
                                    setTextStatusQuery(null);
                                    setLevels(null);
                                    setStatusLevels(!statusLevels);

                                    //restauro todo como al inicio

                                    //restauro todos como en el inicio
                                    setRodalesData(rodalesDinamicData);
                                    setRodalesPresent([]);
                                    setRodalesSelected([]);
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


                                    setIsLoadingTableExtraccion(false);
                                    setDataExtraccion([]);
                                    setCurrentPageExtraccion(1);
                                    setNumberDataExtraccion(null);
                                    setPagesExtraccion(null);
                                    setIsLoadingTableExtraccion(true);

                                    setIsLoading(false);

                                }, 1000);

                            //reseteo las tablas
        
                        } else {
        
                        
                            loadYearsPresent(rodales_sel_, true);
                            loadMonthsPresent(rodales_sel_, true);
                            loadDaysPresent(rodales_sel_, true);
            
                            loadMaterialesPresent(rodales_sel_, true);
                            loadElaboradorPresent(rodales_sel_, true);
                            loadChoferesPresent(rodales_sel_, true);
                            loadTransportistasPresent(rodales_sel_, true);
                            loadCompradorPresent(rodales_sel_, true);

                            setIsLoading(true);
                            setIsLoadingTableExtraccion(false);
                            await processQuery(rodales_sel_);
                            setIsLoadingTableExtraccion(true);
            
                            setIsLoading(false);
                    
                        }
        

                    } else {

                        //aca lo que cambia es que tengo que cargar los presents de nue
                        if(rodalesSelected.length == 1){

                            //tengoque sacar el ROdal del lvl
                            let key = Object.keys(levels).filter(function(key) {return levels[key] === 
                                ORIGIN_QUERY.RODALES})[0];

                            _deleteItemFromLevels(key);

                            loadDataByLevels(levels, key, rodales_sel_);

                            setIsLoading(true);
                            setIsLoadingTableExtraccion(false);
                            await processQuery(rodales_sel_);
                            setIsLoadingTableExtraccion(true);
            
                            setIsLoading(false);

                        } else {
                            //quedan dos rodales
                            let key = Object.keys(levels).filter(function(key) {return levels[key] === 
                                ORIGIN_QUERY.RODALES})[0];

                            loadDataByLevels(levels, key, rodales_sel_);

                            setIsLoading(true);
                            setIsLoadingTableExtraccion(false);
                            await processQuery(rodales_sel_);
                            setIsLoadingTableExtraccion(true);
            
                            setIsLoading(false);
                        }

                    }
                } 

                //creo que siempre habra un query seleccionado
            

            }

        } else if (e.button === buttons.right) {

            let id_rodal_attr = e.currentTarget.getAttribute('rodal_id');

            if(id_rodal_attr !== undefined && id_rodal_attr != null){
                
                window.open(URL_APP_PINDO.RODALES_VIEW_BY_ID_SAP + -1 + '/' + id_rodal_attr, "_blank");
                

            }

        }

      


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


    const isRodalesInLevels = () => {

        let is_present = false;

        Object.entries(levels).forEach(([key, value]) => {

            if(value == ORIGIN_QUERY.RODALES){
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
            if(key < key_current){
                new_obj[key] = value;
            }
         
        });

        setLevels(new_obj);

    }


    const processQuery = async (rodales_sel_) => {

        const metadata = await getMetadataFunctionForestal(empresasSelected, rodales_sel_, materialesSelected,
            elaboradorSelected, choferesSelected, transportistaSelected, compradorSelected, yearsSelected, monthsSelected,
            daysSelected);

       

        if (metadata) {

            //tengo que traer los datos de costos y luego setear los metadatos
            const data_extraccion = await getExtraccionDataFunction(empresasSelected, rodales_sel_, materialesSelected,
                elaboradorSelected, choferesSelected, transportistaSelected, compradorSelected, yearsSelected, monthsSelected,
                daysSelected, 1);

            if (data_extraccion) {

                setNumberDataExtraccion(metadata.cantidad);
                setPagesExtraccion(metadata.pages);
                setCostoElab(metadata.sum_costo_elab);
                setCostoTrans(metadata.sum_costo_trans);
                setToneladas(metadata.toneladas);
                
                setDataExtraccion(data_extraccion);

            }

           
        }

          //traigo los datos para las tabla RDM
        const dataRDM_ = await getResumenRDMFunctionForestal(empresasSelected, rodales_sel_, materialesSelected,
            elaboradorSelected, choferesSelected, transportistaSelected, compradorSelected, yearsSelected, monthsSelected,
            daysSelected);

        if(dataRDM_){

            setDataRDM(dataRDM_);

        }



    }

    //al seleccionar un rodal tengo que cargar los a;os

    const loadYearsPresent = async (rodales_sel_, is_reset) => {
        setIsLoading(true);
        let years_pres = null;

        if(is_reset){

            years_pres = await getYearsPresentQuery([], rodales_sel_, [], [], [], 
                [], []);

        } else {

            years_pres = await getYearsPresentQuery(empresasSelected, rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
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
        setIsLoading(false);

    }


    const loadMonthsPresent = async (rodales_sel_, is_reset) => {
        setIsLoading(true);
        let months_data = null;

        if(is_reset){

            months_data = await getMonthsPresentQuery([], rodales_sel_, [], [], [], 
            [], []);

        } else {


            months_data = await getMonthsPresentQuery(empresasSelected, rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
            transportistaSelected, compradorSelected);

        }

        if (months_data) {

            setMonthsPresent(months_data);

        }

        setStatusMonths(!statusMonths);
        setIsLoading(false);


    }

    const loadDaysPresent = async (rodales_sel_, is_reset) => {
        setIsLoading(true);
        let days_data = null;

        if(is_reset){

            days_data = await getDaysPresentQuery([], rodales_sel_, [], [], [], 
                [], []);

        } else {

            days_data = await getDaysPresentQuery(empresasSelected, rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                transportistaSelected, compradorSelected);

        }

    
        if (days_data) {

            setDaysPresent(days_data);

        }

        setStatusDays(!statusDays);
        setIsLoading(false);
    }


    const loadEmpresasPresent = async (rodales_sel_, is_reset) => {
        setIsLoading(true);

        let emp_present = null;

        if (is_reset) {
            emp_present = await getEmpresasPresentQuery(rodales_sel_, [], [], [], [],
                [], [], []);
        } else {

            emp_present = await getEmpresasPresentQuery(rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected,
                transportistaSelected,
                compradorSelected, [], []);

        }

      

        if (emp_present) {

            let empresas = [];

            emp_present.forEach(emp_pres => {
                //recorro los rodalesDInamic quetiene todos
                empresasDinamicData.forEach(emp => {

                    if (emp_pres.idempresa == emp.idempresa) {

                        empresas.push(emp);

                    }

                });

            });

            setEmpresasData(empresas);
            setEmpresasPresent(empresas);
            setStatusEmpresas(!statusEmpresas);

        }

        //setStatusMateriales(!statusMateriales);
        setIsLoading(false);
    }

    const loadMaterialesPresent = async (rodales_sel_, is_reset) => {
        setIsLoading(true);
        let mat_present = null;

        if(is_reset){

            mat_present = await getMaterialesPresentQuery([], rodales_sel_, [], [], [], 
                [], []);

        } else {

            mat_present = await getMaterialesPresentQuery(empresasSelected, rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                transportistaSelected, compradorSelected);

        }

        if (mat_present) {

            setMaterialesPresent(mat_present);

        }

        setStatusMateriales(!statusMateriales);

        setIsLoading(false);

    }

    const loadElaboradorPresent = async (rodales_sel_, is_reset) => {
        setIsLoading(true);
        let ela_present = null;

        //consulto si esta activo yearsquery
        if(textStatusQuery != ORIGIN_QUERY.YEARS){

            if(is_reset){

                ela_present = await getElaboradorPresentQuery([], rodales_sel_, [], [], [], 
                    [], []);
    
            } else {
    
                ela_present = await getElaboradorPresentQuery(empresasSelected, rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                    transportistaSelected, compradorSelected);
    
            }

        } else {

            ela_present = await getElaboradorPresentQuery(empresasSelected, rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                transportistaSelected, compradorSelected, yearsSelected);

        }


        if (ela_present) {

            setElaboradorPresent(ela_present);

        }
        setStatusElaborador(!statusElaborador);
        setIsLoading(false);
    }

    const loadChoferesPresent = async (rodales_sel_, is_reset) => {
        setIsLoading(true);
        let choferes_data = null;

        if(textStatusQuery != ORIGIN_QUERY.YEARS){

            if(is_reset){

                choferes_data = await getChoferesPresentQuery([], rodales_sel_, [], [], [], 
                    [], []);
    
            } else {
    
                choferes_data = await getChoferesPresentQuery(empresasSelected, rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                    transportistaSelected, compradorSelected);
    
            }
    

        } else {
            choferes_data = await getChoferesPresentQuery(empresasSelected, rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                transportistaSelected, compradorSelected, yearsSelected);

        }

       

        if (choferes_data) {
            setChoferesPresent(choferes_data);

        }

        setStatusChoferes(!statusChoferes);
        setIsLoading(false);
    }

    const loadTransportistasPresent = async (rodales_sel_, is_reset) => {
        setIsLoading(true);
        let transportista_data = null;

        if(textStatusQuery != ORIGIN_QUERY.YEARS){

            if(is_reset){

                transportista_data = await getTransportistasPresentQuery([], rodales_sel_, [], [], [], 
                    [], []);
            } else {
                transportista_data = await getTransportistasPresentQuery(empresasSelected, rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                    transportistaSelected, compradorSelected);
            }

        } else {

            transportista_data = await getTransportistasPresentQuery(empresasSelected, rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                transportistaSelected, compradorSelected, yearsSelected);
            
        }

      

     

        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setStatusTransportista(!statusTransportista);

        setIsLoading(false);

    }

    const loadCompradorPresent = async (rodales_sel_, is_reset) => {
        setIsLoading(true);
        let comprador_data = null;

        if(textStatusQuery != ORIGIN_QUERY.YEARS){


            if(is_reset){

                comprador_data = await getCompradorPresentQuery([], rodales_sel_, [], [], [], 
                    [], []);

            } else {

                comprador_data = await getCompradorPresentQuery(empresasSelected, rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                    transportistaSelected, compradorSelected);

            }


        } else {

            comprador_data = await getCompradorPresentQuery(empresasSelected, rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected, 
                transportistaSelected, compradorSelected, yearsSelected);
        }



       

        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setStatusComprador(!statusComprador);

        setIsLoading(false);

    }


    //me falta todo los metodos lvls

    const loadYearsPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

        setIsLoading(true);
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


        setIsLoading(false);

    }

    const loadMonthsPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

            setIsLoading(true);
        if (textStatusQuery != ORIGIN_QUERY.YEARS) {


            let months_data = await getMonthsPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects);



            if (months_data) {

                setMonthsPresent(months_data);

            }

            setMonthsSelected([]);
            setStatusMonths(!statusMonths);

        }


        setIsLoading(false);
    }

    const loadDaysPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

            setIsLoading(true);
        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            let days_data = await getDaysPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects);
    
    
    
            if (days_data) {
    
                setDaysPresent(days_data);
    
            }
            setDaysSelected([]);
            setStatusDays(!statusDays);


        }


        setIsLoading(false);

    }


    const loadMaterialesPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {
            setIsLoading(true);
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
        setIsLoading(false);
    }


    const loadElaboradorPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

            setIsLoading(true);
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

        setIsLoading(false);

    }

    const loadChoferesPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

            setIsLoading(true);
        let choferes_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {
            choferes_data = await getChoferesPresentQuery(empresas_sel, rod_selects, mat_selects,
                elab_selects, chof_selects, transp_selects,
                comp_selects);

        } else {

            choferes_data = await getChoferesPresentQuery(empresas_sel, rod_selects, mat_selects,
                elab_selects, chof_selects, transp_selects,
                comp_selects, yearsSelected);

        }

      
        if (choferes_data) {
            setChoferesPresent(choferes_data);
            setChoferesSelected([]);

        }

        setChoferesSelected([]);
        setStatusChoferes(!statusChoferes);

        setIsLoading(false);
    }

    const loadTransportistasPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

            setIsLoading(true);
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

        setIsLoading(false);

    }

    const loadCompradorPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

        
            setIsLoading(true);
        let comprador_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            comprador_data = await getCompradorPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects);

        } else {

            comprador_data = await getCompradorPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects, yearsSelected);

        }
      
        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setCompradorSelected([]);

        setStatusComprador(!statusComprador);
        setIsLoading(false);

    }


    const loadEmpresasPresentLevels = async (rodales_sel_, is_reset) => {

        setIsLoading(true);
        let emp_present = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            emp_present = await getEmpresasPresentQuery(rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected,
                transportistaSelected,
                compradorSelected, [], []);

        } else {

            emp_present = await getEmpresasPresentQuery(rodales_sel_, materialesSelected, elaboradorSelected, choferesSelected,
                transportistaSelected,
                compradorSelected, yearsSelected, []);

        }

        


        if (emp_present) {

            let empresas = [];

            emp_present.forEach(emp_pres => {
                //recorro los rodalesDInamic quetiene todos
                empresasDinamicData.forEach(emp => {

                    if (emp_pres.idempresa == emp.idempresa) {

                        empresas.push(emp);

                    }

                });

            });

            setEmpresasData(empresas);
            setEmpresasPresent(empresas);
            setStatusEmpresas(!statusEmpresas);

        }

        //setStatusMateriales(!statusMateriales);

        setIsLoading(false);

    }


    const loadDataByLevels = (levels, lvl_current, rodales_sel_) => {


        
          //creo variables y si estanlas agrego
          let empresas_ = [];
          let materiales_ = [];
          let choferes_ = [];
          let elaborador_ = [];
          let transportista_ = [];
          let comprador_ = [];
  
          let is_emp = false;
          let is_mat = false;
          let is_chof = false;
          let is_elab = false;
          let is_trans = false;
          let is_comp = false;


          Object.entries(levels).forEach(([key, value]) => {

            //consulto sila key es menor dejo los selected
            if (key < lvl_current) {

                if (value == ORIGIN_QUERY.EMPRESAS) {
                    empresas_ = [...empresasSelected];
                    is_emp = true;
                }

                if (value == ORIGIN_QUERY.MATERIALES) {
                    materiales_ = [...materialesSelected];
                    is_mat = true;
                }

                if (value == ORIGIN_QUERY.CHOFER) {
                    choferes_ = [...choferesSelected];
                    is_chof = true;
                }

                if (value == ORIGIN_QUERY.ELABORADOR) {
                    elaborador_ = [...elaboradorSelected];
                    is_elab = true;
                }

                if (value == ORIGIN_QUERY.TRANSPORTISTA) {
                    transportista_ = [...transportistaSelected];
                    is_trans = true;
                }

                if (value == ORIGIN_QUERY.COMPRADOR) {
                    comprador_ = [...compradorSelected];
                    is_comp = true;
                }

            }

        });

        loadYearsPresentLevels(empresas_, rodales_sel_, materiales_, elaborador_, choferes_, transportista_, comprador_);
        loadMonthsPresentLevels(empresas_, rodales_sel_, materiales_, elaborador_, choferes_, transportista_, comprador_);
        loadDaysPresentLevels(empresas_, rodales_sel_, materiales_, elaborador_, choferes_, transportista_, comprador_);


        if (!is_emp) {
            loadEmpresasPresentLevels(rodales_sel_, materiales_, elaborador_, choferes_, transportista_, comprador_);
        }

        if (!is_mat) {
            loadMaterialesPresentLevels(empresas_, rodales_sel_, materiales_, elaborador_, choferes_, transportista_, comprador_);
        }

        if (!is_elab) {
            //con los datos disponibles cargo
            loadElaboradorPresentLevels(empresas_, rodales_sel_, materiales_, elaborador_, choferes_, transportista_, comprador_);
        }

        if (!is_chof) {
            loadChoferesPresentLevels(empresas_, rodales_sel_, materiales_, elaborador_, choferes_, transportista_, comprador_);
        }

        if (!is_trans) {
            loadTransportistasPresentLevels(empresas_, rodales_sel_, materiales_, elaborador_, choferes_, transportista_, comprador_);
        }

        if (!is_comp) {
            loadCompradorPresentLevels(empresas_, rodales_sel_, materiales_, elaborador_, choferes_, transportista_, comprador_);
        }

      


    }


    const getRodalesLevels = () => {

        let lvl = false;

        Object.entries(levels).forEach(([key, value]) => {

            if (value == ORIGIN_QUERY.RODALES) {
                lvl = key;
            }


        });


        return lvl;

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
                    attr="XOP-5632" rodal_id={idrodal}  onContextMenu={(e) => e.preventDefault()}
                    onMouseDown={onclick}
                >
                    <RodalesIcon></RodalesIcon>

                    {name_rodal}
                </a>
                :

                <a className="list-group-item list-group-item-action item-layer " aria-current="true"
                    attr="XOP-5632" rodal_id={idrodal} onMouseDown={onclick} onContextMenu={(e) => e.preventDefault()}
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