import { ThemeWeb } from 'styled-components';

const lightThemeWeb: ThemeWeb = {
    borderRadius: '15px',

    colors: {
        background: '#F6F6F6',
        primary: '#5CD0BA',
        secondary: '#333B46',
        secondary2: '#EFEFEF',
        secondary3: '#171E26',
        accent: '#F56E60',
        textColors: ['#141414', '#141414', '#737373'],
        sliderTrackColor: '#EFEFEF',
        sliderBallColor: '#1E1E1E',
        heroBackground: '#F8F8F8',
        missionBackground: '#F2FCFA',
        inputBg: '#EDEDED',
        linearGradientBlob4: "linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, #EFEFEF 100%)"
    },

    mediaQuery: {
        fold: '@media (max-width: 311px)',
        tablet: '@media (min-width: 767px)',
        desktop: '@media (min-width: 1200px)',
    },
    tabletWidth: '600px',
    desktopWidth: '1100px',
    constrainedMargin: '0px 20px 0px 20px'
};

const darkThemeWeb: ThemeWeb = {
    borderRadius: '15px',

    colors: {
        background: '#141414',
        primary: '#5CD0BA',
        secondary: ' #161616',
        secondary2: '#1e1e1e',
        secondary3: '#171E26',
        accent: '#F56E60',
        textColors: ['#F6F6F6', '#EFEFEF', '#737373'],
        sliderTrackColor: '#1E1E1E',
        sliderBallColor: '#5CD0BA',
        heroBackground: '#181818',
        missionBackground: '#181d1c',
        inputBg: '#1E1E1E',
        linearGradientBlob4: "linear-gradient(180deg, #151515 0%, #1e1e1e 100%)"
    },

    mediaQuery: {
        fold: '@media (max-width: 311px)',
        tablet: '@media (min-width: 767px)',
        desktop: '@media (min-width: 1200px)',
    },
    tabletWidth: '600px',
    desktopWidth: '1100px',
    constrainedMargin: '0px 20px 0px 20px'
};



export { lightThemeWeb, darkThemeWeb };