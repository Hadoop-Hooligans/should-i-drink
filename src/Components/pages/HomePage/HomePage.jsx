import { useContext, useEffect, useState } from 'react';
import '/src/Styles/HomePage.css';
import '@material/web/ripple/ripple.js';
import TypeIt from 'typeit-react';
import { SelectedLocationContext, UserLocationContext } from '/src/Components/contexts/Contexts';
import { useNavigate } from 'react-router-dom';

function SearchItem({ item, handleSelectedLocation }) {
    return (
        <div className="search-item title-medium row al-ctr gp-16" style={{ fontWeight: 400 }}
            onClick={() => handleSelectedLocation(item.id)}
        >
            <span className="material-symbols-rounded search-icon">near_me</span>
            {(item.properties).full_address}
        </div >
    )
}


export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([])
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [selectedLocation, setSelectedLocation] = useContext(SelectedLocationContext)
    const [location, setLocation] = useContext(UserLocationContext)
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    const geocodeParameters = {
        country: 'nz',
        limit: 2,
        accessToken: 'pk.eyJ1IjoibnJhc3RvZ2kiLCJhIjoiY2xweHRkbHU4MGRnZTJpc3Vkd2g5Znp2ZSJ9.DXCXHf-XnGSGVhvjz0mpNg'
    }
    useEffect(() => {
        const controller = new AbortController();
        // const signal = controller.signal;
        fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${searchQuery}&country=${geocodeParameters.country}&limit=${geocodeParameters.limit}&access_token=${geocodeParameters.accessToken}`,
            {
                method: 'GET',
                mode: 'cors',
                // signal: signal
            }
        ).then(response => response.json())
            .then(data => { setSearchResults(data.features) })
            .catch(error => console.log(error));

        // return () => {
        //     // Cancel the fetch request when the component unmounts
        //     controller.abort();
        // };
    }, [geocodeParameters.accessToken, geocodeParameters.country, geocodeParameters.limit, searchQuery])
    function showPosition(position) {
        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
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
        // Update searchQuery when selectedLocation.fullAddress changes
        if (selectedLocation.fullAddress) {
            setSearchQuery(selectedLocation.fullAddress);
        }

    }, [selectedLocation.fullAddress]);
    const navigate = useNavigate();
    return (
        <>
            <div className="body-container home-page col al-ctr">
                <div className="image-overlay"></div>
                <div className="image-container">

                </div>
                <div className="content col al-ctr gp-16">
                    <div className="headline-container col al-ctr">
                        {/* <h1>SHOULD I DRINK?</h1> */}
                        <TypeIt as='h1' options={{ speed: 100 }} >SHOULD I DRINK?</TypeIt>
                        {/* <p className='title-small'>Know more about your the water in your area.</p> */}
                    </div>
                    <div className="search-bar-container row jc-ctr">
                        <div className={`search-bar-div col al-str`}>
                            <div className="elements row al-ctr">
                                {/* <Search01Icon /> */}
                                <span className="material-symbols-rounded search-icon">search</span>
                                <input type="text" placeholder='Search for a location'
                                    onChange={(e) => { handleSearch(e) }}
                                    value={searchQuery}
                                />
                                <div className="location-icon-container row al-ctr jc-ctr" onClick={getLocation}>
                                    <span className="material-symbols-rounded location-icon">location_pin</span>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className={`home-page-srch-results col ${isSearchResultsVisible ? 'open' : ''}`}>
                                {
                                    searchResults.map((result) => (
                                        <>
                                            <SearchItem key={result.id} item={result} handleSelectedLocation={handleSelectedLocation} />
                                            {<div className="divider"></div>}
                                        </>
                                    ))
                                }
                            </div>
                            {/* {
                                location.latitude != 0 || location.longitude != 0 ?
                                    <div className="search-item-container col al-ctr">
                                        <SearchItem />
                                    </div>
                                    :
                                    null
                            } */}
                        </div>
                        <div className="search-button-div row al-ctr jc-ctr gp-12"
                            onClick={() => navigate(`/map`)}
                        >

                            <md-ripple></md-ripple>
                            <span className="material-symbols-rounded arrow-icon">arrow_forward</span>
                            <span className='title-medium hide'>Search</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="how-it-works-container col al-ctr">
                <div className="hiw-header col">
                    <p className="headline-large">How it works?</p>
                </div>
                <div className="hiw-card-container">
                    <div className="card col al-ctr jc-ctr">

                    </div>
                    <div className="card col al-ctr jc-ctr">

                    </div>
                    <div className="card col al-ctr jc-ctr">

                    </div>
                    <div className="card col al-ctr jc-ctr">

                    </div>
                </div>
            </div> */}
        </>
    )
}
