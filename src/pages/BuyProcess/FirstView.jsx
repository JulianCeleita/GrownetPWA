import React from 'react';
import css from "../../css/firtsView.css";
import img_basket from '../../img/img_basket.png';
import {Icon} from '@iconify/react';
import { Link } from 'react-router-dom';

export default function FirtsView() {
    return(
        <section className='main' >
            <img src={img_basket} alt='Imagenes'/>
            <h1>You don't have restaurants</h1>
            <p>Add your restaurants to continue</p>
            <Link className="bttn btn-primary" to='addRestaurants' id='bttn-restaurant'>
                <Icon className="icon-plus" icon="simple-line-icons:plus" />Add restaurant
            </Link>
        </section> 
    );
}