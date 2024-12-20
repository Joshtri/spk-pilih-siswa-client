import { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '../../components/Table' // Pastikan path ini sesuai dengan lokasi file Table.js
import Layout from '../Layout'

export default function DataKriteriaPage() {
  const [data, setData] = useState([])

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Age', accessor: 'age' },
    { header: 'Email', accessor: 'email' }
  ]

  useEffect(() => {
    // Mengambil data dari API
    axios.get('https://api.example.com/data') // Ganti dengan URL API Anda
      .then(response => {
        setData(response.data) // Sesuaikan ini dengan struktur data API
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
      
  }, [])
  

  return (
    <Layout>
      <div>
        <h1 className="text-lg font-bold mb-4">Dynamic Table</h1>
        <Table columns={columns} data={data} />
      </div>
    </Layout>

  )
}
