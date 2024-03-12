import React, { useContext, useEffect, useState } from 'react'
import { DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';
import { getDaysPresentQuery, getMonthsPresentQuery } from '../../../utility/Procesamiento';

const YearsItem = ({ year, isPresent, has_rodales_select }) => {
    //has rodales select se utiliza porque los botones reaccionan de forma diferente si hay rodales seleccionados

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

    const [present, setPresent] = useState(false);


    const onClickHandler = () => {

        if(!active){
            setActive(true);

            //consulto el tipode query
            if(statusQuery){
                //consulto quien
                if(textStatusQuery == ORIGIN_QUERY.RODALES){

                    //imporante, porque tendria que pasarle rodales a la funcion que trae los meses
                    //traigo los meses pasando los rodales y elyear seleccionado
                    let year_select = [...yearsSelected, year];

                    setYearsSelected(year_select);

                    loadMonthsPresent(year_select);
                 
                    //limpio los month selected
                    setMonthsSelected([]);
                    setDaysSelected([]);





                }

            }


        } else {
            setActive(false);

            //elimino el current de los selected

             //consulto el tipode query
             if(statusQuery){
                //consulto quien
                if(textStatusQuery == ORIGIN_QUERY.RODALES){

                    //imporante, porque tendria que pasarle rodales a la funcion que trae los meses
                    //traigo los meses pasando los rodales y elyear seleccionado
                    let year_select = _deleteYearSelected(year);
                    
                    console.log('year_select');
                    console.log(year_select);

                    setYearsSelected(year_select);

                    loadMonthsPresent(year_select);

                    //tengo que cargar los days

                    setMonthsSelected([]);

                }

            }

            



        }

    }



    const _deleteYearSelected = (year) => {

        let yea_ = [];

        yearsSelected.forEach(yearsel => {

            if(yearsel != year){
                yea_.push(yearsel);
            }

        });

        setYearsSelected(yea_);
        return yea_;

    }


    const loadMonthsPresent = async (years_select) => {

        //para traer los meses uso los rodales como filtro
        const months_data = await getMonthsPresentQuery(rodalesSelected, null, null, null, null, null, years_select);

        if (months_data) {

            setMonthsPresent(months_data);

        }

        setStatusMonths(!statusMonths);

        loadDaysPresent(months_data);

    }

    const loadDaysPresent = async (mont_present) => {
        //rodales_sel, materiales_sel, elaborador_sel, chofer_sel, transportista_sel, comprador_sel, years_sel

        console.log('mont_present');
        console.log(mont_present);
       
        let month_arr = [];

        mont_present.forEach(mon => {
            month_arr.push(mon.month);
        });


        const days_data = await getDaysPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected, 
            choferesSelected, transportistaSelected, compradorSelected, null, month_arr);

        if (days_data) {

            setDaysPresent(days_data);

        }

        setStatusDays(!statusDays);

    }


    useEffect(() => {

        //recorro el years items

        if ((rodalesSelected.length == 0 || rodalesSelected == null) && active) {

            setActive(false);

        }

        if(yearsSelected.length == 0){
            setActive(false);
        }


    }, [active, rodalesSelected]);


    return (
        <>
            {isPresent ? <button className="btn is_present btn-square btn-h-35 btn-hover" onClick={onClickHandler}
                style={!active ? null : styles.active}>
                {year}
            </button> :

                has_rodales_select ?

                    <button className="btn btn-outline-light btn-square btn-h-35 btn-hover" 
                        style={!active ? null : styles.active} disabled>
                        {year}
                    </button>
                    :
                    <button className="btn btn-outline-light btn-square btn-h-35 btn-hover" onClick={onClickHandler}
                        style={!active ? null : styles.active}>
                        {year}
                    </button>
            }
        </>
    )
}

export default YearsItem

const styles = {
    active: {
        backgroundColor: '#206bc4',
        color: '#e3e3e3'
    }
};