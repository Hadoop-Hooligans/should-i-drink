import { useState } from 'react';
// import '../../Styles/LayersFAB.css'
import '/src/Styles/LayersFAB.css';

export default function LayersFAB(props) {
    const [isFabOpen, setIsFabOpen] = useState(false);
    return (
        <div className={`fab-container gp-12 large row al-ctr jc-ctr ${isFabOpen ? 'open' : ''}`}
            onClick={() => {
                // setIsFabOpen(!isFabOpen)
                props.setIsLayersVisible(!props.isLayersVisible)
            }}>
            <md-ripple></md-ripple>
            <span className="material-symbols-rounded layers-icon">layers</span>
        </div>
    )
}
