import React, { useEffect, useState } from 'react';
import { Steps, Select, Space } from 'antd';
import PersonalInfo from './PersonalInfo';
import JobHistory from './JobHistory';
import Education from './Education';
import Skills from './Skills';
import Project from './Project';
import Certification from './Certification'
import axios from './../../Api/axios'
import { useAuth } from './../../Context/authContext'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import { EyeOutlined } from '@ant-design/icons';

const Profile = () => {

  const [current, setCurrent] = useState(0);
  const [skills, setSkills] = useState([]);
  const [userProfile, setUserProfile] = useState(null)
  const [template, setTemplate] = useState('one')
  const navigate = useNavigate();

  let { id } = useParams();

  const auth = useAuth()

  useEffect(() => {
    let url = `${process.env.REACT_APP_BASE_URL}/api/user/${auth.user.user_id}/profile`
    if (id) {
      url = `${process.env.REACT_APP_BASE_URL}/api/admin/user/${id}/profile`
    }
    axios.defaults.withCredentials = true
    axios.get(url)
      .then(response => {
        setUserProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });

  }, [id])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/skills`)
      .then(response => {
        setSkills(response.data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, []);


  const handleSetProfile = (data, type, isApproval) => {
    let url = `${process.env.REACT_APP_BASE_URL}/api/profile/${userProfile.profile_id}`
    if (id) {
      url = `${process.env.REACT_APP_BASE_URL}/api/admin/profile/${userProfile.profile_id}`
    }

    axios.patch(url, { ...userProfile, [type]: data, submit_for_approval: isApproval ? true : false })
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

  const handleViewTemplate = () => {
    navigate(`/user/${id}/template?template=${template}`)
  }

  const handleTemplateChange = (value) => {
    setTemplate(value)
  };

  return (
    <div className='p-2'>
      <div className='flex justify-between mb-10'>
        <div className='text-2xl font-semibold text-blue-600'>Edit User</div>
        <Space>
          <label className='font-semibold text-blue-600'>Version:</label>
          <Select placeholder="Version"
            defaultValue="1"
            options={[
              { value: '1', label: '1.0' },
            ]}
          />
          <label className='font-semibold text-blue-600'>Template:</label>
          <Select placeholder="Template"
            defaultValue={template}
            onChange={handleTemplateChange}
            options={[
              { value: 'one', label: 'Railsfactory' },
              { value: 'two', label: 'Sedin' },
              { value: 'three', label: 'RF Logo' },
            ]}
          />
          <EyeOutlined onClick={handleViewTemplate} />
        </Space>
      </div>
      <Steps current={current} items={items} className='md:flex md:justify-center'>
      </Steps>
      <div className='mt-10'>
        {steps[current].content}
      </div>
    </div>

  );
};
export default Profile;