import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

// Contexts
import AppContext from '../contexts/AppContext';

// Cookie strings
import COOKIES from '../vars/cookies';

function AppContextProvider(props) {
  const cookies = new Cookies();

  const userCookie = cookies.get(COOKIES.user);

  const [appState, setAppState] = useState({
    user: {
      id: userCookie ? userCookie.id : 0,
      isLoggedIn: userCookie ? userCookie.isLoggedIn : false,
      token: userCookie ? userCookie.token : '',
      name: userCookie ? userCookie.name : '',
      description: userCookie ? userCookie.description : '',
      image: userCookie ? userCookie.image : '',
      liked: userCookie ? userCookie.liked : 0,
      disliked: userCookie ? userCookie.disliked : 0,
      email: userCookie ? userCookie.email : ''
    },
    currentItem: {
      id: '',
      name: '',
      owner: {
        id: 0,
        name: 'William To'
      },
      imageUrls: [
        'https://static.zarahome.net/8/photos4/2020/V/4/1/p/9400/072/999/9400072999_1_1_3.jpg?t=1572015717021',
        'https://static.zarahome.net/8/photos4/2020/V/4/1/p/9400/072/999/9400072999_2_1_2.jpg?t=1571411411494',
        'https://static.zarahome.net/8/photos4/2020/V/4/1/p/9400/072/999/9400072999_2_2_2.jpg?t=1571411426446',
        'https://static.zarahome.net/8/photos4/2020/V/4/1/p/9400/072/999/9400072999_2_4_2.jpg?t=1571411397535',
        'https://static.zarahome.net/8/photos4/2020/V/4/1/p/9400/072/999/9400072999_2_7_2.jpg?t=1578918286008'
      ],
      description: '',
      ratings: 0,
      comments: []
    }
  });

  useEffect(() => {
    if (appState.user.isLoggedIn) {
      // set login cookie
      cookies.set(COOKIES.user, {
        id: appState.user.id,
        name: appState.user.name,
        token: appState.user.token,
        isLoggedIn: true,
        description: appState.user.description,
        image: appState.user.image,
        liked: appState.user.liked,
        disliked: appState.user.disliked,
        email: appState.user.email
      });
    } else {
      // clear cookie
      cookies.remove(COOKIES.user);
    }

  }, [appState.user, cookies]);

  return (
    <AppContext.Provider value={{ appState, setAppState }}>{props.children}</AppContext.Provider>
  );
}

export default AppContextProvider;
