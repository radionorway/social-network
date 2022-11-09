import React from 'react'
import ReactDOM from 'react-dom/client'

import MainApp from './App.tsx'

import './index.css'

const rootElem = document.getElementById('root')

const root = ReactDOM.createRoot(rootElem)
root.render(<MainApp />)
