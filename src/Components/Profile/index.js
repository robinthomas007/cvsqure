import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import PersonalInfo from './PersonalInfo';
import JobHistory from './JobHistory';
import Education from './Education';
import Skills from './Skills';
import Project from './Project';
import Certification from './Certification'

const App = () => {

  const [current, setCurrent] = useState(5);

  const steps = [
    {
      title: 'Personal Info',
      content: <PersonalInfo current={current} setCurrent={setCurrent} />
    },
    {
      title: 'Job History',
      content: <JobHistory current={current} setCurrent={setCurrent} />
    },
    {
      title: 'Education',
      content: <Education current={current} setCurrent={setCurrent} />
    },
    {
      title: 'Skills',
      content: <Skills current={current} setCurrent={setCurrent} />
    },
    {
      title: 'Project Experience',
      content: <Project current={current} setCurrent={setCurrent} />
    },
    {
      title: 'Certification',
      content: <Certification current={current} setCurrent={setCurrent} />
    },
  ];

  const items = steps.map((item, i) => ({
    key: item.title,
    title: <span className='cursor-pointer' onClick={() => setCurrent(i)}>{item.title}</span>,
  }));

  return (
    <div className='p-2'>
      <Steps current={current} items={items} />
      <div className='mt-10'>
        {steps[current].content}
      </div>
    </div>
  );
};
export default App;