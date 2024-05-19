
const url_api = 'http://localhost/sap_api/API/';
//const url_api = 'http://192.168.36.65/sap_api/API/';

export const URLS = {

    RODALES_GET: url_api + 'getRodales',
    EMPRESAS_GET: url_api + 'getEmpresas',
    GET_RODALES_BY_EMPRESAS: url_api + 'getRodalesIdByEmpresa',
    GET_RODALES_WITH_EMPRESAS: url_api + 'getRodalesWithEmpresas',
    GET_MATERIALES: url_api + 'getMateriales',
    GET_ELABORADOR: url_api + 'getElaborador',
    GET_CHOFERES: url_api + 'getChoferes',
    GET_TRANSPORTISTAS: url_api + 'getTransportistas',
    GET_COMPRADORES: url_api + 'getCompradores',

    GET_YEARS_FORESTAL: url_api + 'getYearsForestal',
    GET_YEARS_PRESENT_FORESTAL: url_api + 'getYearsPresentForestal',
    GET_MATERIALES_PRESENT_FORESTAL: url_api + 'getMaterialesPresentForestal',
    GET_ELABORADOR_PRESENT_FORESTAL: url_api + 'getElaboradorPresentForestal',
    GET_CHOFERES_PRESENT_FORESTAL: url_api + 'getChoferesPresentForestal',
    GET_TRANSPORTISTAS_PRESENT_FORESTAL: url_api + 'getTransportistasPresentForestal',
    GET_COMPRADOR_PRESENT_FORESTAL: url_api + 'getCompradorPresentForestal',

    GET_MONTHS_PRESENT_FORESTAL: url_api + 'getMonthsPresentForestal',
    GET_DAYS_PRESENT_FORESTAL: url_api + 'getDaysPresentForestal',

    GET_RODALES_PRESENT_FORESTAL: url_api + 'getRodalesPresentForestal',
    GET_EMPRESAS_PRESENT_FORESTAL: url_api + 'getEmpresasPresentForestal',

    GET_METADATA_FOR_QUERY_DATA_FORESTAL: url_api + 'getMetadataForQueryDataForestal',
    GET_DATA_EXTRACCION_FORESTAL: url_api + 'getDataExtraccionForestal',
    GET_RESUMEN_PRODUCCION_FORESTAL_BY_YEARS: url_api + 'getResumenProduccionByYears',

    GET_RESUMEN_RDM_FORESTAL: url_api +  'getResumenRodalDestinoMaterialForestal'
}


const url_app_pindo = 'http://localhost:5173/';

export const URL_APP_PINDO = {

    EMPRESAS_VIEW_BY_ID_SAP: url_app_pindo + 'empresas/',
    RODALES_VIEW_BY_ID_SAP: url_app_pindo + 'rodales/'
}