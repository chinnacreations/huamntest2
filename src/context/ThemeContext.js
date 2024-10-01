// import React from 'react'

// const ThemeContext = React.createContext({
//   isDarkTheme: false,
//   savedVideos: [],
//   activeTab: 'Home',
//   toggleTheme: () => {},
//   changeTab: () => {},
//   addVideo: () => {},
// })

// export default ThemeContext


import React from 'react';

const ThemeContext = React.createContext({
  isDarkTheme: false,
  savedVideos: [],
  activeTab: 'Home',
  toggleTheme: () => {},
  changeTab: () => {},
  addVideo: () => {},
});

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [savedVideos, setSavedVideos] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('Home');

  const toggleTheme = () => setIsDarkTheme((prevTheme) => !prevTheme);
  const changeTab = (tab) => setActiveTab(tab);
  const addVideo = (video) => setSavedVideos((prevVideos) => [...prevVideos, video]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme,
        savedVideos,
        activeTab,
        toggleTheme,
        changeTab,
        addVideo,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
