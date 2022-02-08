import React from 'react'
import './Table.scss'

const Table = (fiscalias) => {
    const data = null
    console.log('fiscalias', fiscalias.fiscalias)

    return <div className="table">
        <div className="buscar">Buscar</div>
        <ul className="listado">
            {fiscalias?.fiscalias?.map((fiscalia) => (
                <li>{fiscalia.id + ` - ` + fiscalia.ubicacion}</li>)) 
            }
        </ul>
    </div>
}

export default Table