import React from 'react'
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom'
import { Breadcrumb } from 'antd';
import { ArrowLeft01Icon } from 'hugeicons-react';

const Template = () => {
  let { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const templateValue = searchParams.get('template');

  return (
    <div>
      <div className='flex justify-between mb-2 bg-white shadow-md py-2 px-4 rounded-md'>
        <div className='text-2xl font-semibold'>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              <Link to={`/admin/user/${id}`} style={{ display: 'flex' }} className='text-base'>
                <ArrowLeft01Icon
                  size={20}
                  color={"#000000"}
                  variant={"stroke"}
                  className='mr-1'
                /> Employee
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>CV Preview</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      {/* <div className='mb-4'>
        <Link to={`/admin/user/${id}`} className='text-xl'>Back</Link>
      </div> */}
      <iframe title="PDF Viewer" src={`${process.env.REACT_APP_BASE_URL}/api/admin/profile/${id}/template/${templateValue}/pdf`}
        width="100%" height="700"></iframe>

    </div>
  )
}

export default Template
