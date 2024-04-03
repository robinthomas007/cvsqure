import React, { useEffect, useState } from 'react';
import { Steps, Select, Space, Row, Col, Card, Progress } from 'antd';
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
import { CheckmarkCircle01Icon } from "hugeicons-react";

const Profile = () => {

  const [current, setCurrent] = useState(0);
  const [percent, setPercent] = useState(20);
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
        calculatePercentageCompletion(response.data)
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
        setUserProfile(response.data);
        calculatePercentageCompletion(response.data)
        if (current === 0 || current === 3) {
          setCurrent(current + 1)
          renderToast()
        }
        if (current === 5) {
          // logic for preview page comes here
          renderToast()
        }
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        toast.error('Somenthing went wrong!');
      });

  }

  const calculatePercentageCompletion = (data) => {
    let filledSectionsCount = 1;
    if (data.project_experiences.length > 0) filledSectionsCount++;
    if (data.work_histories.length > 0) filledSectionsCount++;
    if (data.skills.length > 0) filledSectionsCount++;
    if (data.educational_details.length > 0) filledSectionsCount++;
    if (data.certifications.length > 0) filledSectionsCount++;

    switch (filledSectionsCount) {
      case 1:
        setPercent(20)
        break;
      case 2:
        setPercent(40)
        break;
      case 3:
        setPercent(50)
        break;
      case 4:
        setPercent(70)
        break;
      case 5:
        setPercent(80)
        break;
      case 6:
        setPercent(100)
        break;
      default:
        setPercent(100)
    }
  }

  const renderToast = () => {
    toast.dismiss()
    return toast.success(<div style={{ width: 400 }}><span className='text-white'>🎉 Looking good! Let’s tackle your profe</span><span>ssional experience.</span></div>, {
      style: {
        maxWidth: '600px',
        marginTop: 100,
        height: '42px',
        borderRadius: '8px',
        padding: '7px 16px',
        background: 'linear-gradient(to right, #168D7F 0%, #FFFFFF 100%)',
        color: '#168D7F',
        boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.1)',
      },
      iconTheme: {
        primary: '#168D7F',
        secondary: '#FFFAEE',
      },
      icon: null,
      position: "top-right",
    });
  }

  const steps = [
    {
      title: 'Personal Info',
      content: <PersonalInfo
        handleSetProfile={handleSetProfile}
        personal_details={userProfile?.personal_details}
        setCurrent={setCurrent} current={current}
      />,
    },
    {
      title: 'Job History',
      content: <JobHistory
        handleSetProfile={handleSetProfile}
        work_histories={userProfile?.work_histories}
        setCurrent={setCurrent}
        current={current}
        renderToast={renderToast}
      />
    },
    {
      title: 'Education',
      content: <Education
        handleSetProfile={handleSetProfile}
        educational_details={userProfile?.educational_details}
        setCurrent={setCurrent}
        current={current}
        renderToast={renderToast}
      />
    },
    {
      title: 'Skills',
      content: <Skills
        skillsSet={skills}
        handleSetProfile={handleSetProfile}
        skills_data={userProfile?.skills}
        setCurrent={setCurrent}
        current={current}
        renderToast={renderToast}
      />
    },
    {
      title: 'Project Experience',
      content: <Project
        handleSetProfile={handleSetProfile}
        project_experiences={userProfile?.project_experiences}
        setCurrent={setCurrent}
        current={current}
        renderToast={renderToast}
      />
    },
    {
      title: 'Certification',
      content: <Certification
        handleSetProfile={handleSetProfile}
        certifications={userProfile?.certifications}
        setCurrent={setCurrent}
        current={current}
        renderToast={renderToast}
      />
    },
  ];

  const items = steps.map((item, i) => ({
    key: item.title,
    title: <span className='cursor-pointer' onClick={() => setCurrent(i)}>{item.title}</span>,
    icon: <CheckmarkCircle01Icon
      size={24}
      color={"#CFCFCF"}
    />

  }));

  const handleViewTemplate = () => {
    navigate(`/user/${id}/template?template=${template}`)
  }

  const handleTemplateChange = (value) => {
    setTemplate(value)
  };

  return (
    <div className='p-2'>
      <Card className='bg-white shadow-lg' style={{ borderRadius: 8 }}>
        <Row>
          <Col span={5}>
            <div className='rounded-lg p-6 m-r-10 border-2 bg-red w-full'>
              <Steps responsive direction="vertical" current={current} items={items} style={{ minHeight: 300 }}></Steps>
              <Progress percent={percent} strokeColor="#168D7F" strokeWidth={10} />
            </div>
          </Col>
          <Col span={18} push={1}>
            <div className=''>
              {steps[current].content}
            </div>
          </Col>
        </Row>
      </Card>
      {id && <div className='flex justify-between mb-10'>
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
      </div>}

    </div>

  );
};
export default Profile;