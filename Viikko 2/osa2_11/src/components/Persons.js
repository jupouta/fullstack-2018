import React from 'react';

const Persons = (props) => {
    return (
        <table>
            <tbody>
                {props.persons.map(person => <tr key={person.id}><td>{person.name}</td>
                <td>{person.number}</td></tr>)}
            </tbody>
        </table>
    )    
}

export default Persons 