// import {Link} from 'react-router-dom'

// import ThemeContext from '../../context/ThemeContext'

// import {
//   ListItem,
//   ThumbNailImage,
//   VideoDetails,
//   ProfileImage,
//   ContentSection,
//   Title,
//   ChannelName,
//   ViewsAndDate,
//   Dot,
// } from './StyledComponents'

// import './index.css'

// const HomeVideoCard = props => {
//   const {video} = props
//   const {
//     id,
//     title,
//     thumbnailUrl,
//     viewCount,
//     publishedAt,
//     name,
//     profileImageUrl,
//   } = video

//   return (
//     <ThemeContext.Consumer>
//       {value => {
//         const {isDarkTheme} = value
//         const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

//         return (
//           <Link to={`/videos/${id}`} className="link">
//             <ListItem>
//               <ThumbNailImage src={thumbnailUrl} alt="video thumbnail" />
//               <VideoDetails>
//                 <ProfileImage src={profileImageUrl} alt="channel logo" />
//                 <ContentSection>
//                   <Title color={textColor}>{title}</Title>
//                   <ChannelName color={textColor}>{name}</ChannelName>
//                   <ViewsAndDate color={textColor}>
//                     {viewCount} views<Dot> &#8226; </Dot> {publishedAt}
//                   </ViewsAndDate>
//                 </ContentSection>
//               </VideoDetails>
//             </ListItem>
//           </Link>
//         )
//       }}
//     </ThemeContext.Consumer>
//   )
// }

// export default HomeVideoCard


import { Link } from 'react-router-dom';
import { useContext } from 'react';

import {ThemeContext} from '../../context/ThemeContext';

import {
  ListItem,
  ThumbNailImage,
  VideoDetails,
  ProfileImage,
  ContentSection,
  Title,
  ChannelName,
  ViewsAndDate,
  Dot,
} from './StyledComponents';

import './index.css';

const HomeVideoCard = ({ video }) => {
  const { id, title, thumbnailUrl, viewCount, publishedAt, name, profileImageUrl } = video;

  const { isDarkTheme } = useContext(ThemeContext);
  const textColor = isDarkTheme ? '#f9f9f9' : '#231f20';

  return (
    <Link to={`/videos/${id}`} className="link">
      <ListItem>
        <ThumbNailImage src={thumbnailUrl} alt="video thumbnail" />
        <VideoDetails>
          <ProfileImage src={profileImageUrl} alt="channel logo" />
          <ContentSection>
            <Title color={textColor}>{title}</Title>
            <ChannelName color={textColor}>{name}</ChannelName>
            <ViewsAndDate color={textColor}>
              {viewCount} views<Dot> &#8226; </Dot> {publishedAt}
            </ViewsAndDate>
          </ContentSection>
        </VideoDetails>
      </ListItem>
    </Link>
  );
};

export default HomeVideoCard;
