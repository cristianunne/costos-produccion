import React, { useContext, useEffect, useState } from 'react'
import ElaboradorIcon from '../../../icons/ElaboradorIcon'
import { DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';
import { getChoferesPresentQuery, getCompradorPresentQuery, getDaysPresentQuery, getMaterialesPresentQuery, getMonthsPresentQuery, getRodalesPresentQuery, getTransportistasPresentQuery, getYearsPresentQuery } from '../../../utility/Procesamiento';

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


    const onclickHandler = () => {

        if (!active) {

            setActive(true);
            let elabs_selects = [...elaboradorSelected, idelaborador];
            setElaboradorSelected(elabs_selects);

            //consulto quien hizo el query
            if (statusQuery) {

                if (textStatusQuery == ORIGIN_QUERY.ELABORADOR) {

                    setElaboradorSelected(elabs_selects);
                    loadRodalesPresent(elabs_selects);

                    loadYearsPresent(elabs_selects);
                    loadMonthsPresent(elabs_selects);
                    loadDaysPresent(elabs_selects);

                    loadMaterialesPresent(elabs_selects);
                    loadChoferesPresent(elabs_selects);
                    loadTransportistasPresent(elabs_selects);
                    loadCompradorPresent(elabs_selects);

                  

                } else if (textStatusQuery == ORIGIN_QUERY.RODALES) {

                  
                  

                }


            } else {

                //no habia query selected, entonces seteo a ELaborador como el iniciador
                setStatusQuery(true);
                setTextStatusQuery(ORIGIN_QUERY.ELABORADOR);

                alert('activo el query de Elaborador');


                //Setaear tmb el lvl

             
                //COMO ENTRO LA PRIMERA VEZ, PUEDO REALIZAR LA CARGA DE TODOS
                //TENGO QUE TRAER INICIALMENTE LOS RODALES PRESENT
                loadRodalesPresent(elabs_selects);
                loadYearsPresent(elabs_selects);
                loadMonthsPresent(elabs_selects);
                loadDaysPresent(elabs_selects);
                loadMaterialesPresent(elabs_selects);
                loadChoferesPresent(elabs_selects);
                loadTransportistasPresent(elabs_selects);
                loadCompradorPresent(elabs_selects);



            }



        } else {

            setActive(false);
            //tengo que eliniar el eleaborador seleccionado
            let elab_selects = _deleteItemElabSelected();
            //setElaboradorSelected(elab_selects);

            if (statusQuery) {
                //si llegue al ultimo, quito el query y cargo completo
                if (elaboradorSelected.length == 1) {

                    alert('reseteo desde Elaborador');

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

                    //restauro los choferes
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



                } else {

                    if (textStatusQuery == ORIGIN_QUERY.RODALES) {

                        //COMPRUEBO QUE ALGUNOS DE LOS OTROS ITEMS NO ESTES SELCCIONADOS
                        verifiedVariablesSelected(elab_selects);

                        loadYearsPresent(elab_selects);
                        loadMonthsPresent(elab_selects);



                    } else if (textStatusQuery == ORIGIN_QUERY.ELABORADOR) {
                        //VUELVO A TRAER LOS DATOS

                        //tengo que limpiar todos los selected
                        //no me esta limpiando los SELECTED

                        loadYearsPresent(elab_selects, true);
                        loadMonthsPresent(elab_selects, true);
                        loadDaysPresent(elab_selects, true);


                        loadRodalesPresent(elab_selects);
                        loadMaterialesPresent(elab_selects, true);
                        loadChoferesPresent(elab_selects, true);
                        loadTransportistasPresent(elab_selects, true);
                        loadCompradorPresent(elab_selects, true);

                    } else if(textStatusQuery == ORIGIN_QUERY.MATERIALES){

                        //solo me actualizara al siguiente nivel lo que no esten seleccionados
                        loadYearsPresent(elab_selects);
                        loadMonthsPresent(elab_selects);
                        loadDaysPresent(elab_selects);
                        verifiedVariablesSelected(elab_selects);


                    }

                }


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

    const _cleanAllSelected = () => {

        //limpio todos los demas
        setRodalesSelected([]);
        setRodalesData([]);
        setRodalesPresent([]);


        setMaterialesSelected([]);
        setChoferesSelected([]);
        setTransportistaSelected([]);
        setCompradorSelected([]);

    }

    const verifiedVariablesSelected = (elab_selects) => {

        //compruebo LOS MATERIALES
        if (materialesSelected.length == 0) {

            //no hay nada seleccionado asi que puedo filtrar
            loadMaterialesPresent(elab_selects);

        }

        //verifico CHofer, transportista y comprador

        if (choferesSelected.length == 0) {

            //filtro los choferes
            loadChoferesPresent(elab_selects);

        }

        if (transportistaSelected.length == 0) {

            loadTransportistasPresent(elab_selects);

        }

        if (compradorSelected.length == 0) {

            loadCompradorPresent(elab_selects);

        }

    }

    const loadRodalesPresent = async (elab_selects, is_reset) => {


        let rod_present = null;

        if(is_reset){
            rod_present = await getRodalesPresentQuery([], elab_selects, [], [],
                []);
        }else {

            rod_present = await getRodalesPresentQuery(materialesSelected, elab_selects, choferesSelected, 
                transportistaSelected,
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

    const loadYearsPresent = async (elab_selects, is_reset) => {

      
        let years_pres = null;

        if (is_reset) {
            years_pres = await getYearsPresentQuery([], [], elab_selects, [], [],
                []);
        } else {
            //llamo al metodo que carga los years
            years_pres = await getYearsPresentQuery(rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
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

    const loadMonthsPresent = async (elab_selects, is_reset) => {

        //ACA PUEDO UTILIZAR UN FLAGS PARA SAER SI LIMPIO LOS SELECT
        let months_data = null;

        if (is_reset) {
            months_data = await getMonthsPresentQuery([], [], elab_selects, [], [],
                []);

        } else {

            //para traer los meses uso los rodales como filtro
            months_data = await getMonthsPresentQuery(rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
                compradorSelected);


        }


        if (months_data) {

            setMonthsPresent(months_data);

        }

        setStatusMonths(!statusMonths);


    }

    const loadDaysPresent = async (elab_selects, is_reset) => {

        //ACA PUEDO UTILIZAR UN FLAGS PARA SAER SI LIMPIO LOS SELECT
        let days_data = null;

        if (is_reset) {

            days_data = await getDaysPresentQuery([], [], elab_selects, [], [],
                []);

        } else {
            days_data = await getDaysPresentQuery(rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
                compradorSelected);

        }



        if (days_data) {

            setDaysPresent(days_data);

        }

        setStatusDays(!statusDays);

    }


    const loadMaterialesPresent = async (elab_selects, is_reset) => {

        let mat_present = null;

        if (is_reset) {

            mat_present = await getMaterialesPresentQuery([], [], elab_selects, [], [],
                []);

        } else {
            mat_present = await getMaterialesPresentQuery(rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
                compradorSelected);

        }



        if (mat_present) {

            setMaterialesPresent(mat_present);

        }

        setStatusMateriales(!statusMateriales);

    }

    const loadChoferesPresent = async (elab_selects, is_reset) => {

        let choferes_data = null;
        if (is_reset) {

            choferes_data = await getChoferesPresentQuery([], [], elab_selects, [], [],
                []);

        } else {
            choferes_data = await getChoferesPresentQuery(rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
                compradorSelected);
        }


        if (choferes_data) {
            setChoferesPresent(choferes_data);

        }

        setStatusChoferes(!statusChoferes);
    }

    const loadTransportistasPresent = async (elab_selects, is_reset) => {

        let transportista_data = null;
        if (is_reset) {

            transportista_data = await getTransportistasPresentQuery([], [], elab_selects, [], [],
                []);

        } else {

            transportista_data = await getTransportistasPresentQuery(rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
                compradorSelected);

        }


        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setStatusTransportista(!statusTransportista);

    }

    const loadCompradorPresent = async (elab_selects, is_reset) => {

        const comprador_data = await getCompradorPresentQuery(rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected,
            compradorSelected);

        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setStatusComprador(!statusComprador);

    }


    useEffect(() => {
      
        if(elaboradorSelected.length == 0){
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