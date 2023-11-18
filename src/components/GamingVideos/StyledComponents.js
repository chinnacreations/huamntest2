import styled from 'styled-components'

export const GamingContainer = styled.div`
  background-color: ${props => props.bgColor};
  min-height: 100vh;
  margin-top: 60px;
  margin-bottom: 60px;
  overflow-y: auto;
  @media screen and (min-width: 768px) {
    margin-left: 24px;
    margin-bottom: 0px;
  }
`
export const GamingVideoTitle = styled.div`
  display: flex;
  align-items: center;
`
export const GamingTitleIconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 768px) {
    margin-left: 48px;
  }
`
export const GamingText = styled.h1`
  font-family: 'Roboto';
  color: ${props => props.color};
  font-size: 26px;
  margin-bottom: 0px;
  @media screen and (min-width: 768px) {
    font-size: 36px;
  }
`
export const GamingVideoList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media screen and (min-width: 768px) {
    margin-left: 38px;
  }
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`
