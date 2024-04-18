import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { CostosGlobalContext } from '../../context/GlobalContext';
import RMDTable from './RMDTable';
import ButtonExcelExport from '../ExcelExport/ButtonExcelExport';

const RMDContainer = () => {

    const {
        pagesExtraccion, setPagesExtraccion,
        numberDataExtraccion, setNumberDataExtraccion,
        dataExtraccion, setDataExtraccion,
        isLoadingTableExtraccion, setIsLoadingTableExtraccion,
        currentPageExtraccion, setCurrentPageExtraccion,
        dataRDM, setDataRDM,
        isLoadingTableRDM, setIsLoadingTableRDM
    } = useContext(CostosGlobalContext);







    useEffect(() => {



    }, [numberDataExtraccion]);


    return (
        <Card className='card-costos-container mb-5'>
            <Card.Header>



                <div className='d-flex flex-row flex-fill justify-content-between'>

                    <h3 className='text-blue'>Tabla Resumen de Extracción (Rodal-Destino-Material)</h3>

                    <ButtonExcelExport data_json={dataRDM} name_file={'datosRDM.xlsx'} name_sheet={'datos RDM'}></ButtonExcelExport>

                </div>

            </Card.Header>
            <Card.Body className='card-body-costos-container'>

                <RMDTable></RMDTable>
            </Card.Body>
            <Card.Footer className="text-muted d-flex justify-content-between" id='card-footer-costos'>

                <div className='d-flex align-items-center'>Mostrando {10} de {0} registros</div>


            </Card.Footer>
        </Card>
    )
}

export default RMDContainer