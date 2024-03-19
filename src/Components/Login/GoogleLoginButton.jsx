import React, { useEffect, useCallback, useContext } from 'react';
import { Button } from 'antd';
import Google from './../../Images/google.png'

// import { GoogleLogin } from 'react-google-login';
// import GoogleButton from 'react-google-button';
// import { validateTokenAndObtainSession } from './sdk';


// function GoogleLoginButton() {
//   const REACT_APP_GOOGLE_CLIENT_ID = '272814105720-9dbsu2o805baildcvdpf4ku3b4k7p7km.apps.googleusercontent.com';

//   const handleUserInit = useCallback(
//     resp => {
//       if (resp.ok) {
//         // setUser(resp.data);
//         document.location.href = "/";
//         // history.push("/");
//       } else {
//         alert(resp.data[0]);
//       }
//     }
//   );

//   const onGoogleLoginSuccess = useCallback(
//     response => {
//       const idToken = response.tokenId;
//       const data = {
//         email: response.profileObj.email,
//         first_name: response.profileObj.givenName,
//         last_name: response.profileObj.familyName
//       };

//       validateTokenAndObtainSession({ data, idToken })
//         .then(handleUserInit)
//         .catch(alert);
//     },
//     [handleUserInit]
//   );

//   const openGoogleLoginPage = useCallback(() => {
//     const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
//     const redirectUri = 'auth/google';
//     const backendUrl = 'http://localhost:8080';

//     const scope = [
//       'https://www.googleapis.com/auth/userinfo.email',
//       'https://www.googleapis.com/auth/userinfo.profile'
//     ].join(' ');

//     const params = {
//       response_type: 'code',
//       client_id: REACT_APP_GOOGLE_CLIENT_ID,
//       redirect_uri: `${backendUrl}/${redirectUri}`,
//       prompt: 'select_account',
//       access_type: 'offline',
//       scope
//     };

//     const urlParams = new URLSearchParams(params).toString();

//     window.location = `${googleAuthUrl}?${urlParams}`;
//   }, []);

//   <GoogleLogin
//     render={renderProps => <GoogleButton {...renderProps} />}
//     clientId={REACT_APP_GOOGLE_CLIENT_ID}
//     buttonText="Sign in with Google"
//     onSuccess={onGoogleLoginSuccess}
//     onFailure={({ details }) => alert(details)}
//   />
// }


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