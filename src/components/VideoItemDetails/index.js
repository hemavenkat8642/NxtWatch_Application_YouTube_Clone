import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import Header from '../Header'
import {
  MainContainer,
  VideoItemContainer,
  ActionButton,
} from './styledComponents'
import LeftNavBar from '../LeftNavBar'
import VideoContext from '../../context/VideoContext'

class VideoItemDetails extends Component {
  state = {data: {}, apiStatus: 'initial'}

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: 'loading'})
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
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
        id: parsedResponse.video_details.id,
        title: parsedResponse.video_details.title,
        videoUrl: parsedResponse.video_details.video_url,
        thumbnailUrl: parsedResponse.video_details.thumbnail_url,
        channel: {
          name: parsedResponse.video_details.channel.name,
          profileImageUrl:
            parsedResponse.video_details.channel.profile_image_url,
          subscriberCount:
            parsedResponse.video_details.channel.subscriber_count,
        },
        viewCount: parsedResponse.video_details.view_count,
        publishedAt: parsedResponse.video_details.published_at,
        description: parsedResponse.video_details.description,
      }
      this.setState({data: updatedResponse, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failed'})
    }
  }

  render() {
    const {data, apiStatus} = this.state
    const {match} = this.props
    const {id} = match.params

    return (
      <VideoContext.Consumer>
        {value => (
          <MainContainer dark={value.darkTheme} data-testid="videoItemDetails">
            <Header />
            <VideoItemContainer>
              <LeftNavBar />
              <div style={{width: '82%', overflowY: 'auto', padding: '25px'}}>
                {apiStatus === 'success' && (
                  <div style={{width: '100%'}}>
                    <ReactPlayer
                      controls
                      width="712px"
                      height="400px"
                      style={{margin: 'auto', marginBottom: '25px'}}
                      url={data.videoUrl}
                    />
                    <p
                      style={{
                        margin: 0,
                        fontSize: '22px',
                        fontWeight: 600,
                        textAlign: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      {data.title}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: '25px',
                        borderBottom: '1px solid gray',
                        marginBottom: '25px',
                      }}
                    >
                      <p style={{margin: 0, marginBottom: '25px'}}>
                        {data.viewCount} • {data.publishedAt}
                      </p>
                      <div
                        style={{
                          width: '300px',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <ActionButton
                          dark={value.darkTheme}
                          highlight={value.likedVideos.find(
                            each => each.id === id,
                          )}
                          type="button"
                          onClick={() => value.likeVideo(data)}
                        >
                          <BiLike style={{marginRight: '3px'}} />
                          Like
                        </ActionButton>
                        <ActionButton
                          dark={value.darkTheme}
                          highlight={value.unLikedVideos.find(
                            each => each.id === id,
                          )}
                          type="button"
                          onClick={() => value.unLikeVideo(data)}
                        >
                          <BiDislike style={{marginRight: '3px'}} />
                          Dislike
                        </ActionButton>
                        <ActionButton
                          dark={value.darkTheme}
                          highlight={value.savedVideos.find(
                            each => each.id === id,
                          )}
                          type="button"
                          onClick={() => value.saveVideo(data)}
                        >
                          <MdPlaylistAdd
                            style={{marginRight: '3px', fontSize: '16px'}}
                          />
                          {value.savedVideos.find(each => each.id === id)
                            ? 'Saved'
                            : 'Save'}
                        </ActionButton>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                      }}
                    >
                      <img
                        src={data.channel.profileImageUrl}
                        alt="channel logo"
                        style={{
                          width: '45px',
                          height: 'auto',
                          marginRight: '10px',
                        }}
                      />
                      <div>
                        <p
                          style={{fontWeight: 500, fontSize: '13px', margin: 0}}
                        >
                          {data.channel.name}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            marginTop: '8px',
                            marginBottom: '8px',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: 'gray',
                          }}
                        >
                          {data.channel.subscriberCount}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            marginTop: '25px',
                            fontSize: '13px',
                          }}
                        >
                          {data.description}
                        </p>
                      </div>
                    </div>
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
                    <h1 style={{margin: '25px'}}>Oops! Something Went Wrong</h1>
                    <p style={{margin: 0, color: 'gray'}}>
                      We are having some trouble to complete your request.
                      Please try again.
                    </p>
                    <button
                      type="button"
                      onClick={this.getVideoDetails}
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
                      marginTop: '250px',
                      width: '95%',
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
              </div>
            </VideoItemContainer>
          </MainContainer>
        )}
      </VideoContext.Consumer>
    )
  }
}

export default withRouter(VideoItemDetails)
