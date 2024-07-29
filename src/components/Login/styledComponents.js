import styled from 'styled-components'

export const LoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.dark ? '#171717' : '#00000010')};
`

export const LoginCard = styled.form`
  min-height: 50%;
  width: 25%;
  border-radius: 10px;
  background-color: ${props => (props.dark ? '#000000' : '#ffffff')};
  padding: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${props => (props.dark ? '#ffffff90' : '#00000050')};
`

export const Logo = styled.img`
  width: 50%;
  align-self: center;
  margin-bottom: 40px;
`

export const Label = styled.label`
  color: ${props => (props.dark ? 'white' : 'black')};
  font-weight: bold;
  font-size: ${props => (props.htmlFor === 'showPassword' ? '10px' : '12px')};
  padding-bottom: ${props =>
    props.htmlFor === 'showPassword' ? '0px' : '5px'};
`

export const Input = styled.input`
  height: 30px;
  padding: 5px;
  outline: none;
  align-self: center;
  margin-bottom: ${props => props.bottomMargin && '25px'};
  width: 100%;
  color: ${props => props.type === 'submit' && 'white'};
  background-color: ${props => props.type === 'submit' && 'blue'};
  border-radius: 4px;
  border: 1px solid black;
`

export const InputSubmit = styled.input`
  height: 30px;
  padding: 5px;
  outline: none;
  align-self: center;
  margin-bottom: ${props => props.bottomMargin && '25px'};
  width: 100%;
  background-color: ${props => props.type === 'submit' && 'blue'};
  border-radius: 4px;
  border: 1px solid black;
  cursor: pointer;
  color: '#ffffff';
  font-weight: 600;
  border: 0;
`

export const ErrMsg = styled.p`
  color: red;
  padding: 0px;
  margin: 0px;
  align-self: center;
`

export const ShowPasswordContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 25px;
`
