import React, { useState } from 'react'
import MaterialesIcon from '../../../icons/MaterialesIcon'

const MaterialesItem = ({ material, is_present, idmaterial, is_active }) => {

    const [active, setActive] = useState(false);
    

    return (
        <>
        {is_present ? <a className="list-group-item list-group-item-action item-layer is_present" aria-current="true"
         onClick={null} style={!active ? null : styles.active}>
            <MaterialesIcon></MaterialesIcon>
            {material}
        </a> :
            <a className="list-group-item list-group-item-action item-layer" aria-current="true"
                onClick={null} style={!active ? null : styles.active}>
                <MaterialesIcon></MaterialesIcon>
                {material}
            </a>
        }
    </>
    )
}

export default MaterialesItem


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