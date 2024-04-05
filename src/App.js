import { ConfigProvider } from 'antd';
import Router from './Router'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './Context/authContext'
import './App.css'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "League Spartan",
          colorPrimary: '#168D7F',
          components: {
          },
        }
      }}>
      <AuthProvider>
        <Toaster position='top-right' />
        <Router />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
