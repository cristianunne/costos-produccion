import React, { useContext, useEffect, useState } from 'react'
import ElaboradorIcon from '../../../icons/ElaboradorIcon'
import { DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';
import { getChoferesPresentQuery, getCompradorPresentQuery, getMaterialesPresentQuery, getTransportistasPresentQuery, getYearsPresentQuery } from '../../../utility/Procesamiento';

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

        if(!active){

            setActive(true);

            //consulto quien hizo el query
            if(statusQuery){

                if(textStatusQuery == ORIGIN_QUERY.RODALES){

                    let elab_selects = [...elaboradorSelected, idelaborador];
                    setElaboradorSelected(elab_selects);

                    //COMPRUEBO QUE ALGUNOS DE LOS OTROS ITEMS NO ESTES SELCCIONADOS
                    verifiedVariablesSelected(elab_selects);

                    loadYearsPresent(elab_selects);

                }


            } else {

            }



        } else {

            setActive(false);
        }


    }

    const verifiedVariablesSelected = (elab_selects) => {

        //compruebo LOS MATERIALES
        if(materialesSelected.length == 0){

            //no hay nada seleccionado asi que puedo filtrar
            loadMaterialesPresent(elab_selects);

        }

        //verifico CHofer, transportista y comprador

        if(choferesSelected.length == 0){

            //filtro los choferes
            loadChoferesPresent(elab_selects);

        }

        if (transportistaSelected.length == 0){

            loadTransportistasPresent(elab_selects);

        }

        if(compradorSelected.length == 0){

            loadCompradorPresent(elab_selects);

        }

    }


    const loadYearsPresent = async (elab_selects) => {

        setYearsPresent([]);
        //llamo al metodo que carga los years
        const years_pres = await getYearsPresentQuery(rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected, 
            compradorSelected);


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

    const loadMaterialesPresent = async (elab_selects) => {

        const mat_present = await getMaterialesPresentQuery(rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected, 
            compradorSelected);

        if (mat_present) {

            setMaterialesPresent(mat_present);

        }

        setStatusMateriales(!statusMateriales);

    }

    const loadChoferesPresent = async (elab_selects) => {

        const choferes_data = await getChoferesPresentQuery(rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected, 
            compradorSelected);

        if (choferes_data) {
            setChoferesPresent(choferes_data);

        }

        setStatusChoferes(!statusChoferes);
    }

    const loadTransportistasPresent = async (elab_selects) => {

        const transportista_data = await getTransportistasPresentQuery(rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected, 
            compradorSelected);

        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setStatusTransportista(!statusTransportista);

    }

    const loadCompradorPresent = async (elab_selects) => {

        const comprador_data = await getCompradorPresentQuery(rodalesSelected, materialesSelected, elab_selects, choferesSelected, transportistaSelected, 
            compradorSelected);

        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setStatusComprador(!statusComprador);

    }
    

    useEffect(() => {

    }, [active])
    
    
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