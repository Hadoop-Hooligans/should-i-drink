import mapboxgl from 'mapbox-gl';
import { useContext, useEffect, useRef, useState } from 'react';
import { Layer, Map, Marker, Popup, ScaleControl, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { ClosestWellContext, SelectedLocationContext } from './Contexts';
import LayersFAB from './LayersFAB';
import ClickAwayListener from 'react-click-away-listener';


// export default function MapElement() {
//     const mapContainer = useRef(null);
//     var map = new Microsoft.Maps.Map(mapContainer.current)

//     return (
//         <div className="map-wrappera" ref={mapContainer}></div>
//     )
// }

function CustomMarker({ item }) {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false)
    const closePopup = () => {
        setIsTooltipVisible(false)
    }
    return (
        <>
            <Marker longitude={item.longitude} latitude={item.latitude}
            >
                <img src="/public/assets/location_pin.svg"
                    onClick={() => setIsTooltipVisible(true)}
                />

                {/* <div className={`user-loc ${isTooltipVisible ? 'visible' : ''}`}
                onMouseEnter={() => setIsTooltipVisible(true)}
                onMouseLeave={() => setIsTooltipVisible(false)}
            >
                <img src="src\assets\location_pin.svg" />
                <div className="custom-popup"
                    onMouseLeave={() => setIsTooltipVisible(false)}
                >
                    <p className="body-large col">
                        <p style={{ fontWeight: 700 }}>{item.LAWASiteID}</p>
                        <p>{item.actualAddress}</p>
                    </p>
                </div>
            </div> */}
            </Marker>
            {
                isTooltipVisible && (
                    <Popup
                        className='custom-popup'
                        longitude={item.longitude}
                        latitude={item.latitude}
                        anchor='bottom'
                        maxWidth='200px'
                        closeOnClick={false}
                        closeButton={false}
                        onClose={() => setIsTooltipVisible(false)}
                    >
                        <ClickAwayListener onClickAway={closePopup}>
                            <div className="col gp-4">
                                <p style={{ fontWeight: 700 }}>{item.well_id}</p>
                                <p className="body-medium success">{item.well_status}</p>
                                <p>{item.primary_use}</p>
                                <p>{item.actualAddress}</p>
                            </div>
                        </ClickAwayListener>
                    </Popup>
                )
            }
        </>
    )
}

