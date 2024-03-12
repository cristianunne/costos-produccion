import React, { useContext, useEffect, useState } from 'react'
import { DataGlobalContext, PresentGlobalContext, StatusGlobalContext } from '../../../context/GlobalContext';
import ChoferesItem from './ChoferesItem';

const ChoferesBoxContainer = () => {

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

    const {
        statusRodales, setStatusRodales,
        statusEmpresas, setStatusEmpresas,
        statusMateriales, setStatusMateriales,
        statusElaborador, setStatusElaborador,
        statusChoferes, setStatusChoferes,
        statusTransportista, setStatusTransportista,
        statusComprador, setStatusComprador } = useContext(StatusGlobalContext);

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



    const [listItems, setListItems] = useState();
    const [listItemsDinamic, setListItemsDinamic] = useState();



    const createItems = (choferes_) => {

        let choferes = _ordenarData(choferes_);


        let items_ = [];



        if (choferesPresent.length > 0) {

            let ites_aux = [];

            choferesPresent.forEach(chof_pres => {


                Object.entries(choferes).forEach(([key, value]) => {

                    if (value.idchofer == chof_pres.idchofer) {

                        ites_aux.push(value);

                    }

                });

            });

            //ordeno ies_aux

            let items_aux_ord = _ordenarData(ites_aux);

            Object.entries(items_aux_ord).forEach(([key, value]) => {
                //tengo que crear los items aca
                let item = <ChoferesItem name_chofer={value.txtchofer} idchofer={value.idchofer}
                    chofer={value} key={key + value.idchofer} is_present={true}></ChoferesItem>
                items_.push(item);

            });


        } else {

            Object.entries(choferes).forEach(([key, value]) => {

                //tengo que crear los items aca
                let item = <ChoferesItem name_chofer={value.txtchofer} idchofer={value.idchofer}
                    chofer={value} key={key + value.idchofer} is_present={false}></ChoferesItem>
                items_.push(item);

            });

        }

        setListItems(null);

        setListItems(items_);
        setListItemsDinamic(items_);

    }

    const _ordenarData = (data_trans) => {

        data_trans.sort(function (a, b) {
            if (a.txtchofer > b.txtchofer) {
                return 1;
            }
            if (a.txtchofer < b.txtchofer) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        return data_trans;

    }


    useEffect(() => {



        if (choferesData != null && choferesData.length > 0) {
            createItems(choferesData);

        } else {
            setListItems(null);
            setListItemsDinamic(null);
        }

    }, [statusChoferes]);


    return (
        <>
            {listItems}

        </>
    )
}

export default ChoferesBoxContainer