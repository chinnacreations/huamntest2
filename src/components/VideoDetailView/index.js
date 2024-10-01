// import {Component} from 'react'
// import Cookies from 'js-cookie'
// import Loader from 'react-loader-spinner'

// import Header from '../Header'
// import NavigationBar from '../NavigationBar'
// import {ThemeContext} from '../../context/ThemeContext'
// import FailureView from '../FailureView'
// import PlayVideoView from '../PlayVideoView'

// import {VideoDetailViewContainer, LoaderContainer} from './StyledComponents'

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }
// class VideoDetailView extends Component {
//   state = {
//     apiStatus: apiStatusConstants.initial,
//     videoDetails: [],
//     isLiked: false,
//     isDisLiked: false,
//   }

//   componentDidMount() {
//     this.getVideoDetails()
//   }

//   formattedData = data => ({
//     id: data.video_details.id,
//     title: data.video_details.title,
//     videoUrl: data.video_details.video_url,
//     thumbnailUrl: data.video_details.thumbnail_url,
//     viewCount: data.video_details.view_count,
//     publishedAt: data.video_details.published_at,
//     description: data.video_details.description,
//     name: data.video_details.channel.name,
//     profileImageUrl: data.video_details.channel.profile_image_url,
//     subscriberCount: data.video_details.channel.subscriber_count,
//   })

//   getVideoDetails = async () => {
//     this.setState({apiStatus: apiStatusConstants.inProgress})

//     const {match} = this.props
//     const {params} = match
//     const {id} = params
//     // console.log(id)
//     const jwtToken = Cookies.get('jwt_token')

//     const url = `https://apis.ccbp.in/videos/${id}`
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
//       const updatedData = this.formattedData(data)
//       this.setState({
//         videoDetails: updatedData,
//         apiStatus: apiStatusConstants.success,
//       })
//     } else {
//       this.setState({apiStatus: apiStatusConstants.failure})
//     }
//   }

//   clickLiked = () => {
//     this.setState(prevState => ({
//       isLiked: !prevState.isLiked,
//       isDisLiked: false,
//     }))
//   }

//   clickDisLiked = () => {
//     this.setState(prevState => ({
//       isDisLiked: !prevState.isDisLiked,
//       isLiked: false,
//     }))
//   }

//   renderLoadingView = () => (
//     <LoaderContainer data-testid="loader">
//       <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
//     </LoaderContainer>
//   )

//   renderPlayVideoView = () => {
//     const {videoDetails, isLiked, isDisLiked} = this.state
//     return (
//       <PlayVideoView
//         videoDetails={videoDetails}
//         clickLiked={this.clickLiked}
//         clickDisLiked={this.clickDisLiked}
//         clickSaved={this.clickSaved}
//         isLiked={isLiked}
//         isDisLiked={isDisLiked}
//       />
//     )
//   }

//   onRetry = () => {
//     this.getVideoDetails()
//   }

//   renderFailureView = () => <FailureView onRetry={this.onRetry} />

//   renderVideoDetailView = () => {
//     const {apiStatus} = this.state

//     switch (apiStatus) {
//       case apiStatusConstants.success:
//         return this.renderPlayVideoView()
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

//           return (
//             <>
//               <Header />
//               <NavigationBar />
//               <VideoDetailViewContainer
//                 data-testid="videoItemDetails"
//                 bgColor={bgColor}
//               >
//                 {this.renderVideoDetailView()}
//               </VideoDetailViewContainer>
//             </>
//           )
//         }}
//       </ThemeContext.Consumer>
//     )
//   }
// }

// export default VideoDetailView


import { useEffect, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import Loader from 'react-loader-spinner';

import Header from '../Header';
import NavigationBar from '../NavigationBar';
import { ThemeContext } from '../../context/ThemeContext';
import FailureView from '../FailureView';
import PlayVideoView from '../PlayVideoView';

import { VideoDetailViewContainer, LoaderContainer } from './StyledComponents';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const VideoDetailView = ({ match }) => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [videoDetails, setVideoDetails] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);

  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    getVideoDetails();
  }, [match.params.id]);

  const formattedData = (data) => ({
    id: data.video_details.id,
    title: data.video_details.title,
    videoUrl: data.video_details.video_url,
    thumbnailUrl: data.video_details.thumbnail_url,
    viewCount: data.video_details.view_count,
    publishedAt: data.video_details.published_at,
    description: data.video_details.description,
    name: data.video_details.channel.name,
    profileImageUrl: data.video_details.channel.profile_image_url,
    subscriberCount: data.video_details.channel.subscriber_count,
  });

  const getVideoDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    
    const { id } = match.params;
    const jwtToken = Cookies.get('jwt_token');
    const url = `https://apis.ccbp.in/videos/${id}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };
    
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      const updatedData = formattedData(data);
      setVideoDetails(updatedData);
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const clickLiked = () => {
    setIsLiked((prev) => !prev);
    setIsDisLiked(false);
  };

  const clickDisLiked = () => {
    setIsDisLiked((prev) => !prev);
    setIsLiked(false);
  };

  const renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </LoaderContainer>
  );

  const renderPlayVideoView = () => (
    <PlayVideoView
      videoDetails={videoDetails}
      clickLiked={clickLiked}
      clickDisLiked={clickDisLiked}
      isLiked={isLiked}
      isDisLiked={isDisLiked}
    />
  );

  const onRetry = () => {
    getVideoDetails();
  };

  const renderFailureView = () => <FailureView onRetry={onRetry} />;

  const renderVideoDetailView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderPlayVideoView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9';

  return (
    <>
      <Header />
      <NavigationBar />
      <VideoDetailViewContainer
        data-testid="videoItemDetails"
        bgColor={bgColor}
      >
        {renderVideoDetailView()}
      </VideoDetailViewContainer>
    </>
  );
};

export default VideoDetailView;
