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
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { CheckOutlined } from '@ant-design/icons';

const Profile = () => {

  const [current, setCurrent] = useState(0);
  const [skills, setSkills] = useState([]);
  const [userProfile, setUserProfile] = useState(null)
  const navigate = useNavigate();

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
        toast.success('Profile informations are updated',
          {
            style: {
              border: '1px solid green',
              padding: '16px',
              color: 'green',
            },
            iconTheme: {
              primary: 'green',
              secondary: '#FFFAEE',
            },
          }
        )
        setUserProfile(response.data);
        if (current < 5) {
          setCurrent(current + 1)
        } else {
          navigate(`/`)
        }
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        toast.error('Somenthing went wrong!');
      });

  }

  const steps = [
    {
      title: 'Personal Info',
      content: <PersonalInfo handleSetProfile={handleSetProfile} personal_details={userProfile?.personal_details} />
    },
    {
      title: 'Job History',
      content: <JobHistory handleSetProfile={handleSetProfile} work_histories={userProfile?.work_histories} />
    },
    {
      title: 'Education',
      content: <Education handleSetProfile={handleSetProfile} educational_details={userProfile?.educational_details} />
    },
    {
      title: 'Skills',
      content: <Skills skillsSet={skills} handleSetProfile={handleSetProfile} skills_data={userProfile?.skills} />
    },
    {
      title: 'Project Experience',
      content: <Project handleSetProfile={handleSetProfile} project_experiences={userProfile?.project_experiences} />
    },
    {
      title: 'Certification',
      content: <Certification handleSetProfile={handleSetProfile} certifications={userProfile?.certifications} />
    },
  ];

  const items = steps.map((item, i) => ({
    key: item.title,
    title: <span className='cursor-pointer' onClick={() => setCurrent(i)}>{item.title}</span>,
  }));

  return (
    <div className='p-2'>
      <Steps current={current} items={items} className='md:flex md:justify-center'>
      </Steps>
      <div className='mt-10'>
        {steps[current].content}
      </div>
    </div>

  );
};
export default Profile;