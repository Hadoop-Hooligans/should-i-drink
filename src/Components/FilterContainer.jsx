import { useEffect, useState } from "react";
import ResultItem from "./ResultItem";

function SegmentedItem({ item, handleSegmentedActiveItem }) {
    return (
        <div className={`segmented-item all row al-ctr gp-8 body-large ${item.active ? 'active' : ''}`} onClick={() => handleSegmentedActiveItem(item.id)}>
            {
                item.active ? <span className="material-symbols-rounded">check</span> : null
            }
            {item.text}
        </div>
    )
}


export default function FilterContainer() {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [isFilterClosed, setIsFilterClosed] = useState(false);
    const [segmentedItems, setSegmentedItems] = useState([
        { id: 1, icon: 'home', text: 'All Locations', active: false },
        { id: 2, icon: 'location_pin', text: 'Near Me', active: false }
    ])
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowSize(window.innerWidth);
        })

    })

    useEffect(() => {
        windowSize > 900 ? setIsFilterClosed(false) : null
    }, [windowSize])
    function handleSegmentedActiveItem(id) {
        const updatedItems = segmentedItems.map(item => {
            if (item.id === id) {
                item.active = true;
            } else {
                item.active = false;
            }
            return item;
        });
        setSegmentedItems(updatedItems);
    }
    return (
        <>
            {
                windowSize <= 900 ?
                    <span className="material-symbols-rounded toggle-filter-open" onClick={() => setIsFilterClosed(false)}>menu</span>
                    :
                    null
            }

            <div className={`filter-container col ${isFilterClosed ? 'close' : ''} `}>
                <div className="filter-header row al-end">
                    <div className="header-values row gp-16 al-ctr">
                        {
                            windowSize <= 900 ?
                                <span className="material-symbols-rounded toggle-filter" onClick={() => setIsFilterClosed(true)}>menu_open</span>
                                :
                                null
                        }
                        <p className="title-large">Search</p>
                    </div>

                </div>

                <div className="segmented-wrapper col">
                    <div className="segmented-container row jc-str gp-8">
                        {
                            segmentedItems.map((item) => (
                                <SegmentedItem key={item.id} item={item} handleSegmentedActiveItem={handleSegmentedActiveItem} />
                            ))
                        }
                    </div>
                </div>
                <div className="map-page search-container row jc-str gp-16 flx-wrp">
                    <input type="text" className="map-page-search-bar" placeholder="Enter Region" />
                    <div className="map-page-search-button row al-ctr jc-ctr">
                        <span className="material-symbols-rounded arrow-icon">search</span>
                    </div>
                </div>
                {/* <p className="title-medium row al-ctr gp-8"><span className="material-symbols-rounded">info</span> 0 Results Found</p>
                <div className="results-container col">

                </div> */}
            </div>
        </>
    )
}

