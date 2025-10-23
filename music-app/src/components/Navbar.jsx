import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-700 p-5 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bolder">Music App</Link>
      <SearchBar />
      <div>
        <Link to="/library" className="mx-3">Library</Link>
        {currentUser ? (
          <button onClick={logout} className="mx-3">Logout</button>
        ) : (
          <>
            <Link to="/login" className="mx-3">Login</Link>
            <Link to="/signup" className="mx-3">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;