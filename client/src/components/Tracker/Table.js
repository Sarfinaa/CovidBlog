import React from 'react';
import './Table.css';
import numeral from 'numeral';
function Table({countries,darkMode}) {
    return (
        <div className={`${darkMode?'table2':'table1'}`}>
            <table>
                <thead>
                <tr>
                    <th>Country</th>
                    <th>Cases</th>
                </tr>
                </thead>
                <tbody>
            {
                countries.map(({country,cases})=>(
<tr key={country}>
    <td><strong>{country}</strong></td>
    <td>{numeral(cases).format("0,0")}</td>
</tr>
                ))}
                </tbody>
                </table>
        </div>
    )
}

export default Table
 