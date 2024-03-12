import React, { useState } from 'react'
import ChoferIcon from '../../../icons/ChoferIcon'

const ChoferesItem = ({ name_chofer, idchofer, is_present, chofer }) => {

    const [active, setActive] = useState(false);
    
    
    return (

        <>
            {is_present ? <a className="list-group-item list-group-item-action item-layer is_present" aria-current="true"
                chofer_id={idchofer}
                onClick={null} style={!active ? null : styles.active}>
                <ChoferIcon></ChoferIcon>
                {name_chofer}
            </a> :
                <a className="list-group-item list-group-item-action item-layer" aria-current="true"
                    chofer_id={idchofer}
                    onClick={null} style={!active ? null : styles.active}>
                    <ChoferIcon></ChoferIcon>
                    {name_chofer}
                </a>
            }
        </>
    )
}

export default ChoferesItem

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