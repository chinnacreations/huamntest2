// import {Component} from 'react'
// import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'

// import {
//   AppContainer,
//   FormContainer,
//   LoginLogo,
//   InputContainer,
//   LoginButton,
//   SubmitError,
//   InputLabel,
//   UserInput,
//   CheckboxContainer,
//   Checkbox,
//   ShowPassword,
// } from './StyledComponents'

// class LoginForm extends Component {
//   state = {
//     username: '',
//     password: '',
//     showPassword: false,
//     showSubmitError: false,
//     errorMsg: '',
//   }

//   onChangeHandler = event => {
//     this.setState({[event.target.name]: event.target.value})
//   }

//   OnShowPassword = () => {
//     this.setState(prevState => ({showPassword: !prevState.showPassword}))
//   }

//   onSubmitSuccess = jwtToken => {
//     const {history} = this.props

//     Cookies.set('jwt_token', jwtToken, {
//       expires: 30,
//       path: '/',
//     })
//     history.replace('/')
//   }

//   onSubmitFailure = errorMsg => {
//     this.setState({showSubmitError: true, errorMsg})
//   }

//   submitForm = async event => {
//     event.preventDefault()
//     const {username, password} = this.state
//     const userDetails = {username, password}
//     const url = 'https://apis.ccbp.in/login'
//     const options = {
//       method: 'POST',
//       body: JSON.stringify(userDetails),
//     }
//     const response = await fetch(url, options)
//     const data = await response.json()
//     if (response.ok === true) {
//       this.onSubmitSuccess(data.jwt_token)
//     } else {
//       this.onSubmitFailure(data.error_msg)
//     }
//   }

//   renderUsernameField = () => {
//     const {username} = this.state
//     return (
//       <>
//         <InputLabel htmlFor="username">USERNAME (rahul)</InputLabel>
//         <UserInput
//           type="text"
//           id="username"
//           value={username}
//           name="username"
//           onChange={this.onChangeHandler}
//           placeholder="Username"
//         />
//       </>
//     )
//   }

//   renderPasswordField = () => {
//     const {password, showPassword} = this.state
//     const inputType = showPassword ? 'text' : 'password'
//     return (
//       <>
//         <InputLabel htmlFor="password">PASSWORD (rahul@2021)</InputLabel>
//         <UserInput
//           type={inputType}
//           id="password"
//           value={password}
//           name="password"
//           onChange={this.onChangeHandler}
//           placeholder="Password"
//         />
//         <CheckboxContainer>
//           <Checkbox
//             type="checkbox"
//             id="checkbox"
//             onChange={this.OnShowPassword}
//           />
//           <ShowPassword htmlFor="checkbox">Show Password</ShowPassword>
//         </CheckboxContainer>
//       </>
//     )
//   }

//   render() {
//     const {showSubmitError, errorMsg} = this.state
//     const jwtToken = Cookies.get('jwt_token')
//     if (jwtToken !== undefined) {
//       return <Redirect to="/" />
//     }
//     return (
//       <AppContainer>
//         <FormContainer onSubmit={this.submitForm}>
//           <LoginLogo
//             src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
//             alt="website logo"
//           />
//           <InputContainer>{this.renderUsernameField()}</InputContainer>
//           <InputContainer>{this.renderPasswordField()}</InputContainer>
//           <LoginButton type="submit">Login</LoginButton>
//           {showSubmitError && <SubmitError>*{errorMsg}</SubmitError>}
//         </FormContainer>
//       </AppContainer>
//     )
//   }
// }

// export default LoginForm


import { useState } from 'react';
import Cookies from 'js-cookie';
import { Redirect, useHistory } from 'react-router-dom';

import {
  AppContainer,
  FormContainer,
  LoginLogo,
  InputContainer,
  LoginButton,
  SubmitError,
  InputLabel,
  UserInput,
  CheckboxContainer,
  Checkbox,
  ShowPassword,
} from './StyledComponents';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  const onChangeUsername = event => setUsername(event.target.value);
  const onChangePassword = event => setPassword(event.target.value);
  const onShowPassword = () => setShowPassword(prevState => !prevState);

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30, path: '/' });
    history.replace('/');
  };

  const onSubmitFailure = errorMsg => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitForm = async event => {
    event.preventDefault();
    const userDetails = { username, password };
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  const renderUsernameField = () => (
    <>
      <InputLabel htmlFor="username">USERNAME (rahul)</InputLabel>
      <UserInput
        type="text"
        id="username"
        value={username}
        name="username"
        onChange={onChangeUsername}
        placeholder="Username"
      />
    </>
  );

  const renderPasswordField = () => {
    const inputType = showPassword ? 'text' : 'password';
    return (
      <>
        <InputLabel htmlFor="password">PASSWORD (rahul@2021)</InputLabel>
        <UserInput
          type={inputType}
          id="password"
          value={password}
          name="password"
          onChange={onChangePassword}
          placeholder="Password"
        />
        <CheckboxContainer>
          <Checkbox type="checkbox" id="checkbox" onChange={onShowPassword} />
          <ShowPassword htmlFor="checkbox">Show Password</ShowPassword>
        </CheckboxContainer>
      </>
    );
  };

  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken !== undefined) {
    return <Redirect to="/" />;
  }

  return (
    <AppContainer>
      <FormContainer onSubmit={submitForm}>
        <LoginLogo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />
        <InputContainer>{renderUsernameField()}</InputContainer>
        <InputContainer>{renderPasswordField()}</InputContainer>
        <LoginButton type="submit">Login</LoginButton>
        {showSubmitError && <SubmitError>*{errorMsg}</SubmitError>}
      </FormContainer>
    </AppContainer>
  );
};

export default LoginForm;
