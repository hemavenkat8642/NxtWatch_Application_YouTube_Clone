import styled from 'styled-components'

export const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.dark ? '#0f0f0f' : '#f9f9f9')};
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
`

export const VideoItemContainer = styled.div`
  height: 80vh;
  flex-grow: 1;
  display: flex;
`

export const ActionButton = styled.button`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid
    ${props => {
      if (props.highlight) {
        return '#2563eb'
      }
      return props.dark ? '#64748b' : '#64748b'
    }};
  border-radius: 6px;
  padding: 3px;
  width: 90px;
  outline: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  color: ${props => {
    if (props.highlight) {
      return '#2563eb'
    }
    return props.dark ? '#64748b' : '#64748b'
  }};
`
