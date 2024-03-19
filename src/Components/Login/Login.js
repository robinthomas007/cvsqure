import { Button } from "antd";
import { Layout, Card } from 'antd';
import Logo from './../../Images/logo.svg'
import Sedin from './../../Images/sedin.svg'
import { useAuth } from './../../Context/authContext'
import {
  ProfileOutlined,
} from '@ant-design/icons';
import GoogleLoginButton from './GoogleLoginButton'

const { Sider, Content } = Layout;

export default function LoginPage() {

  return (
    <Layout>

      <Content
        style={{
          minHeight: '100vh',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center', minHeight: '100vh', }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={Logo} alt="My Logo" width={100} />
            <img src={Sedin} alt=" Sedin" width={250} style={{ marginLeft: 20 }} />
          </div>
          <div className="text-center my-4">
            <h1 className="text-xl">Our business is transforming yours. <br />One outcome at a time.</h1>
            <p className="text-lg">We build solutions for enterprises, startups, and market leaders.</p>
          </div>
        </div>
      </Content>
      <Sider width={500} trigger={null} style={{ background: '#fff' }} className='login-right-slider'>

        <div className="w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center', minHeight: '100vh' }}>
          <Card style={{ width: '80%' }} size="large"
            title={
              <div className="text-center">
                <div className="flex flex-col p-10 items-center">
                  <h1 className="border-2 rounded-full w-20 border-red-300" style={{ margin: 0, fontSize: '3rem', fontWeight: 'bold', backgroundImage: 'linear-gradient(to right, #FF512F, #F09819)', WebkitBackgroundClip: 'text', color: 'transparent', backgroundClip: 'text' }}>CV</h1>
                  <p className="text-lg font-bold font-serif my-4">Sign in to your <h1 className='inline' style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', backgroundImage: 'linear-gradient(to right, #FF512F, #F09819)', WebkitBackgroundClip: 'text', color: 'transparent', backgroundClip: 'text' }}>CV</h1> account
                  </p>
                </div>
              </div>
            }>

            <div className="text-center">
              <GoogleLoginButton />
            </div>

          </Card>


        </div>

      </Sider>
    </Layout>
  )


}