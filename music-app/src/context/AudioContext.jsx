import React, { createContext, useState, useRef } from 'react';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  const playSong = (song) => {
    if (currentSong?.id !== song.id) {
      audioRef.current.src = song.preview; 
      setCurrentSong(song);
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) pauseSong();
    else playSong(currentSong);
  };

  return (
    <AudioContext.Provider value={{ currentSong, isPlaying, playSong, pauseSong, togglePlay }}>
      {children}
    </AudioContext.Provider>
  );
};