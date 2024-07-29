import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import VideoContext from '../../context/VideoContext'

import {
  LoginContainer,
  LoginCard,
  Logo,
  Label,
  Input,
  InputSubmit,
  ErrMsg,
  ShowPasswordContainer,
} from './styledComponents'

class Login extends Component {
  state = {username: '', password: '', showPassword: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  showPassword = () => {
    this.setState(prev => ({showPassword: !prev.showPassword}))
  }

  submitForm = async event => {
    event.preventDefault()
    this.setState({errorMsg: ''})
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = this.props

      Cookies.set('jwt_token', data.jwt_token, {
        expires: 30,
      })
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, showPassword, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <VideoContext.Consumer>
        {value => (
          <LoginContainer
            dark={value.darkTheme}
            className="main-login-container"
          >
            <LoginCard
              onSubmit={this.submitForm}
              dark={value.darkTheme}
              className="login-card"
            >
              <Logo
                src={
                  value.darkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                alt="website logo"
              />

              <Label dark={value.darkTheme} htmlFor="username">
                USERNAME
              </Label>
              <Input
                type="text"
                bottomMargin="true"
                id="username"
                value={username}
                onChange={this.onChangeUsername}
              />

              <Label dark={value.darkTheme} htmlFor="password">
                PASSWORD
              </Label>
              <Input
                id="password"
                value={password}
                onChange={this.onChangePassword}
                type={showPassword ? 'text' : 'password'}
              />

              <ShowPasswordContainer>
                <input
                  id="showPassword"
                  type="checkbox"
                  value={showPassword}
                  onChange={this.showPassword}
                />
                <Label dark={value.darkTheme} htmlFor="showPassword">
                  Show Password
                </Label>
              </ShowPasswordContainer>

              <InputSubmit
                style={{color: 'white'}}
                type="submit"
                value="Login"
              />

              {errorMsg !== '' && <ErrMsg>{errorMsg}</ErrMsg>}
            </LoginCard>
          </LoginContainer>
        )}
      </VideoContext.Consumer>
    )
  }
}

export default Login
