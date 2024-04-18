import React, { useState } from 'react'

import * as XLSX from 'xlsx'

const ButtonExcelExport = ({data_json, name_file, name_sheet}) => {





    const [loading, setLoading] = useState(false);


    const downloadAsExcel = () => {

        if (data_json != undefined && data_json != null) {

            setLoading(true);

            //console.log(data_);
            //console.log(data_json.data_json);

            const libro = XLSX.utils.book_new();
            const sheet = XLSX.utils.json_to_sheet(data_json);
            XLSX.utils.book_append_sheet(libro, sheet, name_sheet);

            setTimeout(() => {

                XLSX.writeFile(libro, name_file);

                setLoading(false);
            }, 1000);

        } else {
            alert('No habia datos');
        }


    }

    const rearmJson = (json_data) => {

        json_data.forEach(data => {

        })

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

export default ButtonExcelExport