import React, { useState, useEffect } from 'react'
import './Form.scss'
import InputData from '../Input/InputData';

const Form = ({setNewFiscalia, editFiscalia, setEditFiscalia}) => {

    const [id, setId] = useState(null)
    const [address, setAddress] = useState('')
    const [telefono, setTelefono] = useState('')
    
    const procesForm = (e) => {
        if (e) e.preventDefault()

        const mpObject = {
            id: id,
            ubicacion: address,
            telefono: telefono,
        }

        setNewFiscalia(mpObject)
        clearForm()
    }

    useEffect(() => {
        if (editFiscalia?.id && editFiscalia?.ubicacion) {
            setId(editFiscalia?.id)
            setAddress(editFiscalia?.ubicacion)
            setTelefono(editFiscalia?.telefono)
        }
    }, [editFiscalia])

    const clearForm = () => {
        setId('')
        setAddress('')
        setTelefono('')
        setEditFiscalia(null)
    }

    return <form className="form" onSubmit={(e) => procesForm(e)} >
        <h2>Registros</h2>
        <InputData
            description="Id"
            type="text"
            changed={setId}
            value={id}
            hasError={false} 
            checkFocus={false} 
            placeholder="Id" 
            disabled={true}
        />

        <InputData
            description="Direccion*"
            type="text"
            changed={setAddress}
            value={address}
            hasError={false} 
            checkFocus={false} 
            placeholder="Ingresar Direccion"
            disabled={false}
        />

        <InputData
            description="Telefono"
            type="text"
            changed={setTelefono}
            value={telefono}
            hasError={false} 
            checkFocus={false} 
            placeholder="Ingresar Telefono" 
            disabled={false}
        />

        <div className="botones">
            <button type="submit" >Enviar</button>
            <button type="button" onClick={() => clearForm()} >Limpiar Formulario</button>
        </div>
    </form>
}

export default Form