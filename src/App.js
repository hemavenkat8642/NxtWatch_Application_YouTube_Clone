import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import VideoContext from './context/VideoContext'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    savedVideos: [],
    likedVideos: [],
    unLikedVideos: [],
    darkTheme: false,
    activeTabId: 'home',
  }

  saveVideo = video => {
    const {savedVideos} = this.state

    const savedVideo = savedVideos.find(each => each.id === video.id)

    if (savedVideo !== undefined) {
      const newList = savedVideos.filter(each => each.id !== video.id)
      this.setState({savedVideos: [...newList]})
    } else {
      this.setState({savedVideos: [...savedVideos, video]})
    }
  }

  likeVideo = video => {
    const {likedVideos, unLikedVideos} = this.state

    const likedVideo = likedVideos.find(each => each.id === video.id)
    const unLikedVideo = unLikedVideos.find(each => each.id === video.id)

    if (likedVideo !== undefined) {
      const newList = likedVideos.filter(each => each.id !== video.id)
      this.setState({likedVideos: [...newList]})
    } else {
      this.setState({likedVideos: [...likedVideos, video]})
    }
    if (unLikedVideo !== undefined) {
      const newList = unLikedVideos.filter(each => each.id !== video.id)
      this.setState({unLikedVideos: [...newList]})
    }
  }

  unLikeVideo = video => {
    const {likedVideos, unLikedVideos} = this.state

    const likedVideo = likedVideos.find(each => each.id === video.id)
    const unLikedVideo = unLikedVideos.find(each => each.id === video.id)

    if (unLikedVideo !== undefined) {
      const newList = likedVideos.filter(each => each.id !== video.id)
      this.setState({unLikedVideos: [...newList]})
    } else {
      this.setState({unLikedVideos: [...unLikedVideos, video]})
    }
    if (likedVideo !== undefined) {
      const newList = unLikedVideos.filter(each => each.id !== video.id)
      this.setState({likedVideos: [...newList]})
    }
  }

  changeTheme = () => {
    this.setState(prev => ({darkTheme: !prev.darkTheme}))
  }

  setActiveTabId = value => {
    this.setState({activeTabId: value})
  }

  render() {
    const {
      savedVideos,
      likedVideos,
      unLikedVideos,
      darkTheme,
      activeTabId,
    } = this.state

    return (
      <VideoContext.Provider
        value={{
          savedVideos,
          likedVideos,
          unLikedVideos,
          darkTheme,
          activeTabId,
          changeTheme: this.changeTheme,
          saveVideo: this.saveVideo,
          likeVideo: this.likeVideo,
          unLikeVideo: this.unLikeVideo,
          setActiveTabId: this.setActiveTabId,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </VideoContext.Provider>
    )
  }
}

export default App
