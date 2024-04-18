import React, { useContext, useEffect, useState } from 'react'
import { CostosGlobalContext, DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../context/GlobalContext';
import { ORIGIN_QUERY } from '../../utility/OriginQuery';

const QueryLevelsTOC = () => {

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

    const [listItems, setListItems] = useState();


    const createItems = () => {

        let keys = Object.keys(levels);
        let length = keys.length;

        let items_ = [];

        /*
        <a className="list-group-item list-group-item-action item-layer" aria-current="true"
                    onContextMenu={(e) => e.preventDefault()}
                    onMouseDown={onClickHandler} style={!active ? null : styles.active}>
                    <EmpresasIcon></EmpresasIcon>
                    {name_empresa}
                </a>*/

        Object.entries(levels).forEach(([key, value]) => {

            items_.push(<a className="list-group-item list-group-item-action item-layer" aria-current="true"
                onContextMenu={(e) => e.preventDefault()}
                onMouseDown={null} key={key} >
                {key + ': ' + getTextOriginByValue(value)}
            </a>);

        });

        setListItems(items_);

    }

    const getTextOriginByValue = (value) => {

        if (value == ORIGIN_QUERY.EMPRESAS) {

            return 'Empresas';

        } else if (value == ORIGIN_QUERY.RODALES) {
            return 'Rodales';
        } else if (value == ORIGIN_QUERY.MATERIALES) {
            return 'Materiales';
        } else if (value == ORIGIN_QUERY.ELABORADOR) {
            return 'Elaborador';
        } else if (value == ORIGIN_QUERY.CHOFER) {
            return 'Choferes';
        } else if (value == ORIGIN_QUERY.TRANSPORTISTA) {
            return 'Transportista';
        } else if (value == ORIGIN_QUERY.COMPRADOR) {
            return 'Comprador';
        } else if (value == ORIGIN_QUERY.YEARS) {
            return 'Años';
        }

    }


    const clearAllFilter = () => {

        //reberia utilizar un alert

        setIsLoading(true);

        setTimeout(() => {
            //restauro todos como en el inicio

           
            setStatusQuery(false);
            setLevels(null);

            setEmpresasData(empresasDinamicData);
            setEmpresasPresent([]);
            setEmpresasSelected([]);
            setStatusEmpresas(!statusEmpresas);

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
            setStatusLevels(!statusLevels);

        }, 2000)



    }



    useEffect(() => {


        if(levels != null){
            createItems();
        } else {
            setListItems(null);
        }
       

    }, [statusLevels]);


    return (
        <div id='items-container-TOC'>

            <div id='title-selection-section'>
                <h3 className="h2-content-section bg-indigo text-blue-fg text-center">Niveles de Selección Actual</h3>
            </div>

            <a className="list-group-item list-group-item-action item-layer-borrar bg-red text-red-fg mb-2" aria-current="true"
                onClick={clearAllFilter}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                ><path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>

                Limpiar Filtros
            </a>

            <div id='toc-sub-container'>

                <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">

                    <div id="sr-items-container" className="accordion">

                        {listItems}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default QueryLevelsTOC