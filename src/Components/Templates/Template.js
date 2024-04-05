import React, { useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { Breadcrumb, Select } from 'antd';
import { ArrowLeft01Icon } from 'hugeicons-react';
import Spinner from './../Common/Spinner'

const Template = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let { id } = useParams();

  const [templateValue, setTemplateValue] = useState(searchParams.get('template'))
  const [isLoading, setIsLoading] = useState(true);

  const handleTemplateChange = (value) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setTemplateValue(value)
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      <div className='flex justify-between mb-2 bg-white shadow-md py-2 px-4 rounded-md items-center'>
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
        <div>
          <label className='font-semibold mr-2'>Template:</label>
          <Select placeholder="Template"
            defaultValue={templateValue}
            onChange={handleTemplateChange}
            options={[
              { value: 'one', label: 'Railsfactory' },
              { value: 'two', label: 'Sedin' },
              { value: 'three', label: 'RF Logo' },
              { value: 'ph6', label: 'PH6' },
            ]}
          />
        </div>
      </div>
      {isLoading && <Spinner />}
      <iframe onLoad={handleLoad} title="PDF Viewer" src={`${process.env.REACT_APP_BASE_URL}/api/admin/profile/${id}/template/${templateValue}/pdf`}
        width="100%" height="700"></iframe>
    </div>
  )
}

export default Template
