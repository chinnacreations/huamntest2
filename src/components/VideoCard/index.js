// // import {Link} from 'react-router-dom'

// import ThemeContext from '../../context/ThemeContext'

// import {
//   ItemLink,
//   TrendingListItem,
//   TrendingThumbNailImage,
//   TrendingVideoDetails,
//   TrendingProfileImage,
//   TrendingContentSection,
//   TrendingTitle,
//   TrendingChannelName,
//   TrendingViewsAndDate,
//   TrendingDot,
// } from './StyledComponents'

// const VideoCard = props => {
//   const {videoDetails} = props
//   const {
//     id,
//     title,
//     thumbnailUrl,
//     viewCount,
//     publishedAt,
//     name,
//     profileImageUrl,
//   } = videoDetails

//   return (
//     <ThemeContext.Consumer>
//       {value => {
//         const {isDarkTheme} = value
//         const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

//         return (
//           <ItemLink to={`/videos/${id}`} className="link">
//             <TrendingListItem>
//               <TrendingThumbNailImage
//                 src={thumbnailUrl}
//                 alt="video thumbnail"
//               />
//               <TrendingVideoDetails>
//                 <TrendingProfileImage
//                   src={profileImageUrl}
//                   alt="channel logo"
//                 />
//                 <TrendingContentSection>
//                   <TrendingTitle color={textColor}>{title}</TrendingTitle>
//                   <TrendingChannelName color={textColor}>
//                     {name}
//                   </TrendingChannelName>
//                   <TrendingViewsAndDate color={textColor}>
//                     {viewCount} views<TrendingDot> &#8226; </TrendingDot>
//                     {publishedAt}
//                   </TrendingViewsAndDate>
//                 </TrendingContentSection>
//               </TrendingVideoDetails>
//             </TrendingListItem>
//           </ItemLink>
//         )
//       }}
//     </ThemeContext.Consumer>
//   )
// }

// export default VideoCard

import React, { useContext } from 'react'; // Make sure useContext is imported from react
import { Link } from 'react-router-dom';
import {ThemeContext} from '../../context/ThemeContext';

import {
  ItemLink,
  TrendingListItem,
  TrendingThumbNailImage,
  TrendingVideoDetails,
  TrendingProfileImage,
  TrendingContentSection,
  TrendingTitle,
  TrendingChannelName,
  TrendingViewsAndDate,
  TrendingDot,
} from './StyledComponents';

const VideoCard = ({ videoDetails }) => {
  const {
    id,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    name,
    profileImageUrl,
  } = videoDetails;

  const { isDarkTheme } = useContext(ThemeContext);
  const textColor = isDarkTheme ? '#f9f9f9' : '#231f20';

  return (
    <ItemLink as={Link} to={`/videos/${id}`} className="link">
      <TrendingListItem>
        <TrendingThumbNailImage src={thumbnailUrl} alt="video thumbnail" />
        <TrendingVideoDetails>
          <TrendingProfileImage src={profileImageUrl} alt="channel logo" />
          <TrendingContentSection>
            <TrendingTitle color={textColor}>{title}</TrendingTitle>
            <TrendingChannelName color={textColor}>{name}</TrendingChannelName>
            <TrendingViewsAndDate color={textColor}>
              {viewCount} views<TrendingDot> &#8226; </TrendingDot>
              {publishedAt}
            </TrendingViewsAndDate>
          </TrendingContentSection>
        </TrendingVideoDetails>
      </TrendingListItem>
    </ItemLink>
  );
};

export default VideoCard;
