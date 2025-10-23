import React, { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import { FaPlay, FaPause } from 'react-icons/fa';

const AudioPlayer = () => {
  const { currentSong, isPlaying, togglePlay } = useContext(AudioContext);

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 text-white p-5 flex items-center">
      <img src={currentSong.album.cover_small} alt={currentSong.title} className="w-13 h-13 mr-5" />
      <div className="flex-1">
        <h4>{currentSong.title}</h4>
        <p>{currentSong.artist.name}</p>
      </div>
      <button onClick={togglePlay} className="text-2xl">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
};

export default AudioPlayer;