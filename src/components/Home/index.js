// import {Component} from 'react'
// import Cookies from 'js-cookie'
// import Loader from 'react-loader-spinner'

// import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'

// import Header from '../Header'
// import NavigationBar from '../NavigationBar'
// import ThemeContext from '../../context/ThemeContext'
// import HomeVideos from '../HomeVideos'
// import FailureView from '../FailureView'

// import {
//   HomeContainer,
//   BannerContainer,
//   BannerImage,
//   BannerText,
//   BannerButton,
//   BannerLeftPart,
//   BannerRightPart,
//   BannerCloseButton,
//   SearchContainer,
//   SearchInput,
//   SearchIconContainer,
//   LoaderContainer,
// } from './StyledComponents'

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

// class Home extends Component {
//   state = {
//     homeVideos: [],
//     searchInput: '',
//     apiStatus: apiStatusConstants.initial,
//     bannerDisplay: 'flex',
//   }

//   componentDidMount() {
//     this.getVideos()
//   }

//   getVideos = async () => {
//     const {searchInput} = this.state
//     this.setState({apiStatus: apiStatusConstants.inProgress})
//     const jwtToken = Cookies.get('jwt_token')
//     const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
//     const options = {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//       method: 'GET',
//     }
//     const response = await fetch(url, options)
//     if (response.ok) {
//       const data = await response.json()
//       // console.log(data)
//       const updatedData = data.videos.map(eachVideo => ({
//         id: eachVideo.id,
//         title: eachVideo.title,
//         thumbnailUrl: eachVideo.thumbnail_url,
//         viewCount: eachVideo.view_count,
//         publishedAt: eachVideo.published_at,
//         name: eachVideo.channel.name,
//         profileImageUrl: eachVideo.channel.profile_image_url,
//       }))
//       this.setState({
//         homeVideos: updatedData,
//         apiStatus: apiStatusConstants.success,
//       })
//     } else {
//       this.setState({apiStatus: apiStatusConstants.failure})
//     }
//   }

//   onCloseBanner = () => {
//     this.setState({bannerDisplay: 'none'})
//   }

//   onChangeInput = event => {
//     this.setState({searchInput: event.target.value})
//   }

//   getSearchResults = () => {
//     this.getVideos()
//   }

//   onRetry = () => {
//     this.setState({searchInput: ''}, this.getVideos)
//   }

//   renderLoadingView = () => (
//     <LoaderContainer data-testid="loader">
//       <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
//     </LoaderContainer>
//   )

//   renderVideosView = () => {
//     const {homeVideos} = this.state
//     return <HomeVideos homeVideos={homeVideos} onRetry={this.onRetry} />
//   }

//   renderFailureView = () => <FailureView onRetry={this.onRetry} />

//   renderHomeVideos = () => {
//     const {apiStatus} = this.state

//     switch (apiStatus) {
//       case apiStatusConstants.success:
//         return this.renderVideosView()
//       case apiStatusConstants.failure:
//         return this.renderFailureView()
//       case apiStatusConstants.inProgress:
//         return this.renderLoadingView()
//       default:
//         return null
//     }
//   }

//   render() {
//     const {searchInput, bannerDisplay} = this.state
//     return (
//       <ThemeContext.Consumer>
//         {value => {
//           const {isDarkTheme} = value

//           const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'
//           const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'
//           const display = bannerDisplay === 'flex' ? 'flex' : 'none'

//           return (
//             <>
//               <Header />
//               <NavigationBar />
//               <HomeContainer data-testid="home" bgColor={bgColor}>
//                 <BannerContainer data-testid="banner" display={display}>
//                   <BannerLeftPart>
//                     <BannerImage
//                       src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
//                       alt="nxt watch logo"
//                     />
//                     <BannerText>Buy Nxt Watch Premium</BannerText>
//                     <BannerButton type="button">GET IT NOW</BannerButton>
//                   </BannerLeftPart>
//                   <BannerRightPart>
//                     <BannerCloseButton
//                       data-testid="close"
//                       onClick={this.onCloseBanner}
//                     >
//                       <AiOutlineClose size={25} />
//                     </BannerCloseButton>
//                   </BannerRightPart>
//                 </BannerContainer>
//                 <SearchContainer>
//                   <SearchInput
//                     type="search"
//                     placeholder="Search"
//                     value={searchInput}
//                     onChange={this.onChangeInput}
//                     color={textColor}
//                   />
//                   <SearchIconContainer
//                     data-testid="searchButton"
//                     onClick={this.getSearchResults}
//                   >
//                     <AiOutlineSearch size={20} />
//                   </SearchIconContainer>
//                 </SearchContainer>
//                 {this.renderHomeVideos()}
//               </HomeContainer>
//             </>
//           )
//         }}
//       </ThemeContext.Consumer>
//     )
//   }
// }

// export default Home



import { useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import Header from '../Header'
import NavigationBar from '../NavigationBar'
import {ThemeContext} from '../../context/ThemeContext'
import HomeVideos from '../HomeVideos'
import FailureView from '../FailureView'
import {
  HomeContainer,
  BannerContainer,
  BannerImage,
  BannerText,
  BannerButton,
  BannerLeftPart,
  BannerRightPart,
  BannerCloseButton,
  SearchContainer,
  SearchInput,
  SearchIconContainer,
  LoaderContainer,
} from './StyledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Home = () => {
  const [homeVideos, setHomeVideos] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [bannerDisplay, setBannerDisplay] = useState('flex')

  useEffect(() => {
    getVideos()
  }, [searchInput])

  const getVideos = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
      }))
      setHomeVideos(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const onCloseBanner = () => {
    setBannerDisplay('none')
  }

  const onChangeInput = event => {
    setSearchInput(event.target.value)
  }

  const getSearchResults = () => {
    getVideos()
  }

  const onRetry = () => {
    setSearchInput('')
    getVideos()
  }

  const renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </LoaderContainer>
  )

  const renderVideosView = () => (
    <HomeVideos homeVideos={homeVideos} onRetry={onRetry} />
  )

  const renderFailureView = () => <FailureView onRetry={onRetry} />

  const renderHomeVideos = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderVideosView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const { isDarkTheme } = value
        const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'
        const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'
        const display = bannerDisplay === 'flex' ? 'flex' : 'none'

        return (
          <>
            <Header />
            <NavigationBar />
            <HomeContainer data-testid="home" bgColor={bgColor}>
              <BannerContainer data-testid="banner" display={display}>
                <BannerLeftPart>
                  <BannerImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="nxt watch logo"
                  />
                  <BannerText>Buy Nxt Watch Premium</BannerText>
                  <BannerButton type="button">GET IT NOW</BannerButton>
                </BannerLeftPart>
                <BannerRightPart>
                  <BannerCloseButton
                    data-testid="close"
                    onClick={onCloseBanner}
                  >
                    <AiOutlineClose size={25} />
                  </BannerCloseButton>
                </BannerRightPart>
              </BannerContainer>
              <SearchContainer>
                <SearchInput
                  type="search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={onChangeInput}
                  color={textColor}
                />
                <SearchIconContainer
                  data-testid="searchButton"
                  onClick={getSearchResults}
                >
                  <AiOutlineSearch size={20} />
                </SearchIconContainer>
              </SearchContainer>
              {renderHomeVideos()}
            </HomeContainer>
          </>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default Home

