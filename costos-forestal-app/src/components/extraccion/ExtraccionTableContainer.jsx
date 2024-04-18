import React, { useContext, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import TableExtraccion from './TableExtraccion';
import PaginatorExtraccion from '../paginator/PaginatorExtraccion';
import { CostosGlobalContext } from '../../context/GlobalContext';
import TableCostosPlaceholder from '../placeholders/costos/TableCostosPlaceholder';
import ButtonExcelExport from '../ExcelExport/ButtonExcelExport';
import ButtonExtraccionExcelExport from '../ExcelExport/ButtonExtraccionExcelExport';

const ExtraccionTableContainer = () => {

    const {
        pagesExtraccion, setPagesExtraccion,
        numberDataExtraccion, setNumberDataExtraccion,
        dataExtraccion, setDataExtraccion,
        isLoadingTableExtraccion, setIsLoadingTableExtraccion,
        currentPageExtraccion, setCurrentPageExtraccion
    } = useContext(CostosGlobalContext);





    useEffect(() => {



    }, [numberDataExtraccion, currentPageExtraccion]);


    return (
        <> {!isLoadingTableExtraccion ? <TableCostosPlaceholder></TableCostosPlaceholder> :

            <Card className='card-costos-container mb-5'>
                <Card.Header>
                    <div className='d-flex flex-row flex-fill justify-content-between'>

                        <h3 className='text-blue mb-0' style={{'alignSelf': 'center'}}>Tabla General de Extracción</h3>

                        <ButtonExtraccionExcelExport></ButtonExtraccionExcelExport>

                    </div>


                </Card.Header>
                <Card.Body className='card-body-costos-container'>

                    <TableExtraccion></TableExtraccion>

                </Card.Body>
                <Card.Footer className="text-muted d-flex justify-content-between" id='card-footer-costos'>

                    <div className='d-flex align-items-center'>Mostrando {10} de {0} registros</div>

                    <PaginatorExtraccion></PaginatorExtraccion>

                </Card.Footer>
            </Card>
        }
        </>
    )
}

export default ExtraccionTableContainer