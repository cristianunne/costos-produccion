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



const RMDTable = () => {

  const {
    pagesExtraccion, setPagesExtraccion,
    numberDataExtraccion, setNumberDataExtraccion,
    dataExtraccion, setDataExtraccion,
    isLoadingTableExtraccion, setIsLoadingTableExtraccion,
    currentPageExtraccion, setCurrentPageExtraccion,
    dataRDM, setDataRDM,
    isLoadingTableRDM, setIsLoadingTableRDM
} = useContext(CostosGlobalContext);

  const [items, setItems] = useState([]);



  const createItems = () => {

    let items_ = [];

    dataRDM.forEach((element, index) => {

      items_.push(<tr key={index}>
        <td className='fw-bold align-middle'>{index}</td>
      
        <td className='text-center align-middle'>{element.rodal}</td>
        <td className='text-center align-middle'>{element.comprador}</td>
        <td className='text-center align-middle'>{element.txtmaterial}</td>

        <td className='text-center align-middle'>{element.costoelab}</td>
        <td className='text-center align-middle'>{element.costoelab}</td>
        <td className='text-center align-middle'>{element.suma}</td>

    </tr>);

    });

    setItems(items_);


  }



  useEffect(() => {

    createItems();    

  }, [dataRDM])


  return (
    <Table striped bordered hover id='tabla-costos'>
      <thead className="top-0">
        <tr>
          <th className="dt-center text-center">#</th>
          <th className="dt-center text-center">Rodal</th>
          <th className="dt-center text-center">Comprador</th>
          <th className="dt-center text-center">Material</th>
          <th className="dt-center text-center">Costo de Elaboración</th>
          <th className="dt-center text-center">Costo de Transporte</th>
          <th className="dt-center text-center">Toneladas</th>
        </tr>
      </thead>

      <tbody>
        {items}

      </tbody>


    </Table>
  )
}

export default RMDTable