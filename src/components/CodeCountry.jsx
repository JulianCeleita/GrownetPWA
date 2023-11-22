import React, { useState, useEffect } from "react";
export default function CodeCountry() {
    const [code, setCode] = useState([]);

        useEffect (() => {
            fetch ("https://api.grownetapp.com/grownet/api/countries/all")
            .then ((response) => response.json ())
            .then (( {countries}) => setCode(countries));
        }, [ ]);
    return(
        <div>
            <ul>
            {code.map (countries => <p >{countries.name}</p>)}
            </ul>
            </div>
    );
}