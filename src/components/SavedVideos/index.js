import {Component} from 'react'
import {MdPlaylistAdd} from 'react-icons/md'
import Header from '../Header'
import {MainContainer, SavedVideosContainer} from './styledComponents'
import LeftNavBar from '../LeftNavBar'
import VideoContext from '../../context/VideoContext'
import SavedVideoItem from '../SavedVideoItem'

class SavedVideos extends Component {
  render() {
    return (
      <VideoContext.Consumer>
        {value => (
          <MainContainer dark={value.darkTheme} data-testid="savedVideos">
            <Header />
            <SavedVideosContainer>
              <LeftNavBar />
              <div style={{width: '82%', overflowY: 'auto'}}>
                {value.savedVideos.length !== 0 && (
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
                      <MdPlaylistAdd style={{color: 'red', fontSize: '30px'}} />
                    </div>
                    <h1 style={{margin: 0}}>Saved Videos</h1>
                  </div>
                )}
                <ul
                  style={{
                    margin: '10px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                  }}
                >
                  {value.savedVideos &&
                    value.savedVideos.map(each => (
                      <SavedVideoItem
                        key={each.id}
                        video={each}
                        dark={value.darkTheme}
                      />
                    ))}
                  {value.savedVideos.length === 0 && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        padding: '25px',
                        display: 'flex',
                        marginTop: '35px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        alt="no saved videos"
                        style={{width: '500px', height: 'auto'}}
                      />
                      <h1 style={{margin: '25px'}}>No saved videos found</h1>
                      <p style={{margin: 0, color: 'gray'}}>
                        You can save your videos while watching them
                      </p>
                    </div>
                  )}
                </ul>
              </div>
            </SavedVideosContainer>
          </MainContainer>
        )}
      </VideoContext.Consumer>
    )
  }
}

export default SavedVideos
