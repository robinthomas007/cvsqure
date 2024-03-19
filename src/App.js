import { ConfigProvider } from 'antd';
import Router from './Router'
import { AuthProvider } from './Context/authContext'
import './App.css'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b', borderRadius: 2,
          components: {
            Input: {
            }
          },
        }
      }}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
