import styled from 'styled-components'

export const MainContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => (props.dark ? '#171717' : '#ffffff')};
  padding: 18px;
  padding-left: 45px;
  padding-right: 45px;
`

export const RightContainer = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
`

export const WebsiteLogo = styled.img`
  width: 150px;
`

export const LogoutBtn = styled.button`
  color: ${props => (props.dark ? '#ffffff' : '#3b82f6')};
  background-color: transparent;
  border: 1px solid ${props => (props.dark ? '#ffffff' : '#3b82f6')};
  border-radius: 4px;
  padding: 5px;
  width: 70px;
  cursor: pointer;
`
