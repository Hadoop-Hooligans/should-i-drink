import { useState } from 'react'
import '../../../Styles/DashboardCards.css'

export function MetricCard(props) {
    const [isCardOpen, setIsCardOpen] = useState(false)
    return (
        <div className={`metrics box col gp-16 jc-str `} >
            <div className="box-content-wrapper col gp-12">
                <div className="box-header col gp-12 flx-wrp">
                    <div className="box-title row gp-12">
                        <span className="material-symbols-rounded metric-count-icon">rule_settings</span>
                        <p className="title-large dash-card-heading">Metrics Covered</p>
                    </div>
                    <div className="box-content col al-end jc-end">
                        <p className="headline-largest mt-count">{props.metrics}</p>
                    </div>
                </div>
                <div className="overflow-content col">
                </div>
            </div>
        </div>
    )
}

export function QualityCard() {
    const [isCardOpen, setIsCardOpen] = useState(false)
    return (
        <div className={`metrics box col gp-16 jc-str `} >
            <div className="box-content-wrapper col gp-12">
                <div className="box-header col gp-12 flx-wrp">
                    <div className="box-title row gp-12">
                        <span className="material-symbols-rounded metric-count-icon">water_bottle_large</span>
                        <p className="title-large dash-card-heading">Drinking Score</p>
                    </div>
                    <div className="box-content col al-end jc-end">
                        <p className="headline-largest mt-count">4.2/5</p>
                    </div>
                </div>
                <div className="overflow-content col">
                </div>
            </div>
        </div>
    )
}
export function AestheticCard({ item }) {
    const [isCardOpen, setIsCardOpen] = useState(false)
    return (
        <div className={`metrics box col gp-16 jc-str `} >
            <div className="box-content-wrapper col gp-12">
                <div className="box-header col gp-12 flx-wrp">
                    <div className="box-title row gp-12">
                        <span className="material-symbols-rounded metric-count-icon">total_dissolved_solids</span>
                        <p className="title-large dash-card-heading">Aesthetic Score</p>
                    </div>
                    <div className="box-content col al-end jc-end">
                        <p className="headline-largest mt-count">25+</p>
                    </div>
                </div>
                <div className="overflow-content col">
                </div>
            </div>
        </div>
    )
}
