import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoIosSearch} from 'react-icons/io'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import {MainContainer, HomeContainer, BannerContainer} from './styledComponents'
import LeftNavBar from '../LeftNavBar'
import VideoContext from '../../context/VideoContext'
import HomeVideoItem from '../HomeVideoItem'

class Home extends Component {
  state = {bannerOpen: true, searchText: '', data: {}, apiStatus: 'initial'}

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: 'loading'})
    const jwtToken = Cookies.get('jwt_token')
    const {searchText} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchText}`
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
          channel: {
            name: each.channel.name,
            profileImageUrl: each.channel.profile_image_url,
          },
          viewCount: each.view_count,
          publishedAt: each.published_at,
        })),
        total: parsedResponse.total,
      }
      this.setState({data: updatedResponse, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failed'})
    }
  }

  searchButtonClick = () => {
    this.getVideos()
  }

  render() {
    const {bannerOpen, searchText, data, apiStatus} = this.state

    return (
      <VideoContext.Consumer>
        {value => (
          <MainContainer dark={value.darkTheme} data-testid="home">
            <Header />
            <HomeContainer>
              <LeftNavBar />
              <div style={{width: '82%', overflowY: 'auto'}}>
                {bannerOpen && (
                  <BannerContainer data-testid="banner">
                    <div style={{width: '100%'}}>
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                          style={{width: '150px'}}
                        />
                        <button
                          data-testid="close"
                          type="button"
                          style={{
                            backgroundColor: 'transparent',
                            border: 0,
                            marginRight: '15px',
                            fontSize: '25px',
                            cursor: 'pointer',
                          }}
                          onClick={() => this.setState({bannerOpen: false})}
                        >
                          x
                        </button>
                      </div>
                      <p
                        style={{
                          fontSize: '25px',
                          margin: 0,
                          marginTop: 10,
                          color: 'black',
                        }}
                      >
                        Buy Nxt Watch Premium prepaid plans with UPI
                      </p>
                      <button
                        type="button"
                        style={{
                          backgroundColor: 'transparent',
                          padding: '10px',
                          border: '2px solid black',
                          fontWeight: 600,
                          marginTop: '60px',
                        }}
                      >
                        GET IT NOW
                      </button>
                    </div>
                  </BannerContainer>
                )}
                <div
                  style={{
                    width: '45%',
                    margin: '20px',
                    border: '1px solid gray',
                    display: 'flex',
                    alignItems: 'center',
                    height: '30px',
                  }}
                >
                  <div
                    style={{
                      width: '90%',
                      height: '100%',
                      margin: 0,
                      padding: 0,
                      backgroundColor: value.darkTheme ? 'black' : 'white',
                    }}
                  >
                    <input
                      type="search"
                      value={searchText}
                      onChange={e =>
                        this.setState({searchText: e.target.value})
                      }
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          this.getVideos()
                        }
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 0,
                        outline: 'none',
                        backgroundColor: 'transparent',
                        color: value.darkTheme ? 'white' : 'black',
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    aria-label="Search"
                    onClick={this.searchButtonClick}
                    style={{
                      width: '10%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                      border: 0,
                      borderLeft: '1px solid gray',
                      cursor: 'pointer',
                    }}
                    data-testid="searchButton"
                  >
                    <IoIosSearch
                      style={{color: value.darkTheme ? 'white' : 'black'}}
                    />
                  </button>
                </div>
                <ul
                  style={{
                    margin: '10px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                  }}
                >
                  {apiStatus === 'success' &&
                    data.videos.map(each => (
                      <HomeVideoItem
                        key={each.id}
                        video={each}
                        dark={value.darkTheme}
                      />
                    ))}
                  {apiStatus === 'success' && data.videos.length === 0 && (
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
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                        alt="no videos"
                        style={{width: '300px', height: 'auto'}}
                      />
                      <h1 style={{margin: '15px', fontSize: '25px'}}>
                        No Search results found
                      </h1>
                      <p style={{margin: 0, color: 'gray'}}>
                        Try different key words or remove search filter
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
                          marginTop: '15px',
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
                        marginTop: '125px',
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
            </HomeContainer>
          </MainContainer>
        )}
      </VideoContext.Consumer>
    )
  }
}

export default Home
