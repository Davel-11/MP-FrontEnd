import React from 'react';
import './Side.scss';
import { NavLink } from 'react-router-dom';

const Side = () => {
    
    return (
    <section className="side">
        <div className="logo">
            <img alt="mp logo" src="https://www.mp.gob.gt/wp-content/uploads/2021/07/MP_logo.png"  />
        </div>
        <ul>
            <li><NavLink to="/">Inicio</NavLink></li>
            <li><NavLink to="/fiscalias">Fiscalias</NavLink></li>
            <li><NavLink to="/reportes">Reportes</NavLink></li>
        </ul>
    </section>
    )
}

export default  Side