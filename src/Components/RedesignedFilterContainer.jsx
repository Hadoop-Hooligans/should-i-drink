import React, { useContext, useEffect, useRef, useState } from 'react';
import '../Styles/RedesignedFilterContainer.css'
import SearchBar from './SearchBar';
import { ClosestWellContext, SelectedLocationContext, UserLocationContext } from './Contexts';
import WELL from '../../public/data/wide_chch.json'
import { map } from 'leaflet';
import { Marker } from 'react-map-gl';
import { useNavigate } from 'react-router-dom';
import { WellsMetadata } from './WellMetadataContext';

Number.prototype.toRad = function () {
    return this * Math.PI / 180;
}

function haversine(lat1, long1, lat2, long2) {
    var R = 6371; // km
    //has a problem with the .toRad() method below.
    var x1 = lat2 - lat1;
    var dLat = x1.toRad();
    var x2 = long2 - long1;
    var dLon = x2.toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d
}



function MapSearchResult({ item, handleSelectedLocation }) {
    return (
        <div className="map-search-item row" onClick={() => { handleSelectedLocation(item.id) }}>
            <p className="body-large">{(item.properties).full_address}</p>
        </div>
    )
}

function SegmentedItem({ item, handleSegmentedActiveItem }) {
    return (
        <div className={`re-segmented-item row al-ctr gp-8 body-large ${item.active ? 'active' : ''}`} onClick={() => handleSegmentedActiveItem(item.id)}>
            {
                item.active ? <span className="material-symbols-rounded">check</span> : null
            }
            {item.text}
        </div>
    )
}

function SearchItem({ item }) {
    const navigate = useNavigate();
    const handleClick = () => {
        const params = new URLSearchParams({
            well_code: (item.well_id).replace('/', '_'),
        });
        navigate(`/metrics?${params.toString()}`, { state: { well_code: item.well_id } });
    };
    return (
        <>
            <div className="re-item col gp-4"
                onClick={handleClick}
            >
                <div className="search-item-header row jc-sb al-str">
                    <div className="col gp-4">
                        <p className="title-small" style={{ fontWeight: 600 }}>{item.well_id}</p>
                        <p className="body-large">{item.actualAddress}</p>
                        {/* <p className="body-large">{item.Region}</p> */}
                    </div>
                    <div className="favorite-button row al-ctr jc-ctr" style={{ paddingTop: '4px' }}>
                        <span className="material-symbols-rounded">star</span>
                    </div>
                </div>
                <div className="item-content col ">
                    <p className="body-large success">Status : {item.well_status}</p>
                    <p className="body-large">Primary Use : {item.primary_use}</p>
                    <p className="body-large">Type : {item.well_type}</p>
                </div>
                {/* <div className="action-footer-item row jc-end">
                    <div className="button tonal row al-ctr gp-8">
                        <span className="material-symbols-rounded">add</span>
                        <p className="body-large">Details</p>
                    </div>
                </div> */}

            </div>
        </>
    )
}

