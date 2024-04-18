import React, { useContext, useEffect, useState } from 'react'
import MaterialesIcon from '../../../icons/MaterialesIcon'
import { CostosGlobalContext, DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';
import { getChoferesPresentQuery, getCompradorPresentQuery, getDaysPresentQuery, getElaboradorPresentQuery, getEmpresasPresentQuery, getExtraccionDataFunction, getMetadataFunctionForestal, getMonthsPresentQuery, getRodalesPresentQuery, getTransportistasPresentQuery, getYearsPresentQuery } from '../../../utility/Procesamiento';

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



    const [active, setActive] = useState(false);


    const onclickHandler = async () => {

        if (!active) {

          
            setActive(true);

            setIsLoading(true);

            //hago el filtro, pero ahora utilizando el material
            //cargo el material selec
            let mat_selects = [...materialesSelected, idmaterial];
            setMaterialesSelected(mat_selects);

            if (statusQuery) {

                if (textStatusQuery == ORIGIN_QUERY.MATERIALES) {

                    //creo que volviendo a cargar a ya selimpianlos present

                    //Aca deberia setear el lvl tmb
                    //aca estoy en el levl 1

                    setYearsSelected([]);
                    setMonthsSelected([]);
                    setDaysSelected([]);

                    setRodalesSelected([]);
                    setChoferesSelected([]);
                    setElaboradorSelected([]);
                    setTransportistaSelected([]);
                    setCompradorSelected([]);
                    setElaboradorPresent([]);

                    loadYearsPresent(mat_selects, true);
                    loadMonthsPresent(mat_selects, true);
                    loadDaysPresent(mat_selects, true);

                    loadEmpresasPresent(mat_selects, true);
                    //tengo que carhar mas rodales y limpiar los demas
                    loadRodalesPresent(mat_selects, true);
                    //tengo que limpiar los demas porque seleccione unnuevo material los SELCTE
                    loadElaboradorPresent(mat_selects, true);
                    loadChoferesPresent(mat_selects, true);
                    loadTransportistasPresent(mat_selects, true);
                    loadCompradorPresent(mat_selects, true);

                    setIsLoading(true);
                    setIsLoadingTableExtraccion(false);
                    await processQuery(mat_selects);
                    setIsLoadingTableExtraccion(true);
                    setIsLoading(false);

                } else {



                    //cargo el lvl
                    if (!isMaterialInLevels()) {


                        //traigo el level
                        let keys = Object.keys(levels);
                        let length = keys.length + 1;
                        let obj = { ...levels };
                        obj[length] = ORIGIN_QUERY.MATERIALES;
                        setLevels(obj);
                        setStatusLevels(!statusLevels);

                        //como no estaba se agrego y actualizo 
                        //tengo que averiguar en que lvl estoy para actualizar los de abajo
                        //en este caso ya tengo el lvl gracias al lenght
                        loadDataByLevels(obj, length, mat_selects);

                        setIsLoading(true);
                        setIsLoadingTableExtraccion(false);
                        await processQuery(mat_selects);
                        setIsLoadingTableExtraccion(true);
                        setIsLoading(false);


                    } else {
                        //consulto el lvl en el que staba seleccionado y actualizo los de abajo
                        loadDataByLevels(levels, getMaterialLevels(), mat_selects);

                        setIsLoading(true);
                        setIsLoadingTableExtraccion(false);
                        await processQuery(mat_selects);
                        setIsLoadingTableExtraccion(true);
                        setIsLoading(false);


                    }

                }



            } else {

                //seteo a Materiales como item
                //no habia query selected, entonces seteo a ELaborador como el iniciador
                setStatusQuery(true);
                setTextStatusQuery(ORIGIN_QUERY.MATERIALES);

                //Aca deberia setear el lvl tmb
                setLevels({ 1: ORIGIN_QUERY.MATERIALES });
                setStatusLevels(!statusLevels);

                loadYearsPresent(mat_selects);
                loadMonthsPresent(mat_selects);
                loadDaysPresent(mat_selects);

                loadEmpresasPresent(mat_selects);
                loadRodalesPresent(mat_selects);
                loadChoferesPresent(mat_selects);
                loadElaboradorPresent(mat_selects);
                loadTransportistasPresent(mat_selects);
                loadCompradorPresent(mat_selects);

                setIsLoading(true);
                setIsLoadingTableExtraccion(false);
                await processQuery(mat_selects);
                setIsLoadingTableExtraccion(true);
                setIsLoading(false);


            }

        } else {

            setActive(false);

            //elimino el material de los selected
            let mat_selects = _removeMaterialSelected();

            //vuelvo a hacer las consultas de todos los demas
            //SI quito la seleccion taigo de nuevo todo

            //debo comprobar si no estoy en el ultimo, si estoy limpio todos los elementos

            if (statusQuery) {

                if (textStatusQuery == ORIGIN_QUERY.MATERIALES) {

                    if (materialesSelected.length == 1) {

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

                    } else {

                        loadYearsPresent(mat_selects);
                        loadMonthsPresent(mat_selects);
                        loadDaysPresent(mat_selects);
                        loadEmpresasPresent(elab_selects);
                        loadRodalesPresent(mat_selects);
                        loadElaboradorPresent(mat_selects);
                        loadChoferesPresent(mat_selects);
                        loadTransportistasPresent(mat_selects);
                        loadCompradorPresent(mat_selects);

                        setIsLoading(true);
                        setIsLoadingTableExtraccion(false);
                        await processQuery(mat_selects);
                        setIsLoadingTableExtraccion(true);
                        setIsLoading(false);

                    }

                } else {

                    //quito el level solo si deseleccione todo
                    if (materialesSelected.length == 1) {


                        let key = Object.keys(levels).filter(function (key) {
                            return levels[key] ===
                                ORIGIN_QUERY.MATERIALES
                        })[0];

                        _deleteItemFromLevels(key);

                        //restauro todos sin contar el nivel actual
                        //no hay materiales seleccionados
                        loadDataByLevels(levels, key, mat_selects);

                        setIsLoading(true);
                        setIsLoadingTableExtraccion(false);
                        await processQuery(mat_selects);
                        setIsLoadingTableExtraccion(true);
                        setIsLoading(false);

                    } else {

                     
                        //quedaba mas de un material, entonce hago la consulta
                        let key = Object.keys(levels).filter(function (key) {
                            return levels[key] ===
                                ORIGIN_QUERY.MATERIALES
                        })[0];

                        loadDataByLevels(levels, key, mat_selects);

                        setIsLoading(true);
                        setIsLoadingTableExtraccion(false);
                        await processQuery(mat_selects);
                        setIsLoadingTableExtraccion(true);
                        setIsLoading(false);


                    }


                }



            }



        }
    }



    const processQuery = async (mat_selects) => {

        const metadata = await getMetadataFunctionForestal(empresasSelected, rodalesSelected, mat_selects,
            elaboradorSelected, choferesSelected, transportistaSelected, compradorSelected, yearsSelected, monthsSelected,
            daysSelected);

       

        if (metadata) {

            //tengo que traer los datos de costos y luego setear los metadatos
            const data_extraccion = await getExtraccionDataFunction(empresasSelected, rodalesSelected, mat_selects,
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

    }


    const isMaterialInLevels = () => {

        let is_present = false;

        Object.entries(levels).forEach(([key, value]) => {

            if (value == ORIGIN_QUERY.MATERIALES) {
                is_present = true;
            }


        });

        console.log('resultado de present: ' + is_present);

        return is_present;

    }

    const getMaterialLevels = () => {

        let lvl = false;

        Object.entries(levels).forEach(([key, value]) => {

            if (value == ORIGIN_QUERY.MATERIALES) {
                lvl = key;
            }


        });


        return lvl;

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


    const loadDataByLevels = (levels, lvl_current, mat_selects) => {

        console.log('Levles del material');

        //creo variables y si estanlas agrego
        let empresas_ = [];
        let rodales_ = [];
        let choferes_ = [];
        let elaborador_ = [];
        let transportista_ = [];
        let comprador_ = [];

        let is_emp = false;
        let is_rod = false;
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

                if (value == ORIGIN_QUERY.RODALES) {
                    rodales_ = [...rodalesSelected];
                    is_rod = true;
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

       
        loadYearsPresentLevels(empresas_, rodales_, mat_selects, elaborador_, choferes_, transportista_, comprador_);
        loadMonthsPresentLevels(empresas_, rodales_, mat_selects, elaborador_, choferes_, transportista_, comprador_);
        loadDaysPresentLevels(empresas_, rodales_, mat_selects, elaborador_, choferes_, transportista_, comprador_);


        if (!is_emp) {
            loadEmpresasPresentLevels(rodales_, mat_selects, elaborador_, choferes_, transportista_, comprador_);
        }
      
        if (!is_rod) {
            loadRodalesPresentLevels(empresas_, mat_selects, elaborador_, choferes_, transportista_, comprador_);
        }

        if (!is_elab) {
            //con los datos disponibles cargo
            loadElaboradorPresentLevels(empresas_, rodales_, mat_selects, elaborador_, choferes_, transportista_, comprador_);
        }

        if (!is_chof) {
            loadChoferesPresentLevels(empresas_, rodales_, mat_selects, elaborador_, choferes_, transportista_, comprador_);
        }

        if (!is_trans) {
            loadTransportistasPresentLevels(empresas_, rodales_, mat_selects, elaborador_, choferes_, transportista_, comprador_);
        }

        if (!is_comp) {
            loadCompradorPresentLevels(empresas_, rodales_, mat_selects, elaborador_, choferes_, transportista_, comprador_);
        }


        //con los datos disponibles cargo






    }


    const loadYearsPresent = async (mat_selects, is_reset) => {
        setIsLoading(true);
        let years_pres = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {
                years_pres = await getYearsPresentQuery([], [], mat_selects, [], [], [],
                    []);
            } else {
                //llamo al metodo que carga los years
                years_pres = await getYearsPresentQuery(empresasSelected, rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
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

        setIsLoading(false);

    }


    const loadMonthsPresent = async (mat_selects, is_reset) => {
        setIsLoading(true);
        let months_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {

                //para traer los meses uso los rodales como filtro
                months_data = await getMonthsPresentQuery([], [], mat_selects, [], [], [],
                    []);
    
            } else {
                //para traer los meses uso los rodales como filtro
                months_data = await getMonthsPresentQuery(empresasSelected, rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                    compradorSelected);
    
            }
    
    
    
            if (months_data) {
    
                setMonthsPresent(months_data);
    
            }
    
            setStatusMonths(!statusMonths);


        }

        
        setIsLoading(false);

    }

    const loadDaysPresent = async (mat_selects, is_reset) => {
        setIsLoading(true);
        let days_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {

                days_data = await getDaysPresentQuery([], [], mat_selects, [], [], [],
                    []);
    
    
            } else {
    
                days_data = await getDaysPresentQuery(empresasSelected, rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                    compradorSelected);
    
            }
    
    
    
            if (days_data) {
    
                setDaysPresent(days_data);
    
            }
    
            setStatusDays(!statusDays);


        }

        
        setIsLoading(false);
    }


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


    const loadElaboradorPresent = async (mat_selects, is_reset) => {
        setIsLoading(true);
        let ela_present = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {
                ela_present = await getElaboradorPresentQuery([], [], mat_selects, [], [], [],
                    []);

            } else {
                ela_present = await getElaboradorPresentQuery(empresasSelected, rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                    compradorSelected);
            }

        } else {


            ela_present = await getElaboradorPresentQuery(empresasSelected, rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                compradorSelected, yearsSelected);

        }




        if (ela_present) {

            setElaboradorPresent(ela_present);

        }
        setStatusElaborador(!statusElaborador);

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

    const loadChoferesPresent = async (mat_selects, is_reset) => {

        setIsLoading(true);
        let choferes_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {

                choferes_data = await getChoferesPresentQuery([], [], mat_selects, [], [], [],
                    []);

            } else {
                choferes_data = await getChoferesPresentQuery(empresasSelected, rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                    compradorSelected);

            }


        } else {

            choferes_data = await getChoferesPresentQuery(empresasSelected, rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                compradorSelected, yearsSelected);

        }




        if (choferes_data) {
            setChoferesPresent(choferes_data);

        }

        setStatusChoferes(!statusChoferes);

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

    const loadTransportistasPresent = async (mat_selects, is_reset) => {

        setIsLoading(true);
        let transportista_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {
                transportista_data = await getTransportistasPresentQuery([], [], mat_selects, [], [], [],
                    []);
            } else {

                transportista_data = await getTransportistasPresentQuery(empresasSelected, rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                    compradorSelected);

            }


        } else {

            transportista_data = await getTransportistasPresentQuery(rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                compradorSelected, yearsSelected);

        }




        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setStatusTransportista(!statusTransportista);

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



    const loadCompradorPresent = async (mat_selects, is_reset) => {
        setIsLoading(true);
        let comprador_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {
                comprador_data = await getCompradorPresentQuery([], null, mat_selects, null, null, null,
                    null);

            } else {

                comprador_data = await getCompradorPresentQuery(empresasSelected, rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                    compradorSelected);

            }

        } else {

            comprador_data = await getCompradorPresentQuery(empresasSelected, rodalesSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                compradorSelected, yearsSelected);

        }





        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setStatusComprador(!statusComprador);

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


    const loadRodalesPresent = async (mat_selects) => {

        setIsLoading(true);
        let rod_present = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {
            rod_present = await getRodalesPresentQuery(empresasSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                compradorSelected);

        } else {

            rod_present = await getRodalesPresentQuery(empresasSelected, mat_selects, elaboradorSelected, choferesSelected, transportistaSelected,
                compradorSelected, yearsSelected);

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

        setIsLoading(false);

        //setStatusMateriales(!statusMateriales);

    }

    const loadRodalesPresentLevels = async (empresas_sel, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

            setIsLoading(true);
        let rod_present = null;
        //tengo que consultar por elyears
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
            setStatusRodales(!statusRodales);

        }

        //setStatusMateriales(!statusMateriales);
        setIsLoading(false);
    }



    const loadEmpresasPresent = async (mat_selects, is_reset) => {

        setIsLoading(true);
        let emp_present = null;

        if (is_reset) {
            emp_present = await getEmpresasPresentQuery([], mat_selects, [], [], [],
                [], [], []);
        } else {

            emp_present = await getEmpresasPresentQuery(rodalesSelected, mat_selects, elaboradorSelected, choferesSelected,
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

    const loadEmpresasPresentLevels = async (rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {
            setIsLoading(true);

        let emp_present = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            emp_present = await getEmpresasPresentQuery(rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects, [], []);

        } else {

            emp_present = await getEmpresasPresentQuery(rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects, yearsSelected, []);

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