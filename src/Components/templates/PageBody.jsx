import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import '/src/Styles/PageBody.css'
import HomePage from '/src/Components/pages/HomePage/HomePage.jsx'
import MapPage from '/src/Components/pages/MapPage/MapPage.jsx'
import NavigationTopBar from '/src/Components/atoms/NavigationTopBar.jsx'
// import Statistics from '../Statistcs'
import RedesignedStatistics from '/src/Components/pages/StatisticsPage/RedesignedStatistics.jsx'
import BlogContainer from '/src/Components/pages/BlogPage/BlogContainer.jsx'
import { ClosestWellContext, SelectedDeterminand, SelectedLocationContext, UserLocationContext } from '/src/Components/contexts/Contexts.js'
import { useState } from 'react'
import { WellsProvider } from '/src/Components/contexts/WellMetadataContext.jsx'
import { AcceptableDeterminandsProvider } from '/src/Components/contexts/AcceptableDeterminandsContext.jsx'

export default function PageBody() {
  const [selectedDeterminand, setSelectedDeterminand] = useState()
  const [userLocation, setUserLocation] = useState({
    latitude: '',
    longitude: ''
  })
  const [selectedLocation, setSelectedLocation] = useState({
    fullAddress: null,
    latitude: null,
    longitude: null
  });
  const [closestWells, setClosestWells] = useState([])

  return (
    <SelectedDeterminand.Provider value={[selectedDeterminand, setSelectedDeterminand]}>
      <ClosestWellContext.Provider value={[closestWells, setClosestWells]}>
        <UserLocationContext.Provider value={[userLocation, setUserLocation]}>
          <SelectedLocationContext.Provider value={[selectedLocation, setSelectedLocation]}>
            <WellsProvider>
              <AcceptableDeterminandsProvider>
                <BrowserRouter>
                  <div className="main-wrapper col">
                    <NavigationTopBar />
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/map" element={<MapPage />} />
                      <Route path="/metrics/:well_code?" element={<RedesignedStatistics />} />
                      <Route path="/read" element={<BlogContainer />} />
                    </Routes>
                  </div>
                </BrowserRouter>
              </AcceptableDeterminandsProvider>
            </WellsProvider>
          </SelectedLocationContext.Provider>
        </UserLocationContext.Provider>
      </ClosestWellContext.Provider>
    </SelectedDeterminand.Provider >
  )
}
