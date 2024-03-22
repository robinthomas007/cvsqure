import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getCookie } from './../../Lib/auth';

const Dashboard = () => {

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    // const token = getCookie('token');
    // axios.get('/api/profile', {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // })
    //   .then(response => {
    //     setProfile(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching profile:', error);
    // });

  }, [])

  return (
    <div className="text-center mt-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">CV Building</h1>
      <p className="text-lg text-gray-700 mb-6">
        Create a professional resume with ease. Showcase your personal information, job history, education, skills, project experience, and certifications.
      </p>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Personal Info</h2>
          <p className="text-gray-600">
            Provide your contact details, such as name, address, phone number, and email address.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Job History</h2>
          <p className="text-gray-600">
            Detail your work experience, including job titles, company names, locations, start and end dates, and responsibilities.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Education</h2>
          <p className="text-gray-600">
            Outline your educational background, including degrees, institutions, majors, graduation dates, and honors.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Skills</h2>
          <p className="text-gray-600">
            Highlight your skills and competencies relevant to the positions you're applying for.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Project Experience</h2>
          <p className="text-gray-600">
            Showcase your involvement in projects, including descriptions, roles, technologies used, and outcomes.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Certification</h2>
          <p className="text-gray-600">
            Display any certifications or licenses you've earned relevant to your field.
          </p>
        </div>
      </div>
    </div>

  )
}

export default Dashboard
