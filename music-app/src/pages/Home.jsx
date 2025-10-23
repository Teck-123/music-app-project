import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicCard from '../components/MusicCard';

const Home = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchMostPlayed = async () => {
      try {
        const res = await axios.get('https://api.deezer.com/chart/0/tracks');
        setSongs(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMostPlayed();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Most Played Songs</h1>
      <div className="grid grid-cols-4 gap-4">
        {songs.map((song) => <MusicCard key={song.id} song={song} />)}
      </div>
    </div>
  );
};

export default Home;