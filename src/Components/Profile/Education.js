import React, { useState } from 'react';
import { Button, Row, Col, Card } from 'antd';
import { Briefcase01Icon, DragDropVerticalIcon, PencilEdit01Icon, Delete03Icon, PlusSignCircleIcon } from 'hugeicons-react';
import EducationModal from './EducationModal';

export default function Education({ educational_details, handleSetProfile, setCurrent, current, renderToast }) {
  const [open, setOpen] = useState(false);
  const [editEducation, setEditEducation] = useState(null);

  const handleCancel = () => {
    setOpen(false)
    setEditEducation(null)
  }

  return (
    <Row gutter={[16]}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <div>
          <h2 className='text-gray-700 text-3xl my-2'>Education</h2>
          <p className='text-gray-500 text-lg'>Let's uncover your Education journey, Share your academic adventures</p>
        </div>
      </Col>

      {open && <EducationModal educational_details={educational_details} open={open} handleCancel={handleCancel} education={editEducation} handleSetProfile={handleSetProfile} />}
      {educational_details.length > 0 && <Col xs={24} sm={24} md={24} lg={24}>
        {educational_details.map((edu, index) => (
          <Card className='w-full my-4 shadow-sm hover:shadow' >
            <div className='flex justify-between'>
              <div className='flex'>
                <DragDropVerticalIcon
                  size={24}
                  color={"#000000"}
                  variant={"stroke"}
                />
                <div className='ml-2'>
                  <div className='text-gray-900 text-lg mb-2'>{edu.degree}<span className='text-gray-500 mx-2'> |</span><span className='text-gray-500 text-base'> {edu.university}</span></div>
                  <div className='text-base text-gray-500 mb-2'>{edu.location}</div>
                  <div className='text-base text-gray-500'>{edu.graduation_year}</div>
                </div>
              </div>
              <div className='flex gap-3'>
                <PencilEdit01Icon
                  size={20}
                  color={"#4F4C4C"}
                  variant={"stroke"}
                  onClick={() => {
                    setEditEducation(edu);
                    setOpen(true)
                  }}
                />
                <Delete03Icon
                  size={20}
                  color={"#FF4D4F"}
                  variant={"stroke"}
                />
              </div>
            </div>
          </Card>
        ))}
        <span onClick={() => setOpen(true)} className='text-orange-400 flex items-center gap-2 text-lg cursor-pointer mt-2'> <PlusSignCircleIcon size={20} /> Add Education</span>
      </Col>}

      {educational_details.length === 0 && <Col xs={24} sm={24} md={24} lg={24}>
        <Card className='w-full' >
          <div className='flex flex-col items-center justify-center gap-4'>
            <Briefcase01Icon
              size={54}
              color={"#F99417"}
              variant={"stroke"}
              className='bg-orange-100 rounded-full p-2'
            />
            <p className='text-xl text-gray-500 w-96 text-center'>Let's map out your educational achievements, one step at a time.
              Add your first school now</p>
            <Button onClick={() => setOpen(true)} type='primary'> Add Education</Button>
          </div>
        </Card>
      </Col>}
      <Col span={24}>
        <div className='flex items-center justify-between w-full mt-6'>
          <Button
            style={{ padding: '0px 30px' }}
            className="md:w-auto md:justify-end"
            size='large'
            onClick={() => setCurrent(current - 1)}
          >
            Back
          </Button>

          <Button
            style={{ padding: '0px 30px' }}
            className="md:w-auto md:justify-end"
            size='large'
            type="primary"
            onClick={() => {
              renderToast()
              setCurrent(current + 1)
            }}
          >
            Next
          </Button>
        </div>
      </Col>
    </Row>
  );
}
