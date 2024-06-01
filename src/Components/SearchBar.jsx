import '../Styles/SearchBar.css'
import { forwardRef } from 'react'

const SearchBar = forwardRef(function SearchBar(props, ref) {
    return (
        <div className="mp-srch-container" style={{ minWidth: props.width }}>
            <div className="mp-srch-wrapper col">
                <div className="search-bar-elements row al-ctr">
                    {/* <span className="material-symbols-rounded">search</span> */}
                    <input ref={ref} type="text" placeholder={props.placeholder} onChange={(e) => { props.handleSearch(e) }}
                        value={props.value}
                    />
                    <span className="material-symbols-rounded clear-search" onClick={props.clearSearch}>
                        close
                    </span>
                </div>
                {/* {
                    props.isSearchResultsVisible ? <div className="divider"></div> : null
                } */}
                <div className={`search-results col ${props.isSearchResultsVisible ? 'open' : ''}`}>
                    {props.children}
                </div>
            </div>
        </div>
    )
});

export default SearchBar
