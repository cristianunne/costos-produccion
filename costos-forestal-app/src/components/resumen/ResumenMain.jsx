import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { CostosGlobalContext } from '../../context/GlobalContext';

const ResumenMain = () => {

    //usare los context para la info

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

    const {
        pagesExtraccion, setPagesExtraccion,
        numberDataExtraccion, setNumberDataExtraccion,
        dataExtraccion, setDataExtraccion,
        isLoadingTableExtraccion, setIsLoadingTableExtraccion,
        currentPageExtraccion, setCurrentPageExtraccion,
        dataRDM, setDataRDM,
        isLoadingTableRDM, setIsLoadingTableRDM,
        costoElab, setCostoElab,
        costoTrans, setCostoTrans,
        toneladas, setToneladas
    } = useContext(CostosGlobalContext);


    const [cElab, setCElab] = useState(0);
    const [cTrans, setTrans] = useState(0);
    const [ton, setTon] = useState(0);


    useEffect(() => {

        let elab = costoElab != null ? parseFloat(costoElab) : 0;
        let tran = costoTrans != null ? parseFloat(costoTrans) : 0;
        let tone = toneladas != null ? parseFloat(toneladas) : 0;

        setCElab(elab.format(2));
        setTrans(tran.format(2))
        setTon(tone.format(2))

    })


    return (
        <Card className='card-costos-container mb-5'>
            <Card.Header><h4 className='mb-0 text-blue'>Resumen General de Costos</h4></Card.Header>
            <Card.Body className='card-body-costos-container'>

                <Table striped borderless hover>
                    <thead>
                        <tr>
                            <th>Detalle</th>
                            <th className="text-center">$</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="progressbg">

                                    <div className="progressbg-text fw-bold">Costo de Elaboración ($)</div>
                                </div>
                            </td>
                            <td className="w-1 text-end">{cElab}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="progressbg">

                                    <div className="progressbg-text fw-bold">Costo de Transporte ($)</div>
                                </div>
                            </td>
                            <td className="w-1 text-end">{cTrans}</td>
                        </tr>

                        <tr>
                            <td>
                                <div className="progressbg">

                                    <div className="progressbg-text fw-bold">Toneladas (t)</div>
                                </div>
                            </td>
                            <td className="w-1 text-end">{ton}</td>
                        </tr>

                    </tbody>
                </Table>

            </Card.Body>

        </Card>
    )
}

export default ResumenMain