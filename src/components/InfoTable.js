import React from 'react'

function Infotable({SNo,country,newCases,active,recovered,deaths}) {
    return (
        <tr>
            <td>{SNo}</td>
            <td>{country}</td>
            <td id="newcases">+{newCases}</td>
            <td id="recovered">{recovered}</td>
            <td>{active}</td>
            <td>{deaths}</td>
            
        </tr>
    )
}

export default Infotable