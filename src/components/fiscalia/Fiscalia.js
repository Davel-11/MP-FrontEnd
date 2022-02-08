import React, { useEffect, useState } from 'react'
import './Fiscalia.scss'
import { fetchFiscalias, postFiscalia, deleteFiscalia } from '../../services/mpApi'
import Table from './table/Table'
import Form from './form/Form'

const Fiscalia = () => {

    const [fiscalias, setFiscalias] = useState([])
    const [newFiscalia, setNewFiscalia] = useState(null)
    const [editFiscalia, setEditFiscalia] = useState(null)

    const getFiscalias = async () => {
        const fiscaliaList = await fetchFiscalias();
        fiscaliaList.json().then((resp) =>
            setFiscalias(resp)
        )
    }
    
    useEffect(() => {
        getFiscalias()
    }, [])

    const processNewFiscalia = async () => {
        const addedFiscalia = await postFiscalia(newFiscalia)
        addedFiscalia.json().then((resp) => {
            getFiscalias()
        })
    }

    useEffect(() => {
        if (newFiscalia?.ubicacion) {
            processNewFiscalia()
        }
    }, [newFiscalia])

    const processDeleteFiscalia = async (id) => {
        await deleteFiscalia(id)

        const index = fiscalias.findIndex((fiscalia) => fiscalia.id === id )
        if (index > -1 ) {
            fiscalias.splice(index, 1)
        }
        getFiscalias()
    }

    return <section className="fiscalia">
        <div className="in-fiscalia">
            <h1>Fiscalias</h1>
            <div className="fiscalia-content">
                <div className="in-table">
                    <Table fiscalias={fiscalias} setEditFiscalia={setEditFiscalia} processDeleteFiscalia={processDeleteFiscalia} />
                </div>
                <div className="table-content">
                    <Form setNewFiscalia={setNewFiscalia}  editFiscalia={editFiscalia} setEditFiscalia={setEditFiscalia} />
                </div>
            </div>
        </div>
    </section>
}

export default Fiscalia