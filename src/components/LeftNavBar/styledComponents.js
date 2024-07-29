import styled from 'styled-components'

export const NavBarContainer = styled.div`
  height: 100%;
  width: 18%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => (props.dark ? '#171717' : '#ffffff')};
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
`

export const NavBarTopCard = styled.ul`
  margin-top: 5px;
  list-style: none;
  padding: 0;
`

export const NavBarBottomCard = styled.div`
  margin: 15px;
  padding: 5px;
`

export const NavItem = styled.p`
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
  text-decoration: none;
  font-size: 18px;
`
