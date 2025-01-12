// import {Component} from 'react'
// import Cookies from 'js-cookie'
// import Loader from 'react-loader-spinner'

// import {HiFire} from 'react-icons/hi'

// import Header from '../Header'
// import NavigationBar from '../NavigationBar'
// import ThemeContext from '../../context/ThemeContext'
// import FailureView from '../FailureView'
// import VideoCard from '../VideoCard'

// import {
//   TrendingContainer,
//   TitleIconContainer,
//   TrendingVideoTitle,
//   TrendingVideoList,
//   TrendingText,
//   LoaderContainer,
// } from './StyledComponents'

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

// class TrendingVideos extends Component {
//   state = {
//     trendingVideos: [],
//     apiStatus: apiStatusConstants.initial,
//   }

//   componentDidMount() {
//     this.getVideos()
//   }

//   getVideos = async () => {
//     this.setState({apiStatus: apiStatusConstants.inProgress})
//     const jwtToken = Cookies.get('jwt_token')
//     const url = `https://apis.ccbp.in/videos/trending`
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
//         trendingVideos: updatedData,
//         apiStatus: apiStatusConstants.success,
//       })
//     } else {
//       this.setState({apiStatus: apiStatusConstants.failure})
//     }
//   }

//   renderLoadingView = () => (
//     <LoaderContainer data-testid="loader">
//       <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
//     </LoaderContainer>
//   )

//   renderVideosView = () => {
//     const {trendingVideos} = this.state
//     return (
//       <TrendingVideoList>
//         {trendingVideos.map(eachVideo => (
//           <VideoCard key={eachVideo.id} videoDetails={eachVideo} />
//         ))}
//       </TrendingVideoList>
//     )
//   }

//   onRetry = () => {
//     this.getVideos()
//   }

//   renderFailureView = () => <FailureView onRetry={this.onRetry} />

//   renderTrendingVideos = () => {
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
//     return (
//       <ThemeContext.Consumer>
//         {value => {
//           const {isDarkTheme} = value

//           const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
//           const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

//           return (
//             <>
//               <Header />
//               <NavigationBar />
//               <TrendingContainer data-testid="trending" bgColor={bgColor}>
//                 <TrendingVideoTitle>
//                   <TitleIconContainer>
//                     <HiFire size={35} color="#ff0000" />
//                   </TitleIconContainer>
//                   <TrendingText color={textColor}>Trending</TrendingText>
//                 </TrendingVideoTitle>
//                 {this.renderTrendingVideos()}
//               </TrendingContainer>
//             </>
//           )
//         }}
//       </ThemeContext.Consumer>
//     )
//   }
// }

// export default TrendingVideos


import { useEffect, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import Loader from 'react-loader-spinner';
import { HiFire } from 'react-icons/hi';

import Header from '../Header';
import NavigationBar from '../NavigationBar';
import {ThemeContext} from '../../context/ThemeContext';
import FailureView from '../FailureView';
import VideoCard from '../VideoCard';

import {
  TrendingContainer,
  TitleIconContainer,
  TrendingVideoTitle,
  TrendingVideoList,
  TrendingText,
  LoaderContainer,
} from './StyledComponents';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const TrendingVideos = () => {
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get('jwt_token');
    const url = `https://apis.ccbp.in/videos/trending`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        const updatedData = data.videos.map(eachVideo => ({
          id: eachVideo.id,
          title: eachVideo.title,
          thumbnailUrl: eachVideo.thumbnail_url,
          viewCount: eachVideo.view_count,
          publishedAt: eachVideo.published_at,
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        }));
        setTrendingVideos(updatedData);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </LoaderContainer>
  );

  const renderVideosView = () => (
    <TrendingVideoList>
      {trendingVideos.map(eachVideo => (
        <VideoCard key={eachVideo.id} videoDetails={eachVideo} />
      ))}
    </TrendingVideoList>
  );

  const onRetry = () => {
    getVideos();
  };

  const renderFailureView = () => <FailureView onRetry={onRetry} />;

  const renderTrendingVideos = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderVideosView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9';
  const textColor = isDarkTheme ? '#f9f9f9' : '#231f20';

  return (
    <>
      <Header />
      <NavigationBar />
      <TrendingContainer data-testid="trending" bgColor={bgColor}>
        <TrendingVideoTitle>
          <TitleIconContainer>
            <HiFire size={35} color="#ff0000" />
          </TitleIconContainer>
          <TrendingText color={textColor}>Trending</TrendingText>
        </TrendingVideoTitle>
        {renderTrendingVideos()}
      </TrendingContainer>
    </>
  );
};

export default TrendingVideos;
