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
          colorPrimary: '#2563eb', borderRadius: 2,
          components: {
            Input: {
            }
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