const SelectedLocationMarker = ({ selectedLocation }) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false)
    const closePopup = () => {
        setIsTooltipVisible(false)
    }
    return (
        <>

            <Marker
                longitude={selectedLocation.longitude}
                latitude={selectedLocation.latitude}
            >
                <img src="/public/assets/user_location.svg"
                    onClick={() => setIsTooltipVisible(true)}
                />
                {/* <div className={`user-loc ${isTooltipVisible ? 'visible' : ''}`}
                    onMouseEnter={() => setIsTooltipVisible(true)}
                    onMouseLeave={() => setIsTooltipVisible(false)}
                >
                    <img src="src\assets\user_location.svg"



                    />
                    <div className="custom-popup"
                        onMouseLeave={() => setIsTooltipVisible(false)}
                    >
                        <p className="body-large">
                            You are here
                        </p>
                    </div>
                </div> */}
            </Marker>
            {
                isTooltipVisible && (
                    <Popup
                        className='custom-popup'
                        longitude={selectedLocation.longitude}
                        latitude={selectedLocation.latitude}
                        anchor='bottom'
                        maxWidth='200px'
                        closeOnClick={false}
                        closeButton={false}
                        onClose={() => setIsTooltipVisible(false)}
                    >
                        <ClickAwayListener onClickAway={closePopup}>
                            <div className="col gp-4">
                                <p style={{ fontWeight: 700 }}>You are here</p>
                            </div>
                        </ClickAwayListener>
                    </Popup>
                )
            }

        </>

    )
}
export default function MapElement() {
    const [selectedLocation, setSelectedLocation] = useContext(SelectedLocationContext)
    const [isSelectedLocation, setIsSelectedLocation] = useState(false)
    const bounds = [
        [172.5156, -43.7725], // Southwest coordinates (longitude, latitude)
        [172.8259, -43.4503] // Northeast coordinates (longitude, latitude)
    ];
    const [closestWells, setClosestWells] = useContext(ClosestWellContext)
    useEffect(() => {
        selectedLocation.latitude && selectedLocation.longitude && setIsSelectedLocation(true)
    }, [selectedLocation])
    const [showPopup, setShowPopup] = useState(true)
    const [isHovered, setIsHovered] = useState({
        hovered: false,
        x: 0,
        y: 0
    })
    let _onClick = (obj) => {
        if (obj.features.length !== 0) {
            setIsHovered({
                hovered: true,
                x: obj.point.x,
                y: obj.point.y
            })
        }
    }
    const [isLayersVisible, setIsLayersVisible] = useState(false);
    return (
        <div className="map-container">
            <Map
                mapboxAccessToken='pk.eyJ1IjoibnJhc3RvZ2kiLCJhIjoiY2xweHRkbHU4MGRnZTJpc3Vkd2g5Znp2ZSJ9.DXCXHf-XnGSGVhvjz0mpNg'
                initialViewState={{
                    longitude: -142,
                    latitude: 32,
                    zoom: 5.01
                }}
                interactiveLayerIds={['wide_chch_circle']}
                onClick={_onClick}
                onMouseEnter={_onClick}
                onMouseLeave={() => setIsHovered({ hovered: false })}
                maxBounds={bounds}
                attributionControl={false}
                mapStyle="mapbox://styles/nrastogi/clw1ewogz01z501rj5ntd0ppb"
            >
                {/* {
                    isSelectedLocation &&
                    <Marker
                        longitude={selectedLocation.longitude}
                        latitude={selectedLocation.latitude}
                        onClick={() => setShowPopup(true)}
                    >
                    </Marker>
                }
                {
                    showPopup && (
                        <Popup longitude={selectedLocation.longitude} latitude={selectedLocation.latitude}
                            anchor="bottom"
                            onClose={() => setShowPopup(false)}
                            closeOnClick={false}
                        >
                            You are here
                        </Popup>)
                } */}
                {

                }
                {
                    isLayersVisible &&
                    (
                        <Source
                            id='wide_chch'
                            type='vector'
                            url='mapbox://nrastogi.84tj5q3h'
                        >
                            <Layer
                                id='wide_chch_circle'
                                source-layer='wide_chch-1hgcee'
                                source={'wide_chch'}
                                type='circle'
                                paint={{ "circle-stroke-width": 3, "circle-stroke-color": 'red', "circle-color": 'red' }} />
                        </Source>
                    )
                }

                {
                    isHovered.hovered && (
                        <div className="custom-popup" style={{
                            left: isHovered.x,
                            top: isHovered.y
                        }}>
                            Hello
                        </div>
                    )
                }
                {
                    selectedLocation.latitude && selectedLocation.longitude && (
                        <SelectedLocationMarker selectedLocation={selectedLocation} />
                    )
                }
                {
                    closestWells.map(item => (
                        <CustomMarker key={item.well_id} item={item} />

                    ))
                }
            </Map>
            <LayersFAB setIsLayersVisible={setIsLayersVisible} isLayersVisible={isLayersVisible} />
        </div>
    )
}

// export default function Map(props) {
//     mapboxgl.accessToken = 'pk.eyJ1IjoibnJhc3RvZ2kiLCJhIjoiY2xweHRkbHU4MGRnZTJpc3Vkd2g5Znp2ZSJ9.DXCXHf-XnGSGVhvjz0mpNg'
//     const mapContainer = useRef(null);
//     const map = useRef(null);
//     const [lng, setLng] = useState(146.359);
//     const [lat, setLat] = useState(-32.648);
//     const [zoom, setZoom] = useState(8);
//     const bounds = [
//         [172.5156, -43.7725], // Southwest coordinates (longitude, latitude)
//         [172.8259, -43.4503] // Northeast coordinates (longitude, latitude)
//     ];

//     useEffect(() => {
//         if (map.current) return; // initialize map only once
//         map.current = new mapboxgl.Map({
//             container: mapContainer.current,
//             style: 'mapbox://styles/mapbox/streets-v9',
//             center: [lng, lat],
//             zoom: zoom,
//             // maxBounds: bounds,
//             attributionControl: false,
//         });
//         map.current.on('move', () => {
//             setLng(map.current.getCenter().lng.toFixed(4));
//             setLat(map.current.getCenter().lat.toFixed(4));
//             setZoom(map.current.getZoom().toFixed(2));
//         });


//     });
//     return (
//         <div className="map-wrappera" ref={mapContainer}></div>
//     )
// }


