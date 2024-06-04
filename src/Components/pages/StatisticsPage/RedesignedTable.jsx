import { useContext, useEffect, useState } from 'react'
import '../../../Styles/RedesignedTable.css'
import { SelectedDeterminand } from '../../contexts/Contexts'
import { AcceptableDeterminands } from '../../contexts/AcceptableDeterminandsContext'

function TableItem(props) {
    const currentItem = props.acceptableValues.find(item => item.name === props.item.name)
    return (
        <>
            <div className={`re-row row jc-sb ${props.item.selected ? 'selected' : ''}`} onClick={() => props.handleActiveTableItem(props.item.name)}>
                <div className="title-small determinand row">
                    {props.item.value.determinand_name}
                </div>
                <div className="title-small actual-value">{props.item.value.determinand_actual_value}</div>
                <div className="title-small acc-value">
                    {currentItem.value.determinand_max_value == 'nan' ?
                        currentItem.value.determinand_ideal_value
                        :
                        currentItem.value.determinand_ideal_value}
                </div>
                <div className="title-small unit">{props.item.value.determinand_units == 'nan' ? '-' : props.item.value.determinand_units}</div>
            </div>
        </>
    )
}

export default function RedesignedTable(props) {
    const [acceptableValues, setAcceptableValues] = useContext(AcceptableDeterminands)
    // const [tableItems, setTableItems] = useState([
    //     { id: 1, name: 'Sample Metric 1', actualValue: 65.2, idealValue: 78.5, unit: 'gm/l', selected: false },
    //     { id: 2, name: 'Sample Metric 2', actualValue: 98.5, idealValue: 45.5, selected: false },
    //     { id: 3, name: 'Sample Metric 3', actualValue: 889.3, idealValue: 100.5, selected: false },
    //     { id: 4, name: 'Sample Metric 4', actualValue: 65.2, idealValue: 78.5, selected: false },
    //     { id: 5, name: 'Sample Metric 5', actualValue: 98.5, idealValue: 45.5, selected: false },
    //     { id: 6, name: 'Sample Metric 6', actualValue: 889.3, idealValue: 100.5, selected: false },
    //     { id: 7, name: 'Sample Metric 7', actualValue: 65.2, idealValue: 78.5, selected: false },
    //     { id: 8, name: 'Sample Metric 8', actualValue: 98.5, idealValue: 45.5, selected: false },
    //     { id: 9, name: 'Sample Metric 9', actualValue: 889.3, idealValue: 100.5, selected: false }
    // ])
    const [selectedDeterminand, setSelectedDeterminand] = useContext(SelectedDeterminand)
    function handleActiveTableItem(name) {
        props.setWellData(props.wellData.map(item => {
            if (item.name == name) {
                item.selected = true;
                setSelectedDeterminand(item)
            } else {
                item.selected = false;
            }
            return item;
        }))
    }
    return (
        <div className="table-container col">
            <div className="re-rows-container col">
                <div className="re-table-header row">
                    <div className="title-small determinand row">Determinand</div>
                    <div className="title-small actual-value">Actual Value</div>
                    <div className="title-small acc-value">Acceptable Value</div>
                    <div className="title-small unit">Unit</div>
                </div>
                {
                    props.wellData.map(item => (
                        <TableItem key={item.id} item={item} handleActiveTableItem={handleActiveTableItem} acceptableValues={acceptableValues} />
                    ))
                    // Object.entries(props.wellData).map(([key, value]) => (
                    //     // console.log(key)
                    //     (key !== 'sample_id' && key !== 'date_recorded') && <TableItem key={key} itemKey={key} value={value} handleActiveTableItem={handleActiveTableItem} />
                    // ))
                }

            </div>
        </div>

        /*{ <div className="page-changer row jc-ctr gp-12">
            <div className="back-button nav row">
                <md-ripple></md-ripple>
                <span className="material-symbols-rounded">arrow_back</span>
            </div>
            <div className="page-number-container row al-ctr jc-ctr">
                <div className="current-page nav title-small row al-ctr jc-ctr">
                    <md-ripple></md-ripple>
                    1
                </div>
            </div>
            <div className="forward-button nav row">
                <md-ripple></md-ripple>
                <span className="material-symbols-rounded">arrow_forward</span>
            </div>
        </div> }*/

    )
}
