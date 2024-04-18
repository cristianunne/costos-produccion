import React, { useContext, useEffect, useState } from 'react'
import '../../styles/TabLeftContainer/TabLeftContainer.css'

import ItemTabs from './tabitem/ItemTabs'
import { ICONOS } from '../../Iconos'

import SearchInput from '../search/SearchInput'
import { DataGlobalContext, PresentGlobalContext, StatusGlobalContext } from '../../context/GlobalContext'
import { getChoferesAPI, getCompradoresAPI, getElaboradorAPI, getEmpresasAPI, getMaterialesAPI, getRodalesAPI, getTransportistasAPI, getYearsAPI } from '../../utility/Querys'
import EmpresasBoxContainer from './empresas/EmpresasBoxContainer'
import RodalesBoxContainer from './rodales/RodalesBoxContainer'
import MaterialesBoxContainer from './materiales/MaterialesBoxContainer'
import ElaboradorBoxContainer from './elaborador/ElaboradorBoxContainer'
import ChoferesBoxContainer from './choferes/ChoferesBoxContainer'
import TransportistaBoxContainer from './transportista/TransportistaBoxContainer'
import CompradoresBoxContainer from './comprador/CompradoresBoxContainer'
import QueryLevelsTOC from '../querylevels/QueryLevelsTOC'



