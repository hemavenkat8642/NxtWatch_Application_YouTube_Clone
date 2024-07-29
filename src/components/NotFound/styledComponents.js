import styled from 'styled-components'

export const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.dark ? '#181818' : '#f9f9f9')};
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
`

export const NotFoundContainer = styled.div`
  height: 80vh;
  flex-grow: 1;
  display: flex;
`
