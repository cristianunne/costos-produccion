import React, { useContext, useState } from 'react'

import * as XLSX from 'xlsx'
import { CostosGlobalContext, SelectedGlobalContext } from '../../context/GlobalContext';
import { getExtraccionDataFunction } from '../../utility/Procesamiento';

const ButtonExtraccionExcelExport = () => {

    const {
        rodalesSelected, setRodalesSelected,
        empresasSelected, setEmpresasSelected,
        materialesSelected, setMaterialesSelected,
        elaboradorSelected, setElaboradorSelected,
        choferesSelected, setChoferesSelected,
        transportistaSelected, setTransportistaSelected,
        compradorSelected, setCompradorSelected,
        yearsSelected, setYearsSelected,
        monthsSelected, setMonthsSelected,
        daysSelected, setDaysSelected
    } = useContext(SelectedGlobalContext);

    const {
        pagesExtraccion, setPagesExtraccion,
        numberDataExtraccion, setNumberDataExtraccion,
        dataExtraccion, setDataExtraccion,
        isLoadingTableExtraccion, setIsLoadingTableExtraccion,
        currentPageExtraccion, setCurrentPageExtraccion
    } = useContext(CostosGlobalContext);
    

    const [loading, setLoading] = useState(false);


    const downloadAsExcel = async () => {

     
        //controlo que haya al manoe uno seleccionado
        if(empresasSelected.length == 0 && rodalesSelected.length == 0 && materialesSelected.length == 0 
            && elaboradorSelected.length == 0 && choferesSelected.length == 0 && transportistaSelected.length == 0 
            && compradorSelected.length == 0 && yearsSelected.length == 0 && monthsSelected.length == 0 && 
            daysSelected.length == 0){

                alert('No se puede procesar');

        } else {

            setLoading(true);

            const data_extraxcion = await getExtraccionDataFunction(empresasSelected, rodalesSelected, materialesSelected, 
                elaboradorSelected, choferesSelected, transportistaSelected, compradorSelected, 
                yearsSelected, monthsSelected, daysSelected, currentPageExtraccion);
    
    
            if(data_extraxcion){
                  //console.log(data_);
            //console.log(data_json.data_json);
    
                const libro = XLSX.utils.book_new();
                const sheet = XLSX.utils.json_to_sheet(data_extraxcion);
                XLSX.utils.book_append_sheet(libro, sheet, 'datos');
    
                setTimeout(() => {
    
                    XLSX.writeFile(libro, 'data_extraccion.xlsx');
    
                    setLoading(false);
                }, 1000);
    
            } else {
    
                setLoading(false);
            }

        }



       


    }

    const rearmJson = (json_data) => {

 

    }
    return (
        <> {!loading ?

            <button className='btn btn-lime' onClick={downloadAsExcel}>

                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                    <path d="M8 11h8v7h-8z" />
                    <path d="M8 15h8" />
                    <path d="M11 11v7" />
                </svg>
                Descargar</button>

            :

            <button className='btn btn-lime'>

                <div className="spinner-grow text-white me-2" role="status"></div>
                Descargando...</button>



        }
        </>
    )
}

export default ButtonExtraccionExcelExport