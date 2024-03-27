import React from 'react'
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom'

const Template = () => {
  let { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // Get the query parameters
  const templateValue = searchParams.get('template');
  // /profile/:id/template/:templatename/pdf

  return (
    <div>
      <div className='mb-4'>
        <Link to={`/user/${id}`} className='text-xl'>Back</Link>
      </div>
      <iframe title="PDF Viewer" src={`${process.env.REACT_APP_BASE_URL}/api/admin/profile/${id}/template/${templateValue}/pdf`}
        width="100%" height="700"></iframe>

    </div>
  )
}

export default Template
