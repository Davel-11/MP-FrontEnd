import React, { useEffect, useState } from 'react'
import './Fiscalia.scss'
import { fetchFiscalias } from '../../services/mpApi'
import Table from './table/Table'

const Fiscalia = () => {

    const [fiscalias, setFiscalias] = useState([])

    const getFiscalias = async () => {
        const fiscaliaList = await fetchFiscalias();
        
        fiscaliaList.json().then((resp) =>
            setFiscalias(resp)
        )
    }
    
    useEffect(() => {
        getFiscalias()
    }, [])

    return <section className="fiscalia">
        <div className="in-fiscalia">
            <h1>Fiscalias</h1>
            <div className="fiscalia-content">
                <div className="in-table">
                    <Table fiscalias={fiscalias} />
                </div>
                <div className="table-content">registro</div>
            </div>
        </div>
    </section>
}

export default Fiscalia