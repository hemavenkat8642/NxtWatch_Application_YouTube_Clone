import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoGameController} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import {MainContainer, GameContainer} from './styledComponents'
import LeftNavBar from '../LeftNavBar'
import VideoContext from '../../context/VideoContext'
import GamingVideoItem from '../GamingVideoItem'

class Gaming extends Component {
  state = {data: {}, apiStatus: 'initial'}

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: 'loading'})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const parsedResponse = await response.json()
      const updatedResponse = {
        videos: parsedResponse.videos.map(each => ({
          id: each.id,
          title: each.title,
          thumbnailUrl: each.thumbnail_url,
          viewCount: each.view_count,
        })),
        total: parsedResponse.total,
      }
      this.setState({data: updatedResponse, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failed'})
    }
  }

  render() {
    const {data, apiStatus} = this.state

    return (
      <VideoContext.Consumer>
        {value => (
          <MainContainer dark={value.darkTheme} data-testid="gaming">
            <Header />
            <GameContainer>
              <LeftNavBar />
              <div style={{width: '82%', overflowY: 'auto'}}>
                {apiStatus === 'success' && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: '20px',
                      paddingLeft: '35px',
                      backgroundColor: value.darkTheme
                        ? '#00000040'
                        : '#ebebeb90',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: value.darkTheme ? 'black' : 'white',
                        padding: '15px',
                        border: 0,
                        borderRadius: '50%',
                        marginRight: '20px',
                      }}
                    >
                      <IoGameController
                        style={{color: 'red', fontSize: '30px'}}
                      />
                    </div>
                    <h1 style={{margin: 0}}>Gaming</h1>
                  </div>
                )}
                <ul
                  style={{
                    margin: '25px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                  }}
                >
                  {apiStatus === 'success' &&
                    data.videos.map(each => (
                      <GamingVideoItem
                        key={each.id}
                        video={each}
                        dark={value.darkTheme}
                      />
                    ))}
                  {apiStatus === 'failed' && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
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
                            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                        }
                        alt="failure view"
                        style={{width: '500px', height: 'auto'}}
                      />
                      <h1 style={{margin: '25px'}}>
                        Oops! Something Went Wrong
                      </h1>
                      <p style={{margin: 0, color: 'gray'}}>
                        We are having some trouble
                      </p>
                      <p style={{margin: '10px', color: 'gray'}}>
                        Please try again.
                      </p>
                      <button
                        type="button"
                        onClick={this.getVideos}
                        style={{
                          backgroundColor: '#4f46e5',
                          color: 'white',
                          fontWeight: 600,
                          border: 0,
                          borderRadius: '6px',
                          marginTop: '5px',
                          padding: '15px',
                          paddingTop: '5px',
                          paddingBottom: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Retry
                      </button>
                    </div>
                  )}
                  {apiStatus === 'loading' && (
                    <div
                      className="loader-container"
                      data-testid="loader"
                      style={{
                        marginLeft: '10px',
                        marginTop: '200px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Loader
                        type="ThreeDots"
                        color="#00306e"
                        height="50"
                        width="50"
                      />
                    </div>
                  )}
                </ul>
              </div>
            </GameContainer>
          </MainContainer>
        )}
      </VideoContext.Consumer>
    )
  }
}

export default Gaming