export default function RedesignedFilterContainer() {
    const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedLocation, setSelectedLocation] = useContext(SelectedLocationContext)
    const [searchQuery, setSearchQuery] = useState(null);
    const [segmentedItems, setSegmentedItems] = useState([
        { id: 1, icon: 'location_pin', text: 'Near Me', active: false },
        { id: 2, icon: 'home', text: 'All Locations', active: false },
        { id: 3, icon: 'saved', text: 'Saved', active: false }
    ])
    const [wellMetadata, setWellMetadata] = useContext(WellsMetadata)
    const [userLocation, setUserLocation] = useContext(UserLocationContext)
    const [closestWells, setClosestWells] = useContext(ClosestWellContext)
    let isAnyActive = segmentedItems.some(item => item.active);
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    function showPosition(position) {
        setUserLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        setSelectedLocation({
            fullAddress: 'Your Location',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }



    useEffect(() => {
        isAnyActive = segmentedItems.some(item => item.active);
    }, [segmentedItems])

    const geocodeParameters = {
        country: 'nz',
        limit: 3,
        accessToken: 'pk.eyJ1IjoibnJhc3RvZ2kiLCJhIjoiY2xweHRkbHU4MGRnZTJpc3Vkd2g5Znp2ZSJ9.DXCXHf-XnGSGVhvjz0mpNg'
    }
    async function reverseGeocode(lat, long) {
        try {
            const response = await fetch(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${long}&latitude=${lat}&access_token=${geocodeParameters.accessToken}`, {
                method: 'GET',
                mode: 'cors'
            });
            const data = await response.json();
            return data.features[0].properties.full_address;
        } catch (error) {
            console.log(error);
            return "No address found.";
        }
    }


    async function closestWell(lat1, long1) {
        let distances = wellMetadata.map(well => ({
            ...well,
            distance: haversine(lat1, long1, well.latitude, well.longitude)
        }));

        distances.sort((a, b) => a.distance - b.distance);
        let topWells = distances.slice(0, 4);

        let finalWells = await Promise.all(topWells.map(async well => ({
            ...well,
            actualAddress: await reverseGeocode(well.latitude, well.longitude)
        })));
        setClosestWells(finalWells);
        console.log(finalWells)
    }


    function handleSelectedLocation(id) {
        searchResults.map(result => {
            if (result.id === id) {
                setSelectedLocation(
                    {
                        fullAddress: result.properties.full_address,
                        latitude: result.geometry.coordinates[1],
                        longitude: result.geometry.coordinates[0]
                    }
                );
                setIsSearchResultsVisible(false);
            }
        })
    }
    useEffect(() => {
        closestWell(selectedLocation.latitude, selectedLocation.longitude);
    }, [selectedLocation, userLocation])

    function handleSegmentedActiveItem(id) {
        const updatedItems = segmentedItems.map(item => {
            if (item.id === id) {
                if (item.id == 1) {
                    getLocation();
                }
                item.active = true;
            } else {
                item.active = false;
            }
            return item;
        });
        setSegmentedItems(updatedItems);
    }
    function clearSelection() {
        if (segmentedItems[0].active) {
            setSelectedLocation({
                fullAddress: null,
                latitude: null,
                longitude: null
            });
            setClosestWells([]);
        }
        const updatedItems = segmentedItems.map(item => {
            item.active = false;
            return item;
        });
        setSegmentedItems(updatedItems);


    }
    function handleSearch(event) {
        if (event.target.value === '') {
            setSearchResults([]);
            setIsSearchResultsVisible(false);
        }
        else {
            setIsSearchResultsVisible(true);
        }
        setSearchQuery(event.target.value);
    }
    function masterReset() {
        setSelectedLocation({
            fullAddress: null,
            latitude: null,
            longitude: null
        });
        setClosestWells([]);
        const updatedItems = segmentedItems.map(item => {
            item.active = false;
            return item;
        });
        setSegmentedItems(updatedItems);
        mapSearchBarRef.current.value = '';
        setSearchQuery('');
    }
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${searchQuery}&country=${geocodeParameters.country}&limit=${geocodeParameters.limit}&access_token=${geocodeParameters.accessToken}`,
            {
                method: 'GET',
                mode: 'cors',
                signal: signal
            }
        ).then(response => response.json())
            .then(data => { setSearchResults(data.features) })
            .catch(error => console.log(error));

        return () => {
            // Cancel the fetch request when the component unmounts
            controller.abort();
        };
    }, [searchQuery])
    const mapSearchBarRef = useRef(null);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowSize(window.innerWidth)
        })

    }, [windowSize])
    useEffect(() => {
        // Update searchQuery when selectedLocation.fullAddress changes
        if (selectedLocation.fullAddress) {
            setSearchQuery(selectedLocation.fullAddress);
        }

    }, [selectedLocation.fullAddress]);
    return (
        <>
            {
                windowSize <= 900
                    ?
                    <span className="material-symbols-rounded open-sidebar al-ctr row"
                        onClick={() => setIsSidebarExpanded(true)}
                    >menu</span>
                    :
                    null
            }

            <div
                className={`re-filter-container col gp-16 ${windowSize <= 900 && isSidebarExpanded ? 'expanded' : ''}`}
            >

                <div className="search-header-filter col gp-16">
                    {


                        windowSize <= 900
                            ?
                            <>
                                <span className="material-symbols-rounded toggle-sidebar"
                                    onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                                >menu_open</span>
                                <p className="title-large">Water</p>
                            </>
                            :
                            null



                    }
                    <SearchBar
                        key={1}
                        handleSearch={handleSearch}
                        placeholder={'Search for your location'}
                        value={searchQuery}
                        isSearchResultsVisible={isSearchResultsVisible}
                        ref={mapSearchBarRef}
                        clearSearch={() => {
                            mapSearchBarRef.current.value = ''
                        }}
                    >
                        {
                            searchResults.map((result) => (
                                <>
                                    <MapSearchResult key={result.id} item={result} handleSelectedLocation={handleSelectedLocation} />
                                    {<div className="divider"></div>}
                                </>
                            ))
                        }
                    </SearchBar>
                </div>

                <div className="re-segmented-container row gp-16">
                    <div className="re-segmented-actions row gp-16">
                        {
                            segmentedItems.map((item) => (
                                <SegmentedItem key={item.id} item={item} handleSegmentedActiveItem={handleSegmentedActiveItem} />
                            ))
                        }
                    </div>
                    <div className={`re-segmented-item row al-ctr clear-button ${isAnyActive ? '' : 'inactive'}`} onClick={clearSelection}>
                        <md-ripple></md-ripple>
                        <span className="material-symbols-rounded">close</span>
                    </div>
                </div>
                {
                    selectedLocation.fullAddress ?
                        <div className="selected-location-container row al-ctr gp-16">
                            <span className="material-symbols-rounded">nearby</span>
                            <div className="wrapper col gp-4">
                                <p className="body-medium"
                                    style={{ color: 'var(--color-neutral-color-9)' }}
                                >
                                    Showing results near
                                </p>
                                <p className="title-small">{selectedLocation.fullAddress ? selectedLocation.fullAddress : 'No location selected'}</p>
                            </div>

                        </div>
                        :
                        null
                }

                <div className="re-items-container col jc-sb"
                    style={{ marginTop: selectedLocation.fullAddress ? '0' : '-12px' }}
                >
                    <div className="re-items-wrapper col">
                        {
                            closestWells.map((item, index) => (
                                <React.Fragment key={item.well_id}>
                                    <SearchItem item={item} />
                                    {index < closestWells.length - 1 && <div className="divider"></div>}
                                </React.Fragment>

                            ))
                        }
                    </div>

                    {/* <div className="page-changer row jc-ctr gp-12">

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
                </div> */}
                </div>

                {
                    closestWells.length != 0 ?

                        <div className="master-clear-button row al-ctr jc-ctr"
                            onClick={() => masterReset()}
                        >
                            <md-ripple></md-ripple>
                            <span className="material-symbols-rounded">clear</span>
                            <p className="body-large">Reset Results</p>
                        </div>
                        :
                        null
                }

            </div>
        </>
    )
}
