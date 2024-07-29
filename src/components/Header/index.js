import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoSunnyOutline} from 'react-icons/io5'
import {FaMoon} from 'react-icons/fa'
import VideoContext from '../../context/VideoContext'
import {
  MainContainer,
  RightContainer,
  WebsiteLogo,
  LogoutBtn,
} from './styledComponents'

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <VideoContext.Consumer>
        {value => (
          <MainContainer dark={value.darkTheme}>
            <Link to="/">
              <WebsiteLogo
                src={
                  value.darkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                alt="website logo"
              />
            </Link>
            <RightContainer>
              <button
                type="button"
                style={{
                  border: '0px',
                  backgroundColor: 'transparent',
                  color: value.darkTheme ? '#ffffff' : '#000000',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                data-testid="theme"
                onClick={value.changeTheme}
              >
                {value.darkTheme ? (
                  <IoSunnyOutline style={{fontSize: '20px'}} />
                ) : (
                  <FaMoon style={{fontSize: '20px'}} />
                )}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                style={{width: '35px'}}
              />
              <Popup
                modal
                trigger={
                  <LogoutBtn type="button" dark={value.darkTheme}>
                    Logout
                  </LogoutBtn>
                }
                contentStyle={{
                  backgroundColor: value.darkTheme ? '#171717' : '#ffffff',
                  color: value.darkTheme ? '#ffffff' : '#000000',
                  padding: '15px',
                  width: '25%',
                  textAlign: 'center',
                  borderRadius: '10px',
                }}
              >
                {close => (
                  <>
                    <div>
                      <p>Are you sure, you want to logout?</p>
                    </div>
                    <button
                      style={{
                        backgroundColor: 'transparent',
                        border: `1px solid ${
                          value.darkTheme ? '#ffffff' : '#000000'
                        }`,
                        padding: '6px',
                        paddingLeft: '15px',
                        paddingRight: '15px',
                        borderRadius: '4px',
                        marginRight: '15px',
                        color: value.darkTheme ? '#ffffff' : '#000000',
                        cursor: 'pointer',
                      }}
                      type="button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      style={{
                        backgroundColor: '#3b82f6',
                        border: '0px',
                        padding: '7px',
                        paddingLeft: '15px',
                        paddingRight: '15px',
                        borderRadius: '4px',
                        color: '#ffffff',
                        cursor: 'pointer',
                      }}
                      type="button"
                      onClick={this.onClickLogout}
                    >
                      Confirm
                    </button>
                  </>
                )}
              </Popup>
            </RightContainer>
          </MainContainer>
        )}
      </VideoContext.Consumer>
    )
  }
}

export default withRouter(Header)
