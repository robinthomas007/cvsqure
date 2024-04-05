import React, { } from 'react';
import { Button } from 'antd';
import Google from './../../Images/google.png'

function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    // Redirect user to Google OAuth login page
    window.location.href = 'http://localhost:8080/auth/google';
  };

  return (
    <Button onClick={handleGoogleLogin}
      style={{ backgroundColor: '#fff', color: '#000', height: 60 }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={Google} alt="Google" style={{ marginRight: '8px', height: '50px', width: 'auto' }} />
        <span style={{ fontSize: 16, fontWeight: 'bold', color: "#6f6d6d" }}>Login with Google</span>
      </div>
    </Button>
  );
}

export default GoogleLoginButton;