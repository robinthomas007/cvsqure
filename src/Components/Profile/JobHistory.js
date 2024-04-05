import React, { useState } from 'react';
import { Button, Row, Col, Card } from 'antd';
import { Briefcase01Icon, DragDropVerticalIcon, PencilEdit01Icon, Delete03Icon, PlusSignCircleIcon } from 'hugeicons-react';
import JobModal from './JobModal';

export default function JobHistory({ work_histories, handleSetProfile, setCurrent, current, renderToast }) {

  const [open, setOpen] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const handleCancel = () => {
    setOpen(false)
    setEditJob(null)
  }

  return (
    <Row gutter={[16]}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <div>
          <h2 className='text-gray-700 text-3xl my-2'>Job History</h2>
          <p className='text-gray-500 text-lg'>Let's uncover your career journey, tell us about your most recent job</p>
        </div>
      </Col>

      {open && <JobModal work_histories={work_histories} open={open} handleCancel={handleCancel} job={editJob} handleSetProfile={handleSetProfile} />}
      {work_histories.length > 0 &&
        <Col xs={24} sm={24} md={24} lg={24}>
          {work_histories.map((job, index) => (
            <Card className='w-full my-4 shadow-sm hover:shadow' >
              <div className='flex justify-between'>
                <div className='flex'>
                  <DragDropVerticalIcon
                    size={24}
                    color={"#000000"}
                    variant={"stroke"}
                  />
                  <div className='ml-2'>
                    <div className='text-gray-900 text-lg mb-2'>{job.job_title}<span className='text-gray-500 mx-2'> |</span><span className='text-gray-500 text-base'> {job.company}</span></div>
                    <div className='text-base text-gray-500 mb-2'>{job.location}</div>
                    <div className='text-base text-gray-500'>{job.start_date} - {job.end_date}</div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <PencilEdit01Icon
                    size={20}
                    color={"#4F4C4C"}
                    variant={"stroke"}
                    onClick={() => {
                      setEditJob(job);
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
          <span onClick={() => setOpen(true)} className='text-orange-400 flex items-center gap-2 text-lg cursor-pointer mt-2'> <PlusSignCircleIcon size={20} /> Add Job</span>
        </Col>}

      {work_histories.length === 0 && <Col xs={24} sm={24} md={24} lg={24}>
        <Card className='w-full' >
          <div className='flex flex-col items-center justify-center gap-4'>
            <Briefcase01Icon
              size={54}
              color={"#F99417"}
              variant={"stroke"}
              className='bg-orange-100 rounded-full p-2'
            />
            <p className='text-xl text-gray-500 w-96 text-center'>Let's showcase your journey, one job at a time. Add your first job now!</p>
            <Button onClick={() => setOpen(true)} type='primary'>Add Job</Button>
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
