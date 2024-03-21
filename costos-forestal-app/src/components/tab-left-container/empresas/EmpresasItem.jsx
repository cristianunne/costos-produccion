import React, { useContext, useEffect, useState } from 'react'
import EmpresasIcon from '../../../icons/EmpresasIcon';
import { DataGlobalContext, PresentGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import { getChoferesPresentQuery, getMaterialesPresentQuery, getMonthsPresentQuery, 
    getRodalesPresentQuery, getTransportistasPresentQuery, getYearsPresentQuery } from '../../../utility/Procesamiento';
import { ORIGIN_QUERY } from '../../../utility/OriginQuery';

const EmpresasItem = ({ name_empresa, idempresa, idEmpresa, setIdEmpresa, is_present }) => {

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

    const [active, setActive] = useState(false);


    const onClickHandler = () => {


        if (!active) {

            setActive(!active);

            //uno de los cambios es filtrar los rodales de esta empresa
            //utilizo dataRodalesDinamic PAra ello
            let empresas_sel = insertEmpresaToSelected();

            if (statusQuery) {

                //tengo que limpiar todos los datos cada vez que toco una nueva empresa
                //restauro todos como en el inicio
                if(textStatusQuery == ORIGIN_QUERY.EMPRESAS){

                    setRodalesSelected([]);
                    setYearsSelected([]);
                    setMonthsSelected([]);
                    setDaysSelected([]);
                    setMaterialesSelected([])
                    setElaboradorSelected([]);
                    setChoferesSelected([]);
                    setTransportistaSelected([]);
                    setCompradorSelected([]);
    
                    loadYearsPresent(empresas_sel);
                    loadMonthsPresent(empresas_sel);
    
                    loadRodalesPresent(empresas_sel);
                    loadMaterialesPresent(empresas_sel);
                    loadElaboradorPresent(empresas_sel);
                    loadChoferesPresent(empresas_sel);
                    loadTransportistasPresent(empresas_sel);
                    loadCompradorPresent(empresas_sel);

                } else {

                     //cargo el lvl
                     if (!isEmpresaInLevels()) {


                        //traigo el level
                        let keys = Object.keys(levels);
                        let length = keys.length + 1;
                        let obj = { ...levels };
                        obj[length] = ORIGIN_QUERY.EMPRESAS;
                        setLevels(obj);

                        //como no estaba se agrego y actualizo 
                        //tengo que averiguar en que lvl estoy para actualizar los de abajo
                        //en este caso ya tengo el lvl gracias al lenght
                        //loadDataByLevels(obj, length, mat_selects);


                    } else {
                        //consulto el lvl en el que staba seleccionado y actualizo los de abajo
                        //loadDataByLevels(levels, getMaterialLevels(), mat_selects);


                    }

                }


            } else {

                setStatusQuery(true);
                setTextStatusQuery(ORIGIN_QUERY.EMPRESAS);

                setLevels({ 1: ORIGIN_QUERY.EMPRESAS });

                loadYearsPresent(empresas_sel);
                loadMonthsPresent(empresas_sel);

                loadRodalesPresent(empresas_sel);
                loadMaterialesPresent(empresas_sel);
                loadElaboradorPresent(empresas_sel);
                loadChoferesPresent(empresas_sel);
                loadTransportistasPresent(empresas_sel);
                loadCompradorPresent(empresas_sel);

            }



            //filterRodales();




        } else {

            if (statusQuery) {

                if (textStatusQuery == ORIGIN_QUERY.EMPRESAS) {


                    let empresas_sel = deleteEmpresaSelected();
                    setActive(!active);

                    if (empresas_sel.length == 0) {

                        alert('Restauro todd');

                        //quito el query
                        setStatusQuery(false);
                        setTextStatusQuery(null);

                        //restauro todo como al inicio

                        //restauro todos como en el inicio
                        setRodalesData(rodalesDinamicData);
                        setRodalesPresent([]);
                        setRodalesSelected([]);
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
                        setTransportistaSelected([]);
                        setTransportistaPresent([]);
                        setStatusTransportista(!statusTransportista);


                        setCompradorData(compradorDinamicData);
                        setCompradorPresent([]);
                        setCompradorSelected([]);
                        setStatusComprador(!statusComprador);

                    } else {

                        //quedaba una empresa seleccionada, entonces gaho el query con ella
                        alert('QUedaba 1 empresa');
                        setRodalesSelected([]);
                        setYearsSelected([]);
                        setMonthsSelected([]);
                        setDaysSelected([]);
                        setMaterialesSelected([])
                        setElaboradorSelected([]);
                        setChoferesSelected([]);
                        setTransportistaSelected([]);
                        setCompradorSelected([]);

                        loadYearsPresent(empresas_sel);
                        loadMonthsPresent(empresas_sel);

                        loadRodalesPresent(empresas_sel);
                        loadMaterialesPresent(empresas_sel);
                        loadElaboradorPresent(empresas_sel);
                        loadChoferesPresent(empresas_sel);
                        loadTransportistasPresent(empresas_sel);
                        loadCompradorPresent(empresas_sel);


                    }

                } else {
                    //mensaje de errror,
                    alert('No se puede utilizar la empresa en un Nivel');
                }

            }



        }

    }

    const insertEmpresaToSelected = () => {

        let emp_items = [];

        if (empresasSelected.length == 0) {
            //si es 0 solo agrego
            emp_items.push(idempresa);

        } else if (empresasSelected.length > 0) {

            //compruebo que la empresa no este incluido
            let exist = false;
            empresasSelected.forEach(emp => {

                if (emp == idempresa) {
                    exist = true;
                }

            });

            if (!exist) {
                emp_items.push(idempresa);
            }
        }

        let items_ = [...empresasSelected, ...emp_items]

        setEmpresasSelected(items_);

        return items_;

    }

    const deleteEmpresaSelected = () => {

        let items_ = [];


        empresasSelected.forEach(emp => {

            if (emp != idempresa) {

                items_.push(emp);

            }

        });

        setEmpresasSelected(items_);

        return items_;

        //quitFilterRodales();

        //tengo que actualizar tmblo rodales

        //setStatusRodales(!statusRodales);

    }


    const isEmpresaInLevels = () => {

        let is_present = false;

        Object.entries(levels).forEach(([key, value]) => {

            if (value == ORIGIN_QUERY.EMPRESAS) {
                is_present = true;
            }


        });

    
        return is_present;

    }

    const getEmpresaLevels = () => {

        let lvl = false;

        Object.entries(levels).forEach(([key, value]) => {

            if (value == ORIGIN_QUERY.EMPRESAS) {
                lvl = key;
            }


        });


        return lvl;

    }




    const loadYearsPresent = async (empresas_sel, is_reset) => {

        let years_pres = await getYearsPresentQuery(empresas_sel);



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

    const loadMonthsPresent = async (empresas_sel, is_reset) => {


        let months_data = await getMonthsPresentQuery(empresas_sel);




        if (months_data) {

            setMonthsPresent(months_data);

        }

        setStatusMonths(!statusMonths);


    }


    const loadRodalesPresent = async (empresas_sel, is_reset) => {


        let rod_present = await getRodalesPresentQuery(empresas_sel, [], [], [], [],
            [], [], []);


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


    const loadMaterialesPresent = async (empresas_sel, is_reset) => {

        let mat_present = await getMaterialesPresentQuery(empresas_sel, [], [], [], [],
            [], [], []);



        if (mat_present) {

            setMaterialesPresent(mat_present);

        }

        setStatusMateriales(!statusMateriales);

    }

    const loadElaboradorPresent = async (empresas_sel, is_reset) => {

        let ela_present = await getElaboradorPresentQuery(empresas_sel, [], [], [], [],
            [], [], []);



        if (ela_present) {

            setElaboradorPresent(ela_present);

        }
        setStatusElaborador(!statusElaborador);

    }

    const loadChoferesPresent = async (empresas_sel, is_reset) => {

        let choferes_data = await getChoferesPresentQuery(empresas_sel, [], [], [], [],
            [], [], []);



        if (choferes_data) {
            setChoferesPresent(choferes_data);

        }

        setStatusChoferes(!statusChoferes);
    }

    const loadTransportistasPresent = async (empresas_sel, is_reset) => {

        let transportista_data = await getTransportistasPresentQuery(empresas_sel, [], [], [], [],
            [], [], []);



        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setStatusTransportista(!statusTransportista);

    }

    const loadCompradorPresent = async (empresas_sel, is_reset) => {

        let comprador_data = await getCompradorPresentQuery(empresas_sel, [], [], [], [],
            [], [], []);


        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setStatusComprador(!statusComprador);

    }

    const loadRodalesPresentLevels = async (empresas_sel, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

        let rod_present = null;
        //tengo que consultar por elyears
        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            rod_present = await getRodalesPresentQuery(empresas_sel, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects);

        } else {

            rod_present = await getRodalesPresentQuery(empresas_sel, mat_selects, elab_selects, chof_selects,
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
            setStatusRodales(!statusRodales);

        }

        //setStatusMateriales(!statusMateriales);

    }

    const loadMaterialesPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

        let mat_present = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            mat_present = await getMaterialesPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects);

        } else {

            mat_present = await getMaterialesPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects, yearsSelected);

        }


        if (mat_present) {

            setMaterialesPresent(mat_present);

        }

        setMaterialesSelected([]);
        setStatusMateriales(!statusMateriales);

    }

    const loadElaboradorPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

        let ela_present = null;
        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            ela_present = await getElaboradorPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects);
    

        } else {

            ela_present = await getElaboradorPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects, yearsSelected);
    

        }



        if (ela_present) {

            setElaboradorPresent(ela_present);

        }
        setElaboradorSelected([]);
        setStatusElaborador(!statusElaborador);

    }

    const loadChoferesPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

        
        let choferes_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {
            choferes_data = await getChoferesPresentQuery(empresas_sel, rod_selects, mat_selects,
                elab_selects, chof_selects, transp_selects,
                comp_selects);

        } else {

            choferes_data = await getChoferesPresentQuery(empresas_sel, rod_selects, mat_selects,
                elab_selects, chof_selects, transp_selects,
                comp_selects, yearsSelected);

        }

      


        if (choferes_data) {
            setChoferesPresent(choferes_data);
            setChoferesSelected([]);

        }

        setChoferesSelected([]);
        setStatusChoferes(!statusChoferes);
    }

    const loadTransportistasPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

        
        let transportista_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            transportista_data = await getTransportistasPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects);

        } else {

            transportista_data = await getTransportistasPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects, yearsSelected);

        }

       


        if (transportista_data) {
            setTransportistaPresent(transportista_data);

        }

        setTransportistaSelected([]);
        setStatusTransportista(!statusTransportista);

    }


    const loadCompradorPresentLevels = async (empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
        transp_selects, comp_selects) => {

        
        
        let comprador_data = null;

        if (textStatusQuery != ORIGIN_QUERY.YEARS) {

            comprador_data = await getCompradorPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects);

        } else {

            comprador_data = await getCompradorPresentQuery(empresas_sel, rod_selects, mat_selects, elab_selects, chof_selects,
                transp_selects, comp_selects, yearsSelected);

        }
      
        if (comprador_data) {

            setCompradorPresent(comprador_data)

        }

        setCompradorSelected([]);

        setStatusComprador(!statusComprador);

    }


    const loadDataByLevels = (levels, lvl_current, empresas_sel) => {

        console.log('Levles del material');

        //creo variables y si estanlas agrego
        let rodales_ = [];
        let materiales_ = [];
        let choferes_ = [];
        let elaborador_ = [];
        let transportista_ = [];
        let comprador_ = [];

        let is_rod = false;
        let is_mat = false;
        let is_chof = false;
        let is_elab = false;
        let is_trans = false;
        let is_comp = false;

        Object.entries(levels).forEach(([key, value]) => {

            //consulto sila key es menor dejo los selected
            if (key < lvl_current) {

                if (value == ORIGIN_QUERY.RODALES) {
                    rodales_ = [...rodalesSelected];
                    is_rod = true;
                }

                if (value == ORIGIN_QUERY.MATERIALES) {
                    materiales_ = [...materialesSelected];
                    is_mat = true;
                }

                if (value == ORIGIN_QUERY.CHOFER) {
                    choferes_ = [...choferesSelected];
                    is_chof = true;
                }

                if (value == ORIGIN_QUERY.ELABORADOR) {
                    elaborador_ = [...elaboradorSelected];
                    is_elab = true;
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

       
        /*loadYearsPresentLevels(rodales_, mat_selects, elaborador_, choferes_, transportista_, comprador_);
        loadMonthsPresentLevels(rodales_, mat_selects, elaborador_, choferes_, transportista_, comprador_);
        loadDaysPresentLevels(rodales_, mat_selects, elaborador_, choferes_, transportista_, comprador_);*/
      
        if (!is_rod) {
            loadRodalesPresentLevels(empresas_sel, materiales_, elaborador_, choferes_, transportista_, comprador_);
        }

        if (!is_mat) {
            loadMaterialesPresentLevels(empresas_sel, materiales_, elaborador_, choferes_, transportista_, comprador_);
        }

        if (!is_elab) {
            //con los datos disponibles cargo
            loadElaboradorPresentLevels(empresas_sel, rodales_, materiales_, elaborador_, choferes_, transportista_, comprador_);
        }

        if (!is_chof) {
            loadChoferesPresentLevels(empresas_sel, rodales_, materiales_, elaborador_, choferes_, transportista_, comprador_);
        }

        if (!is_trans) {
            loadTransportistasPresentLevels(empresas_sel, rodales_, materiales_, elaborador_, choferes_, transportista_, comprador_);
        }

        if (!is_comp) {
            loadCompradorPresentLevels(empresas_sel, rodales_, materiales_, elaborador_, choferes_, transportista_, comprador_);
        }


        //con los datos disponibles cargo



    }








    const filterRodales = () => {

        let items_ = [];

        rodalesDinamicData.forEach(rodal => {

            if (rodal.empresa == idempresa) {
                items_.push(rodal);

            }
        });

        if (empresasSelected.length <= 1) {

            setRodalesData(items_);

        } else {
            let rodales_ = [...rodalesData, ...items_];
            setRodalesData(rodales_);
        }


        setStatusRodales(!statusRodales);

    }

    const quitFilterRodales = () => {

        //empresas selected tiene un elemento menos, la utilizo para cargar

        if (empresasSelected.length == 1) {

            //si es 0 restauro todos los rodales
            setRodalesData(rodalesDinamicData);

        } else {

            let items_ = [];
            //recorro las empresas selected y luego cargo los rodales
            rodalesData.forEach(rod => {

                if (rod.empresa != idempresa) {
                    items_.push(rod);
                }


            });

            setRodalesData(items_);

        }


    }


    useEffect(() => {

        if (empresasSelected.length == 0) {

            setActive(false);

        }


    }, [active, statusMateriales])


    return (

        <>
            {is_present ? <a className="list-group-item list-group-item-action item-layer is_present" aria-current="true"
                onClick={onClickHandler} style={!active ? null : styles.active}>
                 <EmpresasIcon></EmpresasIcon>
                {name_empresa}
            </a> :
                <a className="list-group-item list-group-item-action item-layer" aria-current="true"
                    onClick={onClickHandler} style={!active ? null : styles.active}>
                    <EmpresasIcon></EmpresasIcon>
                    {name_empresa}
                </a>
            }
        </>


    )
}

export default EmpresasItem

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