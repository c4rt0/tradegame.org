import React from 'react'

export default function TableHeader(props) {
    return (
        <tr> 
            {props.colNames.map((colName,index)=>(
               
                <th key={index+1} className={`px-4 py-5 text-xs whitespace-nowrap ${props.border} ${props.borderColor} ${props.font}`} >{colName}</th>
                
            ))}
         
        </tr>
    )
}
