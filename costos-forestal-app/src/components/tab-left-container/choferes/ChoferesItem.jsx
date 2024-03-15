import React, { useContext, useEffect, useState } from 'react'
import ChoferIcon from '../../../icons/ChoferIcon'
import { DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';
import { getChoferesPresentQuery, getCompradorPresentQuery, getDaysPresentQuery, getElaboradorPresentQuery, getMaterialesPresentQuery, getMonthsPresentQuery, getRodalesPresentQuery, getTransportistasPresentQuery, getYearsPresentQuery } from '../../../utility/Procesamiento';

const ChoferesItem = ({ name_chofer, idchofer, is_present, chofer }) => {

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

        if (!active) {

            setActive(true);

            let chof_selects = [...choferesSelected, idchofer];
            setChoferesSelected(chof_selects);

            if (statusQuery) {

                if (textStatusQuery == ORIGIN_QUERY.CHOFER) {

                    //ya tenemos uno activo,
                    alert('estoy en choferes, tengo que traer todo nuevametne sin nada selecccionado');

                    //tengo que limpiar todos los selected pero usando los lvls


                    loadYearsPresent(chof_selects, true);
                    loadMonthsPresent(chof_selects, true);
                    loadDaysPresent(chof_selects, true);
                    loadRodalesPresent(chof_selects, true);
                    loadMaterialesPresent(chof_selects, true);
                    loadElaboradorPresent(chof_selects, true);
                    loadTransportistasPresent(chof_selects, true);
                    loadCompradorPresent(chof_selects, true);

                }


            } else {
                //no estaba activo,lo activo desde query

                setStatusQuery(true);
                setTextStatusQuery(ORIGIN_QUERY.CHOFER);

                //CARGO TODOS LAS PESTA;AS
                alert('activo el query de CHoferes');


                loadYearsPresent(chof_selects, true);
                loadMonthsPresent(chof_selects, true);
                loadDaysPresent(chof_selects, true);
                loadRodalesPresent(chof_selects, true);
                loadMaterialesPresent(chof_selects, true);
                loadElaboradorPresent(chof_selects, true);
                loadTransportistasPresent(chof_selects, true);
                loadCompradorPresent(chof_selects, true);
                //falta elaborador




            }


        } else {

            setActive(false);

            //tengo que eliminar el chofer de la lista
            let chof_selects = _deleteItemSelected();

            if (statusQuery) {

                if (choferesSelected.length == 1) {

                    alert('Resteo a los datos desde Choferes');

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

                    setTransportistaData(transportistaDinamicData);
                    setTransportistaSelected([]);
                    setTransportistaPresent([]);
                    setStatusTransportista(!statusTransportista);

                    setCompradorData(compradorDinamicData);
                    setCompradorPresent([]);
                    setCompradorSelected([]);
                    setStatusComprador(!statusComprador);



                } else {

                    if (textStatusQuery == ORIGIN_QUERY.CHOFER) {

                        alert('Quedabn mas de 1 chofer seleccionado');
                        loadYearsPresent(chof_selects, true);
                        loadMonthsPresent(chof_selects, true);
                        loadDaysPresent(chof_selects, true);

                        loadRodalesPresent(chof_selects);
                        loadMaterialesPresent(chof_selects, true);
                        loadElaboradorPresent(chof_selects, true);
                        loadTransportistasPresent(chof_selects, true);
                        loadCompradorPresent(chof_selects, true);

                       

                    }
                }



            }



        }

    }

    const verifiedVariablesSelected = (chof_selects) => {


        if (materialesSelected.length == 0) {

            loadMaterialesPresent(chof_selects);
        }

        if (elaboradorSelected.length == 0) {

            loadElaboradorPresent(chof_selects);
        }


        if (transportistaSelected.length == 0) {

            loadTransportistasPresent(chof_selects);

        }


        if (compradorSelected.length == 0) {

            loadCompradorPresent(chof_selects);

        }


    }

    const _deleteItemSelected = () => {

        let items = [];

        choferesSelected.forEach(chof => {

            if (idchofer != chof) {

                items.push(chof);

            }

        });

        setChoferesSelected(items);

        return items;

    }

    const loadYearsPresent = async (chof_selects, is_reset) => {


        let years_pres = null;

        if (is_reset) {
            years_pres = await getYearsPresentQuery([], [], [],
                chof_selects, [], []);
        } else {
            //llamo al metodo que carga los years
            years_pres = await getYearsPresentQuery(rodalesSelected, materialesSelected,
                elaboradorSelected, chof_selects, transportistaSelected,
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

    const loadMonthsPresent = async (chof_selects, is_reset) => {

        //ACA PUEDO UTILIZAR UN FLAGS PARA SAER SI LIMPIO LOS SELECT
        let months_data = null;

        if (is_reset) {
            months_data = await getMonthsPresentQuery([], [], [],
                chof_selects, [],
                []);

        } else {

            //para traer los meses uso los rodales como filtro
            months_data = await getMonthsPresentQuery(rodalesSelected, materialesSelected,
                elaboradorSelected, chof_selects, transportistaSelected,
                compradorSelected);


        }


        if (months_data) {

            setMonthsPresent(months_data);

        }

        setStatusMonths(!statusMonths);


    }

    const loadDaysPresent = async (chof_selects, is_reset) => {

        //ACA PUEDO UTILIZAR UN FLAGS PARA SAER SI LIMPIO LOS SELECT
        let days_data = null;

        if (is_reset) {

            days_data = await getDaysPresentQuery([], [], [],
                chof_selects, [],
                []);

        } else {
            days_data = await getDaysPresentQuery(rodalesSelected, materialesSelected,
                elaboradorSelected, chof_selects, transportistaSelected,
                compradorSelected);

        }



        if (days_data) {

            setDaysPresent(days_data);

        }

        setStatusDays(!statusDays);

    }


    const loadRodalesPresent = async (chof_selects, is_reset) => {


        let rod_present = null;

        if (is_reset) {
            rod_present = await getRodalesPresentQuery([], [],
                chof_selects, [],
                []);
        } else {

            rod_present = await getRodalesPresentQuery(materialesSelected, elaboradorSelected,
                chof_selects, transportistaSelected,
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

    const loadElaboradorPresent = async (chof_selects, is_reset) => {

        let ela_present = null;

        if (is_reset) {
            ela_present = await getElaboradorPresentQuery([], [], [],
                chof_selects, [],
                []);

        } else {
            ela_present = await getElaboradorPresentQuery(rodalesSelected, materialesSelected,
                elaboradorSelected, chof_selects, transportistaSelected,
                compradorSelected);
        }



        if (ela_present) {

            setElaboradorPresent(ela_present);

        }
        setStatusElaborador(!statusElaborador);

    }


    const loadMaterialesPresent = async (chof_selects, is_reset) => {

        let mat_present = null;
        if (is_reset) {

            mat_present = await getMaterialesPresentQuery([], [], [],
                chof_selects, [],
                []);

        } else {
            mat_present = await getMaterialesPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected,
                chof_selects, transportistaSelected,
                compradorSelected);
        }



        if (mat_present) {

            setMaterialesPresent(mat_present);

        }

        setStatusMateriales(!statusMateriales);

    }

    const loadTransportistasPresent = async (chof_selects, is_reset) => {

        let transportista_data = null;

        if (is_reset) {

            transportista_data = await getTransportistasPresentQuery([], [], [],
                chof_selects, [],
                []);

        } else {

            transportista_data = await getTransportistasPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected,
                chof_selects, transportistaSelected,
                compradorSelected);
        }



        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setStatusTransportista(!statusTransportista);

    }

    const loadCompradorPresent = async (chof_selects, is_reset) => {

        let comprador_data = null;
        if (is_reset) {

            comprador_data = await getCompradorPresentQuery([], [], [],
                chof_selects, [],
                []);

        } else {

            comprador_data = await getCompradorPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected,
                chof_selects, transportistaSelected,
                compradorSelected);
        }



        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setStatusComprador(!statusComprador);

    }

    useEffect(() => {

        if (choferesSelected.length == 0) {
            setActive(false);
        }


    }, [active])


    return (

        <>
            {is_present ? <a className="list-group-item list-group-item-action item-layer is_present" aria-current="true"
                chofer_id={idchofer}
                onClick={onclickHandler} style={!active ? null : styles.active}>
                <ChoferIcon></ChoferIcon>
                {name_chofer}
            </a> :
                <a className="list-group-item list-group-item-action item-layer" aria-current="true"
                    chofer_id={idchofer}
                    onClick={onclickHandler} style={!active ? null : styles.active}>
                    <ChoferIcon></ChoferIcon>
                    {name_chofer}
                </a>
            }
        </>
    )
}

export default ChoferesItem

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