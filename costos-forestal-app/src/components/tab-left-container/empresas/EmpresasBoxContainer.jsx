import React, { useContext, useEffect, useState } from 'react'
import EmpresasItem from './EmpresasItem';
import { StatusGlobalContext } from '../../../context/GlobalContext';

const EmpresasBoxContainer = ({ empresas }) => {

    const { statusEmpresas, setStatusEmpresas,
        statusMateriales, setStatusMateriales,
        statusElaborador, setStatusElaborador,
        statusChoferes, setStatusChoferes,
        statusTransportista, setStatusTransportista,
        statusComprador, setStatusComprador } = useContext(StatusGlobalContext);


    const [listItems, setListItems] = useState();
    const [listItemsDinamic, setListItemsDinamic] = useState();
    const [idEmpresa, setIdEmpresa] = useState();


    const createItemsTabsEmpresas = (empresas) => {

        let items_ = [];
        Object.entries(empresas).forEach(([key, value]) => {

            //tengo que crear los items aca
            let item = <EmpresasItem name_empresa={value.nombre}
                idempresa={value.idempresa}
                key={value.idempresa}
                idEmpresa={idEmpresa}
                setIdEmpresa={setIdEmpresa}
            />
            items_.push(item);

        });

        setListItems(items_);
        setListItemsDinamic(items_);
        //setReloadEmpresa(reloadEmpresa ? false : true);

    }

    useEffect(() => {
        if (empresas != null) {
            createItemsTabsEmpresas(empresas);

        }


    }, [statusEmpresas])

    return (
        <>
            {listItems}
        </>
    )
}

export default EmpresasBoxContainer