import React, { useContext, useEffect, useState } from 'react'
import TransportistaIcons from '../../../icons/TransportistaIcons';
import { DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';
import { getChoferesPresentQuery, getCompradorPresentQuery, getDaysPresentQuery, getElaboradorPresentQuery, getMaterialesPresentQuery, getMonthsPresentQuery, getRodalesPresentQuery, getYearsPresentQuery } from '../../../utility/Procesamiento';

const TransportistaItem = ({ name_transportista, idtransportista, is_present, transportista }) => {


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


    const onClickHandler = () => {

        if(!active){

            setActive(true);

            let transp_selects = [...transportistaSelected, idtransportista];
            setTransportistaSelected(transp_selects);

            if(statusQuery){

                if(textStatusQuery == ORIGIN_QUERY.TRANSPORTISTA){

                    alert('estoy en transportistas, tengo que traer todo nuevametne sin nada selecccionado');
                    loadYearsPresent(transp_selects, true);
                    loadMonthsPresent(transp_selects, true);
                    loadDaysPresent(transp_selects, true);
    
                    loadRodalesPresent(transp_selects);
                    loadMaterialesPresent(transp_selects, true);
                    loadElaboradorPresent(transp_selects, true);
                    loadChoferesPresent(transp_selects, true);
                    loadCompradorPresent(transp_selects, true);
                
                }

            } else {

                setStatusQuery(true);
                setTextStatusQuery(ORIGIN_QUERY.TRANSPORTISTA);

                //CARGO TODOS LAS PESTA;AS
                alert('activo el query de Transportista');

                loadYearsPresent(transp_selects, true);
                loadMonthsPresent(transp_selects, true);
                loadDaysPresent(transp_selects, true);

                loadRodalesPresent(transp_selects, true);
                loadMaterialesPresent(transp_selects, true);
                loadElaboradorPresent(transp_selects, true);
                loadChoferesPresent(transp_selects, true);
                loadCompradorPresent(transp_selects, true);



            }



        } else {
            setActive(false);

            //tengo que eliminar el chofer de la lista
            let transp_selects = _deleteItemSelected();

            if (statusQuery) {

                if (transportistaSelected.length == 1) {

                    alert('Resteo a los datos desde Transportista');

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

                
                    setCompradorData(compradorDinamicData);
                    setCompradorPresent([]);
                    setCompradorSelected([]);
                    setStatusComprador(!statusComprador);

                } else {
                    if (textStatusQuery == ORIGIN_QUERY.TRANSPORTISTA) {

                        alert('Quedabn mas de 1 Transportista seleccionado');

                        loadYearsPresent(transp_selects, true);
                        loadMonthsPresent(transp_selects, true);
                        loadDaysPresent(transp_selects, true);
        
                        loadRodalesPresent(transp_selects);
                        loadMaterialesPresent(transp_selects, true);
                        loadElaboradorPresent(transp_selects, true);
                        loadChoferesPresent(transp_selects, true);
                        loadCompradorPresent(transp_selects, true);

                    }
                }
            }


        }
    }


    const verifiedVariablesSelected = (transp_selects) => {


        if(materialesSelected.length == 0){

            loadMaterialesPresent(transp_selects);
        }

        if(elaboradorSelected.length == 0){

            loadElaboradorPresent(transp_selects);
        }

        if(choferesSelected.length == 0){

            loadChoferesPresent(transp_selects);
        }



        if (compradorSelected.length == 0){

            loadCompradorPresent(transp_selects);

        }


    }


    const _deleteItemSelected = () => {

        let items = [];

        transportistaSelected.forEach(trans => {

            if (idtransportista != trans) {

                items.push(trans);

            }

        });

        setTransportistaSelected(items);

        return items;

    }

    const loadYearsPresent = async (transp_selects, is_reset) => {


        let years_pres = null;

        if (is_reset) {
            years_pres = await getYearsPresentQuery([], [], [], 
                [], transp_selects, 
                []);
        } else {
            //llamo al metodo que carga los years
            years_pres = await getYearsPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected, 
                choferesSelected, transp_selects, 
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

    const loadMonthsPresent = async (transp_selects, is_reset) => {

        //ACA PUEDO UTILIZAR UN FLAGS PARA SAER SI LIMPIO LOS SELECT
        let months_data = null;

        if (is_reset) {
            months_data = await getMonthsPresentQuery([], [], [], 
                [], transp_selects, 
                []);

        } else {

            //para traer los meses uso los rodales como filtro
            months_data = await getMonthsPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected, 
                choferesSelected, transp_selects, 
                compradorSelected);


        }


        if (months_data) {

            setMonthsPresent(months_data);

        }

        setStatusMonths(!statusMonths);


    }

    const loadDaysPresent = async (transp_selects, is_reset) => {

        //ACA PUEDO UTILIZAR UN FLAGS PARA SAER SI LIMPIO LOS SELECT
        let days_data = null;

        if (is_reset) {

            days_data = await getDaysPresentQuery([], [], [], 
                [], transp_selects, 
                []);

        } else {
            days_data = await getDaysPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected, 
                choferesSelected, transp_selects, 
                compradorSelected);

        }



        if (days_data) {

            setDaysPresent(days_data);

        }

        setStatusDays(!statusDays);

    }


    const loadRodalesPresent = async (transp_selects, is_reset) => {


        let rod_present = null;

        if (is_reset) {
            rod_present = await getRodalesPresentQuery([], [], 
                [], transp_selects, []);
        } else {

            rod_present = await getRodalesPresentQuery(materialesSelected, elaboradorSelected,
                choferesSelected, transp_selects,
                compradorSelected);
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


    const loadMaterialesPresent = async (transp_selects, is_reset) => {

        let mat_present = null;

        if(is_reset){

            mat_present = await getMaterialesPresentQuery([], [], [], 
                [], transp_selects, 
                []);

        } else {

            mat_present = await getMaterialesPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected, 
                choferesSelected, transp_selects, 
                compradorSelected);

        }

     

        if (mat_present) {

            setMaterialesPresent(mat_present);

        }

        setStatusMateriales(!statusMateriales);

    }


    const loadChoferesPresent = async (transp_selects, is_reset) => {

        let choferes_data = null;
        if(is_reset){

            choferes_data = await getChoferesPresentQuery([], [], [], 
                [], transp_selects, 
                []);

        } else {

            choferes_data = await getChoferesPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected, 
                choferesSelected, transp_selects, 
                compradorSelected);

        }

       

        if (choferes_data) {
            setChoferesPresent(choferes_data);

        }

        setStatusChoferes(!statusChoferes);
    }


    const loadElaboradorPresent = async (transp_selects, is_reset) => {

        let ela_present = null;

        if(is_reset){

            ela_present = await getElaboradorPresentQuery([], [], [], 
                [], transp_selects, 
                []);

        } else {

            ela_present = await getElaboradorPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected, 
                choferesSelected, transp_selects, 
                compradorSelected);

        }

      

        if (ela_present) {

            setElaboradorPresent(ela_present);

        }
        setStatusElaborador(!statusElaborador);

    }

   
    const loadCompradorPresent = async (transp_selects, is_reset) => {

        let comprador_data = null;

        if(is_reset){

            comprador_data = await getCompradorPresentQuery([], [], [], 
                [], transp_selects, 
                []);

        } else {

            comprador_data = await getCompradorPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected, 
                choferesSelected, transp_selects, 
                compradorSelected);

        }

      

        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setStatusComprador(!statusComprador);

    }



    

    useEffect(() => {

    }, [active]);


    return (

        <>
            {is_present ? <a className="list-group-item list-group-item-action item-layer is_present" aria-current="true"
                transportista_id={idtransportista}
                onClick={onClickHandler} style={!active ? null : styles.active}>
                <TransportistaIcons></TransportistaIcons>
                {' ' +  name_transportista}
            </a> :
                <a className="list-group-item list-group-item-action item-layer" aria-current="true"
                    transportista_id={idtransportista}
                    onClick={onClickHandler} style={!active ? null : styles.active}>
                    <TransportistaIcons></TransportistaIcons>
                    {' ' +  name_transportista}
                </a>
            }
        </>

    )
}

export default TransportistaItem


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