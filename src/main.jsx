import React from 'react'
import ReactDOM from 'react-dom/client'
import '/src/index.css'
import './Styles/FontSize.css'
import './Styles/CommonStyles.css'
import './Styles/Buttons.css'
import PageBody from './Components/PageBody'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PageBody />
  </React.StrictMode>,
)
