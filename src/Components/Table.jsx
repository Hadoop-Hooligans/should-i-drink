import { useState } from 'react'
// import '../Styles/Table.css'
function TableEntry({ item, handleActiveTableItem }) {
    return (
        <tr className={`table-item ${item.selected ? 'selected' : ''}`} onClick={()=>handleActiveTableItem(item.id)} >
            <td>{item.name}</td>
            <td>{item.actualValue}</td>
            <td>{item.idealValue}</td>
        </ tr>
    )
}

export default function Table() {
    const [tableItems, setTableItems] = useState([
        { id: 1, name: 'Sample Metric 1', actualValue: 65.2, idealValue: 78.5, selected: true },
        { id: 2, name: 'Sample Metric 2', actualValue: 98.5, idealValue: 45.5, selected: false },
        { id: 3, name: 'Sample Metric 3', actualValue: 889.3, idealValue: 100.5, selected: false },
    ])

    function handleActiveTableItem(id) {
        setTableItems(tableItems.map(item => {
            if (item.id === id) {
                item.selected = true;
            } else {
                item.selected = false;
            }
            return item;
        }))
    }
    return (
        <table>
            <caption>
                <span className='row gp-8 al-ctr'>
                    <span className="material-symbols-rounded">info</span>
                    <span className='body-medium'>The information has been sourced from Qwality Water Source rather than being collected firsthand.</span>
                </span>
            </caption>
            <tr className='title-small table-header' style={{ color: 'var(--picton-blue-950)' }}>
                <th className="row al-ctr gp-8">
                    {/* <span className="material-symbols-rounded">home</span> */}
                    Metric
                </th>
                <th>Actual Value</th>
                <th>Ideal Value</th>
            </tr>
            {
                tableItems.map(item => (
                    <TableEntry key={item.id} item={item} handleActiveTableItem = {handleActiveTableItem}/>
                ))
            }
        </table>

    )
}
