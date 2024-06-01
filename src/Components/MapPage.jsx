import '../Styles/MapPage.css'

import { useEffect, useRef, useState } from 'react';
// import Map from './Map';
import ResultItem from './ResultItem';
import FilterContainer from './FilterContainer';
import RedesignedFilterContainer from './RedesignedFilterContainer';
import { SelectedLocationContext } from './Contexts';
import MapElement from './Map';
import LeafletMap from './LeafletMap';
import LayersFAB from './LayersFAB';


export default function MapPage() {


    return (

            <div className="body-container mapPage row">
                <RedesignedFilterContainer />
                <MapElement />
            </div>

    )
}

