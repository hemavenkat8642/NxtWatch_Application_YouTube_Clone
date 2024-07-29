import React from 'react'

const VideoContext = React.createContext({
  savedVideos: [],
  likedVideos: [],
  unLikedVideos: [],
  darkTheme: false,
  activeTabId: 'home',
  setActiveTabId: () => {},
  changeTheme: () => {},
  saveVideo: () => {},
  likeVideo: () => {},
  unlikeVideo: () => {},
})

export default VideoContext
