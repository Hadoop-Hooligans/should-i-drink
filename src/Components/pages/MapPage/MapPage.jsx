import '/src/Styles/MapPage.css'

import { useEffect, useRef, useState } from 'react';
// import Map from './Map';
import ResultItem from '../../ResultItem';
import RedesignedFilterContainer from '/src/Components/pages/MapPage/RedesignedFilterContainer.jsx';
import { SelectedLocationContext } from '/src/Components/contexts/Contexts.js';
import MapElement from '/src/Components/pages/MapPage/Map.jsx';
import LayersFAB from '/src/Components/atoms/LayersFAB.jsx';


export default function MapPage() {


    return (

        <div className="body-container mapPage row">
            <RedesignedFilterContainer />
            <MapElement />
        </div>

    )
}

