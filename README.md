# Music app

- A live music streaming app built using React, Vite, Firebase, TailwindCSS, and a live API( I used Deezer Api).
- In this app, users can explore playlists, albums, artists, and even play songs.

# Features

- User Authentication: to sign up, log in, and even reset password using Firebase.
- Music search: to search for songs, artists, and albums using the Deezer API.

# Library and playlist

- One can create their own playlist and manage it.
- One can also save a favorite song or album to their library.

# Music player

- The audio player is functioning with pause and play, and volume controls.

# UI

- Used Tailwind CSS to style the app.

# Folder structure
-scr -> components (audioplayer, musiccard, navbar)
     -> firebase (firebase) 
     -> pages (album, artist, forgotpassword, homesimple, library, login, playlist, search, signup, song)
     -> services (deezerApi)
     -> styles (theme.css)
     -> utils (musicHelper, uiHelper)
     -> app.jsx
     -> index.js
     -> tailwind.config.js
     
# Installations

- create the React Vite app (npm create vite@latest music-app)
- cd music-app
- npm install firebase, tailwindcss, deezer API, react router context 
    -> For Firebase, you will create a project in the Firebase console
    -> Then copy youe firebase config and paste it in the firebase.jsx
- npm install
- npm start


Author: Thecla Owano
