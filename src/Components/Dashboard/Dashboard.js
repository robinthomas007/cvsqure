import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getCookie } from './../../Lib/auth';

const Dashboard = () => {

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const token = getCookie('token');
    axios.get('/api/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });

  }, [])

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
