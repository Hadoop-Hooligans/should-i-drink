import { useContext, useEffect, useState } from 'react';
import '../../../Styles/Graph.css'
import { Area, AreaChart, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useLocation } from 'react-router-dom';
import { SelectedDeterminand } from '../../contexts/Contexts';
import { AcceptableDeterminands } from '../../contexts/AcceptableDeterminandsContext';

// import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'

function TimeItem({ item, handleTimeSelection, setGraphTime }) {
    return (
        <div className={`time-item row body-large ${item.selected ? 'selected' : ''}`} onClick={() => {
            handleTimeSelection(item.id)
            setGraphTime(item.value)
        }}>
            {/* <md-ripple></md-ripple> */}
            {item.time}
        </div>
    )
}
function ChipTime({ item, handleTimeChipSelection }) {
    return (
        <div className={`chip-time col al-ctr jc-ctr ${item.selected ? 'selected' : ''}`} onClick={() => handleTimeChipSelection(item.id)}>
            <md-ripple></md-ripple>
            {item.time}
        </div>
    )
}

export default function Graph() {
    const [selectedDeterminand, setSelectedDeterminand] = useContext(SelectedDeterminand)
    const [graphTime, setGraphTime] = useState(4)
    const [graphData, setGraphData] = useState([])
    const [acceptableValues, setAcceptableValues] = useContext(AcceptableDeterminands)
    const well_code = useLocation().state.well_code
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetch(`http://54.206.117.183:8888/chchWater/${(well_code).replace('/', '_')}/${graphTime}`,
            {
                method: 'GET',
                mode: 'cors',
                signal: signal
            }
        ).then(response => response.json())
            .then(data => {
                const listOfGraphData = []
                data.map(item => {
                    listOfGraphData.push(
                        {
                            name: new Date(item.date_recorded).getFullYear(),
                            actualValue: item[selectedDeterminand.name].determinand_actual_value,
                            acceptedValue: acceptableValues.find(acc => acc.name === selectedDeterminand.name).value.determinand_max_value
                                ?
                                acceptableValues.find(acc => acc.name === selectedDeterminand.name).value.determinand_max_value
                                :
                                ''
                        })
                })
                setGraphData(listOfGraphData.reverse())
            })
            .catch(error => console.log(error));

        return () => {
            // Cancel the fetch request when the component unmounts
            controller.abort();
        };
    }, [well_code, graphTime, selectedDeterminand])



    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400,
            "acceptedValue": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210,
            "acceptedValue": 2400
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290,
            "acceptedValue": 2400
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000,
            "acceptedValue": 2400
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181,
            "acceptedValue": 2400
        },

    ]
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip col">
                    <p className="label body-large">{`${label}`}</p>
                    <p className="intro body-large">{`$${payload[0].value}`}</p>
                    {/* <p className="intro"></p> */}
                </div>
            );
        }
        return null;
    };
    const dataFormatter = (number) =>
        `$${Intl.NumberFormat('us').format(number).toString()}`;

    const [timeChips, setTimeChips] = useState([
        { id: 1, time: '4 Samples', value: 4, selected: true },
        { id: 2, time: '7 Samples', value: 7, selected: false },
    ])
    function handleTimeSelection(id) {
        const updatedChips = timeChips.map(chip => {
            if (chip.id === id) {
                chip.selected = true;
            } else {
                chip.selected = false;
            }
            return chip;
        });
        setTimeChips(updatedChips);
    }
    return (
        <div className="graph col gp-16">
            <div className="metric-header row title-large jc-sb flx-wrp gp-12">
                <div className="variables-compare-container row gp-16 flx-wrp">
                    <div className="multi-var col">
                        <div className="graph-title-container row jc-sb al-ctr">
                            <span className='headline-small mt-name'>{selectedDeterminand ? selectedDeterminand.value.determinand_name : ''}</span>
                        </div>
                        <div className="graph-values col gp-4">
                            <div className="wrapper col">
                                <p className="title-small time">Today</p>
                                <p className="headline-medium cr-value">{selectedDeterminand ? selectedDeterminand.value.determinand_actual_value : ''}</p>
                            </div>
                            {/* <div className="change row al-ctr gp-8">
                                <span className="material-symbols-rounded change-icon">arrow_upward</span>
                                <p className="title-medium change-value">10.264%</p>
                            </div> */}
                        </div>
                    </div>
                    {/* <div className="vert-divider"></div> */}
                    {/* <div className="multi-var empty col al-ctr jc-ctr">
                        <span className="material-symbols-rounded">add</span>
                        <p className="title-small">Add Variable</p>
                    </div> */}
                </div>

                <div className="time-switcher-wrapper row">
                    {
                        timeChips.map(chip => (
                            <TimeItem key={chip.id} item={chip} handleTimeSelection={handleTimeSelection} setGraphTime={setGraphTime} />
                        ))
                    }
                </div>
            </div>
            {/* <div className="graph-header row jc-str gp-12 flx-wrp ">
                <div className="time-items-container row">
                    {
                        timeChips.map(time => (
                            <TimeItem key={time.id} item={time} handleTimeSelection={handleTimeSelection} />
                        ))
                    }
                </div>
            </div> */}
            <div className="graph-container">
                <ResponsiveContainer width="100%" minWidth={300} maxHeight="100%">
                    <ComposedChart data={graphData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#069bf1" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="#069bf1" stopOpacity={0} />
                            </linearGradient>
                            {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient> */}
                        </defs>
                        <XAxis dataKey="name"
                            fontFamily='Manrope'
                            axisLine={false}
                        />
                        <YAxis />
                        <CartesianGrid strokeDasharray="5 5" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="bottom" height={2} />
                        <Line type="" dataKey="acceptedValue" stroke={"var(--color-error)"} strokeWidth={3} points={[]} />
                        <Area type="" dataKey="actualValue" stroke="#0062a7" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
                        {/* <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
