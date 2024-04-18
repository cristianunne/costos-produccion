
import React from "react";


const DataGlobalContext = React.createContext({ 

    rodalesData: [], setRodalesData: () => {},
    rodalesDinamicData: [], setRodalesDinamicData: () => {},

    empresasData: [], setEmpresasData: () => {},
    empresasDinamicData: [], setEmpresasDinamicData: () => {},

    materialesData: [], setMaterialesData: () => {},
    materialesDinamicData: [], setMaterialesDinamicData: () => {},

    elaboradorData: [], setElaboradorData: () => {},
    elaboradorDinamicData: [], setElaboradorDinamicData: () => {},

    choferesData: [], setChoferesData: () => {},
    choferesDinamicData: [], setChoferesDinamicData: () => {},

    transportistaData: [], setTransportistaData: () => {},
    transportistaDinamicData: [], setTransportistaDinamicData: () => {},

    compradorData: [], setCompradorData: () => {},
    compradorDinamicData: [], setCompradorDinamicData: () => {},

    yearsData: [], setYearsData: () => {},
    yearsDinamicData: [], setYearsDinamicData: () => {},

    monthsData: [], setMonthsData: () => {},
    monthsDinamicData: [], setMonthsDinamicData: () => {},

    daysData: [], setDaysData: () => {},
    daysDinamicData: [], setDaysDinamicData: () => {},

 });

const StatusGlobalContext = React.createContext({ 
    statusRodales: false, setStatusRodales: () => {}, 
    statusEmpresas: false, setStatusEmpresas: () => {}, 
    statusMateriales: false, setStatusMateriales: () => {}, 
    statusElaborador: false, setStatusElaborador: () => {}, 
    statusChoferes: false, setStatusChoferes: () => {}, 
    statusTransportista: false, setStatusTransportista: () => {}, 
    statusComprador: false, setStatusComprador: () => {}, 

    statusYears: false, setStatusYears: () => {}, 
    statusYearsGeneral: false, setStatusYearsGeneral: () => {}, 
    statusMonths: false, setStatusMonths: () => {}, 
    statusDays: false, setStatusDays: () => {},

    //creo una variabe global para saber quien hizo el query
    statusQuery: false, setStatusQuery: () => {},
    textStatusQuery: null, setTextStatusQuery: () => {},

    levels: {}, setLevels: () => {},

    isLoading: false, setIsLoading: () => {},
    statusLevels: false, setStatusLevels: () => {},

});

const SelectedGlobalContext = React.createContext({ 

    rodalesSelected: [], setRodalesSelected: () => {},
    empresasSelected: [], setEmpresasSelected: () => {},
    materialesSelected: [], setMaterialesSelected: () => {},
    elaboradorSelected: [], setElaboradorSelected: () => {},
    choferesSelected: [], setChoferesSelected: () => {},
    transportistaSelected: [], setTransportistaSelected: () => {},
    compradorSelected: [], setCompradorSelected: () => {},

    yearsSelected: [], setYearsSelected: () => {},
    monthsSelected: [], setMonthsSelected: () => {},
    daysSelected: [], setDaysSelected: () => {},

});

const PresentGlobalContext = React.createContext({ 

    rodalesPresent: [], setRodalesPresent: () => {},
    empresasPresent: [], setEmpresasPresent: () => {},
    materialesPresent: [], setMaterialesPresent: () => {},
    elaboradorPresent: [], setElaboradorPresent: () => {},
    choferesPresent: [], setChoferesPresent: () => {},
    transportistaPresent: [], setTransportistaPresent: () => {},
    compradorPresent: [], setCompradorPresent: () => {},

    yearsPresent: [], setYearsPresent: () => {},
    monthsPresent: [], setMonthsPresent: () => {},
    daysPresent: [], setDaysPresent: () => {},

});

/*
pages, setPages,
        numberData, setNumberData,
        dataCostos, setDataCostos, isLoadingTcostos, setIsLoadingTcostos,
        currentPageCostos, setCurrentPageCostos*/


const CostosGlobalContext = React.createContext({ 

    pagesExtraccion: null, setPagesExtraccion: () => {},
    numberDataExtraccion: null, setNumberDataExtraccion: () => {},
    dataExtraccion: [], setDataExtraccion: () => {},
    isLoadingTableExtraccion: false, setIsLoadingTableExtraccion: () => {},
    currentPageExtraccion: null, setCurrentPageExtraccion: () => {},

    //todos los metodos para la tabla RDM
    dataRDM: [], setDataRDM: () => {},
    isLoadingTableRDM: false, setIsLoadingTableRDM: () => {},

    costoElab: 0, setCostoElab: () => {},
    costoTrans: 0, setCostoTrans: () => {},
    toneladas: 0, setToneladas: () => {},


});




export {DataGlobalContext};
export {StatusGlobalContext};
export {SelectedGlobalContext};
export {PresentGlobalContext};
export {CostosGlobalContext};
