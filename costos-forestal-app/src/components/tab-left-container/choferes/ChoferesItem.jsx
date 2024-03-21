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
        textStatusQuery, setTextStatusQuery,
        levels, setLevels
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

                } else {

                    if(!isChoferInLevels()){

                         //traigo el level
                         let keys = Object.keys(levels);
                         let length = keys.length + 1;
                         let obj = { ...levels };
                         obj[length] = ORIGIN_QUERY.CHOFER;
                         setLevels(obj);
 
                         loadDataByLevels(obj, length, chof_selects)

                    } else {
                          //consulto el lvl en el que staba seleccionado y actualizo los de abajo
                          loadDataByLevels(levels, getChoferLevel(), chof_selects);
                    }

                }


            } else {
                //no estaba activo,lo activo desde query

                setStatusQuery(true);
                setTextStatusQuery(ORIGIN_QUERY.CHOFER);

                //CARGO TODOS LAS PESTA;AS
                alert('activo el query de CHoferes');

                //Aca deberia setear el lvl tmb
                setLevels({ 1: ORIGIN_QUERY.CHOFER });


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

                if(textStatusQuery == ORIGIN_QUERY.CHOFER){

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

                } else {

                    if(choferesSelected.length == 1){

                        let key = Object.keys(levels).filter(function (key) {
                            return levels[key] ===
                                ORIGIN_QUERY.CHOFER
                        })[0];

                        _deleteItemFromLevels(key);

                        //restauro todos sin contar el nivel actual
                        //no hay materiales seleccionados
                        loadDataByLevels(levels, key, chof_selects);

                        //como ya no quedan objetos, debo actuaizar siguiendo e lvl anterior

                    } else {

                        let key = Object.keys(levels).filter(function (key) {
                            return levels[key] ===
                                ORIGIN_QUERY.CHOFER
                        })[0];

                        loadDataByLevels(levels, key, chof_selects);

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

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

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

        

    }

    const loadMonthsPresent = async (chof_selects, is_reset) => {

        //ACA PUEDO UTILIZAR UN FLAGS PARA SAER SI LIMPIO LOS SELECT
        let months_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

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

        


    }

    const loadDaysPresent = async (chof_selects, is_reset) => {

        //ACA PUEDO UTILIZAR UN FLAGS PARA SAER SI LIMPIO LOS SELECT
        let days_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

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

        

    }


    const loadRodalesPresent = async (chof_selects, is_reset) => {


        let rod_present = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {
                rod_present = await getRodalesPresentQuery([], [],
                    chof_selects, [],
                    []);
            } else {
    
                rod_present = await getRodalesPresentQuery(materialesSelected, elaboradorSelected,
                    chof_selects, transportistaSelected,
                    compradorSelected);
            }

        } else {

            rod_present = await getRodalesPresentQuery(materialesSelected, elaboradorSelected,
                chof_selects, transportistaSelected,
                compradorSelected, yearsSelected);

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

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {
                ela_present = await getElaboradorPresentQuery([], [], [],
                    chof_selects, [],
                    []);
    
            } else {
                ela_present = await getElaboradorPresentQuery(rodalesSelected, materialesSelected,
                    elaboradorSelected, chof_selects, transportistaSelected,
                    compradorSelected);
            }

        } else {

            ela_present = await getElaboradorPresentQuery(rodalesSelected, materialesSelected,
                elaboradorSelected, chof_selects, transportistaSelected,
                compradorSelected, yearsSelected);

        }

      

        if (ela_present) {

            setElaboradorPresent(ela_present);

        }
        setStatusElaborador(!statusElaborador);

    }


    const loadMaterialesPresent = async (chof_selects, is_reset) => {

        let mat_present = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {

                mat_present = await getMaterialesPresentQuery([], [], [],
                    chof_selects, [],
                    []);
    
            } else {
                mat_present = await getMaterialesPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected,
                    chof_selects, transportistaSelected,
                    compradorSelected);
            }



        } else {
            mat_present = await getMaterialesPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected,
                chof_selects, transportistaSelected,
                compradorSelected,yearsSelected);

        }
       

        if (mat_present) {

            setMaterialesPresent(mat_present);

        }

        setStatusMateriales(!statusMateriales);

    }

    const loadTransportistasPresent = async (chof_selects, is_reset) => {

        let transportista_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {

                transportista_data = await getTransportistasPresentQuery([], [], [],
                    chof_selects, [],
                    []);
    
            } else {
    
                transportista_data = await getTransportistasPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected,
                    chof_selects, transportistaSelected,
                    compradorSelected);
            }
    
        } else {

            transportista_data = await getTransportistasPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected,
                chof_selects, transportistaSelected,
                compradorSelected, yearsSelected);

        }

       


        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setStatusTransportista(!statusTransportista);

    }

    const loadCompradorPresent = async (chof_selects, is_reset) => {

        let comprador_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            if (is_reset) {

                comprador_data = await getCompradorPresentQuery([], [], [],
                    chof_selects, [],
                    []);
    
            } else {
    
                comprador_data = await getCompradorPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected,
                    chof_selects, transportistaSelected,
                    compradorSelected);
            }


        } else {

            comprador_data = await getCompradorPresentQuery(rodalesSelected, materialesSelected, elaboradorSelected,
                chof_selects, transportistaSelected,
                compradorSelected, yearsSelected);

        }
       



        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setStatusComprador(!statusComprador);

    }


    const isChoferInLevels = () => {

        let is_present = false;

        Object.entries(levels).forEach(([key, value]) => {

            if (value == ORIGIN_QUERY.CHOFER) {
                is_present = true;
            }


        });


        return is_present;

    }

    const loadYearsPresentLevels = async (rod_selects, mat_selects, elab_selects, chof_selects, 
        transp_selects, comp_selects) => {

            if (textStatusQuery != ORIGIN_QUERY.YEARS) {

                let years_pres = await getYearsPresentQuery(rod_selects, mat_selects, elab_selects, chof_selects, 
                    transp_selects, comp_selects);
        
               
                if (years_pres) {
        
                    //pase lo que pase siempre traigo de nuevo los years
                    let arr_ = [];
        
                    years_pres.forEach(year_query => {
                        arr_.push(parseInt(year_query));
        
                    });
        
                    setYearsPresent(arr_);
        
        
                }
                setYearsSelected([]);
                setStatusYears(!statusYears);

            }
        

    }

    const loadMonthsPresentLevels = async (rod_selects, mat_selects, elab_selects, chof_selects, 
        transp_selects, comp_selects) => {

            if (textStatusQuery != ORIGIN_QUERY.YEARS) {

                let months_data = await getMonthsPresentQuery(rod_selects, mat_selects, elab_selects, chof_selects, 
                    transp_selects, comp_selects);
        
        
        
                if (months_data) {
        
                    setMonthsPresent(months_data);
        
                }
        
                setMonthsSelected([]);
                setStatusMonths(!statusMonths);

            }

      


    }

    const loadDaysPresentLevels = async (rod_selects, mat_selects, elab_selects, chof_selects, 
        transp_selects, comp_selects) => {

            if (textStatusQuery != ORIGIN_QUERY.YEARS) {

                let days_data = await getDaysPresentQuery(rod_selects, mat_selects, elab_selects, chof_selects, 
                    transp_selects, comp_selects);
        
        
        
                if (days_data) {
        
                    setDaysPresent(days_data);
        
                }
        
                setDaysSelected([]);
                setStatusDays(!statusDays);
            }

      

    }


    const loadRodalesPresentLevels = async (mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {


            let rod_present = null;

            if (textStatusQuery != ORIGIN_QUERY.YEARS) {

                rod_present = await getRodalesPresentQuery(mat_selects, elab_selects, chof_selects,
                    transp_selects, comp_selects);

            } else {

                rod_present = await getRodalesPresentQuery(mat_selects, elab_selects, chof_selects,
                    transp_selects, comp_selects, yearsSelected);

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
            setRodalesSelected([]);
            setStatusRodales(!statusRodales);

        }

        //setStatusMateriales(!statusMateriales);

    }

    const loadMaterialesPresentLevels = async (rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

            let mat_present = null;
            if (textStatusQuery != ORIGIN_QUERY.YEARS) {
                mat_present = await getMaterialesPresentQuery(rod_selects, mat_selects, elab_selects, chof_selects,
                    transp_selects, comp_selects);

            } else {

                mat_present = await getMaterialesPresentQuery(rod_selects, mat_selects, elab_selects, chof_selects,
                    transp_selects, comp_selects, yearsSelected);

            }

       
      
        if (mat_present) {

            setMaterialesPresent(mat_present);

        }

        setMaterialesSelected([]);
        setStatusMateriales(!statusMateriales);

    }

    const loadElaboradorPresentLevels = async (rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

            let ela_present = null;
            if (textStatusQuery != ORIGIN_QUERY.YEARS) {

                ela_present = await getElaboradorPresentQuery(rod_selects, mat_selects, elab_selects, chof_selects,
                    transp_selects, comp_selects);

            } else {

                ela_present = await getElaboradorPresentQuery(rod_selects, mat_selects, elab_selects, chof_selects,
                    transp_selects, comp_selects, yearsSelected);

            }

       

      
        if (ela_present) {

            setElaboradorPresent(ela_present);

        }

        setElaboradorSelected([]);
        setStatusElaborador(!statusElaborador);

    }

    const loadTransportistasPresentLevels = async (rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

            let transportista_data = null;

            if (textStatusQuery != ORIGIN_QUERY.YEARS) {

                transportista_data = await getTransportistasPresentQuery(rod_selects, mat_selects, elab_selects, chof_selects,
                    transp_selects, comp_selects);

            } else {

                transportista_data = await getTransportistasPresentQuery(rod_selects, mat_selects, elab_selects, chof_selects,
                    transp_selects, comp_selects,yearsSelected);

            }
        


        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setTransportistaSelected([]);
        setStatusTransportista(!statusTransportista);

    }

    const loadCompradorPresentLevels = async (rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

            let comprador_data = null;

            if (textStatusQuery != ORIGIN_QUERY.YEARS) {

                comprador_data = await getCompradorPresentQuery(rod_selects, mat_selects, elab_selects, chof_selects,
                    transp_selects, comp_selects);

            } else {

                comprador_data = await getCompradorPresentQuery(rod_selects, mat_selects, elab_selects, chof_selects,
                    transp_selects, comp_selects,yearsSelected);

            }


        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setCompradorSelected([]);
        setStatusComprador(!statusComprador);

    }

    const loadDataByLevels = (levels, lvl_current, chof_selects) => {

        console.log('Levles del Elaborador');

        //creo variables y si estanlas agrego
        let rodales_ = [];
        let elaborador_ = [];
        let materiales_ = [];
        let transportista_ = [];
        let comprador_ = [];

        let is_rod = false;
        let is_elab = false;
        let is_mat = false;
        let is_trans = false;
        let is_comp = false;

        Object.entries(levels).forEach(([key, value]) => {

            //consulto sila key es menor dejo los selected
            if (key < lvl_current) {

                if (value == ORIGIN_QUERY.RODALES) {
                    rodales_ = [...rodalesSelected];
                    is_rod = true;
                }

                if (value == ORIGIN_QUERY.ELABORADOR) {
                    elaborador_ = [...elaboradorSelected];
                    is_elab = true;
                }

                if (value == ORIGIN_QUERY.MATERIALES) {
                    materiales_ = [...materialesSelected];
                    is_mat = true;
                }

                if (value == ORIGIN_QUERY.TRANSPORTISTA) {
                    transportista_ = [...transportistaSelected];
                    is_trans = true;
                }

                if (value == ORIGIN_QUERY.COMPRADOR) {
                    comprador_ = [...compradorSelected];
                    is_comp = true;
                }

            }

        });


        loadYearsPresentLevels(rodales_, materiales_, elaborador_, chof_selects, transportista_, comprador_);
        loadMonthsPresentLevels(rodales_, materiales_, elaborador_, chof_selects, transportista_, comprador_);
        loadDaysPresentLevels(rodales_, materiales_, elaborador_, chof_selects, transportista_, comprador_);

        //recorro nuevamente los lvls y solo actualizo aquellos que no esten
        if (!is_rod) {
            loadRodalesPresentLevels(materiales_, elaborador_, chof_selects, transportista_, comprador_);
        }

        if (!is_mat) {
            //con los datos disponibles cargo
            loadMaterialesPresentLevels(rodales_, materiales_, elaborador_, chof_selects, transportista_, comprador_);
        }

        if(!is_elab){
            loadElaboradorPresentLevels(rodales_, materiales_, elaborador_, chof_selects, transportista_, comprador_);
        }

        if(!is_trans){
            loadTransportistasPresentLevels(rodales_, materiales_, elaborador_, chof_selects, transportista_, comprador_);
        }

        if(!is_comp){
            loadCompradorPresentLevels(rodales_, materiales_, elaborador_, chof_selects, transportista_, comprador_);
        }
       
        
    

    }

    const getChoferLevel = () => {

        let lvl = false;

        Object.entries(levels).forEach(([key, value]) => {

            if (value == ORIGIN_QUERY.CHOFER) {
                lvl = key;
            }


        });


        return lvl;

    }

    const _deleteItemFromLevels = (key_current) => {

        //si el esl ultimo, elimino todos los hijos tmb

        let new_obj = {};

        Object.entries(levels).forEach(([key, value]) => {

            //ejemplo
            /*
                SI estoy en la POSICION 3, tengo que dejar todas las keys menores
            */
            if (key < key_current) {
                new_obj[key] = value;
            }

        });

        setLevels(new_obj);

    }



    useEffect(() => {

        if (choferesSelected.length == 0) {
            setActive(false);
        }


    }, [active, choferesSelected])


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