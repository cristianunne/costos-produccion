import React, { useEffect, useState } from 'react'
import ElaboradorIcon from '../../../icons/ElaboradorIcon'

const ElaboradorItem = ({ name_elaborador, idelaborador, is_present, elaborador }) => {
    
    const [active, setActive] = useState(false);
    

    useEffect(() => {

    }, [])
    
    
    return (

        <>
        {is_present ? <a className="list-group-item list-group-item-action item-layer is_present" aria-current="true" 
          elaborador_id={idelaborador}
         onClick={null} style={!active ? null : styles.active}>
              <ElaboradorIcon></ElaboradorIcon>
            {name_elaborador}
        </a> :
            <a className="list-group-item list-group-item-action item-layer" aria-current="true"
                onClick={null} style={!active ? null : styles.active}>
                <ElaboradorIcon></ElaboradorIcon>
                {name_elaborador}
            </a>
        }
    </>
    
    )
}

export default ElaboradorItem

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