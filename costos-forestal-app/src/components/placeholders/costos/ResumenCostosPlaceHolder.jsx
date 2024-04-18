import React from 'react'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const ResumenCostosPlaceHolder = () => {
    return (
        <Card className='card-costos-container mb-5 placeholder-glow bg-blue-lt text-dark'>
                    <Card.Header className='placeholder'><h4 className='mb-0 text-blue'>Resumen General de Gastos por Movimientos de Materiales</h4></Card.Header>
                    <Card.Body className='card-body-costos-container placeholder'>

                    <Table striped>
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
                                
                                    <div className="progressbg-text fw-bold">Imputado ($)</div>
                                    </div>
                                </td>
                                <td className="w-1 text-end">xxxxxxxxx</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="progressbg">
                                
                                    <div className="progressbg-text fw-bold">Unidades</div>
                                    </div>
                                </td>
                                <td className="w-1 text-end">xxxxxxx</td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="progressbg">
                                
                                    <div className="progressbg-text fw-bold">Valor de Unidad ($)</div>
                                    </div>
                                </td>
                                <td className="w-1 text-end">xxxxxxxxxx</td>
                            </tr>
                        
                        </tbody>
                      </Table>
                        
                    </Card.Body>
                   
                </Card>
    )
}

export default ResumenCostosPlaceHolder