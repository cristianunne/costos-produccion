import React, { useContext, useEffect, useState } from 'react'
import EmpresasIcon from '../../../icons/EmpresasIcon';
import { DataGlobalContext, SelectedGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';

const EmpresasItem = ({name_empresa, idempresa, idEmpresa, setIdEmpresa}) => {

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
        compradorDinamicData, setCompradorDinamicData
        } = useContext(DataGlobalContext);

    //traigo los reloads de los estados globales

    const { 
        statusRodales, setStatusRodales,
        statusEmpresas, setStatusEmpresas,
        statusMateriales, setStatusMateriales,
        statusElaborador, setStatusElaborador,
        statusChoferes, setStatusChoferes,
        statusTransportista, setStatusTransportista,
        statusComprador, setStatusComprador } = useContext(StatusGlobalContext);


    const {
        rodalesSelected, setRodalesSelected,
        empresasSelected, setEmpresasSelected,
        materialesSelected, setMaterialesSelected,
        elaboradorSelected, setElaboradorSelected,
        choferesSelected, setChoferesSelected,
        transportistaSelected, setTransportistaSelected,
        compradorSelected, setCompradorSelected,
    } = useContext(SelectedGlobalContext);

    const [active, setActive] = useState(false);
    

    const onClickHandler = () => {


        if(!active){

           

            //uno de los cambios es filtrar los rodales de esta empresa
            //utilizo dataRodalesDinamic PAra ello
            insertEmpresaToSelected();

            console.log(empresasSelected);
    
            filterRodales();

            setActive(!active);
    

        } else {

           
            deleteEmpresaSelected();
            
            console.log(empresasSelected);

            setActive(!active);
        }


      

    }

    const insertEmpresaToSelected = () => {

        if(empresasSelected.length == 0){
            //si es 0 solo agrego
            empresasSelected.push(idempresa);

        } else if (empresasSelected.length > 0){

            //compruebo que la empresa no este incluido
            let exist = false;
            empresasSelected.forEach(emp => {

                if(emp == idempresa){
                    exist = true;
                }

            });

            if(!exist){
                empresasSelected.push(idempresa);
            }
        }

    }

    const deleteEmpresaSelected = () => {

        let items_ = [];


        empresasSelected.forEach(emp => {

            if(emp != idempresa){

                items_.push(emp);

            }

        });

        setEmpresasSelected(items_);

        quitFilterRodales();

        //tengo que actualizar tmblo rodales

        setStatusRodales(!statusRodales);

    }


    const filterRodales = () => {

        let items_  = [];

        rodalesDinamicData.forEach(rodal => {

            if (rodal.empresa == idempresa){
                items_.push(rodal);
              
            }
        });

        if(empresasSelected.length <= 1){

            setRodalesData(items_);

        } else {
            let rodales_ = [...rodalesData, ...items_];
            setRodalesData(rodales_);
        }


        setStatusRodales(!statusRodales);

    }

    const quitFilterRodales = () => {

        //empresas selected tiene un elemento menos, la utilizo para cargar

        if(empresasSelected.length == 1){

            //si es 0 restauro todos los rodales
            setRodalesData(rodalesDinamicData);

        } else {

            let items_ = [];
            //recorro las empresas selected y luego cargo los rodales
            rodalesData.forEach(rod => {

                if(rod.empresa != idempresa){
                    items_.push(rod);
                }


            });

            setRodalesData(items_);

        }


    }

    
    useEffect(() => {

        if(idEmpresa != null){
            if(idEmpresa.toString() != idempresa.toString()){
                setActive(false);
            } else {
                setActive(true);
            }
        }
       
    
    }, [active])


    return (
        <a className="list-group-item list-group-item-action item-layer" aria-current="true"
        style={active ? styles.active : styles.no_active}
        attr="XOP-5632" rodal_id="1" onClick={onClickHandler}>
        <EmpresasIcon></EmpresasIcon>
        
        {name_empresa}
    </a>
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