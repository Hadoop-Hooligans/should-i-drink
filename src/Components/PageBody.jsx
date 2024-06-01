import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import '../Styles/PageBody.css'
import HomePage from './HomePage'
import MapPage from './MapPage'
import NavigationTopBar from './NavigationTopBar'
import Statistics from './Statistcs'
import RedesignedStatistics from './RedesignedStatistics'
import BlogContainer from './BlogContainer'
import { ClosestWellContext, SelectedDeterminand, SelectedLocationContext, UserLocationContext } from './Contexts'
import { useState } from 'react'
import { WellsProvider } from './WellMetadataContext'
import { AcceptableDeterminandsProvider } from './AcceptableDeterminandsContext'

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
