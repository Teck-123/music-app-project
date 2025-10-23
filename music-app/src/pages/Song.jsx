import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AudioContext } from '../context/AudioContext';

const Song = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const { playSong } = useContext(AudioContext);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const res = await axios.get(`https://api.deezer.com/track/${id}`);
        setSong(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSong();
  }, [id]);

  if (!song) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded ">
      <img src={song.album.cover_big} alt={song.title} className="w-full h-62 object-cover mb-4" />
      <h1 className="text-3xl font-bold">{song.title}</h1>
      <p className="text-xl">{song.artist.name}</p>
      <button onClick={() => playSong(song)} className="bg-green-500 p-2 mt-4 text-white">Play</button>
    </div>
  );
};

export default Song;