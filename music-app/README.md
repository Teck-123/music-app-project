# Music app

- A live music streaming app built using React, vite, firebase, tailwindcss, a live API( I used deezer Api).
- In this app users can explore playlists, album, artists and even play songs.

# Features

- User Authentication: to sign up, log in and even reset password using firebase.
- Music search: to search for songs, artists and albums using Deezer API.

# Library and playlist

- One can create their own playlist and manage it.
- One can aldo save favourite ongd or album to thier library.

# Music player

- The audio player is functioning with pause and play and volume controls.

# UI

- Used the tailwind css to style the app.

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

- create the reacte vite app (npm create vite@latest music-app)
- cd music-app
- npm install firebase, tailwindcss, deezer API, react router context 
    -> For firebase you will create a project in firebase console
    -> Then copy youe firebase config and paste it in the firebase.jsx
- npm install
- npm start


Author: Thecla Owano