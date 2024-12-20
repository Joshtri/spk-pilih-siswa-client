// import React from 'react'
import { useEffect, useState } from 'react'
import Table from '../../components/Table'
import Layout from '../Layout'
import axios from 'axios';

export default function DataSiswaPage() {

    const [data, setData] = useState([]);

    const columns = [
        { header: 'Nama Siswa', accessor: 'name' },
        { header: 'NISN', accessor: 'age' },
        { header: 'Aksi', accessor: 'email' }
    ]

    useEffect(()=>{
    // Mengambil data dari API
        axios.get('https://api.example.com/data') // Ganti dengan URL API Anda
            .then(response => {
            setData(response.data) // Sesuaikan ini dengan struktur data API
        })
        .catch(error => {
            console.error('Error fetching data:', error)
        })

    },[]);

    return (
        <Layout>
            <div>
                <Table columns={columns} data={data}/>
            </div>
        </Layout>
    )
}
