import { useContext, useEffect, useState } from 'react'
import '/src/Styles/RedesignedStatistics.css'
import Graph from '/src/Components/pages/StatisticsPage/Graph.jsx'
import RedesignedTable from '/src/Components/pages/StatisticsPage/RedesignedTable.jsx'
// import Table from './Table'
import { AestheticCard, MetricCard, QualityCard } from '/src/Components/pages/StatisticsPage/DashboardCards.jsx'
import { useLocation, useParams } from 'react-router-dom'
import { SelectedLocationContext } from '/src/Components/contexts/Contexts.js'
import LoadingMetrics from '../../LoadingMetrics'
import { list } from 'postcss'

export default function RedesignedStatistics() {
    const [wellData, setWellData] = useState([])
    const [selectedLocation, setSelectedLocation] = useContext(SelectedLocationContext)
    const well_code = useLocation().state.well_code
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetch(`http://54.206.117.183:8888/chchWater/${(well_code).replace('/', '_')}`,
            {
                method: 'GET',
                mode: 'cors',
                signal: signal
            }
        ).then(response => response.json())
            .then(data => {
                const tempData = data[0]
                const listOfWells = []
                Object.entries(tempData).forEach(([key, value]) => {
                    if (key !== 'sample_id' && key !== 'date_recorded' && key !== 'well_id') {
                        listOfWells.push({ name: key, value: value, selected: false })
                    }
                })
                setWellData(listOfWells)
            })
            .catch(error => console.log(error));

        return () => {
            // Cancel the fetch request when the component unmounts
            controller.abort();
        };
    }, [well_code])
    return (
        <div className="body-container statsPage col gp-16">
            <div className="name-ribbon col">
                {/* <p className="title-small">Current selected location</p> */}
                {/* <p className="headline-small">Determinands Statistics</p> */}
            </div>
            <div className="re-stats-container">
                <div className="left re-table col">
                    <RedesignedTable wellData={wellData} setWellData={setWellData} />
                </div>
                <div className="right col">
                    {/* <LoadingMetrics /> */}
                    <div className="re-stats row flx-wrp">
                        <MetricCard metrics={(wellData).length} />
                        <QualityCard />
                        <AestheticCard />
                    </div>
                    <div className="re-graph">
                        {/* <LoadingMetrics /> */}
                        <Graph />
                    </div>
                </div>
            </div>
        </div>
    )
}
