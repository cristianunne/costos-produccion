
/* 
En este archivo se ejecuta toda la logica de la aplicacion
*/

import { getChoferesPresentAPI, getCompradorPresentAPI, getDaysPresentAPI, getElaboradorPresentAPI, getEmpresasPresentAPI, getMaterialesPresentAPI, getMonthsPresentAPI, getRodalesPresentAPI, getTransportistasPresentAPI, getYearsPresentAPI } from "./Querys";



//recibo todos los parametros que sean necesarios

const processQueryFunction = (rodales_sel, materiales_sel, elaborador_sel, chofer_sel, transportista_sel, comprador_sel) => {

    let filter_data = {};

    filter_data['rodales'] = rodales_sel;
    filter_data['materiales'] = materiales_sel;
    filter_data['elaborador'] = elaborador_sel;
    filter_data['chofer'] = chofer_sel;
    filter_data['transportista'] = transportista_sel;
    filter_data['comprador'] = comprador_sel;


}


export const getYearsPresentQuery = async (empresa_sel, rodales_sel, materiales_sel, elaborador_sel, chofer_sel, 
    transportista_sel, comprador_sel) => {


    let filter_data = {};

    filter_data['empresa'] = empresa_sel;
    filter_data['rodales'] = rodales_sel;
    filter_data['materiales'] = materiales_sel;
    filter_data['elaborador'] = elaborador_sel;
    filter_data['chofer'] = chofer_sel;
    filter_data['transportista'] = transportista_sel;
    filter_data['comprador'] = comprador_sel;

    const years_present = await getYearsPresentAPI(filter_data);

    return years_present;
  
}


export const getMaterialesPresentQuery = async (empresa_sel, rodales_sel, materiales_sel, elaborador_sel, chofer_sel, transportista_sel, comprador_sel, years_sel) => {

    let filter_data = {};

    filter_data['empresa'] = empresa_sel;
    filter_data['rodales'] = rodales_sel;
    filter_data['materiales'] = materiales_sel;
    filter_data['elaborador'] = elaborador_sel;
    filter_data['chofer'] = chofer_sel;
    filter_data['transportista'] = transportista_sel;
    filter_data['comprador'] = comprador_sel;
    filter_data['years'] = years_sel;

    const mat_present = await getMaterialesPresentAPI(filter_data);

    return mat_present;

    
} 

export const getElaboradorPresentQuery = async (empresa_sel, rodales_sel, materiales_sel, elaborador_sel, chofer_sel, transportista_sel, comprador_sel, years_sel) => {

    let filter_data = {};

    filter_data['empresa'] = empresa_sel;
    filter_data['rodales'] = rodales_sel;
    filter_data['materiales'] = materiales_sel;
    filter_data['elaborador'] = elaborador_sel;
    filter_data['chofer'] = chofer_sel;
    filter_data['transportista'] = transportista_sel;
    filter_data['comprador'] = comprador_sel;
    filter_data['years'] = years_sel;

    const ela_present = await getElaboradorPresentAPI(filter_data);

    return ela_present;

    
} 

export const getChoferesPresentQuery = async (empresa_sel, rodales_sel, materiales_sel, elaborador_sel, chofer_sel, transportista_sel, comprador_sel, years_sel) => {

    let filter_data = {};

    filter_data['empresa'] = empresa_sel;
    filter_data['rodales'] = rodales_sel;
    filter_data['materiales'] = materiales_sel;
    filter_data['elaborador'] = elaborador_sel;
    filter_data['chofer'] = chofer_sel;
    filter_data['transportista'] = transportista_sel;
    filter_data['comprador'] = comprador_sel;
    filter_data['years'] = years_sel;

    const ela_present = await getChoferesPresentAPI(filter_data);

    return ela_present;

    
} 

