import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { CostosGlobalContext } from '../../context/GlobalContext';

    /**
 * Number.prototype.format(n, x)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */
    Number.prototype.format = function (n, x) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    };

   

const TableExtraccion = () => {

    const {
        pagesExtraccion, setPagesExtraccion,
        numberDataExtraccion, setNumberDataExtraccion,
        dataExtraccion, setDataExtraccion,
        isLoadingTableExtraccion, setIsLoadingTableExtraccion,
        currentPageExtraccion, setCurrentPageExtraccion
      
    } = useContext(CostosGlobalContext);
    


    const [items, setItems] = useState([]);
    const number_paginas = 1000;
    

    const createItems = () => {
        let items_ = [];

        dataExtraccion.forEach((element, index) => {

            items_.push(<tr key={index}>
                <td className='fw-bold align-middle'>{currentPageExtraccion == 1 ? index + 1 :
                    index + ((currentPageExtraccion * number_paginas) - number_paginas) + 1}</td>
              
                <td className='text-center align-middle'>{element.idempresa}</td>
                <td className='text-center align-middle'>{element.txtelaborador}</td>
                <td className='text-center align-middle'>{element.lote}</td>
                <td className='text-center align-middle'>{element.comprador}</td>
                <td className='text-center align-middle'>{element.txttransporte}</td>
                <td className='text-center align-middle'>{element.month}</td>

                <td className='text-center align-middle nowrap'>{element.day + '-' + element.month + '-' + element.year}</td>

                <td className='text-center align-middle'>{element.remito}</td>
                <td className='text-start align-middle'>{element.txtmaterial}</td>
                <td className='text-center align-middle'>{element.rodal}</td>

                <td className='text-center align-middle'>{element.costoelab}</td>
                <td className='text-center align-middle'>{element.costotrans}</td>

                <td className='text-end align-middle'>{element.cantidad}</td>
            </tr>);

        });

        setItems(items_);

    }


    useEffect(() => {


    }, [dataExtraccion])

    return (
        <Table striped bordered hover id='tabla-costos'>
            <thead className="top-0">
                <tr>
                    <th className="dt-center text-center">#</th>
                    <th className="dt-center text-center">Empresa</th>
                    <th className="dt-center text-center">Elaborador</th>
                    <th className="dt-center text-center">Lote</th>
                    <th className="dt-center text-center">Comprador</th>

                    <th className="dt-center text-center">Transportista</th>
                    <th className="dt-center text-center">Mes</th>
                    <th className="dt-center text-center">Fecha</th>

                    <th className="dt-center text-center">Remito</th>
                    <th className="dt-center text-center">Material</th>
                    <th className="dt-center text-center">Rodal</th>
                    <th className="dt-center text-center">Costo de Elaboración</th>

                    <th className="dt-center text-center">Costo de Transporte</th>
                    <th className="dt-center text-center">Toneladas</th>
                </tr>
            </thead>

            <tbody>
                {dataExtraccion.length > 0 ? dataExtraccion.map((element, index) => {
                    return (
                    <tr key={index}>
                <td className='fw-bold align-middle'>{currentPageExtraccion == 1 ? index + 1 :
                    index + ((currentPageExtraccion * number_paginas) - number_paginas) + 1}</td>
              
                <td className='text-center align-middle'>{element.idempresa}</td>
                <td className='text-center align-middle'>{element.txtelaborador}</td>
                <td className='text-center align-middle'>{element.lote}</td>
                <td className='text-center align-middle'>{element.comprador}</td>
                <td className='text-center align-middle'>{element.txttransporte}</td>
                <td className='text-center align-middle'>{element.month}</td>

                <td className='text-center align-middle nowrap'>{element.day + '-' + element.month + '-' + element.year}</td>

                <td className='text-center align-middle'>{element.remito}</td>
                <td className='text-start align-middle'>{element.txtmaterial}</td>
                <td className='text-center align-middle'>{element.rodal}</td>

                <td className='text-center align-middle'>{element.costoelab}</td>
                <td className='text-center align-middle'>{element.costotrans}</td>

                <td className='text-end align-middle'>{element.cantidad}</td>
            </tr>)


                }) : null}

            </tbody>


        </Table>
    )
}

export default TableExtraccion