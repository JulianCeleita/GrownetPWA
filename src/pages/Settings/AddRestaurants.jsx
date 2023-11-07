import React from 'react';
import {Form }from 'react-bootstrap';
import '../../css/addRestaurants.css'; 
import background_icons from '../../img/background_icons.png';
import MenuPrimary from "../../components/Menu/MenuPrimary";

export default function AddRestaurants() {
    return(
        <section className='add-restaurants' style={{backgroundImage: `url(${background_icons})` }}>
            <div className='form-restaurants'>
            <h1>Add your restaurant</h1>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Restaurant</Form.Label>
                <Form.Control type="text" placeholder="Enter your restaurant name" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter your restaurant address" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label id='hola'>Number phone</Form.Label>
                <Form.Control type="number" placeholder="Enter your mobile number" required />
            </Form.Group>
            <div className='submit-button'>
                <button className='bttn btn-primary' id='submit-button' type="submit">
                Submit
            </button>
            </div>
           
            </Form> 
            </div>
            <MenuPrimary/>
        </section> 
    );
}