export const getTransportistasPresentQuery = async (empresa_sel, rodales_sel, materiales_sel, elaborador_sel, chofer_sel, transportista_sel, comprador_sel, years_sel) => {

    let filter_data = {};

    filter_data['empresa'] = empresa_sel;
    filter_data['rodales'] = rodales_sel;
    filter_data['materiales'] = materiales_sel;
    filter_data['elaborador'] = elaborador_sel;
    filter_data['chofer'] = chofer_sel;
    filter_data['transportista'] = transportista_sel;
    filter_data['comprador'] = comprador_sel;
    filter_data['years'] = years_sel;

    const ela_present = await getTransportistasPresentAPI(filter_data);

    return ela_present;

    
} 

export const getCompradorPresentQuery = async (empresa_sel, rodales_sel, materiales_sel, elaborador_sel, chofer_sel, transportista_sel, comprador_sel, years_sel) => {

    let filter_data = {};

    filter_data['empresa'] = empresa_sel;
    filter_data['rodales'] = rodales_sel;
    filter_data['materiales'] = materiales_sel;
    filter_data['elaborador'] = elaborador_sel;
    filter_data['chofer'] = chofer_sel;
    filter_data['transportista'] = transportista_sel;
    filter_data['comprador'] = comprador_sel;
    filter_data['years'] = years_sel;

    const ela_present = await getCompradorPresentAPI(filter_data);

    return ela_present;

} 

export const getMonthsPresentQuery = async (empresa_sel, rodales_sel, materiales_sel, elaborador_sel, chofer_sel, 
    transportista_sel, comprador_sel, years_sel) => {

    let filter_data = {};
    
    filter_data['empresa'] = empresa_sel;
    filter_data['rodales'] = rodales_sel;
    filter_data['materiales'] = materiales_sel;
    filter_data['elaborador'] = elaborador_sel;
    filter_data['chofer'] = chofer_sel;
    filter_data['transportista'] = transportista_sel;
    filter_data['comprador'] = comprador_sel;
    filter_data['years'] = years_sel;

    const ela_present = await getMonthsPresentAPI(filter_data);

    return ela_present;

    
}

export const getDaysPresentQuery = async (empresa_sel, rodales_sel, materiales_sel, elaborador_sel, chofer_sel, 
    transportista_sel, comprador_sel, years_sel, month_sel) => {

    let filter_data = {};

    filter_data['empresa'] = empresa_sel;
    filter_data['rodales'] = rodales_sel;
    filter_data['materiales'] = materiales_sel;
    filter_data['elaborador'] = elaborador_sel;
    filter_data['chofer'] = chofer_sel;
    filter_data['transportista'] = transportista_sel;
    filter_data['comprador'] = comprador_sel;
    filter_data['years'] = years_sel;
    filter_data['months'] = month_sel;

    const ela_present = await getDaysPresentAPI(filter_data);

    return ela_present;

    
} 

export const getRodalesPresentQuery = async (empresa_sel, materiales_sel, elaborador_sel, chofer_sel, 
    transportista_sel, comprador_sel, years_sel, month_sel) => {

    let filter_data = {};

    filter_data['empresa'] = empresa_sel;

    filter_data['materiales'] = materiales_sel;
    filter_data['elaborador'] = elaborador_sel;
    filter_data['chofer'] = chofer_sel;
    filter_data['transportista'] = transportista_sel;
    filter_data['comprador'] = comprador_sel;
    filter_data['years'] = years_sel;
    filter_data['months'] = month_sel;

    const ela_present = await getRodalesPresentAPI(filter_data);

    return ela_present;

    
}


export const getEmpresasPresentQuery = async (rodales_sel, materiales_sel, elaborador_sel, chofer_sel, 
    transportista_sel, comprador_sel, years_sel, month_sel) => {

    let filter_data = {};

    filter_data['rodales'] = rodales_sel;
    filter_data['materiales'] = materiales_sel;
    filter_data['elaborador'] = elaborador_sel;
    filter_data['chofer'] = chofer_sel;
    filter_data['transportista'] = transportista_sel;
    filter_data['comprador'] = comprador_sel;
    filter_data['years'] = years_sel;
    filter_data['months'] = month_sel;

    const ela_present = await getEmpresasPresentAPI(filter_data);

    return ela_present;

    
}






