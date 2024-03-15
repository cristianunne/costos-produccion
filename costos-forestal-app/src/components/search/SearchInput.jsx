import React, { useState } from 'react'
import '../../styles/search/search.css'


const SearchInput = ({onChangeBuscar, text_place}) => {

    const [value, setValue] = useState()

    return (

        <div id="search-rodal-container" className='bg-dark mt-3'>
            <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">

                <div className="input-icon">
                    <span className="input-icon-addon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon"
                            width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                            stroke="currentColor" fill="none" strokeLinecap="round"
                            strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none">
                            </path><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                            <path d="M21 21l-6 -6"></path></svg>
                    </span>
                    <input type="text" id="input-buscar-rodal" onKeyUp={onChangeBuscar} className="form-control"
                        placeholder={text_place} aria-label="Buscar Rodal" />
                </div>

            </div>
        </div>
    )
}

export default SearchInput