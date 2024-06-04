import { useEffect, useState } from 'react'
import '/src/Styles/NavigationTopBar.css';
import { Link, NavLink } from 'react-router-dom'
import SearchBar from '/src/Components/atoms/SearchBar.jsx'

function TabItem({ item, handleActive, windowSize }) {
    return (
        <NavLink to={item.link} className={'nav-item'}>
            <div className={`tab-item row al-ctr jc-ctr gp-8 ${item.icon}}`}
                onClick={() => { handleActive(item.id) }}>
                {
                    windowSize < 900 ? <span className="material-symbols-rounded home-icon">{item.icon}</span> : ''
                }

                {
                    windowSize > 900 ? item.name : ''
                }
            </div>
        </NavLink >
    )
}



export default function NavigationTopBar() {
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const [tabItems, setTabItems] = useState([
        { id: 1, name: 'Home', icon: 'home', active: true, link: '/' },
        { id: 2, name: 'Maps', icon: 'map', active: false, link: '/map' },
        { id: 3, name: 'Metrics', icon: 'monitoring', active: false, link: '/metrics' },
        { id: 4, name: 'Read', icon: 'draft', active: false, link: '/read' }
    ])
    function handleActive(id) {
        setTabItems(tabItems.map((item) => {
            if (item.id === id) {
                item.active = true
            } else {
                item.active = false
            }
            return item
        }))
    }
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowSize(window.innerWidth)
        })
    })
    return (
        <div className="navigation-top-bar row al-ctr jc-ctr flx-wrp jc-sb">
            {
                windowSize >= 800 ? <p className='title-large wb-title'>Should I Drink?</p> : null
            }

            <div className="tabs-container row al-ctr">
                {tabItems.map((item, index) => <TabItem key={index} item={item} handleActive={handleActive} windowSize={windowSize} />)}
            </div>

            {/* <SearchBar /> */}
        </div>
    )
}
