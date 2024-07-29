import {Component} from 'react'
import Header from '../Header'
import {MainContainer, NotFoundContainer} from './styledComponents'
import LeftNavBar from '../LeftNavBar'
import VideoContext from '../../context/VideoContext'

class NotFound extends Component {
  render() {
    return (
      <VideoContext.Consumer>
        {value => (
          <MainContainer dark={value.darkTheme}>
            <Header />
            <NotFoundContainer>
              <LeftNavBar />
              <div
                style={{
                  width: '82%',
                  height: '100%',
                  overflowY: 'auto',
                  padding: '25px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={
                    value.darkTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                  }
                  alt="not found"
                  style={{width: '500px', height: 'auto'}}
                />
                <h1 style={{margin: '25px'}}>Page Not Found</h1>
                <p style={{margin: 0, color: 'gray'}}>
                  We are sorry, the page you requested could not be found.
                </p>
              </div>
            </NotFoundContainer>
          </MainContainer>
        )}
      </VideoContext.Consumer>
    )
  }
}

export default NotFound
