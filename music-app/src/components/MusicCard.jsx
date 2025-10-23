import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AudioContext } from '../context/AudioContext';

const MusicCard = ({ song }) => {
  const { playSong } = useContext(AudioContext);

  return (
    <div className="bg-white p-5 rounded shadow">
      <img src={song.album.cover} alt={song.title} className="w-full h-32 object-cover" />
      <h3 className="font-bold">{song.title}</h3>
      <p>{song.artist.name}</p>
      <button onClick={() => playSong(song)} className="bg-green-500 p-2 mt-3">Play</button>
      <Link to={`/song/${song.id}`} className="block mt-3 text-blue-600">Check</Link>
    </div>
  );
};

export default MusicCard;