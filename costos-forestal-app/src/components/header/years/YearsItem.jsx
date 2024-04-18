import React, { useContext, useEffect, useState } from 'react'
import { CostosGlobalContext, DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';
import { getChoferesPresentQuery, getCompradorPresentQuery, getDaysPresentQuery, getElaboradorPresentQuery, getEmpresasPresentQuery, getExtraccionDataFunction, getMaterialesPresentQuery, getMetadataFunctionForestal, getMonthsPresentQuery, getRodalesPresentQuery, getTransportistasPresentQuery } from '../../../utility/Procesamiento';

const YearsItem = ({ year, isPresent, has_rodales_select }) => {
    //has rodales select se utiliza porque los botones reaccionan de forma diferente si hay rodales seleccionados

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
        currentPageExtraccion, setCurrentPageExtraccion
    } = useContext(CostosGlobalContext);

    const [active, setActive] = useState(false);

    const [present, setPresent] = useState(false);


    const onClickHandler = async () => {

        if (!active) {
            setActive(true);

            let years_select = [...yearsSelected, year];
            setYearsSelected(years_select);

            console.log(years_select);

            //consulto el tipode query
            if (statusQuery) {

                if (textStatusQuery == ORIGIN_QUERY.YEARS) {

                    //DESDE ACA hago las consultas utilizando el a;o y creo que debo usar la misma tecnica que los demas

                    loadMonthsPresent(years_select, true);
                    loadDaysPresent(years_select, true);


                    //cargo los datos que necesito
                    loadEmpresasPresent(years_select, true);
                    loadRodalesPresent(years_select, true);
                    loadMaterialesPresent(years_select, true);
                    loadElaboradorPresent(years_select, true);
                    loadChoferesPresent(years_select, true);
                    loadTransportistasPresent(years_select, true);
                    loadCompradorPresent(years_select, true);

                    setIsLoading(true);
                    setIsLoadingTableExtraccion(false);
                    await processQuery(years_select);
                    setIsLoadingTableExtraccion(true);
                    setIsLoading(false);



                } else {



                    //tengoq ue consultar quien hace el query

                    //imporante, porque tendria que pasarle rodales a la funcion que trae los meses
                    //traigo los meses pasando los rodales y elyear seleccionado
                    //limpio los month selected
                    setMonthsSelected([]);
                    setDaysSelected([]);


                    loadMonthsPresent(years_select);
                    loadDaysPresent(years_select);

                    //cargo los demas datos

                    //cargo los datos que necesito

                    //cargo la tabla extraccion
                    setIsLoading(true);
                    setIsLoadingTableExtraccion(false);
                    await processQuery(years_select);
                    setIsLoadingTableExtraccion(true);
                    setIsLoading(false);





                }

            } else {
                //seteo al year como Principal query
                setStatusQuery(true);
                setTextStatusQuery(ORIGIN_QUERY.YEARS);
                //limpio los month selected

                loadMonthsPresent(years_select, true);
                loadDaysPresent(years_select, true);


                //cargo los datos que necesito
                loadEmpresasPresent(years_select, true);
                loadRodalesPresent(years_select, true);
                loadMaterialesPresent(years_select, true);
                loadElaboradorPresent(years_select, true);
                loadChoferesPresent(years_select, true);
                loadTransportistasPresent(years_select, true);
                loadCompradorPresent(years_select, true);

                //cargo la tabla extraccion
                setIsLoading(true);
                setIsLoadingTableExtraccion(false);
                await processQuery(years_select);
                setIsLoadingTableExtraccion(true);
                setIsLoading(false);



            }


        } else {
            setActive(false);

            //elimino el current de los selected
            let years_select = _deleteYearSelected(year);


            //consulto el tipode query
            if (statusQuery) {

                if (textStatusQuery == ORIGIN_QUERY.YEARS) {

                    //consulto si es el ultimo
                    if (years_select.length == 0) {


                        setIsLoading(true);
                        setTimeout(() => {

                            //quito el query
                            setStatusQuery(false);
                            setTextStatusQuery(null);
                            setLevels(null);
                            setStatusLevels(!statusLevels);

                            //restauro todo como al inicio


                            setEmpresasData(empresasDinamicData);
                            setEmpresasPresent([]);
                            setEmpresasSelected([]);
                            setStatusEmpresas(!statusEmpresas);

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

                        loadMonthsPresent(years_select);
                        loadDaysPresent(years_select);

                        //limpio los month selected
                        setMonthsSelected([]);
                        setDaysSelected([]);


                        loadEmpresasPresent(years_select);
                        loadRodalesPresent(years_select);
                        loadMaterialesPresent(years_select);
                        loadElaboradorPresent(years_select);
                        loadChoferesPresent(years_select);
                        loadTransportistasPresent(years_select);
                        loadCompradorPresent(years_select);

                        //cargo la tabla extraccion
                        setIsLoading(true);
                        setIsLoadingTableExtraccion(false);
                        await processQuery(years_select);
                        setIsLoadingTableExtraccion(true);
                        setIsLoading(false);

                    }


                }

                else {

                    //imporante, porque tendria que pasarle rodales a la funcion que trae los meses
                    alert('asfasfasfasggasg');        //traigo los meses pasando los rodales y elyear seleccionado

                    //tengo que revisar quien hace el query

                    loadMonthsPresent(years_select);
                    loadDaysPresent(years_select);

                    //limpio los month selected
                    setMonthsSelected([]);
                    setDaysSelected([]);

                    //cargo la tabla extraccion
                    setIsLoading(true);
                    setIsLoadingTableExtraccion(false);
                    await processQuery(years_select);
                    setIsLoadingTableExtraccion(true);
                    setIsLoading(false);

                }

            }





        }

    }



    const processQuery = async (years_select) => {

        const metadata = await getMetadataFunctionForestal(empresasSelected, rodalesSelected, materialesSelected,
            elaboradorSelected, choferesSelected, transportistaSelected, compradorSelected, years_select, monthsSelected,
            daysSelected);



        if (metadata) {

            //tengo que traer los datos de costos y luego setear los metadatos
            const data_extraccion = await getExtraccionDataFunction(empresasSelected, rodalesSelected, materialesSelected,
                elaboradorSelected, choferesSelected, transportistaSelected, compradorSelected, years_select, monthsSelected,
                daysSelected, 1);

            if (data_extraccion) {

                setNumberDataExtraccion(metadata.cantidad);
                setPagesExtraccion(metadata.pages);
                setDataExtraccion(data_extraccion);


            }


        }

    }



    const _deleteYearSelected = (year) => {

        let yea_ = [];

        yearsSelected.forEach(yearsel => {

            if (yearsel != year) {
                yea_.push(yearsel);
            }

        });

        setYearsSelected(yea_);
        return yea_;

    }


    const loadMonthsPresent = async (years_select, is_reset) => {


        let months_data = null;

        if (is_reset) {

            //para traer los meses uso los rodales como filtro
            months_data = await getMonthsPresentQuery([], [], [], [],
                [], [], [], years_select);


        } else {

            //para traer los meses uso los rodales como filtro
            months_data = await getMonthsPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected,
                choferesSelected, transportistaSelected, compradorSelected, years_select);


        }


        if (months_data) {

            setMonthsPresent(months_data);

        }

        setStatusMonths(!statusMonths);


    }

    const loadDaysPresent = async (years_select, is_reset) => {
        //rodales_sel, materiales_sel, elaborador_sel, chofer_sel, transportista_sel, comprador_sel, years_sel

        console.log(years_select);
        let days_data = null;

        if (is_reset) {

            days_data = await getDaysPresentQuery([], [], [], [],
                [], [], [], years_select, []);

        } else {

            days_data = await getDaysPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected,
                choferesSelected, transportistaSelected, compradorSelected, years_select, []);

        }



        if (days_data) {

            setDaysPresent(days_data);

        }

        setStatusDays(!statusDays);

    }

    const loadEmpresasPresent = async (years_select, is_reset) => {


        let emp_present = null;

        if (is_reset) {
            emp_present = await getEmpresasPresentQuery([], [], [], [], [],
                [], years_select, []);
        } else {

            emp_present = await getEmpresasPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected, choferesSelected,
                transportistaSelected,
                compradorSelected, years_select, []);

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

    const loadRodalesPresent = async (years_select, is_reset) => {


        let rod_present = null;

        if (is_reset) {
            rod_present = await getRodalesPresentQuery([], [], [], [], [],
                [], years_select, []);
        } else {

            rod_present = await getRodalesPresentQuery(empresasSelected, materialesSelected, elaboradorSelected, choferesSelected,
                transportistaSelected,
                compradorSelected, years_select, []);

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

    const loadMaterialesPresent = async (years_select, is_reset) => {

        let mat_present = null;

        if (is_reset) {

            mat_present = await getMaterialesPresentQuery([], [], [], [], [],
                [], [], years_select);

        } else {
            mat_present = await getMaterialesPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected, choferesSelected,
                transportistaSelected,
                compradorSelected, years_select);

        }



        if (mat_present) {

            setMaterialesPresent(mat_present);

        }

        setStatusMateriales(!statusMateriales);

    }

    const loadElaboradorPresent = async (years_select, is_reset) => {

        let ela_present = null;

        if (is_reset) {
            ela_present = await getElaboradorPresentQuery([], [], [], [], [],
                [], [], years_select);

        } else {
            ela_present = await getElaboradorPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected, choferesSelected,
                transportistaSelected,
                compradorSelected, years_select);
        }


        if (ela_present) {

            setElaboradorPresent(ela_present);

        }
        setStatusElaborador(!statusElaborador);

    }

    const loadChoferesPresent = async (years_select, is_reset) => {

        let choferes_data = null;
        if (is_reset) {

            choferes_data = await getChoferesPresentQuery([], [], [], [], [],
                [], [], years_select);

        } else {
            choferes_data = await getChoferesPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected, choferesSelected,
                transportistaSelected,
                compradorSelected, years_select);
        }


        if (choferes_data) {
            setChoferesPresent(choferes_data);

        }

        setStatusChoferes(!statusChoferes);
    }

    const loadTransportistasPresent = async (years_select, is_reset) => {

        let transportista_data = null;
        if (is_reset) {

            transportista_data = await getTransportistasPresentQuery([], [], [], [], [],
                [], [], years_select);

        } else {

            transportista_data = await getTransportistasPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected, choferesSelected,
                transportistaSelected,
                compradorSelected, years_select);

        }


        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setStatusTransportista(!statusTransportista);

    }

    const loadCompradorPresent = async (years_select, is_reset) => {

        let comprador_data = null;

        if (is_reset) {
            comprador_data = await getCompradorPresentQuery([], [], [], [], [],
                [], [], years_select);
        } else {
            comprador_data = await getCompradorPresentQuery(empresasSelected, rodalesSelected, materialesSelected, elaboradorSelected, choferesSelected,
                transportistaSelected,
                compradorSelected, years_select);
        }



        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setStatusComprador(!statusComprador);

    }



    useEffect(() => {

        //recorro el years items

        /*if ((rodalesSelected.length == 0 || rodalesSelected == null) && active) {

            setActive(false);

        }*/

        if (yearsSelected.length == 0) {
            setActive(false);
        }


    }, [active, rodalesSelected]);


    return (
        <>
            {isPresent ? <button className="btn is_present btn-square btn-h-35 btn-hover" onClick={onClickHandler}
                style={!active ? null : styles.active}>
                {year}
            </button> :

                has_rodales_select ?

                    <button className="btn btn-outline-light btn-square btn-h-35 btn-hover"
                        style={!active ? null : styles.active} disabled>
                        {year}
                    </button>
                    :
                    <button className="btn btn-outline-light btn-square btn-h-35 btn-hover" onClick={onClickHandler}
                        style={!active ? null : styles.active}>
                        {year}
                    </button>
            }
        </>
    )
}

export default YearsItem

const styles = {
    active: {
        backgroundColor: '#206bc4',
        color: '#e3e3e3'
    }
};