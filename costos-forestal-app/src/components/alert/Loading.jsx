

import React, { useContext, useEffect, useState } from 'react'

import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import App from '../../App';

import '../../styles/loading/loading.css'
import { StatusGlobalContext } from '../../context/GlobalContext';



Modal.setAppElement(document.getElementById('container'));


const Loading = () => {

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
        levels, setLevels,
        isLoading, setIsLoading
    } = useContext(StatusGlobalContext);
    



    const [modalIsOpen, setIsOpen] = useState(true);
  
   

    useEffect(() => {

        console.log('oadingdgsdgsdgsdg');
    }, [isLoading])

    return (
        
        <Modal
          isOpen={isLoading}
          className="Modal"
          overlayClassName="Overlay"
          contentLabel="Loading"
          ariaHideApp={false}
          shouldFocusAfterRender={false}
          shouldReturnFocusAfterClose={false}
          shouldCloseOnOverlayClick={false}
          
        >
            <div className='spinner-container'>
                <div className="spinner-grow text-dark me-2" role="status"></div>
                <div className="spinner-grow text-dark me-2" role="status"></div>
                <div className="spinner-grow text-dark me-2" role="status"></div>
                <div className="spinner-grow text-dark me-2" role="status"></div>
                <div className="spinner-grow text-dark me-2" role="status"></div>
            </div>
        
         
        </Modal>

    )
}

export default Loading

