import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Input from './components/Input.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Result from './components/Result.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header/>
    <App />
    {/* <Input/> */}
    <Result/>
    <Footer/>
  </React.StrictMode>,
)
