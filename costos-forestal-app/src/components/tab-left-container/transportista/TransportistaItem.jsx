import React, { useEffect, useState } from 'react'
import TransportistaIcons from '../../../icons/TransportistaIcons';

const TransportistaItem = ({ name_transportista, idtransportista, is_present, transportista }) => {

    const [active, setActive] = useState(false);
    

    useEffect(() => {

    }, []);


    return (

        <>
            {is_present ? <a className="list-group-item list-group-item-action item-layer is_present" aria-current="true"
                transportista_id={idtransportista}
                onClick={null} style={!active ? null : styles.active}>
                <TransportistaIcons></TransportistaIcons>
                {' ' +  name_transportista}
            </a> :
                <a className="list-group-item list-group-item-action item-layer" aria-current="true"
                    transportista_id={idtransportista}
                    onClick={null} style={!active ? null : styles.active}>
                    <TransportistaIcons></TransportistaIcons>
                    {' ' +  name_transportista}
                </a>
            }
        </>

    )
}

export default TransportistaItem


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