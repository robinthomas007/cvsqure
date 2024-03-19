import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import PersonalInfo from './PersonalInfo';

const App = () => {

  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: 'Personal Info',
      content: <PersonalInfo current={current} setCurrent={setCurrent} />
    },
    {
      title: 'Job History',
      content: 'Second-content',
    },
    {
      title: 'Education',
      content: 'Last-content',
    },
    {
      title: 'Skills',
      content: 'Last-content',
    },
    {
      title: 'Project Experience',
      content: 'Last-content',
    },
    {
      title: 'Certification',
      content: 'Last-content',
    },
  ];

  const items = steps.map((item, i) => ({
    key: item.title,
    title: <span className='cursor-pointer' onClick={() => setCurrent(i)}>{item.title}</span>,
  }));

  return (
    <div className='p-2'>
      <Steps current={current} items={items} />
      <div className='mt-10 px-20'>
        {steps[current].content}
      </div>
    </div>
  );
};
export default App;