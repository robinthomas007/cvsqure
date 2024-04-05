import React, { useState } from 'react';
import { Button, Row, Col, Card } from 'antd';
import { FileValidationIcon, DragDropVerticalIcon, PencilEdit01Icon, Delete03Icon, PlusSignCircleIcon } from 'hugeicons-react';
import ProjectModal from './ProjectModal';

export default function Project({ handleSetProfile, project_experiences, setCurrent, current, renderToast, open, setOpen }) {

  // const [open, setOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const handleCancel = () => {
    setOpen(false)
    setEditProject(null)
  }

  return (
    <Row gutter={[16]}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <div>
          <h2 className='text-gray-700 text-3xl my-2'>Project Experience</h2>
          <p className='text-gray-500 text-lg'>Unleash your expertise: Share your project experiences and shine bright</p>
        </div>
      </Col>

      {open && <ProjectModal project_experiences={project_experiences} open={open} handleCancel={handleCancel} project={editProject} handleSetProfile={handleSetProfile} />}
      {project_experiences.length > 0 && <Col xs={24} sm={24} md={24} lg={24}>
        {project_experiences.map((project, index) => (
          <Card className='w-full my-4 shadow-sm hover:shadow' >
            <div className='flex justify-between'>
              <div className='flex'>
                <DragDropVerticalIcon
                  size={24}
                  color={"#000000"}
                  variant={"stroke"}
                />
                <div className='ml-2'>
                  <div className='text-gray-900 text-lg mb-2'>{project.name}<span className='text-gray-500 mx-2'> |</span><span className='text-gray-500 text-base'> {project.roles_responsibilities}</span></div>
                  <div className='text-base text-gray-500 mb-2'>{project.description}</div>
                  <div className='text-base text-gray-500'>{project.start_date} - {project.end_date}</div>
                </div>
              </div>
              <div className='flex gap-3'>
                <PencilEdit01Icon
                  size={20}
                  color={"#4F4C4C"}
                  variant={"stroke"}
                  onClick={() => {
                    setEditProject(project);
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
        <span onClick={() => setOpen(true)} className='text-orange-400 flex items-center gap-2 text-lg cursor-pointer mt-2'> <PlusSignCircleIcon size={20} /> Add Project</span>
      </Col>}

      {project_experiences.length === 0 && <Col xs={24} sm={24} md={24} lg={24}>
        <Card className='w-full' >
          <div className='flex flex-col items-center justify-center gap-4'>
            <FileValidationIcon
              size={54}
              color={"#F99417"}
              variant={"stroke"}
              className='bg-orange-100 rounded-full p-2'
            />
            <p className='text-xl text-gray-500 w-96 text-center'>Elevate your project with user-driven expertise. Transforming experiences, one valuable contribution at a time</p>
            <Button onClick={() => setOpen(true)} type='primary'> Add Project experience</Button>
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
