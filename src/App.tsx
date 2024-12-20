// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardPage from './pages/DashboardPage'
import KriteriaPage from './pages/Kriteria/KriteriaPage'
// import DataKriteriaPage from './pages/kriteria/DataKriteriaPage'
// import DataSiswaPage from './pages/siswa/DataSiswaPage'

function App() {
  // const [count, setCount] = useState(0)
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<DashboardPage/>} />
          <Route path='/kriteria' element={<KriteriaPage/>}/>
          {/* <Route path='/kriteria' element={<DataKriteriaPage/>}/>
          <Route path='/siswa' element={<DataSiswaPage/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
 