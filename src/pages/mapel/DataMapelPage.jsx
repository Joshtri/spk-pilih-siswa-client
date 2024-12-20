import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import Table from '../../components/Table'
import axios from 'axios';

export default function DataMapelPage() {

    const [data, setData] = useState([]);

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Age', accessor: 'age' },
        { header: 'Email', accessor: 'email' }
    ]

    useEffect(()=>{
        axios.get('https://api.example.com/data')
        .then(response => {
            setData(response.data) // Sesuaikan ini dengan struktur data API
        }).catch(error => {
            console.error('Error fetching data:', error)
        })

    },[]);

    return (
        <Layout>
            <Table data={data} columns={columns}/>
        </Layout>
    )
}

