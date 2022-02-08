import React, { useEffect } from 'react'
import './Table.scss'

const Table = ({fiscalias, setEditFiscalia, processDeleteFiscalia}) => {
    
    return <div className="table">
        <h2 className="buscar">Buscar</h2>
        <ul className="listado">
            {fiscalias?.map((fiscalia) => (
                <li >
                    <div onClick={() => setEditFiscalia(fiscalia)}>{fiscalia.id + ` - ` + fiscalia.ubicacion}</div> 
                    <span onClick={() => processDeleteFiscalia(fiscalia.id)} >Eliminar</span>
                </li>)) 
            }
        </ul>
    </div>
}

export default Table