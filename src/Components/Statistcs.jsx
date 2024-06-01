import '../Styles/Statistics.css'
import Graph from './Graph'
import Table from './Table'


export default function Statistics() {
    return (
        <div className="body-container statsPage col gp-16">
            <div className="name-ribbon col gp-8">
                <p className="headline-small">Grahams Road</p>
            </div>
            <div className="stats-wrapper row gp-16">
                <div className="graphs-container col">
                    <Graph />
                    <div className="test"></div>
                </div>
                <div className="table-container col gp-16">
                    <Table />
                </div>
            </div>
        </div>
    )
}
