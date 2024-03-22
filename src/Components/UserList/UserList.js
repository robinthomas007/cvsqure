import React, { useEffect } from 'react'
import axios from 'axios'
import { getCookie } from './../../Lib/auth';

const UserList = () => {
  useEffect(() => {
    const token = getCookie('token');
    axios.get('/api/admin/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response, "====")
        // setProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });

  }, [])


  return (
    <div>
      UserList
    </div>
  )
}

export default UserList
