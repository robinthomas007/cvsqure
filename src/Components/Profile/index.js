import React, { useEffect, useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import PersonalInfo from './PersonalInfo';
import JobHistory from './JobHistory';
import Education from './Education';
import Skills from './Skills';
import Project from './Project';
import Certification from './Certification'
import axios from 'axios'
import { useAuth } from './../../Context/authContext'

const Profile = () => {

  const [current, setCurrent] = useState(0);
  const [skills, setSkills] = useState([]);
  const [userProfile, setUserProfile] = useState(null)

  const auth = useAuth()

  useEffect(() => {
    axios.defaults.withCredentials = true

    axios.get(`http://localhost:8080/api/user/${auth.user.user_id}/profile`)
      .then(response => {
        setUserProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });

  }, [])

  useEffect(() => {
    axios.get(`http://localhost:8080/api/skills`)
      .then(response => {
        setSkills(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, []);

  const handleSetProfile = (data, type) => {
    axios.patch(`http://localhost:8080/api/profile/${userProfile.profile_id}`, { ...userProfile, [type]: data })
      .then(response => {
        setUserProfile(response.data);
        setCurrent(current + 1)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });

  }

  const steps = [
    {
      title: 'Personal Info',
      content: <PersonalInfo handleSetProfile={handleSetProfile} current={current} setCurrent={setCurrent} personal_details={userProfile?.personal_details} />
    },
    {
      title: 'Job History',
      content: <JobHistory handleSetProfile={handleSetProfile} work_histories={userProfile?.work_histories} current={current} setCurrent={setCurrent} />
    },
    {
      title: 'Education',
      content: <Education handleSetProfile={handleSetProfile} educational_details={userProfile?.educational_details} current={current} setCurrent={setCurrent} />
    },
    {
      title: 'Skills',
      content: <Skills skillsSet={skills} current={current} handleSetProfile={handleSetProfile} skills_data={userProfile?.skills} setCurrent={setCurrent} />
    },
    {
      title: 'Project Experience',
      content: <Project handleSetProfile={handleSetProfile} project_experiences={userProfile?.project_experiences} current={current} setCurrent={setCurrent} />
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
export default Profile;