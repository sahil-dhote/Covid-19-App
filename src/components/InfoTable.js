import React from 'react'

function Infotable({country,newCases,active,recovered,deaths}) {
    return (
        <tr>
            <td>{country}</td>
            <td>{newCases}</td>
            <td>{active}</td>
            <td>{recovered}</td>
            <td>{deaths}</td>
            
        </tr>
    )
}

export default Infotable