const TabLeftContainer = () => {

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

    //traigo los reloads de los estados globales

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
        isLoading, setIsLoading
    } = useContext(StatusGlobalContext);

    const [reloadTab, setReloadTab] = useState(false);

    const [rodalesActually, setRodalesActually] = useState([]);
    const [busqueda, setBusqueda] = useState();

    //localstatus
    const [statusRodalesLocal, setStatusRodalesLocal] = useState(false);


    const getEmpresas = async () => {

        setIsLoading(true);
        const data_empresa = await getEmpresasAPI();

        if (data_empresa != false) {
            setEmpresasData(data_empresa);
            setEmpresasDinamicData(data_empresa);

            setStatusEmpresas(!statusEmpresas);
            setReloadTab(!reloadTab);
        }

        setIsLoading(false);


    }

    const getRodales = async () => {

        setIsLoading(true);
        const data_rodales = await getRodalesAPI();

        if (data_rodales) {

            setRodalesData(data_rodales);
            setRodalesDinamicData(data_rodales);
            setRodalesPresent(data_rodales);


            setStatusRodales(!statusRodales);
            setStatusRodalesLocal(!statusRodalesLocal);
            setReloadTab(!reloadTab);


        }
        setIsLoading(false);
    }


    const getMateriales = async () => {
        setIsLoading(true);
        const data_materiales = await getMaterialesAPI();

        if (data_materiales) {

            setMaterialesData(data_materiales);
            setMaterialesDinamicData(data_materiales);

            setStatusMateriales(!statusMateriales);
            setReloadTab(!reloadTab);

        }
        setIsLoading(false);
    }

    const getElaborador = async () => {

        setIsLoading(true);
        const data_elaborador = await getElaboradorAPI();

        if (data_elaborador) {

            setElaboradorData(data_elaborador);
            setElaboradorDinamicData(data_elaborador);

            setStatusElaborador(!statusElaborador);
            setReloadTab(!reloadTab);

        }
        setIsLoading(false);
    }

    const getChoferes = async () => {
        setIsLoading(true);
        const data_choferes = await getChoferesAPI();


        if (data_choferes) {

            setChoferesData(data_choferes);
            setChoferesDinamicData(data_choferes);

            setStatusChoferes(!statusChoferes);
            setReloadTab(!reloadTab);

        }

        setIsLoading(false);
    }

    const getTransportistas = async () => {

        setIsLoading(true);
        const data_transport = await getTransportistasAPI();


        if (data_transport) {

            setTransportistaData(data_transport);
            setTransportistaDinamicData(data_transport);

            setStatusTransportista(!statusTransportista);
            setReloadTab(!reloadTab);

        }
        setIsLoading(false);

    }

    const getCompradores = async () => {
        setIsLoading(true);
        const data_compradores = await getCompradoresAPI();

        if (data_compradores) {

            setCompradorData(data_compradores);
            setCompradorDinamicData(data_compradores);

            setStatusComprador(!statusComprador);
            setReloadTab(!reloadTab);

        }
        setIsLoading(false);
    }








    const onChangeBuscarRodales = (event) => {

        let text_busqueda = event.target.value;

        if (text_busqueda != undefined) {

            setBusqueda(text_busqueda);
            filter(text_busqueda, 1);
        }


    }



    const filter = (textBusqueda, option) => {


        //tengo que revisar que haya ingresado por rodales select

        if (option == 1) {


            let resultadoFiltro = rodalesPresent.filter((elemento) => {

                if (elemento.rodal.toString().toLowerCase().includes(textBusqueda.toLowerCase())) {
                    return elemento;
                }
            })

            //setRodalesData([]);
            setRodalesData(resultadoFiltro);
            setStatusRodales(!statusRodales);


        }


    }


    useEffect(() => {



        if (!statusRodalesLocal) {

            getRodales();

        }

        if (!statusEmpresas) {

            getEmpresas();

        }

        //cargo los materiales

        if (!statusMateriales) {
            getMateriales();
        }

        //cargo los elaboradores
        if (!statusElaborador) {

            getElaborador();

        }

        //cargo los choferes
        if (!statusChoferes) {

            getChoferes();

        }

        //cargo los transportistas
        if (!statusTransportista) {

            getTransportistas();

        }

        //cargo los compradores
        if (!statusComprador) {

            getCompradores();

        }



    }, [reloadTab])

    return (
        <div className='container' id='sub-tableft-container'>

            <div className="col-12">
                <ul className='nav nav-tabs card-header-tabs tabs-header bg-dark'>

                    <ItemTabs icono={ICONOS.EMPRESAS} title={'Empresas'} url={'tabs-empresas-ex2'} active_status={true} />
                    <ItemTabs icono={ICONOS.RODALES} title={'Rodales'} url={'tabs-rodales-ex1'} active_status={false} />
                    <ItemTabs icono={ICONOS.MATERIALES} title={'Materiales'} url={'tabs-materiales'} active_status={false} />

                    <ItemTabs icono={ICONOS.ELABORADOR} title={'Elaborador'} url={'tabs-elaborador'} active_status={false} />
                    <ItemTabs icono={ICONOS.CHOFER} title={'Chofer'} url={'tabs-choferes'} active_status={false} />
                    <ItemTabs icono={ICONOS.TRANSPORTISTA} title={'Transportista'} url={'tabs-transportista'} active_status={false} />
                    <ItemTabs icono={ICONOS.COMPRADOR} title={'Comprador'} url={'tabs-comprador'} active_status={false} />
                </ul>


            </div>

            <div className="col-12 tab-content-container">
                <div className="tab-content">

                    <div className="tab-pane bg-dark active show scrollbar-color" id="tabs-empresas-ex2">

                        {// Agreggo el search de empresas
                        }

                        <SearchInput onChangeBuscar={null}></SearchInput>
                        <div className="hr-text unset-margin mb-4">Empresas</div>

                        <div className='items-list-item'>

                            <div className="list-group list-group-flush bg-dark scrollbar-color" id='empresas_items'>

                                <EmpresasBoxContainer>

                                </EmpresasBoxContainer>


                            </div>
                        </div>

                        <div className="hr-text unset-margin mb-5"></div>


                    </div>

                    <div className="tab-pane bg-dark" id="tabs-rodales-ex1">


                        <SearchInput onChangeBuscar={onChangeBuscarRodales}></SearchInput>

                        <div className="hr-text unset-margin mb-4 bg-dark">Rodales</div>

                        <div className='items-list-item bg-dark'>

                            <div className="list-group list-group-flush bg-dark" id='rodales_items'>

                                <RodalesBoxContainer></RodalesBoxContainer>


                            </div>
                        </div>

                        <div className="hr-text unset-margin mb-4"></div>

                    </div>




                    <div className="tab-pane bg-dark" id="tabs-materiales">

                        <SearchInput onChangeBuscar={null} text_place={'Filtrar Material...'}></SearchInput>

                        <div className="hr-text unset-margin mb-4">Materiales</div>

                        <div className='items-list-item'>

                            <div className="list-group list-group-flush bg-dark scrollbar-color" id='rodales_items'>

                                <MaterialesBoxContainer></MaterialesBoxContainer>

                            </div>
                        </div>

                        <div className="hr-text unset-margin mb-5"></div>


                    </div>

                    <div className="tab-pane bg-dark" id="tabs-elaborador">

                        <SearchInput onChangeBuscar={null}></SearchInput>

                        <div className="hr-text unset-margin mb-4">Elaborador</div>

                        <div className='items-list-item'>

                            <div className="list-group list-group-flush bg-dark scrollbar-color" id='rodales_items'>

                                <ElaboradorBoxContainer></ElaboradorBoxContainer>

                            </div>
                        </div>

                        <div className="hr-text unset-margin mb-5"></div>


                    </div>

                    <div className="tab-pane bg-dark" id="tabs-choferes">

                        <SearchInput onChangeBuscar={null}></SearchInput>

                        <div className="hr-text unset-margin mb-4">Choferes</div>

                        <div className='items-list-item'>

                            <div className="list-group list-group-flush bg-dark scrollbar-color" id='rodales_items'>

                                <ChoferesBoxContainer></ChoferesBoxContainer>

                            </div>
                        </div>

                        <div className="hr-text unset-margin mb-5"></div>


                    </div>

                    <div className="tab-pane bg-dark" id="tabs-transportista">

                        <SearchInput onChangeBuscar={null}></SearchInput>

                        <div className="hr-text unset-margin mb-4">Transportista</div>

                        <div className='items-list-item'>

                            <div className="list-group list-group-flush bg-dark scrollbar-color" id='rodales_items'>

                                <TransportistaBoxContainer></TransportistaBoxContainer>

                            </div>
                        </div>

                        <div className="hr-text unset-margin mb-5"></div>


                    </div>

                    <div className="tab-pane bg-dark" id="tabs-comprador">

                        <SearchInput onChangeBuscar={null}></SearchInput>

                        <div className="hr-text unset-margin mb-4">Comprador</div>

                        <div className='items-list-item'>

                            <div className="list-group list-group-flush bg-dark scrollbar-color" id='rodales_items'>

                                <CompradoresBoxContainer></CompradoresBoxContainer>

                            </div>
                        </div>

                        <div className="hr-text unset-margin mb-5"></div>


                    </div>



                </div>

            </div>

            <div className="col-12 tab-selected-container">
                    
                <QueryLevelsTOC></QueryLevelsTOC>

            </div>

         

        </div>
    )
}

export default TabLeftContainer