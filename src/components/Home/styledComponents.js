import styled from 'styled-components'

export const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.dark ? '#181818' : '#f9f9f9')};
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
`

export const HomeContainer = styled.div`
  height: 80vh;
  flex-grow: 1;
  display: flex;
`

export const BannerContainer = styled.div`
  width: 100%;
  height: 250px;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  padding: 25px;
  padding-top: 18px;
`
