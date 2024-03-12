import React, { useEffect, useState } from 'react'
import CompradorIcon from '../../../icons/CompradorIcon';

const CompradoresItem = ({ name_comprador, id_comprador, is_present, comprador }) => {


    const [active, setActive] = useState(false);


    useEffect(() => {

    }, []);


    return (

        <>
            {is_present ? <a className="list-group-item list-group-item-action item-layer is_present" aria-current="true"
                comprador_id={name_comprador}
                onClick={null} style={!active ? null : styles.active}>
                <CompradorIcon></CompradorIcon>
                {name_comprador}
            </a> :
                <a className="list-group-item list-group-item-action item-layer" aria-current="true"
                comprador_id={name_comprador}
                    onClick={null} style={!active ? null : styles.active}>
                    <CompradorIcon></CompradorIcon>
                    {name_comprador}
                </a>
            }
        </>

    )
}

export default CompradoresItem

const styles = {
    active: {
        backgroundColor: '#206bc4',
        color: '#FFFFFF'
    },
    no_active: {
        backgroundColor: '#182433',
        color: '#ffffff',
    }
};