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
        textStatusQuery, setTextStatusQuery
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

        if(!active){

            setActive(true);
            let compra_selects = [...compradorSelected, id_comprador];
            setCompradorSelected(compra_selects);

            if(statusQuery){

                if(textStatusQuery == ORIGIN_QUERY.COMPRADOR){

                    alert('estoy en comprador, tengo que traer todo nuevametne sin nada selecccionado');

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

                setStatusQuery(true);
                setTextStatusQuery(ORIGIN_QUERY.COMPRADOR);

                //CARGO TODOS LAS PESTA;AS
                alert('activo el query de Comprador');

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

                if (compradorSelected.length == 1) {

                    alert('Resteo a los datos desde COmpradores');

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

            }
        }
    }


    const verifiedVariablesSelected = (compra_selects) => {


        if(materialesSelected.length == 0){

            loadMaterialesPresent(compra_selects);
        }

        if(elaboradorSelected.length == 0){

            loadElaboradorPresent(compra_selects);
        }

        if(choferesSelected.length == 0){

            loadChoferesPresent(compra_selects);
        }

        if(transportistaSelected.length == 0){

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

        if (is_reset) {
            years_pres = await getYearsPresentQuery([], [], [], 
                [], [], compra_selects);
        } else {
            //llamo al metodo que carga los years
            years_pres = await getYearsPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected, 
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

    const loadMonthsPresent = async (compra_selects, is_reset) => {

        //ACA PUEDO UTILIZAR UN FLAGS PARA SAER SI LIMPIO LOS SELECT
        let months_data = null;

        if (is_reset) {
            months_data = await getMonthsPresentQuery([], [], [], 
                [], [], compra_selects);

        } else {

            //para traer los meses uso los rodales como filtro
            months_data = await getMonthsPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected, 
                choferesSelected, transportistaSelected, 
                compra_selects);


        }


        if (months_data) {

            setMonthsPresent(months_data);

        }

        setStatusMonths(!statusMonths);


    }

    const loadDaysPresent = async (compra_selects, is_reset) => {

        //ACA PUEDO UTILIZAR UN FLAGS PARA SAER SI LIMPIO LOS SELECT
        let days_data = null;

        if (is_reset) {

            days_data = await getDaysPresentQuery([], [], [], 
                [], [], compra_selects);

        } else {
            days_data = await getDaysPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected, 
                choferesSelected, transportistaSelected, 
                compra_selects);

        }

        if (days_data) {

            setDaysPresent(days_data);

        }

        setStatusDays(!statusDays);

    }


    const loadRodalesPresent = async (compra_selects, is_reset) => {


        let rod_present = null;

        if (is_reset) {
            rod_present = await getRodalesPresentQuery([], [], 
                [], [], compra_selects);
        } else {

            rod_present = await getRodalesPresentQuery(materialesSelected, elaboradorSelected,
                choferesSelected, transportistaSelected,
                compra_selects);
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

        if(is_reset){

            mat_present = await getMaterialesPresentQuery([], [], [], 
                [], [], 
                compra_selects);

        } else {

            mat_present = await getMaterialesPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected, 
                choferesSelected, transportistaSelected, 
                compra_selects);

        }

     

        if (mat_present) {

            setMaterialesPresent(mat_present);

        }

        setStatusMateriales(!statusMateriales);

    }


    const loadChoferesPresent = async (compra_selects, is_reset) => {

        let choferes_data = null;

        if(is_reset){

            choferes_data = await getChoferesPresentQuery([], [], [], 
                [], [], 
                compra_selects);

        } else {

            choferes_data = await getChoferesPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected, 
                choferesSelected, transportistaSelected, 
                compra_selects);

        }


        if (choferes_data) {
            setChoferesPresent(choferes_data);

        }

        setStatusChoferes(!statusChoferes);
    }


    const loadElaboradorPresent = async (compra_selects, is_reset) => {

        let ela_present = null;
        if(is_reset){

            ela_present = await getElaboradorPresentQuery([], [], [], 
                [], [], 
                compra_selects);

        } else {

            ela_present = await getElaboradorPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected, 
                choferesSelected, transportistaSelected, 
                compra_selects);

        }
 

        if (ela_present) {

            setElaboradorPresent(ela_present);

        }
        setStatusElaborador(!statusElaborador);

    }

    const loadTransportistasPresent = async (compra_selects, is_reset) => {

        let transportista_data = null;

        if(is_reset){

            transportista_data = await getTransportistasPresentQuery([], [], [], 
                [], [], 
                compra_selects);

        } else {

            transportista_data = await getTransportistasPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected, 
                choferesSelected, transportistaSelected, 
                compra_selects);

        }

       

        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setStatusTransportista(!statusTransportista);

    }

   

    

    useEffect(() => {


      
    }, [active]);


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