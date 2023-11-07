import React from 'react';
import "../../css/settingsRestaurants.css";
import {Icon} from '@iconify/react';
import MenuPrimary from "../../components/Menu/MenuPrimary";
import { Link } from 'react-router-dom';

export default function SettingsRestaurants() {
    return(
        <section className='setting-restaurants'>
            <span></span>
            <h1>Your restaurants</h1>
            <div className='name-restaurant'>
                <button className='bttn btn-secundary'><Icon icon="ep:arrow-left-bold" /></button>
                <img src='https://placehold.co/300'/>
                <button className='bttn btn-secundary'><Icon icon="ep:arrow-right-bold" /></button>
            </div>
            <h2>Name restaurant</h2>
            <div className='users'>
                <img src='https://placehold.co/100'/>
                <div>
                    <h4>Paula Andrea</h4>
                    <p>Admin test</p>
                </div>
            </div>
            <div className='users'>
                <img src='https://placehold.co/100'/>
                <div>
                    <h4>Paula Andrea</h4>
                    <p>Admin test</p>
                </div>
            </div>
            <Link to='/editRestaurants' className='bttn btn-primary'>Edit Restaurant</Link>
            <div className='space-menu'></div>
            <MenuPrimary/>
        </section> 
    );
}