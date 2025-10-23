import React, { useState } from 'react';
import axios from 'axios';
import MusicCard from './MusicCard';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    try {
      const res = await axios.get(`https://api.deezer.com/search?q=${query}`);
      setResults(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for songs..."
          className="p-3 rounded-l text-black"
        />
        <button type="submit" className="bg-blue-800 p-3 rounded-r">Search</button>
      </form>
      <div className="mt-5 grid grid-cols-4 gap-4">
        {results.map((song) => <MusicCard key={song.id} song={song} />)}
      </div>
    </div>
  );
};

export default SearchBar;