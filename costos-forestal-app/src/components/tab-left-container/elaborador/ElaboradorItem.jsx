import React, { useContext, useEffect, useState } from 'react'
import ElaboradorIcon from '../../../icons/ElaboradorIcon'
import { CostosGlobalContext, DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';
import { getChoferesPresentQuery, getCompradorPresentQuery, getDaysPresentQuery, getEmpresasPresentQuery, getExtraccionDataFunction, getMaterialesPresentQuery, getMetadataFunctionForestal, getMonthsPresentQuery, getRodalesPresentQuery, getTransportistasPresentQuery, getYearsPresentQuery } from '../../../utility/Procesamiento';

const ElaboradorItem = ({ name_elaborador, idelaborador, is_present, elaborador }) => {

    const [active, setActive] = useState(false);

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


    const onclickHandler = async () => {

        if (!active) {

            setActive(true);
            let elabs_selects = [...elaboradorSelected, idelaborador];
            setElaboradorSelected(elabs_selects);

            //consulto quien hizo el query
            if (statusQuery) {

                if (textStatusQuery == ORIGIN_QUERY.ELABORADOR) {

                    //ESTAMOS EN ELABORADOR COMO QUERY
                    //CADA VEZ QUE SE CLIQUEA ACA SE RESETEAN TODOS LOS SELECTED Y DATOS


                    loadYearsPresent(elabs_selects, true);
                    loadMonthsPresent(elabs_selects, true);
                    loadDaysPresent(elabs_selects, true);

                    //cargo las empresas


                    loadEmpresasPresent(elabs_selects, true);
                    loadRodalesPresent(elabs_selects, true);
                    loadMaterialesPresent(elabs_selects, true);
                    loadChoferesPresent(elabs_selects, true);
                    loadTransportistasPresent(elabs_selects, true);
                    loadCompradorPresent(elabs_selects, true);

                    setIsLoading(true);
                    setIsLoadingTableExtraccion(false);
                    await processQuery(elabs_selects);
                    setIsLoadingTableExtraccion(true);
                    setIsLoading(false);



                } else {


                    if (!isElaboradorInLevels()) {

                        //traigo el level
                        let keys = Object.keys(levels);
                        let length = keys.length + 1;
                        let obj = { ...levels };
                        obj[length] = ORIGIN_QUERY.ELABORADOR;
                        setLevels(obj);

                        setStatusLevels(!statusLevels);

                        loadDataByLevels(obj, length, elabs_selects)


                        setIsLoading(true);
                        setIsLoadingTableExtraccion(false);
                        await processQuery(elabs_selects);
                        setIsLoadingTableExtraccion(true);
                        setIsLoading(false);


                    } else {

                        //consulto el lvl en el que staba seleccionado y actualizo los de abajo
                        loadDataByLevels(levels, getElaboradorLevel(), elabs_selects);

                        setIsLoading(true);
                        setIsLoadingTableExtraccion(false);
                        await processQuery(elabs_selects);
                        setIsLoadingTableExtraccion(true);
                        setIsLoading(false);

                    }



                }


            } else {

                //no habia query selected, entonces seteo a ELaborador como el iniciador
                setStatusQuery(true);
                setTextStatusQuery(ORIGIN_QUERY.ELABORADOR);

                //Aca deberia setear el lvl tmb
                setLevels({ 1: ORIGIN_QUERY.ELABORADOR });
                setStatusLevels(!statusLevels);


                //COMO ENTRO LA PRIMERA VEZ, PUEDO REALIZAR LA CARGA DE TODOS
                //TENGO QUE TRAER INICIALMENTE LOS RODALES PRESENT
                loadYearsPresent(elabs_selects, true);
                loadMonthsPresent(elabs_selects, true);
                loadDaysPresent(elabs_selects, true);

                loadEmpresasPresent(elabs_selects, true);
                loadRodalesPresent(elabs_selects, true);
                loadMaterialesPresent(elabs_selects, true);
                loadChoferesPresent(elabs_selects, true);
                loadTransportistasPresent(elabs_selects, true);
                loadCompradorPresent(elabs_selects, true);

                setIsLoading(true);
                setIsLoadingTableExtraccion(false);
                await processQuery(elabs_selects);
                setIsLoadingTableExtraccion(true);
                setIsLoading(false);



            }



        } else {

            setActive(false);
            //tengo que eliniar el eleaborador seleccionado
            let elab_selects = _deleteItemElabSelected();
            //setElaboradorSelected(elab_selects);

            if (statusQuery) {

                if (textStatusQuery == ORIGIN_QUERY.ELABORADOR) {

                    //si llegue al ultimo, quito el query y cargo completo
                    if (elaboradorSelected.length == 1) {

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
                        alert('QUedan mas de dos elaboradores');
                        loadYearsPresent(elab_selects);
                        loadMonthsPresent(elab_selects);
                        loadDaysPresent(elab_selects);

                        loadEmpresasPresent(elab_selects);
                        loadRodalesPresent(elab_selects);
                        loadMaterialesPresent(elab_selects);
                        loadChoferesPresent(elab_selects);
                        loadTransportistasPresent(elab_selects);
                        loadCompradorPresent(elab_selects);

                        setIsLoading(true);
                        setIsLoadingTableExtraccion(false);
                        await processQuery(elabs_selects);
                        setIsLoadingTableExtraccion(true);
                        setIsLoading(false);
                    }


                } else {

                    //debo consultar si estoy en el ultimo seleccionado
                    //si es el ultimo elimino la key de los lvls
                    if (elaboradorSelected.length == 0) {

                        let key = Object.keys(levels).filter(function (key) {
                            return levels[key] ===
                                ORIGIN_QUERY.ELABORADOR
                        })[0];

                        _deleteItemFromLevels(key);

                        //restauro todos sin contar el nivel actual
                        //no hay materiales seleccionados
                        loadDataByLevels(levels, key, elab_selects);

                        setIsLoading(true);
                        setIsLoadingTableExtraccion(false);
                        await processQuery(elabs_selects);
                        setIsLoadingTableExtraccion(true);
                        setIsLoading(false);

                    } else {

                        let key = Object.keys(levels).filter(function (key) {
                            return levels[key] ===
                                ORIGIN_QUERY.ELABORADOR
                        })[0];

                        loadDataByLevels(levels, key, elab_selects);

                        setIsLoading(true);
                        setIsLoadingTableExtraccion(false);
                        await processQuery(elabs_selects);
                        setIsLoadingTableExtraccion(true);
                        setIsLoading(false);

                    }


                }



            }

        }

    }



    const processQuery = async (elab_selects) => {

        const metadata = await getMetadataFunctionForestal(empresasSelected, rodalesSelected, materialesSelected,
            elab_selects, choferesSelected, transportistaSelected, compradorSelected, yearsSelected, monthsSelected,
            daysSelected);



        if (metadata) {

            //tengo que traer los datos de costos y luego setear los metadatos
            const data_extraccion = await getExtraccionDataFunction(empresasSelected, rodalesSelected, materialesSelected,
                elab_selects, choferesSelected, transportistaSelected, compradorSelected, yearsSelected, monthsSelected,
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



    const _deleteItemElabSelected = () => {

        let items = [];

        elaboradorSelected.forEach(elab => {

            if (idelaborador != elab) {

                items.push(elab);

            }

        });

        setElaboradorSelected(items);

        return items;

    }


    const isElaboradorInLevels = () => {

        let is_present = false;

        Object.entries(levels).forEach(([key, value]) => {

            if (value == ORIGIN_QUERY.ELABORADOR) {
                is_present = true;
            }


        });

        console.log('resultado de present: ' + is_present);

        return is_present;

    }



    const loadYearsPresent = async (elab_selects, is_reset) => {


        let years_pres = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {
                years_pres = await getYearsPresentQuery([], [], [], elab_selects, [], [],
                    []);
            } else {
                //llamo al metodo que carga los years
                years_pres = await getYearsPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
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



    }

    const loadMonthsPresent = async (elab_selects, is_reset) => {

        //ACA PUEDO UTILIZAR UN FLAGS PARA SAER SI LIMPIO LOS SELECT
        let months_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {
                months_data = await getMonthsPresentQuery([], [], [], elab_selects, [], [],
                    []);

            } else {

                //para traer los meses uso los rodales como filtro
                months_data = await getMonthsPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
                    compradorSelected);


            }


            if (months_data) {

                setMonthsPresent(months_data);

            }

            setStatusMonths(!statusMonths);

        }



    }

    const loadDaysPresent = async (elab_selects, is_reset) => {

        //ACA PUEDO UTILIZAR UN FLAGS PARA SAER SI LIMPIO LOS SELECT
        let days_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {

                days_data = await getDaysPresentQuery([], [], [], elab_selects, [], [],
                    []);

            } else {
                days_data = await getDaysPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
                    compradorSelected);

            }



            if (days_data) {

                setDaysPresent(days_data);

            }

            setStatusDays(!statusDays);


        }



    }

    const loadRodalesPresent = async (elab_selects, is_reset) => {


        let rod_present = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {
                rod_present = await getRodalesPresentQuery([], [], elab_selects, [], [],
                    []);
            } else {

                rod_present = await getRodalesPresentQuery(empresasSelected, materialesSelected, elab_selects, choferesSelected,
                    transportistaSelected,
                    compradorSelected);

            }

        } else {

            rod_present = await getRodalesPresentQuery(empresasSelected, materialesSelected, elab_selects, choferesSelected,
                transportistaSelected,
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

        //setStatusMateriales(!statusMateriales);

    }

    const loadMaterialesPresent = async (elab_selects, is_reset) => {

        let mat_present = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {

                mat_present = await getMaterialesPresentQuery([], [], [], elab_selects, [], [],
                    []);

            } else {
                mat_present = await getMaterialesPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
                    compradorSelected);

            }

        } else {
            mat_present = await getMaterialesPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
                compradorSelected, yearsSelected);
        }





        if (mat_present) {

            setMaterialesPresent(mat_present);

        }

        setStatusMateriales(!statusMateriales);

    }

    const loadChoferesPresent = async (elab_selects, is_reset) => {

        let choferes_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {

                choferes_data = await getChoferesPresentQuery([], [], [], elab_selects, [], [],
                    []);

            } else {
                choferes_data = await getChoferesPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
                    compradorSelected);
            }


        } else {

            choferes_data = await getChoferesPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
                compradorSelected, yearsSelected);

        }


        if (choferes_data) {
            setChoferesPresent(choferes_data);

        }

        setStatusChoferes(!statusChoferes);
    }

    const loadTransportistasPresent = async (elab_selects, is_reset) => {

        let transportista_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {

                transportista_data = await getTransportistasPresentQuery([], [], [], elab_selects, [], [],
                    []);

            } else {

                transportista_data = await getTransportistasPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
                    compradorSelected);

            }


        } else {

            transportista_data = await getTransportistasPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
                compradorSelected, yearsSelected);

        }


        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setStatusTransportista(!statusTransportista);

    }

    const loadCompradorPresent = async (elab_selects, is_reset) => {

        let comprador_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {
                comprador_data = await getCompradorPresentQuery([], [], [], elab_selects, [], [],
                    []);
            } else {
                comprador_data = await getCompradorPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
                    compradorSelected);
            }


        } else {

            comprador_data = await getCompradorPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
                compradorSelected, yearsSelected);

        }





        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setStatusComprador(!statusComprador);

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

        //setStatusMateriales(!statusMateriales);

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

    const loadCompradorPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

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

    }


    const loadEmpresasPresent = async (elab_selects, is_reset) => {


        let emp_present = null;

        if (is_reset) {
            emp_present = await getEmpresasPresentQuery([], [], elab_selects, [], [], [], [],
                []);
        } else {

            emp_present = await getEmpresasPresentQuery(rodalesSelected, materialesSelected, elab_selects, choferesSelected,
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

    }

    const loadEmpresasPresentLevels = async (rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {


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

    }


    const loadDataByLevels = (levels, lvl_current, elabs_selects) => {

        console.log('Levles del Elaborador');

        //creo variables y si estanlas agrego
        let empresas_ = [];
        let rodales_ = [];
        let choferes_ = [];
        let materiales_ = [];
        let transportista_ = [];
        let comprador_ = [];

        let is_emp = false;
        let is_rod = false;
        let is_chof = false;
        let is_mat = false;
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

                if (value == ORIGIN_QUERY.MATERIALES) {
                    materiales_ = [...materialesSelected];
                    is_mat = true;
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

        loadYearsPresentLevels(empresas_, rodales_, materiales_, elabs_selects, choferes_, transportista_, comprador_);
        loadMonthsPresentLevels(empresas_, rodales_, materiales_, elabs_selects, choferes_, transportista_, comprador_);
        loadDaysPresentLevels(empresas_, rodales_, materiales_, elabs_selects, choferes_, transportista_, comprador_);

        if (!is_emp) {
            loadEmpresasPresentLevels(rodales_, materiales_, elabs_selects, choferes_, transportista_, comprador_);
        }

        //recorro nuevamente los lvls y solo actualizo aquellos que no esten
        if (!is_rod) {
            loadRodalesPresentLevels(empresas_, materiales_, elabs_selects, choferes_, transportista_, comprador_);
        }



        if (!is_mat) {
            //con los datos disponibles cargo
            loadMaterialesPresentLevels(empresas_, rodales_, materiales_, elabs_selects, choferes_, transportista_, comprador_);
        }

        if (!is_chof) {
            loadChoferesPresentLevels(empresas_, rodales_, materiales_, elabs_selects, choferes_, transportista_, comprador_);
        }

        if (!is_trans) {
            loadTransportistasPresentLevels(empresas_, rodales_, materiales_, elabs_selects, choferes_, transportista_, comprador_);
        }

        if (!is_comp) {
            loadCompradorPresentLevels(empresas_, rodales_, materiales_, elabs_selects, choferes_, transportista_, comprador_);
        }




    }

    const getElaboradorLevel = () => {

        let lvl = false;

        Object.entries(levels).forEach(([key, value]) => {

            if (value == ORIGIN_QUERY.ELABORADOR) {
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





    useEffect(() => {

        if (elaboradorSelected.length == 0) {
            setActive(false);
        }

    }, [active, elaboradorSelected])


    return (

        <>
            {is_present ? <a className="list-group-item list-group-item-action item-layer is_present" aria-current="true"
                elaborador_id={idelaborador}
                onClick={onclickHandler} style={!active ? null : styles.active}>
                <ElaboradorIcon></ElaboradorIcon>
                {name_elaborador}
            </a> :
                <a className="list-group-item list-group-item-action item-layer" aria-current="true"
                    onClick={onclickHandler} style={!active ? null : styles.active}>
                    <ElaboradorIcon></ElaboradorIcon>
                    {name_elaborador}
                </a>
            }
        </>

    )
}

export default ElaboradorItem

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