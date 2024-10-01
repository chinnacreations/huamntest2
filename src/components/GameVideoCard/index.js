// // import {Link} from 'react-router-dom'

// import ThemeContext from '../../context/ThemeContext'

// import {
//   ItemLink,
//   GamingListItem,
//   GamingThumbNailImage,
//   GamingContentSection,
//   GamingTitle,
//   GamingViewsAndDate,
// } from './StyledComponents'

// const VideoCard = props => {
//   const {videoDetails} = props
//   const {id, title, thumbnailUrl, viewCount} = videoDetails

//   return (
//     <ThemeContext.Consumer>
//       {value => {
//         const {isDarkTheme} = value
//         const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

//         return (
//           <ItemLink to={`/videos/${id}`} className="link">
//             <GamingListItem>
//               <GamingThumbNailImage src={thumbnailUrl} alt="video thumbnail" />
//               <GamingContentSection>
//                 <GamingTitle color={textColor}>{title}</GamingTitle>
//                 <GamingViewsAndDate color={textColor}>
//                   {viewCount} Watching Worldwide
//                 </GamingViewsAndDate>
//               </GamingContentSection>
//             </GamingListItem>
//           </ItemLink>
//         )
//       }}
//     </ThemeContext.Consumer>
//   )
// }

// export default VideoCard


import { useContext } from 'react'
import {ThemeContext} from '../../context/ThemeContext'

import {
  ItemLink,
  GamingListItem,
  GamingThumbNailImage,
  GamingContentSection,
  GamingTitle,
  GamingViewsAndDate,
} from './StyledComponents'

const VideoCard = ({ videoDetails }) => {
  const { id, title, thumbnailUrl, viewCount } = videoDetails
  const { isDarkTheme } = useContext(ThemeContext)

  const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

  return (
    <ItemLink to={`/videos/${id}`} className="link">
      <GamingListItem>
        <GamingThumbNailImage src={thumbnailUrl} alt="video thumbnail" />
        <GamingContentSection>
          <GamingTitle color={textColor}>{title}</GamingTitle>
          <GamingViewsAndDate color={textColor}>
            {viewCount} Watching Worldwide
          </GamingViewsAndDate>
        </GamingContentSection>
      </GamingListItem>
    </ItemLink>
  )
}

export default VideoCard
